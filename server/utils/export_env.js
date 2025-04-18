require("dotenv").config();

const DOMAIN = process.env.DOMAIN || "http://localhost";
const DOMAIN_PORT = process.env.PORT || 5000;
const DOMAIN_FULL = `${DOMAIN}:${DOMAIN_PORT}`;
const IMAGE_PATH = `${DOMAIN_FULL}/images`
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_DATABASE = process.env.DB_NAME;

module.exports = {
  DOMAIN,
  DOMAIN_PORT,
  DOMAIN_FULL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  IMAGE_PATH,
};
