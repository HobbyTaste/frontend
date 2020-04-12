import chai from "chai";
import "mocha";
import chaiHttp from "chai-http";

import server from "../app";
import User, { IUser } from "../models/user";
import Hobby, { IHobby } from "../models/hobby";
import Provider, { IProvider } from "../models/provider";

const assert: Chai.AssertStatic = chai.assert;
chai.use(chaiHttp);

export enum HTTP_STATUS {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    OK = 200,
}

export let agent: ChaiHttp.Agent = chai.request.agent(server);

export async function create_provider(provider: Partial<IProvider>): Promise<void> {
    const res_with_token: ChaiHttp.Response = await agent
        .post("/provider/create")
        .send(provider);
    
    assert.equal(res_with_token.status, HTTP_STATUS.UNAUTHORIZED, "Status code is not 401");
    process.env.csrfToken = res_with_token.header["csrf-token"];
    const res: ChaiHttp.Response = await agent
        .post("/provider/create")
        .set("csrf-token", process.env.csrfToken || "")
        .send(provider)
        
    assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
    const providers = await Provider.find({ phone: provider.phone });
    assert.lengthOf(providers, 1, "Many or no providers, expected 1");
}

export async function logout_provider(): Promise<void> {
    const res: ChaiHttp.Response = await agent
        .get("/provider/logout")
        .set("csrf-token", process.env.csrfToken || "")
    assert.equal(res.status, HTTP_STATUS.OK, "Logout failed");
}

export async function login_provider(email: string | undefined, password: string | undefined): Promise<void> {
    const res: ChaiHttp.Response = await agent
        .post("/provider/login")
        .set("csrf-token", process.env.csrfToken || "")
        .send({ email: email, password: password });
    assert.equal(res.status, HTTP_STATUS.OK, "Email and password checking failed");
}

export async function create_hobby_adder(hobby: Partial<IHobby>): Promise<void> {
    const res: ChaiHttp.Response = await agent
        .post("/hobby/add")
        .set("csrf-token", process.env.csrfToken || "")
        .send(hobby);
    assert.equal(res.status, HTTP_STATUS.OK, "Hobby was not added to database");
    const { owner, ...rest_props } = hobby;
    const hobbies = await Hobby.find(rest_props); 
    assert.lengthOf(hobbies, 1, "Many or no hobbies, expected 1");
}

export function unify_hobby_list(hobby_list: any[]): Partial<IHobby>[] {
    return hobby_list.map(
        (hobby): Partial<IHobby> => {
            return {
                category: hobby.category,
                phone: hobby.phone,
                email: hobby.email,
                metroId: hobby.metroId?.toString(),
                label: hobby.label,
            };
        }
    );
}

export async function filter_test(filter: Partial<IHobby>): Promise<void> {
    const res: ChaiHttp.Response = await agent
        .get("/hobby/filter")
        .query(filter)
        .set("csrf-token", process.env.csrfToken || "");
        
    assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
    const hobbies = await Hobby.find(filter);
    const handled_hobbies: Partial<IHobby>[] = unify_hobby_list(res.body);
    const database_handled_hobbies: Partial<IHobby>[] = unify_hobby_list(hobbies);
    assert.sameDeepMembers<Partial<IHobby>>(
        handled_hobbies,
        database_handled_hobbies,
        "Hobbies are not what was expected"
    );
}

export async function create_user(user: Partial<IUser>): Promise<void> {
    const res_with_token: ChaiHttp.Response = await agent
        .post("/user/create")
        .send(user);
        
    assert.equal(res_with_token.status, HTTP_STATUS.UNAUTHORIZED, "Status code is not 401");
    process.env.csrfToken = res_with_token.header["csrf-token"];
    const res: ChaiHttp.Response = await agent
        .post("/user/create")
        .set("csrf-token", process.env.csrfToken || "")
        .send(user);
        
    assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
    const users = await User.find({ email: user.email });
    assert.lengthOf(users, 1, "Many or no users, expected 1");
}

export async function login_user(email: string | undefined, password: string | undefined): Promise<void> {
    const res: ChaiHttp.Response = await agent
        .post("/user/login")
        .set("csrf-token", process.env.csrfToken || "")
        .send({ email: email, password: password });
    assert.equal(res.status, HTTP_STATUS.OK, "Email and password checking failed");
}

export async function logout_user(): Promise<void> {
    const res: ChaiHttp.Response = await agent
        .get("/user/logout")
        .set("csrf-token", process.env.csrfToken || "");
        
    assert.equal(res.status, HTTP_STATUS.OK, "Logout failed");
}

export async function create_subscriber(hobby: any): Promise<void> {
    const { owner, subscribers, metroStation, ...rest_props } = hobby;
    const database_hobby = await Hobby.findOne(rest_props);
    const res: ChaiHttp.Response = await agent
        .get("/user/subscribe")
        .query({ id: database_hobby?._id.toHexString() })
        .set("csrf-token", process.env.csrfToken || "");
    assert.equal(res.status, HTTP_STATUS.OK, "Status code is not 200");
}

export async function create_subscribe_checker(hobby: any, id: string): Promise<void> {
    const { owner, subscribers, metroStation, ...rest_props } = hobby;
    const database_hobby = await Hobby.findOne(rest_props);
    const subscribers_ids = database_hobby?.subscribers.map((hobby: any) => hobby.toHexString());
    assert.include(subscribers_ids, [id], "Can't see current user as a subsciber");
}
