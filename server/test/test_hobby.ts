import chai from 'chai';
import 'mocha';
import mongoose, { Error } from 'mongoose';
import chaiHttp from 'chai-http';
import async from 'async';

import server from '../app';
import Hobby, { IHobby } from '../models/hobby';
import Provider, { IProvider } from '../models/provider';
import * as data from './sample_data';
import * as utils from './utils';
import { HTTP_STATUS } from './utils';


const assert: Chai.AssertStatic = chai.assert;
chai.use(chaiHttp);


describe('Work with hobbies', function() {
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

    it('should show empty list', (done: Mocha.Done) => {
        chai.request(server)
            .get('/hobby/all')
            .end((err: Error, res: ChaiHttp.Response) => {
                assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                assert.isEmpty(res.body);
                done();
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

    it('should get a list of all hobbies', (done: Mocha.Done) => {
        utils.agent.get('/hobby/all')
        .set('csrf-token', process.env.csrfToken || '')
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            assert.lengthOf(res.body, data.hobbies.length, 'The number of hobbies is too big or too small, not right');
            Hobby.find({}, (err: Error, hobbies) => {
                const handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(res.body);
                const database_handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(hobbies);
                assert.sameDeepMembers<Partial<IHobby> >(handled_hobbies, database_handled_hobbies, 
                                                         'Hobbies are not what was expected');
                done();
            });
        });
    });

    it('should filter hobbies by category', (done: Mocha.Done) => {
        utils.filter_test({category: 'sport'}, done);
    });

    it('should filter hobbies by metroId', (done: Mocha.Done) => {
        utils.filter_test({metroId: '2'}, done);
    });

    it('should get information about hobby by id', (done: Mocha.Done) => {
        Hobby.findOne({label: '2s'}, (err: Error, result) => {
            if (result) {
                utils.agent.get('/hobby/info')
                .query({id: result._id.toHexString()})
                .set('csrf-token', process.env.csrfToken || '')
                .then((res: ChaiHttp.Response) => {
                    assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                    const response_hobby: Partial<IHobby> = utils.unify_hobby_list([res.body])[0];
                    const database_hobby: Partial<IHobby> = utils.unify_hobby_list([result])[0];
                    assert.deepEqual(response_hobby, database_hobby, 'Hobby is not what was expected');
                    done();
                })
            }
            else assert.fail('Hobby id was not found in database');
        })
    });

    it('should update information about hobby by id', (done: Mocha.Done) => {
        Hobby.findOne({label: '2s'}, (err: Error, result) => {
            utils.agent.post('/hobby/edit')
            .query({id: result?._id.toHexString()})
            .set('csrf-token', process.env.csrfToken || '')
            .send(data.hobby_update)
            .then((res: ChaiHttp.Response) => {
                assert.equal(res.status, HTTP_STATUS.UNAUTHORIZED, 'Status code is not 401');
                process.env.csrfToken = res.header['csrf-token'];
                utils.agent.post('/hobby/edit')
                .query({id: result?._id.toHexString()})
                .set('csrf-token', process.env.csrfToken || '')
                .send(data.hobby_update)
                .then((res: ChaiHttp.Response) => {
                    Hobby.findOne({label: '2s'}, (err: Error, hobby) => {
                        assert.equal(data.hobby_update.phone, hobby?.phone);
                        done();
                    })
                });
            })
        })
    });

    it('should find hobby by label', (done: Mocha.Done) => {
        utils.agent.get('/hobby/find')
        .query({label: '1t'})
        .set('csrf-token', process.env.csrfToken || '')
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            Hobby.find({label: '1t'}, (err: Error, hobbies) => {
                assert.lengthOf(hobbies, 1, 'Too many or too few hobbies')
                const database_hobby: Partial<IHobby> = utils.unify_hobby_list(hobbies)[0];
                const response_hobby: Partial<IHobby> = utils.unify_hobby_list(res.body)[0];
                assert.deepEqual(response_hobby, database_hobby, 'Found the wrong hobby');
                done();
            })
        })
    });

    it('should find hobby by label and metroId', (done: Mocha.Done) => {
        utils.agent.get('/hobby/find')
        .query({label: '1t', metroId: '1'})
        .set('csrf-token', process.env.csrfToken || '')
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            Hobby.find({label: '1t', metroId: '1'}, (err: Error, hobbies) => {
                assert.lengthOf(hobbies, 1, 'Too many or too few hobbies')
                const database_hobby: Partial<IHobby> = utils.unify_hobby_list(hobbies)[0];
                const response_hobby: Partial<IHobby> = utils.unify_hobby_list(res.body)[0];
                assert.deepEqual(response_hobby, database_hobby, 'Found the wrong hobby');
                done();
            })
        })
    });
    
});