var connect = require('connect');
/**
 * morgan-the previous logger.
 * 		  now become individual.
 */
var morgan = require('morgan');
/**
 * 	dev  普通日志格式
 */
var logger = morgan('dev');
/**
 * 程序开始
 */
var app = connect()
    .use(logger)
    .use(function (req, res) {
        res.end('hello world\n');
    })
    .listen(3000);

