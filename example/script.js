// Selectors
const guestInput = document.querySelector('.guest-input');
const guestText = document.querySelector('.guest-text');
const guestButton = document.querySelector('.guest-button');
const guestContainer = document.querySelector('.guest-container');


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
guestButton.addEventListener('click', addGuest);
guestContainer.addEventListener('click', deleteCheck);


// Functions
/* Date function */

/* https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-3.php */

function date(){
    let today = new Date();

    let dd = today.getDate();
    let m = today.getMonth()+1;
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();
    
    if(dd < 10){
        dd = `0${dd}`;
    }
    if(m < 10){
        m = `0${m}`;
    }
    if(hh < 10){
        hh = `0${hh}`;
    }
    if(mm < 10){
        mm = `0${mm}`;
    }
    if(ss < 10){
        ss = `0${ss}`;
    }
    
    today = `${dd}/${m}/${yyyy} ${hh}-${mm}-${ss}`;

    return today;
}

/*function printTime() {
    const dates = document.querySelectorAll('.guest-date');
    console.log(dates[0].innerText);

    let todos = JSON.parse(localStorage.getItem('todos'));
    let currentTime = Date.now();

    // Create time variables (oneMin, oneHour etc)

    let i = 0;
    todos.forEach(object => {
        if(currentTime - object.id < 60000){
            object.date = 'A few seconds ago';
            dates[i].innerText = object.date;
        } else if(currentTime - object.id > 60000){
            object.date = 'A few minutes ago';
            dates[i].innerText = object.date;
        }   

        i++
    })

    localStorage.setItem('todos', JSON.stringify(todos));
    //getTodos();
} */
/*  */

 
function addGuest(e) {
    // Prevent form from submitting
    e.preventDefault();

/*     if(guestInput.value == "" || guestText.value == "") {
        return;
    } */

    // Todo DIV
    const guestDiv = document.createElement('div');
    guestDiv.classList.add('guest');
    guestDiv.setAttribute('id', Date.now());

    // Create H2 & append to DIV
    const newGuest = document.createElement('h2');
    newGuest.innerText = guestInput.value;
    newGuest.classList.add('guest-heading');
    guestDiv.appendChild(newGuest);

    // Create PARAGRAPH & append to DIV
    const newComment = document.createElement('p');
    newComment.innerText = guestText.value;
    newComment.classList.add('guest-comment');
    guestDiv.appendChild(newComment);

    // Create DATE-paragraph & append to div
    const currentDate = document.createElement('p');
    currentDate.innerText = date();
    currentDate.classList.add('guest-date');
    guestDiv.appendChild(currentDate);

    // Create guest object and ADD TODO TO LOCAL STORAGE
    const guest = {
        name: guestInput.value,
        comment: guestText.value,
        date: date(),
        id: Date.now()
    };

    saveLocalGuests(guest);

    // CHECK TRASH BUTTON & append to DIV
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    guestDiv.appendChild(trashButton);

    //APPEND TO CONTAINER
    guestContainer.appendChild(guestDiv);

    //CLEAR TODO INPUT VALUE
    guestInput.value = "";
    guestText.value = "";

    printTime();
}

function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === 'trash-btn') {
        const post = item.parentElement;
        // Animation
        post.classList.add('fall');

        removeLocalTodos(post);

        post.addEventListener('transitionend', function() {
            post.remove();
        })
    }
}



function saveLocalGuests(guest) {
    //CHECK IF THERE IS ITEMS IN LOCAL STORAGE
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(guest);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function getTodos() {
    //CHECK IF THERE IS ITEMS IN LOCAL STORAGE
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        // Todo DIV
        const guestDiv = document.createElement('div');
        guestDiv.classList.add('guest');
        guestDiv.setAttribute('id', todo.id);

        // Create H2 & append to DIV
        const newGuest = document.createElement('h2');
        newGuest.innerText = todo.name;
        newGuest.classList.add('guest-heading');
        guestDiv.appendChild(newGuest);

        // Create PARAGRAPH & append to DIV
        const newComment = document.createElement('p');
        newComment.innerText = todo.comment;
        newComment.classList.add('guest-comment');
        guestDiv.appendChild(newComment);

        // Create DATE-paragraph & append to div
        const currentDate = document.createElement('p');
        currentDate.innerText = todo.date;
        currentDate.classList.add('guest-date');
        guestDiv.appendChild(currentDate);

        // CHECK TRASH BUTTON & append to DIV
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        guestDiv.appendChild(trashButton);

        //APPEND TO CONTAINER
        guestContainer.appendChild(guestDiv);
    })
}


function removeLocalTodos(post) {
    //CHECK IF THERE IS ITEMS IN LOCAL STORAGE
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const guestId = Number(post.id)
    todos = todos.filter(function(object){
        if(object.id !== guestId){
            return object;
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

