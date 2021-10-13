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
                // console.log(toDoListData[i].name);
                let toDoLists = $('<div></div>', {
                    class: 'to-do-lists',
                    id: `${toDoListData[i].id}`
                });
                let listNames = $(`<div class='list-names'>${toDoListData[i].name}</div>`);
                let viewTasks = $(`<button class='view-tasks' value=${toDoListData[i].id}>See Tasks</button>`);
                results.append(toDoLists);
                toDoLists.append(listNames);
                toDoLists.append(viewTasks);
                $.get(`/api/tasks/${toDoListData[i].id}`, (tasksData) => {
                    console.log(tasksData);
                    for (let j = 0; j < tasksData.length; j++) {
                        let listTasks = $(`<div class='tasks'>${tasksData.description}`)
                    }
                })
            }
            let toDoLists = $('<div></div>', {
                class: 'to-do-lists'
            });
            let listNames = $(`<div class='list-names'>**Create New To Do List**</div>`);
            let createNew = $(`<button id='create'>Create</button>`);
            results.append(toDoLists);
            toDoLists.append(listNames);
            toDoLists.append(createNew);
        });
    });
});
//======================= End of Getting To Do Lists with Pre-existing Username ======================
// $('#register-user').click (() => {
//     userInput = $('#new-username').val();

//     console.log(userInput);
//     $.post('/api/users', {'username': userInput}, (data, status) => {
//         console.log(data);
//         results.empty();
//         let username = $(`<div class='username'>Username: ${data.username}</div>`)
//         results.append(username);
//     });
// });


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
            results.append(username);
        }
    })
});


//======================= Start of Creating and Adding User to Database ==========================


//======================= Start of Creating and Adding User to Database ==========================



//======================= Start of Getting Pre-existing Tasks from To Do Lists =================
$('#results').on('click', 'button', (event) => {
    console.log(Number($(event.target).val()));
})


//======================= End of Getting Tasks Pre-existing Tasks from To Do Lists =================





//============================== Start of Creating a New To Do List ==============================
// $('#results').on('click', '#createNew', () => {
//     console.log('hello world');
// });




//============================== End of Creating a New To Do List ==============================