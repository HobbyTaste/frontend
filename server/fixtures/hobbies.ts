// @ts-ignore
const ObjectId = require("mongodb").ObjectID;

module.exports = [
    {
        _id: ObjectId("5e72c4a7e14c4b7594be81ab"),
        label: "Футбольная секция",
        phone: "89009009191",
        email: "sport-football@test.com",
        address: "1-я Магистральная ул., 12",
        metroStation: "Третьяковская",
        metroId: "136",
        description: "football classes",
        hortDescription: "football",
        imageUrl: null,
        owner: "5e72bc282da6e556bd35041d",
        subscribers: ["5e72c4a7e14c4b7594be81af", "5e72c4a7e14c4b7594be81b0"],
        avatar: null,
        category: "sport",
        __v: 0
    },
    {
        _id: ObjectId("5e72c4a7e14c4b7594be81ac"),
        label: "Уроки фортепиано",
        phone: "88008008181",
        email: "music-piano@test.com",
        address: "Рубцовская наб., 11/2",
        metroStation: "Медведково",
        metroId: "86",
        description: "piano classes",
        shortDescription: "piano",
        imageUrl: null,
        owner: "5e72c4a7e14c4b7594be81ad",
        subscribers: ["5e72c4a7e14c4b7594be81b0", "5e72c4a7e14c4b7594be81b1"],
        avatar: null,
        category: "music",
        __v: 0
    }
];