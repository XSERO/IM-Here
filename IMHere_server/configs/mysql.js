// mysql配置
const MYSQL_CONF = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'imhere',
    charset: 'utf8mb4', //utf8mb4才能保存emoji
    multipleStatements: true, // 可同时查询多条语句
    connectionLimit: 100 //连接数量
}
module.exports = MYSQL_CONF