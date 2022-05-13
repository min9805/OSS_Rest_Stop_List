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

var authUser = function(id, password, callback) {
    console.log('authUser 호출');

    pool.getConnection(function(err, conn) {
        if(err){
            if(conn){
                conn.release();
            }

            callback(err, null);
            return;
        }
        
        var colums = ['name', 'id'];
        var tablename = 'users';

        var exec = conn.query("select ?? from ?? where id = ? and password = ?",
            [colums, tablename, id, password], function(err, rows) {
                conn.release();
                
                if(rows.length >0){
                    console.log('Id [%s], password [$s] 일치하는 사용자 찾음', id, password);
                    callback(null, rows);
                } else {
                    console.log('일치하는 사용자 없음');
                    callback(null, null);
                }
            }
        );
    })
}

module.exports.pool = pool;
module.exports.authUser = authUser;
module.exports.adduser = adduser;
//module.exports.listuser = listuser;
