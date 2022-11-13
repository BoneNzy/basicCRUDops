
const userDb = (Dbname, table) => {
    // Create Datatbase
    const db = new Dexie(Dbname);
    db.version(1).stores(table);

    db.open();

    return db;
}

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

// export
export default userDb;
export {bulkCreate};