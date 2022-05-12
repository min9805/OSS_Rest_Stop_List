const mysql = require('mysql')

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  port: 3306,
  database: "rest_stop"
})

var adduser = function(name, id, password, callback) {
    console.log('addUser');

    pool.getConnection(function(err, conn) {
        if(err){
            if(conn){
                conn.release();
            }

            callback(err, null);
            return;
        }

        var data = {name:name, id:id, password:password};

        var exec = conn.query('insert into users set ?', data, function(err, result) {
            conn.release();
            
            if(err){
                console.log('SQL 실행 시 오류 발생');
                console.dir(err);

                callback(err,null);
            
                return;
            }

            callback(null, result);
        })
    })
}

module.exports.pool = pool;
//module.exports.login = login;
module.exports.adduser = adduser;
//module.exports.listuser = listuser;
