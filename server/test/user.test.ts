import chai from "chai";
import "mocha";
import shell from "shelljs";
import chaiHttp from "chai-http";

import { IHobby } from "../models/hobby";
import { IProvider } from "../models/provider";
import hobbies from "../fixtures/hobbies.json";
import users from "./data/users.json";
import other_data from "./data/other.json";
import User, { IUser } from "../models/user";
import * as utils from "./utils";
import { HTTP_STATUS } from "./utils";

const assert: Chai.AssertStatic = chai.assert;
chai.use(chaiHttp);

describe("Work with user and hobbies", function() {
    this.slow(300);

    before(() => {
        shell.exec("node tasks/fixtures.js >/dev/null");
    });

    it("should create user", async () => {
        await utils.create_user(users[0]);
    });

    it("should logout user", async () => {
        await utils.logout_user();
    });

    it("should create another user", async () => {
        await utils.create_user(users[1]);
    });

    it("should logout from another user", async () => {
        await utils.logout_user();
    });

    it("should login user", async () => {
        await utils.login_user(users[0].email, users[0].password);
    });

    it("should get info about current (logged in) user", async () => {
        const res: ChaiHttp.Response = await utils.agent
            .get("/user/info")
            .set("csrf-token", process.env.csrfToken || "");

        assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
        const { id, ...response_user } = res.body;
        const { password, hobbies, ...rest_data_user } = users[0];
        assert.deepEqual<Partial<IUser>>(rest_data_user, response_user, "Wrong info about current (logged in) user");
    });

    it("should get info about other (not logged in) user", async () => {
        const user = await User.findOne({ email: users[1].email });
        if (!user) {
            assert.fail("Desired user was not found");
        }
        const res: ChaiHttp.Response = await utils.agent
            .get("/user/info")
            .query({ id: user._id.toHexString() })
            .set("csrf-token", process.env.csrfToken || "");

        assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
        const { id, ...response_user } = res.body;
        const { password, hobbies, ...rest_data_another_user } = users[1];
        assert.deepEqual<Partial<IProvider>>(response_user, rest_data_another_user, "Wrong info about other user");
    });

    it("should not get info about user due to incorrect id", async () => {
        const res: ChaiHttp.Response = await utils.agent
            .get("/user/info")
            .set("csrf-token", process.env.csrfToken || "")
            .query({ id: other_data.wrong_hex_string });

        assert.equal(res.status, HTTP_STATUS.NOT_FOUND, "Status code is not 404, found something wrong");
        assert.include(res.text, "Не найден такой пользователь");
    });

    it("should edit user data", async () => {
        const res: ChaiHttp.Response = await utils.agent
            .post("/user/edit")
            .set("csrf-token", process.env.csrfToken || "")
            .send(other_data.user_update);

        assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
        const user = await User.findOne({ email: other_data.user_update.email });
        if (!user) {
            assert.fail("User with updated email was not found in database");
        }
        const rest_props = {
            email: user.email,
            name: user.name,
        };
        assert.deepEqual<Partial<IUser>>(
            rest_props,
            { email: other_data.user_update.email, name: users[0].name },
            "Information was not updated correctly"
        );
    });

    it("should subscribe user to hobbies", async () => {
        await Promise.all([
            utils.create_subscriber(hobbies[0]),
            utils.create_subscriber(hobbies[2]),
            utils.create_subscriber(hobbies[5]),
        ]);
        const user = await User.findOne({ email: other_data.user_update.email });
        const user_id = user?._id.toHexString();
        await Promise.all([
            utils.create_subscribe_checker(hobbies[0], user_id),
            utils.create_subscribe_checker(hobbies[2], user_id),
            utils.create_subscribe_checker(hobbies[5], user_id),
        ]);
    });

    it("should not subscribe to hobby due to incorrect id", async () => {
        const res: ChaiHttp.Response = await utils.agent
            .get("/user/subscribe")
            .query({ id: other_data.wrong_hex_string })
            .set("csrf-token", process.env.csrfToken || "");
        assert.equal(res.status, HTTP_STATUS.NOT_FOUND, "Status code is not 404, found something wrong");
        assert.include(res.text, "Такого хобби не найдено");
    });

    it("should not subscribe to hobby due to id absence", async () => {
        const res: ChaiHttp.Response = await utils.agent
            .get("/user/subscribe")
            .set("csrf-token", process.env.csrfToken || "");

        assert.equal(
            res.status,
            HTTP_STATUS.BAD_REQUEST,
            "Status code is not 400," + "id absence was recognized as correct option"
        );
        assert.include(res.text, "Необходимо указать id хобби для подписки");
    });

    it("should get list of user's hobbies", async () => {
        const res: ChaiHttp.Response = await utils.agent
            .get("/user/hobbies")
            .set("csrf-token", process.env.csrfToken || "");

        assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
        const hobby_ids = res.body.map((hobby: Partial<IHobby>) => {
            return hobby._id;
        });
        const user = await User.findOne({ email: other_data.user_update.email });
        if (!user) {
            assert.fail("User was not found in database");
        }
        const user_hobby_ids = user.hobbies.map((hobby: any) => {
            return hobby.toHexString();
        });
        assert.sameMembers(hobby_ids, user_hobby_ids, "List of hobby ids is not what was expected");
    });
});
