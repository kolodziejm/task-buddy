const input = document.getElementById('task');
const submitBtn = document.getElementById('submit');
const deleteBtn = document.getElementById('delete-btn');
const list = document.querySelector('.list-group');
const priority = document.getElementById('priority');

let tasks;
let priorities;
const priorClasses = [];

function lsCheck() {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    if(localStorage.getItem('priorities') === null) {
        priorities = [];
    } else {
        priorities = JSON.parse(localStorage.getItem('priorities'));
    }
}

function loadItems() {
    lsCheck();

    priorities.forEach((priority) => {
        switch(priority) {
            case 'Najwyższy':
            priority = 'bg-danger text-light';
            break;

            case 'Średni':
            priority = 'bg-warning';
            break;

            case 'Najniższy':
            priority = 'bg-info text-light';
            break;
        }
        priorClasses.push(priority);
    })

    for(let i=0; i < tasks.length; i++) {
        const li = document.createElement('li');
        li.className = `list-group-item ${priorClasses[i]}`;
    
        li.appendChild(document.createTextNode(tasks[i]));
    
        const delIcon = document.createElement('a');
        // delIcon.setAttribute('href', '#');
        delIcon.textContent = 'X';
        delIcon.className = 'float-right delete-link';
    
    
        li.appendChild(delIcon);
    
        list.appendChild(li);
    }
}

function addItem(e) {
    lsCheck();
    if(input.value === '') {
        alert('Wpisz treść zadania');
        return;
    }

    tasks.push(input.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    priorities.push(priority.value);
    localStorage.setItem('priorities', JSON.stringify(priorities));
}

function deleteItems(e) {
    if(list.childElementCount === 0) {
        return;
    }

    if(confirm('Czy chcesz usunąć wszystkie zadania?')){
    list.innerHTML = '';
    localStorage.removeItem('tasks');
    localStorage.removeItem('priorities');
    }

}

function removeFromLS(taskItem) {
    lsCheck();

    tasks.forEach((task, index) => {
        if(taskItem.textContent === `${task}X`) {
            tasks.splice(index, 1);
            priorities.splice(index, 1);
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('priorities', JSON.stringify(priorities));
}

function deleteItem(e) {
    if(e.target.classList.contains('delete-link')) {
        e.target.parentElement.remove();
        removeFromLS(e.target.parentElement)
    }
}

document.addEventListener('DOMContentLoaded', loadItems);
submitBtn.addEventListener('click', addItem);
deleteBtn.addEventListener('click', deleteItems);
list.addEventListener('click', deleteItem);
