--Inserts info into users table
INSERT INTO users(username) VALUES('paulybgood');
INSERT INTO users(username) VALUES('ep.bialas');

--Inserts info into todolist table
INSERT INTO todolist(name, user_id) VALUES('Student MVP', 1);
INSERT INTO todolist(name, user_id) VALUES('Grocery List', 1);
INSERT INTO todolist(name, user_id) VALUES('House Chores', 2);

--Inserts info into tasks table
INSERT INTO tasks(description, todolist_id) VALUES('Create the basic HTML', 1);
INSERT INTO tasks(description, todolist_id) VALUES('Create the the serverside code to handle HTTP requests', 1);
INSERT INTO tasks(description, todolist_id) VALUES('Milk', 3);
INSERT INTO tasks(description, todolist_id) VALUES('Bread', 3);
INSERT INTO tasks(description, todolist_id) VALUES('Cheese', 3);
INSERT INTO tasks(description, todolist_id) VALUES('Do the laundry', 2);