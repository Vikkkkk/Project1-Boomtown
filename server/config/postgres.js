const { Pool } = require('pg');

module.exports = app => {
  app.get('PG_HOST');
  app.get('PG_USER');
  app.get('PG_PASSWORD');
  app.get('PG_DB');

  return new Pool({
    host: app.get('PG_HOST'),
    user: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });
};
