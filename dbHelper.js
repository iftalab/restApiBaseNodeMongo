exports.dbConnection = function () {
    var mysql = require('mysql');

    var fs = require('fs');
    const config = JSON.parse(fs.readFileSync("dbConfig.json"));
    global.host = config.host;  //global variable(overwritten)
    global.port = config.port;  //global variable(overwritten)
    var connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        multipleStatements: config.multipleStatements
    });

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    return connection;
}
exports.makeMongoDBConnection = function(){
    var mongoose = require('mongoose');
    var fs = require('fs');
    const config = JSON.parse(fs.readFileSync("dbConfig.json"));
    mongoose.connect(
        "mongodb+srv://"+config.mongoUser+":"+config.mongoPass
        + "@icluster-txko2.mongodb.net/test?retryWrites=true")
        .then()
        .catch();
}