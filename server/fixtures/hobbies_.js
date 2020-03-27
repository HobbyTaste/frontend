const {MongoClient} = require('mongodb');
const dbHost = require('config').get('dbHost');

getCollection = (name) => {
    const client = new MongoClient(dbHost, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    );
    return client.connect()
        .then(() => client.db().collection(name).find().toArray())
        .then(objectList => client.close()
            .then(() => objectList))
};

module.exports = (collection) => {
    return collection.find().toArray()
        .then(hobbies => getCollection('users')
            .then(userList => Promise.all(hobbies.map(async hobby => {
                const hobbySubscribers = userList.filter(user => hobby.subscribers.includes(user.email));
                const hobbySubscribersId = hobbySubscribers.map(user => user._id);
                return {...hobby, subscribers: hobbySubscribersId};
            }))))
        .then(updatedHobbies => collection.deleteMany()
            .then(() => collection.insertMany(updatedHobbies)))
};