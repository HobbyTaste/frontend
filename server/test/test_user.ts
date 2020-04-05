import chai from 'chai';
import 'mocha';
import mongoose, { Error } from 'mongoose';
import async from 'async';
import chaiHttp from 'chai-http';

import Hobby, { IHobby } from '../models/hobby';
import Provider, { IProvider } from '../models/provider';
import * as data from './sample_data';
import User, { IUser } from '../models/user';
import * as utils from './utils';
import { HTTP_STATUS } from './utils';

const assert: Chai.AssertStatic = chai.assert;
chai.use(chaiHttp);


describe('Work with user and hobbies', function() {
    this.timeout(500);
    this.slow(200);
    before((done: Mocha.Done) => {
        utils.fixtures
            .connect(utils.dbHost, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
            .then(() => utils.fixtures.unload())
            .then(() => utils.fixtures.disconnect())
            .then(done);
    });

    it('should create user', (done: Mocha.Done) => {
        utils.create_user(data.user, done);
    });

    it('should logout user', (done: Mocha.Done) => {
        utils.logout_user(done);
    })

    it('should create another user', (done: Mocha.Done) => {
        utils.create_user(data.another_user, done);
    });

    it('should logout from another user', (done: Mocha.Done) => {
        utils.logout_user(done);
    })

    it('should login user', (done: Mocha.Done) => {
        utils.login_user(data.user.email, data.user.password, done);
    })

    it('should get info about current (logged in) user', (done: Mocha.Done) => {
        utils.agent.get('/user/info')
        .set('csrf-token', process.env.csrfToken || '')
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            const {id, ...response_user} = res.body;
            const {password, ...rest_data_user} = data.user;
            assert.deepEqual<Partial<IUser> >(rest_data_user, response_user, 'Wrong info about current (logged in) user');
            done();
        });
    });

    it('should get info about other (not logged in) user', (done: Mocha.Done) => {
        User.findOne({email: data.another_user.email}, (err: Error, result) => {
            if (result) {
                utils.agent.get('/user/info')
                .query({id: result._id.toHexString()})
                .set('csrf-token', process.env.csrfToken || '')
                .then((res: ChaiHttp.Response) => {
                    assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                    const {id, ...response_user} = res.body;
                    const {password, ...rest_data_another_user} = data.another_user;
                    assert.deepEqual<Partial<IProvider> >(response_user, rest_data_another_user, 
                                                          'Wrong info about other user');
                    done();
                });
            }
            else assert.fail('Desired user was not found')
        });
    });

    it('should not get info about user due to incorrect id', (done: Mocha.Done) => {
        utils.agent.get('/user/info')
        .set('csrf-token', process.env.csrfToken || '')
        .query({id: data.wrong_hex_string})
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.NOT_FOUND, 'Status code is not 404, found something wrong');
            assert.include(res.text, 'Не найден такой пользователь');
            done();
        });
    });

    it('should edit user data', (done: Mocha.Done) => {
        utils.agent.post('/user/edit')
        .set('csrf-token', process.env.csrfToken || '')
        .send(data.user_update)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            User.findOne({email: data.user_update.email}, (err: Error, result) => {
                if (result) {
                    const rest_props = { 
                        email: result.email,
                        name: result.name
                    };
                    assert.deepEqual<Partial<IUser> >(rest_props, {email: data.user_update.email, name: data.user.name},
                                                      'Information was not updated correctly');
                    done();
                }
                else assert.fail('User was not found in database');
            });
        });
    });

    it('should populate hobbies to database', (done: Mocha.Done) => {
        Hobby.insertMany(data.hobbies, (err: Error, hobbies) => {
            const database_handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(hobbies);
            assert.sameDeepMembers<Partial<IHobby> >(data.hobbies, database_handled_hobbies, 
                'Hobbies are not what was expected');
            done();
        })
    });

    it('should subscribe user to hobbies', (done: Mocha.Done) => {
        async.series([utils.create_subscriber('1s'),
                        utils.create_subscriber('2m'),
                        utils.create_subscriber('1t')],
                        () => {
            User.findOne({email: data.user_update.email}, (err: Error, user) => {
                const user_id = user?._id.toHexString();
                async.parallel([utils.create_subscribe_checker('1s', user_id), 
                                utils.create_subscribe_checker('2m', user_id),
                                utils.create_subscribe_checker('1t', user_id)],
                                done);
            })
        });
    })

    it('should not subscribe to hobby due to incorrect id', (done: Mocha.Done) => {
        utils.agent.get('/user/subscribe')
        .query({id: data.wrong_hex_string})
        .set('csrf-token', process.env.csrfToken || '')
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.NOT_FOUND, 'Status code is not 404, found something wrong');
            assert.include(res.text, 'Такого хобби не найдено');
            done();
        });
    });

    it('should not subscribe to hobby due to id absence', (done: Mocha.Done) => {
        utils.agent.get('/user/subscribe')
        .set('csrf-token', process.env.csrfToken || '')
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.BAD_REQUEST, 'Status code is not 400,' +
                                                              'id absence was recognized as correct option');
            assert.include(res.text, 'Необходимо указать id хобби для подписки');
            done();
        });
    });

    it("should get list of user's hobbies", (done: Mocha.Done) => {
        utils.agent.get('/user/hobbies')
        .set('csrf-token', process.env.csrfToken || '')
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            const hobby_ids = res.body.map((hobby: Partial<IHobby>) => {
                return hobby._id;
            })
            User.findOne({email: data.user_update.email}, (err: Error, user) => {
                if (user) {
                    const user_hobby_ids = user.hobbies.map((hobby: any) => {
                        return hobby.toHexString();
                    })
                    assert.sameMembers(hobby_ids, user_hobby_ids, 'List of hobby ids is not what was expected');
                    done();
                }
                else assert.fail('User was not found in database');
            })
        });
    });

});