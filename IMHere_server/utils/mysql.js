const mysql = require('mysql')

// 配置信息
const mysqlConfig = require('../configs/mysql.js');

// 创建链接池对象
const pool = mysql.createPool(mysqlConfig);


//统一执行sql语句，支持多语句查询，注意参数是二维数组
/*  exec参数示例：
     [
     ["insert into user_group values (?,?)",[11,11]],
     ["insert into user_friend set ? ",{user_id:'12',friend_id:12}],
     'select * from user '
    ]
 
 */
const exec = list => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(list) || !list.length) return reject('it needs a Array with sql')
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            //开启事务
            connection.beginTransaction(err => {
                if (err) return reject(err);
                let rets = [];
                return (function dispatch(i) {
                    let args = list[i];
                    if (!args) { //finally commit
                        connection.commit(err => {
                            if (err) {
                                connection.rollback();
                                connection.release();
                                return reject(err);
                            }
                            connection.release();
                            resolve(rets);
                        });
                    } else {
                        args = typeof args == 'string' ? [args] : args;
                        connection.query(...args, (error, ret) => {
                            if (error) {
                                connection.rollback();
                                connection.release();
                                return reject(error);
                            }
                            rets.push(ret);
                            dispatch(i + 1);
                        });
                    }
                })(0);
            });
        });
    })
}

module.exports = exec