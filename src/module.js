const userDb = (Dbname, table) => {
    // Create Datatbase
    const db = new Dexie(Dbname);
    db.version(1).stores(table);

    db.open();

    return db;
}
/* =========================== */
// insert the values to the datatbase
const bulkCreate = (dbtable, data) => {
    let flag = empty(data);
    if (flag) {
        dbtable.bulkAdd([data]);
        console.log('Data inserted successfully!');
    } else {
        console.log('Please provide data!');
    }
    return flag;
}
// check input validation
const empty = object => {
    let flag = false;

    for (const value in object) {
        if (object[value] != "" && object.hasOwnProperty(value)) {
            flag = true;
        }else {
            flag = false;
        }
    }
    return flag;
}
/* ============================ */
// function to get the data from the database
const getData = (dbtable, fn) => {
    let index = {};
    let obj = {};

    dbtable.count((count) => {
        if (count) {
            dbtable.each(table => {
                obj = sortData(table);

                fn(obj, index++);
            });
        } else {
            fn(0);
        }
    });
}
// To the sort the object data
const sortData = (sortedObj) => {
    let obj = {};

    obj = {
        id: sortedObj.id,
        name: sortedObj.name,
        hobby: sortedObj.hobby,
        about: sortedObj.about
    }
    return obj;
}
/* ------------------------------- */
// Creating the elements dynamically
const createElements = (tagname, appendto, fn) => {
    const element = document.createElement(tagname);
    // append the element to table body
    if (appendto) {
        appendto.appendChild(element);
        if (fn) {
            fn(element);
        }
        // console.log(element);
    }
}


/* ****************===============================**************** */
// export
export default userDb;
export {
    bulkCreate,
    getData,
    createElements
};