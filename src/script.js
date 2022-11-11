const Name = document.getElementById('name');
const Hobby = document.getElementById('hobby');
const About = document.getElementById('about');
const Pursuit = document.getElementById('pursuit');

const submit = document.getElementById('submitBtn');
const reset = document.getElementById('resetBtn');

const container = document.getElementById('store'); // a container to store the details inputed

// function to submit the details entered by the user to the container "store"
submit.addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = addItems();
});

// the function the add the items to the display-details container
function addItems() {
    let form;
    form +=
        `<div class="flex justify-evenly">
            <div>${Name.value}</div>
            <div>${Hobby.value}</div>
            <div>${About.value}</div>
            <div>${Pursuit.value}</div>
        </div>
        <div class="flex after_btn justify-evenly">
            <button class="editBtn">edit</button>
            <button class="deleteBtn">delete</button>
        </div>`
    return form;
}