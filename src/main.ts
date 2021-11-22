import './style.css'
import { panelTemplate, modalTemplate, getLiTaskTemplate } from './templates';
import { Task } from './interfaces';

let pendingTasks:Task[] = [
    {
        id: 1,
        title: "Hello World",
        description: "It is great to win.",
        datetime: new Date() 
    },
    {
        id: 2,
        title: "Hello World",
        description: '',
        datetime: new Date() 
    }
];

const start = () => {
    const taskOl = document.getElementById('tasks')! as HTMLDivElement;
    pendingTasks.forEach((task) => {
        taskOl.innerHTML += getLiTaskTemplate({
            id:task.id,
            title: task.title,
            description: task.description,
            datetime: task.datetime
        })
    })
}

const isTemplateAdded = new Promise((resolve,_)=>{
    const app = document.querySelector('#app')! as HTMLDivElement;
    app.innerHTML = panelTemplate + modalTemplate;
    resolve('yes');
})

isTemplateAdded.then((value)=>{
    value == 'yes' ? start() : alert('There was an error');
})