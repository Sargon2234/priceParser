const http = require('http'),
    express = require('express'),
    config = require('./config'),
    mysql = require('mysql'),
    app = express(),
    routes = require('./routes/routes'),
    cron = require('node-cron'),
    ParseModule = require('./src/ParseModule');

const connection = mysql.createConnection({
  host: config.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.db
});

connection.connect();

routes(app, connection);

const server = http.createServer(app);
const parser = new ParseModule(connection);

server.listen(config.port, config.host, () => {
  console.log('Server running!');

  cron.schedule('* 0/1 * * * *', function () {
    console.log('Started upload new prices.');
    parser.mainFlow().then(res => console.log('Done upload prices', res)).catch(err => console.error(err));
  });
});
