const bcrypt = require('bcrypt');

module.exports = (collection) => {
    return collection.find().toArray()
        .then(providers => Promise.all(providers.map(async provider => {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(provider.password, salt);
            return {...provider, password: hashPassword}
        })))
        .then(updatedUsers => collection.deleteMany()
            .then(() => collection.insertMany(updatedUsers)))
};
