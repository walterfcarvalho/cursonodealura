var mysql  = require('mysql');

    console.log("variavel process.env.NODE_ENV", process.env.NODE_ENV);

function createDBConnection() {
/*    if(process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'cursonode'
        });
    }
*/
// mysql://b3a77af212021b:42310e7e@us-cdbr-iron-east-05.cleardb.net/heroku_87e9a1ece7b4c96?reconnect=true
if (process.env.NODE_ENV == 'production') {
    var url = process.env.CLEARDB_DATABASE_URL;
    var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
    return mysql.createConnection({
        host:grupos[3],
        user:grupos[1],
        password:grupos[2],
        database:grupos[4]
    });
    
    if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'cursonode_test'
        });
    }
}

module.exports = function() {
    return createDBConnection;
}
