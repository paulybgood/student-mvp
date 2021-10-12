DROP TABLE IF EXISTS users, todolist, tasks;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT
);

CREATE TABLE todolist (
    id SERIAL PRIMARY KEY,
    name TEXT,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description TEXT,
    todolist_id INTEGER REFERENCES todolist (id) ON DELETE CASCADE
);

