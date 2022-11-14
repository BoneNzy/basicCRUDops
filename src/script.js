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

/* ===================Buttons=================== */
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

/* =================Create Button Event================= */
// Create and insert the data to the database on click
createBtn.addEventListener('click', (e) => {
    let flag = bulkCreate(db.users, {
        name: Name.value,
        hobby: Hobby.value,
        about: About.value
    })
    // clearing the input area to be able to use again next time without reloading
    Name.value = Hobby.value = About.value = "";

    // Calling the function to get the data from the database
    getData(db.users, (data) => {
        userId.value = data.id + 1 || 1;
        // console.log(data);
    });
});

/* ================Read Button Event================= */
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

/* ===================Edit/Delete Button Event=================== */

// updating the data from the stored in the index database
document.addEventListener('click', (e) => {
    let getId = parseInt(e.target.dataset.id);

    if (e.target.classList.contains("editBtn")) {

        db.users.get(getId, data => {
            userId.value = data.id || 0;
            Name.value = data.name || "";
            Hobby.value = data.hobby || "";
            About.value = data.about || "";
        });
    }

    if (e.target.classList.contains("deleteBtn")) {
        db.users.delete(getId);
        createTable();
    }
})

/* ================Update/DeleteAll Button Event================= */

// Funtionality of the update button
updateBtn.addEventListener('click', () => {
    let updateId = parseInt(userId.value || 0);

    if (updateId) {
        db.users.update(updateId, {
            name:Name.value,
            hobby:Hobby.value,
            about:About.value
        }).then(updated => {
            let displaySuccess = updated ? ('updated successfully') : ('updation was not possible');
            console.log(displaySuccess);
        });

        // clearing the input area to be able to use again next time without reloading
        userId.value = Name.value = Hobby.value = About.value = "";
    }
})

// Delete All the data from the database
deleteAllBtn.addEventListener('click', () => {
    db.delete();

    db = userDb("Userdb",{
        users:`++id, name, hobby, about`
    });

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }

    userId.value = 1;
})