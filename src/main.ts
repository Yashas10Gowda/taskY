import './style.css'
import { panelTemplate, modalTemplate, getLiTaskTemplate } from './templates';
import { Task } from './interfaces';


let pendingTasks:Task[] = [
    {
        id: 1,
        title: "Hello World",
        description: "It is great to win. It is great to win.",
        datetime: new Date() 
    },
    {
        id: 2,
        title: "My name is Gowda, Yashas Gowda.",
        description: '',
        datetime: new Date() 
    }
];

const renderPendingTasks = (taskOl:HTMLDivElement):void => {
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

    modal.classList.add('active');

    modalClose.addEventListener('click', ()=>{
        modal.classList.remove('active');
        modalClose.removeEventListener('click',()=>{});
    })
}

const start = () => {
    const taskOl = document.getElementById('tasks')! as HTMLDivElement;
    const modalTrigger = document.getElementById('modal-trigger')! as HTMLButtonElement;

    modalTrigger.addEventListener('click',handleModal);
    renderPendingTasks(taskOl);
}

const isTemplateAdded = new Promise((resolve,_)=>{
    const app = document.querySelector('#app')! as HTMLDivElement;
    app.innerHTML = panelTemplate + modalTemplate;
    resolve('yes');
})

isTemplateAdded.then((value)=>{
    value == 'yes' ? start() : alert('There was an error');
})