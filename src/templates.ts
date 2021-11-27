import { Task } from "./interfaces";

export const panelTemplate = `
<div class="panel">
<div class="panel-header text-center">
  <div class="s-rounded bg-primary d-inline-block"><i class="icon icon-4x icon-check"></i></div>
  <div class="panel-title h5 mt-10 text-primary">taskY</div>
  <div class="panel-subtitle text-gray">Your todo list made simple.</div>
</div>
<nav class="panel-nav">
  <ul id="tab" class="tab tab-block">
    <li id="ptabitem" class="tab-item text-gray active"><a id="pending" class="liChild" href="#">Pending</a></li>
    <li id="ctabitem" class="tab-item text-gray"><a id="completed" class="liChild" href="#">Completed</a></li>
  </ul>
</nav>
<div style="height: 50vh;overflow-y: auto;overflow-x: hidden;" id="tasks" class="panel-body">
</div>
<div class="panel-footer">
  <button class="btn btn-primary btn-block" id="modal-trigger">Add Task</button>
</div>
</div>
`;

export const modalTemplate =  `
<div class="modal" id="modal"><a class="modal-overlay" href="#modals-sizes"
    aria-label="Close"></a>
  <div class="modal-container" role="document">
    <div class="modal-header"><a class="btn btn-clear float-right" id="modal-close" href="#modals-sizes" aria-label="Close"></a>
      <div class="modal-title h5 text-primary">Add Task</div>
    </div>
    <div class="modal-body">
      <div class="content">
        <form id="form">
          <div class="form-group">
            <input required class="form-input text-primary" id="title" name="title" type="text" placeholder="New Task">
          </div>
          <div class="form-group">
            <textarea class="form-input text-primary" id="description" placeholder="Description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label text-gray" for="datetime">Set date and time:</label>
            <input required type="datetime-local" class="form-input text-primary" id="datetime" name="datetime">
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <button type="submit" form="form" class="btn btn-primary btn-block">Add</button>
    </div>
  </div>
</div>
`;

export const getLiTaskTemplate = (taskObject: Task, completed:boolean ) : string => {
  return `
      <br>
      <div class="tile tile-centered">
        <div class="tile-content">  
          <div ${ completed ? 'style="text-decoration: line-through;"' : '' } class="tile-title text-large text-primary bg-secondary d-inline-block">${taskObject.title}</div>
          <div class="tile-subtitle text-small text-gray">${taskObject.description}</div>
          <div class="tile-subtitle text-tiny text-primary d-inline-block">
            ${ completed ? 'Completed On:' : '' } ${taskObject.datetime.toLocaleDateString() + ' ' + taskObject.datetime.toLocaleTimeString()}
          </div>
        </div>
        <div class="tile-action">
          ${!completed ? `<button id="${taskObject.id}" class="btn btn-link btn-action btn-lg"><i class="icon icon-check"></i></button>`:''}
          <button id="${taskObject.id}" class="btn btn-link btn-action btn-lg"><i class="icon icon-delete"></i></button>
        </div>
      </div>
      <div class="divider"></div>
    `;
};