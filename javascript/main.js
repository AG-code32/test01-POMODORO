const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTasks();


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
                <div class="completed">${task.completed ? `<span class="done">Done</span>`:`<button class="start-button" data-id="${task.id}">Start</button>`}</div>
                <div class="title">${task.title}</div>
            </div>
        `;
    });
    // console.log(html);

    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = html.join('');
    console.log(tasksContainer);

    const startButtons = document.querySelectorAll('.task .start-button');
    console.log(startButtons);

    startButtons.forEach(button => {
        button.addEventListener('click', e => {
            if (!timer){
                const id = button.getAttribute('data-id')
                console.log(id);

                startButtonHandler(id);
                button.textContent = 'In progress ...'
            }
        });
    });

}


function startButtonHandler(id){
    time = 5;
    current = id;
    const taskIndex = tasks.findIndex(task => task.id === id);
    console.log(taskIndex);

    taskName.textContent = tasks[taskIndex].title;
    renderTime();
    timer = setInterval(() => {
        timerHandler(id);
    }, 1000);
};

function timerHandler(id){
    time--;
    renderTime();
    if (time === 0) {
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        // current = null;
        // taskName.textContent = '';
        renderTasks();
        startBreak();
    }
};

function startBreak() {
    time = 3;
    taskName.textContent = 'Break';
    renderTime();
    timerBreak = setInterval(() => {
        timerBreakHandler();
    }, 1000);
}

function timerBreakHandler() {
    time--;
    renderTime();
    if (time === 0) {
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = '';
        renderTasks();

    }
}

function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    console.log(timeDiv);

    const minutes = parseInt(time / 60);
    console.log(minutes);

    const seconds = parseInt(time % 60);
    // console.log(seconds);

    timeDiv.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function markCompleted(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = true;
    console.log(tasks[taskIndex]);

}