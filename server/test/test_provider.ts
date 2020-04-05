import chai from 'chai';
import 'mocha';
import mongoose, { Error } from 'mongoose';
import async from 'async';
import chaiHttp from 'chai-http';

import Hobby, { IHobby } from '../models/hobby';
import Provider, { IProvider } from '../models/provider';
import * as data from './sample_data';
import * as utils from './utils';
import { HTTP_STATUS } from './utils';

const assert: Chai.AssertStatic = chai.assert;
chai.use(chaiHttp);


describe('Work with provider and add hobby', function() {
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

    it('should create provider', (done: Mocha.Done) => {
        utils.create_provider(data.provider, done);
    });

    it('should logout provider', (done: Mocha.Done) => {
        utils.logout_provider(done);
    });

    it('should not create provider due to non-unique email', (done: Mocha.Done) => {
        utils.agent.post('/provider/create')
        .set('csrf-token', process.env.csrfToken || '')
        .send(data.provider)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.BAD_REQUEST, 'Checking email uniqueness failed');
            done();
        });
    });

    it('should create another provider', (done: Mocha.Done) => {
        utils.create_provider(data.another_provider, done);
    });

    it('should logout from another provider', (done: Mocha.Done) => {
        utils.logout_provider(done);
    });

    it('should login provider', (done: Mocha.Done) => {
        utils.login_provider(data.provider.email, data.provider.password, done);
    });

    it('should add hobbies', (done: Mocha.Done) => {
        let adding_functions: async.AsyncFunction<any>[] = [];
        data.hobbies.forEach((hobby: Partial<IHobby>) => {
            adding_functions.push(utils.create_hobby_adder(hobby));
        });
        async.parallel(adding_functions, done);
    });

    it('should get info about current (logged in) provider', (done: Mocha.Done) => {
        utils.agent.get('/provider/info')
        .set('csrf-token', process.env.csrfToken || '')
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            const {password, ...data_rest_props} = data.provider;
            const {id, __v, ...rest_props} = res.body;
            assert.deepEqual<Partial<IProvider> >(rest_props, data_rest_props, 'Wrong info about provider');
            done();
        });
    });

    it('should get info about other (not logged in) provider', (done: Mocha.Done) => {
        Provider.findOne({phone: data.another_provider.phone}, (err: Error, result) => {
            if (result) {
                utils.agent.get('/provider/info')
                .query({id: result._id.toHexString()})
                .set('csrf-token', process.env.csrfToken || '')
                .then((res: ChaiHttp.Response) => {
                    assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                    const data_rest_props = (({password, ...rest}) => rest)(data.another_provider);
                    const rest_props = (({_id, __v, password, ...rest}) => rest)(res.body._doc);
                    assert.deepEqual<Partial<IProvider> >(rest_props, data_rest_props, 
                                                          'Wrong info about other provider');
                    done();
                });
            }
        });
    });

    it('should not get info about provider due to incorrect id', (done: Mocha.Done) => {
        utils.agent.get('/provider/info')
        .set('csrf-token', process.env.csrfToken || '')
        .query({id: data.wrong_hex_string})
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.NOT_FOUND, 'Status code is not 404, found something wrong');
            assert.include(res.text, 'Не найден такой пользователь');
            done();
        });
    });

    it('should edit provider data', (done: Mocha.Done) => {
        utils.agent.post('/provider/edit')
        .set('csrf-token', process.env.csrfToken || '')
        .send(data.provider_update)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            Provider.findOne({email: data.provider.email}, (err: Error, result) => {
                if (result) {
                    const rest_props = { 
                        phone: result.phone,
                        info: result.info,
                        name: result.name
                    };
                    let {password, ...data_props} = data.provider_update;
                    assert.deepEqual<Partial<IProvider> >(rest_props, data_props, 
                                                          'Information was not updated correctly');
                    done();
                }
                else assert.fail('Provider was not found in database');
            });
        });
    });

    it("should find provider's hobbies", (done: Mocha.Done) => {
        utils.agent.get('/provider/hobbies')
        .set('csrf-token', process.env.csrfToken || '')
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            const handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(res.body);
            Hobby.find({}, (err, hobbies) => {
                const database_handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(hobbies);
                assert.sameDeepMembers<Partial<IHobby> >(handled_hobbies, database_handled_hobbies,
                                                         'Hobbies are not what was expected');
                done();
            });
        });
    });

    it('should logout current provider', (done: Mocha.Done) => {
        utils.logout_provider(done);
    });

    it('should login provider with updated password', (done: Mocha.Done) => {
        utils.login_provider(data.provider.email, data.provider_update.password, done);
    });

    it('should logout current provider', (done: Mocha.Done) => {
        utils.logout_provider(done);
    });

});