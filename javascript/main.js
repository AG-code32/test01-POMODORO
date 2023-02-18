const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');

console.log(itTask.value);


form.addEventListener('submit', e => {
    e.preventDefault();
    if (itTask.value !== '') {
        createTask(itTask.value);
        itTask.value = '';
        renderTasks();
    }
});

function createTask (value) {
    const newTask = {
        // id: parseInt(Math.random() * 100),
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false
    };

    console.log(newTask);

    tasks.unshift(newTask);

    console.log(tasks);

}

function renderTasks() {
    const html = tasks.map(task => {
        return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Done</span>`:`<button class="start-button" data-id="${task.id}"></button>`}</div>
                <div class="title">${task.title}</div>
            </div>
        `;
    });
    console.log(html);

}
