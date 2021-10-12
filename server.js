require('dotenv').config()
const express = require('express');
const app = express();
// const db = require("./database-setup/db_configuration.js");
const { Pool } = require('pg');
const pool = new Pool({
    database: 'todolist'
});
app.use(express.json());
app.use(express.static('public'));


//=============================== Start of GET Request ==================================
app.get('/api/users', (req, res) => {
    pool.query("SELECT * FROM users", (err, result) => {
        console.log(result);
        // if (result.rows === undefined) {
        //     res.status(404)
        //         .setHeader('Content-Type', 'text/plain')
        //         .end('Owner not found');
        // } else {
            res.send(result.rows);
            return result.rows;
        // }
    });
});


app.get("/api/users/:username", (req, res) => {
    const username = req.params.username;
    pool.query("SELECT * FROM users WHERE username = $1", [username], (err, data) => {
        if (err) {
            res.end("The username is invalid or the username does not exist");
        } else if (data.rowCount === 0) {
            res.status(404);
            res.setHeader('Content-Type', 'text/plain');
            res.end("The username is invalid or does not exist. Please create a username if you haven't already");
        } else {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(data.rows[0]);
        }
    });
});

app.get("/api/todolist/:user_id", (req, res) => {
    const userID = req.params.user_id;
    pool.query("SELECT * FROM todolist WHERE user_id = $1", [userID], (err, result) => {
        if (err) {

        } else if (result === undefined) {

        } else {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(result.rows);
        }
    })
})



//=============================== End of GET Request ====================================





//===================== Start of POST Request for a new To Do List ======================

//======================= End of POST Request for a new To Do List ======================





//======================= Start of POST Request for a new task ===========================

//======================== End of POST Request for a new task ============================





//===================== Start of DELETE Request for To Do List ======================

//======================= End of DELETE Request for To Do List ======================





//======================= Start of DELETE Request for a task ============================

//======================== End of DELETE Request for a new task ==========================


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
});