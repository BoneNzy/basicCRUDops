// import the indexedDB api
import userDb, {bulkCreate} from "./module.js";
// import {massCreate} from "./module.js";

// input tags
const Name = document.getElementById('name');
const Hobby = document.getElementById('hobby');
const About = document.getElementById('about');

// Buttons
const createBtn = document.getElementById('createBtn');
const resetBtn = document.getElementById('resetBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');

// create database
let db = userDb("Userdb",{
    users:`++id, name, hobby, about`
});

// const container = document.getElementById('store'); // a container to store the details inputed

// // function to submit the details entered by the user to the container "store"
createBtn.addEventListener('click', (e) => {
    let flag = bulkCreate(db.users, {
        name: Name.value,
        hobby: Hobby.value,
        about: About.value
    })
    console.log(flag);
});

// // the function the add the items to the display-details container
// function addItems() {

// }