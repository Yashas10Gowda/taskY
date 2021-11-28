import './style.css'
import { panelTemplate, modalTemplate, getLiTaskTemplate } from './templates';
import { Task } from './interfaces';
import localforage from 'localforage'

let pendingTasks: Task[] = [];
let completedTasks: Task[] = [];

const updateLocalForage = (): void => {
    localforage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localforage.setItem('completedTasks', JSON.stringify(completedTasks));
}

const addListeners = (completed: boolean): void => {

    if (!completed) {

        const doneButtons = document.querySelectorAll('.done')! as NodeList;
        const deleteButtons = document.querySelectorAll('.delete')! as NodeList;

        doneButtons.forEach(doneButton => {
            doneButton.addEventListener('click', (event) => {
                const buttonId = Number((event.target as HTMLButtonElement).id);
                const clickedPendingTask = pendingTasks.find(task => task.id === buttonId) as Task;
                const dt = new Date()
                clickedPendingTask.datetime = (dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString());
                completedTasks.push(clickedPendingTask);
                pendingTasks = pendingTasks.filter(task => task.id !== buttonId);
                renderTasks(false);
            })
        })

        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', (event) => {
                const buttonId = Number((event.target as HTMLButtonElement).id);
                pendingTasks = pendingTasks.filter(task => task.id !== buttonId);
                renderTasks(false);
            })
        })
    }
    else {
        const deleteButtons = document.querySelectorAll('.cdelete')! as NodeList;

        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', (event) => {
                const buttonId = Number((event.target as HTMLButtonElement).id);
                completedTasks = completedTasks.filter(task => task.id !== buttonId);
                renderTasks(true);
            })
        })
    }

}

const renderTasks = (completed: boolean): void => {
    const taskOl = document.getElementById('tasks')! as HTMLDivElement;
    taskOl.innerHTML = '';
    const tasks = completed ? completedTasks : pendingTasks;
    updateLocalForage();

    if (tasks.length == 0)
        taskOl.innerHTML = '<div class="tile-subtitle text-center text-gray"><br>No tasks yet!</div>';
    else {
        tasks.forEach((task) => {
            taskOl.innerHTML += getLiTaskTemplate({
                id: task.id,
                title: task.title,
                description: task.description,
                datetime: task.datetime
            }, completed);
        });
        addListeners(completed);
    }
}

const handleModal = (): void => {
    const modal = document.getElementById('modal')! as HTMLDivElement;
    const modalClose = document.getElementById('modal-close')! as HTMLAnchorElement;
    const form = document.getElementById('form')! as HTMLFormElement
    const title = document.getElementById('title')! as HTMLInputElement;
    const description = document.getElementById('description')! as HTMLTextAreaElement;
    const datetime = document.getElementById('datetime')! as HTMLInputElement;

    modal.classList.add('active');
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        const dt = new Date(datetime.value);
        pendingTasks.push({
            id: Date.now() + Math.random(),
            title: title.value,
            description: description.value,
            datetime: (dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString())
        })
        renderTasks(false);
        modal.classList.remove('active');
        // The following lines remove all eventListeners
        form.outerHTML = form.outerHTML;
        modalClose.outerHTML = modalClose.outerHTML;
    })

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        // The following lines remove all eventListeners
        form.outerHTML = form.outerHTML;
        modalClose.outerHTML = modalClose.outerHTML;
    })

    // This is to update the tab if the user adds a task when completed(tab-item) is active
    const tab = document.getElementById('pending')! as HTMLAnchorElement;
    tab.click();
}

const handleTab = (event: Event): void => {
    const pTabItem = document.getElementById('ptabitem')! as HTMLLIElement;
    const cTabItem = document.getElementById('ctabitem')! as HTMLLIElement;

    if (event.target instanceof Element) {
        if (event.target.id == 'pending') {
            pTabItem.classList.add('active');
            cTabItem.classList.remove('active');
            renderTasks(false);
        }
        else {
            pTabItem.classList.remove('active');
            cTabItem.classList.add('active');
            renderTasks(true);
        }
    }
}

const start = () => {
    const modalTrigger = document.getElementById('modal-trigger')! as HTMLButtonElement;
    const tab = document.getElementById('tab')! as HTMLUListElement;
    modalTrigger.addEventListener('click', handleModal);
    tab.addEventListener('click', handleTab)
    renderTasks(false);
}

const isTemplateAddedAndGotLocalForage = new Promise((resolve, _) => {
    const app = document.querySelector('#app')! as HTMLDivElement;
    app.innerHTML = panelTemplate + modalTemplate;

    localforage.getItem('pendingTasks').then(valuep => {
        pendingTasks = JSON.parse(valuep as string);
        localforage.getItem('completedTasks').then(valuec => {
            completedTasks = JSON.parse(valuec as string);
            resolve('yes');
        });
    });
})

isTemplateAddedAndGotLocalForage.then((value) => {
    value == 'yes' ? start() : alert('There was an error');
})