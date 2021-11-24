import './style.css'
import { panelTemplate, modalTemplate, getLiTaskTemplate } from './templates';
import { Task } from './interfaces';


let pendingTasks:Task[] = [];
let completedTasks:Task[] = [];

const renderPendingTasks = ():void => {
    const taskOl = document.getElementById('tasks')! as HTMLDivElement;
    taskOl.innerHTML = '';
    pendingTasks.forEach((task) => {
        taskOl.innerHTML += getLiTaskTemplate({
            id:task.id,
            title: task.title,
            description: task.description,
            datetime: task.datetime
        })
    })
}

const handleModal = ():void => {
    const modal = document.getElementById('modal')! as HTMLDivElement;
    const modalClose = document.getElementById('modal-close')! as HTMLAnchorElement;
    const form = document.getElementById('form')! as HTMLFormElement
    const title = document.getElementById('title')! as HTMLInputElement;
    const description = document.getElementById('description')! as HTMLTextAreaElement;
    const datetime = document.getElementById('datetime')! as HTMLInputElement;

    modal.classList.add('active');
    form.addEventListener('submit',(event:Event)=>{
        event.preventDefault();
        pendingTasks.push({
            id: Date.now() + Math.random(),
            title: title.value,
            description: description.value,
            datetime: new Date(datetime.value)
        })
        renderPendingTasks();
        modal.classList.remove('active');
        // The following lines remove all eventListeners
        form.outerHTML = form.outerHTML;
        modalClose.outerHTML = modalClose.outerHTML;
    })

    modalClose.addEventListener('click', ()=>{
        modal.classList.remove('active');
        // The following lines remove all eventListeners
        form.outerHTML = form.outerHTML;
        modalClose.outerHTML = modalClose.outerHTML;
    })
}

const start = () => {
    const modalTrigger = document.getElementById('modal-trigger')! as HTMLButtonElement;
    modalTrigger.addEventListener('click', handleModal);
    renderPendingTasks();
}

const isTemplateAdded = new Promise((resolve,_)=>{
    const app = document.querySelector('#app')! as HTMLDivElement;
    app.innerHTML = panelTemplate + modalTemplate;
    resolve('yes');
})

isTemplateAdded.then((value)=>{
    value == 'yes' ? start() : alert('There was an error');
})