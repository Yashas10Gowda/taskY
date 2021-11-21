import './style.css'
import { panelTemplate, modalTemplate } from './templates'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = panelTemplate + modalTemplate;
