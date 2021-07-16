module.exports = {
    development: {
        port: process.env.PORT || 3333,
        privateKey: process.env.PRIVATE_KEY,
        //TODO add your Database url
        databaseUrl: "mongodb+srv://user:softuni-password@softuni.l24ab.mongodb.net/redactor?retryWrites=true&w=majority",

    },
    production: {}
}