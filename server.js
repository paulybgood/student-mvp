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


//=============================== Start of GET Request for All Users ===============================
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
//=============================== End of GET Request for All Users ===============================





//=============================== Start of GET Request for Users by Username ===============================
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
//=============================== End of GET Request for Users by Username ===============================





//============================ Start of GET Request for To-Do Lists by User ID ===========================
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
//============================ End of GET Request for To-Do Lists by User ID =============================





//============================ Start of GET Request for Tasks by To-Do List ID ===========================
app.get("/api/tasks/:todolist_id", (req, res) => {
    const toDoListID = req.params.todolist_id;
    pool.query("SELECT * FROM tasks WHERE todolist_id = $1", [toDoListID], (err, result) => {
        if (err) {

        } else if (result === undefined) {

        } else {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(result.rows);
        }
    })
})
//============================ End of GET Request for Tasks by To-Do List ID ===========================





//========================== Start of POST Request for a new User =============================
app.post("/api/users", (req, res) => {
    const username = req.body.username;
    console.log(req.body);
    pool.query(
            "INSERT INTO users(username) VALUES($1) RETURNING *", [username], (err, result) => {
                res.status(201);
                res.setHeader('Content-Type', 'application/json');
                res.json(result.rows[0]);
            }
    );
});


//========================== Start of POST Request for a new User =============================





//===================== Start of POST Request for a new To Do List ======================
app.post("/api/todolist", (req, res) => {
    const listName = req.body.name;
    const userID = req.body.user_id;
    console.log(req.body);
    pool.query(
            "INSERT INTO todolist(name, user_id) VALUES($1, $2) RETURNING *", [listName, userID], (err, result) => {
                res.status(201);
                res.setHeader('Content-Type', 'application/json');
                res.json(result.rows[0]);
            }
    );
});
//======================= End of POST Request for a new To Do List ======================





//======================= Start of POST Request for a new task ===========================
app.post("/api/tasks", (req, res) => {
    const taskDescription = req.body.description;
    const toDoListID = req.body.todolist_id
    console.log(toDoListID)
    console.log(req.body);
    pool.query(
            "INSERT INTO tasks(description, todolist_id) VALUES($1, $2) RETURNING *", [taskDescription, toDoListID], (err, result) => {
                res.status(201);
                res.setHeader('Content-Type', 'application/json');
                res.json(result.rows[0]);
            }
    );
});
//======================== End of POST Request for a new task ============================





//===================== Start of DELETE Request for To Do List ======================
app.delete('/api/todolist/:id', (req,res) => {
    const toDoListID = req.params.id;
    pool.query('DELETE FROM todolist WHERE id = $1 RETURNING *', [toDoListID], (err, result) => {
        if(err || result.rowCount === 0) {
            res.status(400)
                .setHeader("Content-Type", "text/plain")
                .end("Could not delete. No to-do-lists exist with that ID");
        } else {
            res.json(result.rows[0]);
        }
    });
});
//======================= End of DELETE Request for To Do List ======================





//======================= Start of DELETE Request for a task ============================
app.delete('/api/tasks/:id', (req,res) => {
    const taskID = req.params.id;
    pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskID], (err, result) => {
        if(err || result.rowCount === 0) {
            res.status(400)
                .setHeader("Content-Type", "text/plain")
                .end("Could not delete. No to-do-lists exist with that ID");
        } else {
            res.json(result.rows[0]);
        }
    });
});
//======================== End of DELETE Request for a new task ==========================


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
});