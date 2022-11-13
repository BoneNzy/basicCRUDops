// import the indexedDB api
import userDb, {
    bulkCreate,
    getData,
    createElements
} from "./module.js";

// input tags
const userId = document.getElementById('userId')
const Name = document.getElementById('name');
const Hobby = document.getElementById('hobby');
const About = document.getElementById('about');

// Buttons
const createBtn = document.getElementById('createBtn');
const readBtn = document.getElementById('readBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');

// create database
let db = userDb("Userdb",{
    users:`++id, name, hobby, about`
});

// Create and insert the data to the database on click
createBtn.addEventListener('click', (e) => {
    let flag = bulkCreate(db.users, {
        name: Name.value,
        hobby: Hobby.value,
        about: About.value
    })
    // inserting the value given by user
    Name.value = Hobby.value = About.value = "";

    // Calling the function to get the data from the database
    getData(db.users, (data) => {
        userId.value = data.id + 1 || 1;
        // console.log(data);
    });
});

// Read event on click
readBtn.addEventListener('click', createTable);

function createTable() {
    const tbody = document.getElementById('tableBody');

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }

    // get the data from the database to read the data
    getData(db.users, (data) => {
        // console.log(data);
        if(data) {
            createElements("tr" ,tbody, tr => {
                // console.log(tr)
                for (const value in data) {
                    createElements("td", tr, td => {
                        td.textContent = data[value];
                    })
                }
            createElements("td",tr,td => {
                createElements("img", td, img => {
                    img.className += "editBtn pointer";
                    img.src += "./src/shared/edit-icon.png";
                });
                createElements("img", td, img => {
                    img.className += "deleteBtn pointer";
                    img.src += "./src/shared/delete-icon.png";
                });
            });
            });
        }
    })

}