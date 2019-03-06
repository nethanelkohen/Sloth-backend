require("dotenv").config();

const CONFIG = {
  development: {
    username: "root",
    password: "password",
    database: "sloth_db",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
    operatorsAliases: false
  },
  test: {
    username: "root",
    password: "password",
    database: "sloth_db",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    operatorsAliases: false
  }
};

CONFIG.app = process.env.APP || "dev";
CONFIG.port = process.env.PORT || "3000";

CONFIG.db_dialect = process.env.DB_DIALECT;
CONFIG.db_host = process.env.DB_HOST;
CONFIG.db_port = process.env.DB_PORT;
CONFIG.db_name = process.env.DB_NAME;
CONFIG.db_user = process.env.DB_USER;
CONFIG.db_password = process.env.DB_PASSWORD;

module.exports = CONFIG;
