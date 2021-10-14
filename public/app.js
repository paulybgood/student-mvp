let userInput = '';
const results = $('#results');
let tasksContainer = '';
let userID = '';

//==================== Start of Getting To Do Lists with Pre-existing Username =======================
$('#search-user').click (() => {
    //how to get the text value from the input on button click
    userInput = $('#existing-username').val();
    //using the $.get AJAX method to sent an HTTP request to the toDoList API in order to
    // get the object user info from the users table to grab the user_id for the next request
    $.get(`/api/users/${userInput}`, (userData) => {
        results.empty();
        let username = $(`<div class='username'>${userData.username}'s Lists</div>`)
        userID = userData.id;
        results.append(username);
        //using the user_id from previous GET request to look up all of the to do lists that 
        //the user has and displaying the name
        $.get(`/api/todolist/${userData.id}`, (toDoListData) => {
            for (let i = 0; i < toDoListData.length; i++) {
                // console.log(toDoListData[i].name);
                let toDoLists = $('<div></div>', {
                    class: 'to-do-lists',
                    id: `${toDoListData[i].id}`
                });
                //tasksContainer = $(`<div class='task-container ${toDoListData[i].id}'></div>`);
                let listNames = $(`<div class='list-names'>${toDoListData[i].name}</div>`);
                let viewTasks = $(`<button class='view-tasks' value=${toDoListData[i].id}>See Tasks</button>`);
                let deleteList = $(`<button class='delete-list' value=${toDoListData[i].id}>Delete List</button>`);
                results.append(toDoLists);
                // results.append(tasksContainer);
                toDoLists.append(listNames);
                toDoLists.append(viewTasks);
                toDoLists.append(deleteList);
            }
            let toDoLists = $('<div></div>', {
                class: 'to-do-lists'
            });
            let createListNames = $(`<input type="text" placeholder="Enter New List Name" name="new-list" id="new-list" required>`);
            let createNew = $(`<button class='create-list' value=${userID}>Create</button>`);
            results.append(toDoLists);
            toDoLists.append(createListNames);
            toDoLists.append(createNew);
        });
    });
});
//======================= End of Getting To Do Lists with Pre-existing Username ======================





//======================= Start of Creating and Adding User to Database ==========================
$('#register-user').click (() => {
    let newUser = {"username": $('#new-username').val()};
    console.log(newUser);
    $.ajax({
        url: '/api/users',
        method: 'POST',
        data: JSON.stringify(newUser),
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            results.empty();
            let username = $(`<div class='username'>Username: ${data.username}</div>`)
            let toDoLists = $('<div></div>', {
                class: 'to-do-lists'
            });
            let createListNames = $(`<input type="text" placeholder="Enter New List Name" name="new-list" id="new-list" required>`);
            let createNew = $(`<button class='create-list' value=${data.id}>Create</button>`);
            results.append(username);
            results.append(toDoLists);
            toDoLists.append(createListNames);
            toDoLists.append(createNew);
            
        }
    })
});
//======================= Start of Creating and Adding User to Database ==========================



//======================= Start of Getting Pre-existing Tasks from To Do Lists =================
$('#results').on('click', 'button', (event) => {
    let classIdentifier = event.target.className;
    let toDoListID = Number($(event.target).val());
    // let taskID = Number($(event.target).val());
    // console.log(event.target.className);
    // console.log(Number($(event.target).val()));
    // const myContainer = $(`.${toDoListID}`);
    // console.log(myContainer);
    if (classIdentifier === 'view-tasks') {
        $('.tasks').remove();
        $.get(`/api/tasks/${toDoListID}`, (taskData) => {
            
            for (let i = 0; i < taskData.length; i++) {
                console.log(taskData[i]);
                
                let listTasks = $(`<div class='tasks 300${taskData[i].id}' id=${toDoListID}>${taskData[i].description}</div>`)
                let deleteTask = $(`<button class='delete-task' value=${taskData[i].id}>Delete Task</button>`)
                // myContainer[0].append(listTasks);
                results.append(listTasks);
                listTasks.append(deleteTask);
            }
            let listTasks = $('<div></div>', {
                class: 'tasks'
            });
            let createTaskNames = $(`<input type="text" placeholder="Enter task details" name="new-task" id="new-task" required>`);
            let createNewTaskButton = $(`<button class='create-task' value=${toDoListID}>Create</button>`);
            results.append(listTasks)
            listTasks.append(createTaskNames);
            listTasks.append(createNewTaskButton)

        })
//======================= End of Getting Tasks Pre-existing Tasks from To Do Lists =================        
   
    
//============================== Start of Deleting a To Do List ==============================
    } else if (classIdentifier === "delete-list") {
        $.ajax({
            url: `/api/todolist/${toDoListID}`,
            method: 'DELETE',
            success: function(data) {
                // console.log(data);
                const deleteList = $(`#${toDoListID}`);
                const deleteTasks = $('.tasks');
                deleteList.remove();
                deleteTasks.remove();
            }
        })
    } else if (classIdentifier === "delete-task") {
        let taskID = Number($(event.target).val());
        $.ajax({
            url: `/api/tasks/${taskID}`,
            method: 'DELETE',
            success: function(data) {
                // console.log(data);
                const deleteTask = $(`.300${taskID}`);
                deleteTask.remove();
            }
        })
    } else if (classIdentifier === "create-task") {
        let newTaskData = {
            "description": $('#new-task').val(),
            "todolist_id": toDoListID
        };
        console.log(newTaskData);
        $.ajax({
            url: '/api/tasks',
            method: 'POST',
            data: JSON.stringify(newTaskData),
            contentType: 'application/json',
            success: function(taskData) {
                // console.log(taskData);
                let listTasks = $(`<div class='tasks 300${taskData.id}' id=${toDoListID}>${taskData.description}</div>`)
                let deleteTask = $(`<button class='delete-task' value=${taskData.id}>Delete Task</button>`)
                results.append(listTasks);
                listTasks.append(deleteTask);
                // let username = $(`<div class='username'>Username: ${data.username}</div>`)
                // $('.create').prepend();
            }
        })
    }  else if (classIdentifier === "create-list") {
        let newListData = {
            "name": $('#new-list').val(),
            "user_id": userID
        };
        console.log(newListData);
        $.ajax({
            url: '/api/todolist',
            method: 'POST',
            data: JSON.stringify(newListData),
            contentType: 'application/json',
            success: function(listData) {
                console.log(listData);
                let toDoLists = $('<div></div>', {
                    class: 'to-do-lists',
                    id: `${listData.id}`
                });
                let listNames = $(`<div class='list-names'>${listData.name}</div>`);
                let viewTasks = $(`<button class='view-tasks' value=${listData.id}>See Tasks</button>`);
                let deleteList = $(`<button class='delete-list' value=${listData.id}>Delete List</button>`);
                results.append(toDoLists);
                toDoLists.append(listNames);
                toDoLists.append(viewTasks);
                toDoLists.append(deleteList);
                
            }
        })
    }
})

//============================== End of Deleting a To Do List ==============================






//============================== Start of Creating a New To Do List ==============================
// $('#results').on('click', '#createNew', () => {
//     console.log('hello world');
// });




//============================== End of Creating a New To Do List ==============================



