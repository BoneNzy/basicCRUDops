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
const deleteAllBtn = document.getElementById('deleteAllBtn');

// get the Table body
const tbody = document.getElementById('tableBody');

// create database
let db = userDb("Userdb",{
    users:`++id, name, hobby, about`
});

/* ================Create Button================= */
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

/* ================Read Button================= */
// Read event on click
readBtn.addEventListener('click', createTable);

function createTable() {

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
                    img.id += "editBtn";
                    img.className += "editBtn pointer";
                    img.setAttribute(`data-id`, data.id);
                    img.src += "./src/shared/edit-icon.png";
                });
                createElements("img", td, img => {
                    img.id += "deleteBtn";
                    img.className += "deleteBtn pointer";
                    img.setAttribute(`data-id`, data.id);
                    img.src += "./src/shared/delete-icon.png";
                });
            });
            });
        }

    })
}

/* ================Update Button================= */

// updating the data from the stored in the index database
document.addEventListener('click', (e) => {

    if (e.target.classList.contains("editBtn")) {
        let getId = parseInt(e.target.dataset.id);
        console.log(getId);
        db.users.get(getId, data => {
            console.log(data);
            userId.value = data.id;
            Name.value = data.name;
            Hobby.value = data.hobby;
            About.value = data.about;
        });
    }
})

