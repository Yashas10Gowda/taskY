import './style.css'
import { panelTemplate, modalTemplate, getLiTaskTemplate } from './templates';
import { Task } from './interfaces';


let pendingTasks:Task[] = [
    {
        id:1,
        title:'Hello',
        description: 'YG',
        datetime: new Date()
    }
];
let completedTasks:Task[] = [
    {
        id:1,
        title:'World',
        description: 'YG',
        datetime: new Date()
    }
];

const renderTasks = (tasks:Task[], completed:boolean):void => {

    const taskOl = document.getElementById('tasks')! as HTMLDivElement;

    taskOl.innerHTML = '';

    if (tasks.length == 0)
        taskOl.innerHTML = '<div class="tile-subtitle text-center text-gray"><br>No tasks yet!</div>';
    else
        tasks.forEach((task) => {
            taskOl.innerHTML += getLiTaskTemplate({
                id:task.id,
                title: task.title,
                description: task.description,
                datetime: task.datetime
            }, completed);
        });    
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
        renderTasks(pendingTasks, false);
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

const handleTab = (event:Event):void => {
    const pTabItem = document.getElementById('ptabitem')! as HTMLLIElement;
    const cTabItem = document.getElementById('ctabitem')! as HTMLLIElement;

    if (event.target instanceof Element) { 
        if(event.target.id == 'pending'){
            pTabItem.classList.add('active');
            cTabItem.classList.remove('active');
            renderTasks(pendingTasks,false);
        }
        else{
            pTabItem.classList.remove('active');
            cTabItem.classList.add('active');
            renderTasks(completedTasks,true);  
        }
    }
}

const start = () => {
    const modalTrigger = document.getElementById('modal-trigger')! as HTMLButtonElement;
    modalTrigger.addEventListener('click', handleModal);
    const tab = document.getElementById('tab')! as HTMLUListElement;
    tab.addEventListener('click', handleTab)
    renderTasks(pendingTasks, false);
}

const isTemplateAdded = new Promise((resolve,_)=>{
    const app = document.querySelector('#app')! as HTMLDivElement;
    app.innerHTML = panelTemplate + modalTemplate;
    resolve('yes');
})

isTemplateAdded.then((value)=>{
    value == 'yes' ? start() : alert('There was an error');
})