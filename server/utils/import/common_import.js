const express = require("express");
const router = express.Router();
const db = require("./../../config/db");

module.exports = { express, router, db };

// to use copy
// const { express, router, db } = require('./utils/import/common_import');
