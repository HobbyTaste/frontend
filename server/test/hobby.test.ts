import chai from "chai";
import "mocha";
import chaiHttp from "chai-http";
import shell from "shelljs";

import Hobby, { IHobby } from "../models/hobby";
import hobbies from "../fixtures/hobbies.json";
import other_data from "./data/other.json";
import * as utils from "./utils";
import { HTTP_STATUS } from "./utils";

const assert: Chai.AssertStatic = chai.assert;
chai.use(chaiHttp);

describe("Work with hobbies", function() {
    this.slow(300);

    before(() => {
        shell.exec("node tasks/fixtures.js >/dev/null");
    });

    it("should get a list of all hobbies", async () => {
        const res: ChaiHttp.Response = await utils.agent
            .get("/hobby/all")
            .set("csrf-token", process.env.csrfToken || "");
        assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
        assert.lengthOf(res.body, hobbies.length, "The number of hobbies is too big or too small, not right");
        const database_hobbies: IHobby[] = await Hobby.find({});
        const handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(res.body);
        const database_handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(database_hobbies);
        assert.sameDeepMembers<Partial<IHobby>>(
            handled_hobbies,
            database_handled_hobbies,
            "Hobbies are not what was expected"
        );
    });

    it("should filter hobbies by category", async () => {
        await utils.filter_test({ category: "sport" });
    });

    it("should filter hobbies by metroId", async () => {
        await utils.filter_test({ metroId: "136" });
    });

    it("should get information about hobby by id", async () => {
        const { owner, subscribers, metroStation, ...rest_props } = hobbies[0];
        const chosen_hobby: IHobby | null = await Hobby.findOne(rest_props);
        if (!chosen_hobby) {
            assert.fail("Hobby id was not found in database");
        }
        const res: ChaiHttp.Response = await utils.agent
            .get("/hobby/info")
            .query({ id: chosen_hobby?._id.toHexString() })
            .set("csrf-token", process.env.csrfToken || "");

        assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
        const response_hobby: Partial<IHobby> = utils.unify_hobby_list([res.body])[0];
        const database_hobby: Partial<IHobby> = utils.unify_hobby_list([chosen_hobby])[0];
        assert.deepEqual(response_hobby, database_hobby, "Hobby is not what was expected");
    });

    it("should update information about hobby by id", async () => {
        let { owner, subscribers, metroStation, ...rest_hobby_props } = hobbies[2];
        let hobby: IHobby | null = await Hobby.findOne(rest_hobby_props);
        const res_with_token: ChaiHttp.Response = await utils.agent
            .post("/hobby/edit")
            .query({ id: hobby?._id.toHexString() })
            .set("csrf-token", process.env.csrfToken || "")
            .send(other_data.hobby_update);

        assert.equal(res_with_token.status, HTTP_STATUS.UNAUTHORIZED, "Status code is not 401");
        process.env.csrfToken = res_with_token.header["csrf-token"];
        const res: ChaiHttp.Response = await utils.agent
            .post("/hobby/edit")
            .query({ id: hobby?._id.toHexString() })
            .set("csrf-token", process.env.csrfToken || "")
            .send(other_data.hobby_update);

        let { phone, ...truncated_hobby } = rest_hobby_props;
        hobby = await Hobby.findOne(truncated_hobby);
        assert.equal(other_data.hobby_update.phone, hobby?.phone);
    });

    it("should find hobby by label", async () => {
        const res: ChaiHttp.Response = await utils.agent
            .get("/hobby/find")
            .query({ label: "футбол" })
            .set("csrf-token", process.env.csrfToken || "");

        assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
        const database_hobbies = utils.unify_hobby_list([
            hobbies[0],
            { ...hobbies[2], phone: other_data.hobby_update.phone },
        ]);
        const response_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(res.body);
        assert.sameDeepMembers<Partial<IHobby>>(response_hobbies, database_hobbies, "Found wrong hobbies");
    });

    it("should find hobby by label and metroId", async () => {
        const res: ChaiHttp.Response = await utils.agent
            .get("/hobby/find")
            .query({ label: "футбол", metroId: "136" })
            .set("csrf-token", process.env.csrfToken || "");

        assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
        const database_hobbies: Partial<IHobby>[] = utils.unify_hobby_list([hobbies[0]]);
        const response_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(res.body);
        assert.deepEqual<Partial<IHobby>>(response_hobbies, database_hobbies, "Found wrong hobbies");
    });
});
