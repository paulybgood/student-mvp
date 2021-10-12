let userInput = '';
const results = $('#results');


//==================== Start of Getting To Do Lists with Pre-existing Username =======================
$('#search-user').click (() => {
    //how to get the text value from the input on button click
    userInput = $('#existing-username').val();
    //using the $.get AJAX method to sent an HTTP request to the toDoList API in order to
    // get the object user info from the users table to grab the user_id for the next request
    $.get(`/api/users/${userInput}`, (userData) => {
        results.empty();
        let username = $(`<div class='username'>Username: ${userData.username}</div>`)
        results.append(username);
        //using the user_id from previous GET request to look up all of the to do lists that 
        //the user has and displaying the name
        $.get(`/api/todolist/${userData.id}`, (toDoListData) => {
            for (let i = 0; i < toDoListData.length; i++) {
                console.log(toDoListData[i].name);
                let toDoLists = $('<div></div>', {
                    class: 'to-do-lists'
                });
                let listNames = $(`<div class='list-names'>${toDoListData[i].name}</div>`);
                let viewTasks = $(`<button class='view-tasks'>See Tasks</button>`);
                results.append(toDoLists);
                toDoLists.append(listNames);
                toDoLists.append(viewTasks);

            }
            let toDoLists = $('<div></div>', {
                class: 'to-do-lists'
            });
            let listNames = $(`<div class='list-names'>**Create New To Do List**</div>`);
            let viewTasks = $(`<button class='view-tasks'>Create</button>`);
            results.append(toDoLists);
            toDoLists.append(listNames);
            toDoLists.append(viewTasks);
        });
    });
});
//======================= End of Getting To Do Lists with Pre-existing Username ======================





//======================= Start of Getting Tasks Pre-existing Tasks from To Do Lists =================



//======================= End of Getting Tasks Pre-existing Tasks from To Do Lists =================