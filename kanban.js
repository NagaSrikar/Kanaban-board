// DECLARING VAIRALBLES...........  //
const board = document.querySelectorAll('.board');
const task = document.querySelectorAll('.task');
const btn = document.querySelectorAll(".btn");
const add = document.querySelectorAll(".add");
const plus = document.getElementById('plus');
const append = document.getElementById('append');
const progress = document.getElementById('progress');
const depend = document.getElementById('depend');
const com = document.getElementById('com');
const independent = document.getElementById('independent');
const todoCount = document.getElementById("todo-count");
const ProgressCount = document.getElementById("in-progress-count");
const CompletedCount = document.getElementById("completed-count");
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const title = document.querySelectorAll('.dark');
const enable = document.getElementById('enable');
const main = document.getElementById('title');
// ****************************************  //


// DARK MODE AND CUSTOM BACKGROUND FUNCTIONALITY ***** //
enable.addEventListener('click', () => {
    const body = document.body;
    if (enable.innerText == 'DarkMode') {
        body.style.backgroundColor = ' #1f1f1f';
        enable.innerText = 'LightMode';
        main.style.color = 'white';
        board.forEach(board => {
            board.style.backgroundColor = '#707070';

        })
        title.forEach(title => {
            title.style.color = 'white';
        })
    }
    else {
        body.style.backgroundColor = '#f8f8f8';
        enable.innerText = 'DarkMode';
        main.style.color = 'black';
        board.forEach(board => {
            board.style.backgroundColor = '#ffffff';

        })
        title.forEach(title => {
            title.style.color = 'black';
        })
    }

})
one.addEventListener('click', (e) => {
    const board = document.querySelectorAll('.board');
    board.forEach(board => {
        board.style.backgroundColor = 'yellow';
    });
    title.forEach(title => {
        title.style.color = 'black';
    })
})
two.addEventListener('click', (e) => {
    const board = document.querySelectorAll('.board');
    board.forEach(board => {
        board.style.backgroundColor = 'red';
    });
    title.forEach(title => {
        title.style.color = 'black';
    })
})
three.addEventListener('click', (e) => {
    const board = document.querySelectorAll('.board');
    board.forEach(board => {
        board.style.backgroundColor = 'green';
    });
    title.forEach(title => {
        title.style.color = 'black';
    })
})
four.addEventListener('click', (e) => {
    const board = document.querySelectorAll('.board');
    board.forEach(board => {
        board.style.backgroundColor = 'pink';

    });
    title.forEach(title => {
        title.style.color = 'black';
    })
})
// **********************************  //

// FUNCTION TO CALCULATE NO OF TASKS //
function CalculateTaskLenght() {
    todoCount.innerText = append.querySelectorAll('.task').length;
    ProgressCount.innerText = depend.querySelectorAll('.task').length;
    CompletedCount.innerText = independent.querySelectorAll('.task').length;
}
//********************************//


// LOCAL STORAGE *******//
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || { todo: [], inProgress: [], completed: [] };
    tasks.todo.forEach(task => createTask(task, append));
    tasks.inProgress.forEach(task => createTask(task, depend));
    tasks.completed.forEach(task => createTask(task, independent));
}
function saveTasks() {
    const tasks = {
        todo: Array.from(append.querySelectorAll('.task')).map(task => task.innerText.split(' ')[0]),
        inProgress: Array.from(depend.querySelectorAll('.task')).map(task => task.innerText.split(' ')[0]),
        completed: Array.from(independent.querySelectorAll('.task')).map(task => task.innerText.split(' ')[0]),
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//****************** */


// CREATING TASK ***********/
function createTask(text, board) {
    const p = document.createElement("p");
    p.setAttribute('draggable', 'true');
    p.classList.add('task');
    p.innerHTML = `${text} <span class="btn">&#10006;</span>`;
    board.appendChild(p);

    p.addEventListener('dragstart', () => {
        p.classList.add("is-dragging");
    });
    p.addEventListener('dragend', () => {
        p.classList.remove("is-dragging");
        saveTasks();
        CalculateTaskLenght()
    });

    p.querySelector('.btn').addEventListener('click', (e) => {
        e.target.parentElement.remove();
        saveTasks();
        CalculateTaskLenght()
    });
}
/******************************* */


// ADDING DROP AND DRAG FUNCTIONALITY
board.forEach(board => {
    board.addEventListener('dragover', (e) => {
        e.preventDefault();
        const task = document.querySelector(".is-dragging");
        if (task) {
            board.appendChild(task);
        }
    });
    board.addEventListener('drop', (e) => {
        saveTasks();
        CalculateTaskLenght()
    });
});
/************************************** */


// ADDING TASKS TO BOARDS
plus.addEventListener('click', (e) => {
    const inputField = append.querySelector('input.add');
    const text = inputField.value;
    if (text.trim() !== "") {
        const p = document.createElement("p");
        p.setAttribute('draggable', 'true');
        p.classList.add('task');
        p.innerHTML = `${text} <span class="btn">&#10006;</span>`;
        append.appendChild(p);
        inputField.value = "";
        saveTasks();
        CalculateTaskLenght()
        p.addEventListener('dragstart', () => {
            p.classList.add("is-dragging");
        });
        p.addEventListener('dragend', () => {
            p.classList.remove("is-dragging");
        });


        p.querySelector('.btn').addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
});

progress.addEventListener('click', (e) => {
    const inputField = depend.querySelector('input.add');
    const text = inputField.value;
    if (text.trim() !== "") {
        const p = document.createElement("p");
        p.setAttribute('draggable', 'true');
        p.classList.add('task');
        p.innerHTML = `${text} <span class="btn">&#10006;</span>`;
        depend.appendChild(p);
        inputField.value = "";
        saveTasks();
        CalculateTaskLenght()

        p.addEventListener('dragstart', () => {
            p.classList.add("is-dragging");
        });
        p.addEventListener('dragend', () => {
            p.classList.remove("is-dragging");
        });


        p.querySelector('.btn').addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
});

com.addEventListener('click', (e) => {
    const inputField = independent.querySelector('input.add');
    const text = inputField.value;
    if (text.trim() !== "") {
        const p = document.createElement("p");
        p.setAttribute('draggable', 'true');
        p.classList.add('task');
        p.innerHTML = `${text} <span class="btn">&#10006;</span>`;
        independent.appendChild(p);
        inputField.value = "";
        saveTasks();
        CalculateTaskLenght()
        p.addEventListener('dragstart', () => {
            p.classList.add("is-dragging");
        });
        p.addEventListener('dragend', () => {
            p.classList.remove("is-dragging");
        });


        p.querySelector('.btn').addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
});

/***************************** */
loadTasks();
// ENTER KEY FROM KEY BOARD**
document.querySelectorAll('input.add').forEach(input => {
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const text = input.value;
            if (text.trim() !== "") {
                if (input.closest('#append')) {
                    createTask(text, append); // Add to "Todo"
                } else if (input.closest('#depend')) {
                    createTask(text, depend); // Add to "In Progress"
                } else if (input.closest('#independent')) {
                    createTask(text, independent); // Add to "Completed"
                }
                input.value = ""; // Clear the input field
                saveTasks();
                CalculateTaskLenght()
            }
        }
    });
})

/****************************** */