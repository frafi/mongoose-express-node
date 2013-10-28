
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      service: 'postmark',
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      key: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://readuser:reader1234@SG-mssmongodev02-874.servers.mongodirector.com:27017/dev-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Mongoose Express Node Developer Challenge'
    },
  },
  test: {
    db: 'mongodb://readuser:reader1234@SG-mssmongodev02-874.servers.mongodirector.com:27017/dev-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Mongoose Express Node Developer Challenge'
    },
  },
  production: {}
}
