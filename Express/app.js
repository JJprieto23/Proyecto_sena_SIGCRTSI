const express = require("express");
const mysql = require("mysql2");
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

db.connect( (error) => {
    if(error){
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

app.listen(5001,() => {
    console.log("Server on port 5001");
})

app.use(cors());