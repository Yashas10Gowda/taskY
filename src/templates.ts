import { Task } from "./interfaces";

export const panelTemplate = `
<div class="panel">
<div class="panel-header text-center">
  <div class="s-rounded bg-primary d-inline-block"><i class="icon icon-4x icon-check"></i></div>
  <div class="panel-title h5 mt-10 text-primary">taskY</div>
  <div class="panel-subtitle text-gray">Your todo list made simple.</div>
</div>
<nav class="panel-nav">
  <ul class="tab tab-block">
    <li class="tab-item text-gray active"><a href="#panels">Pending</a></li>
    <li class="tab-item text-gray"><a href="#panels">Completed</a></li>
  </ul>
</nav>
<div id="tasks" class="panel-body"><br> 
</div>
<div class="panel-footer">
  <button class="btn btn-primary btn-block" id="modal-trigger">Add Task</button>
</div>
</div>
`;

export const modalTemplate =  `
<div class="modal" id="example-modal-2"><a class="modal-overlay" href="#modals-sizes"
    aria-label="Close"></a>
  <div class="modal-container" role="document">
    <div class="modal-header"><a class="btn btn-clear float-right" href="#modals-sizes" aria-label="Close"></a>
      <div class="modal-title h5 text-primary">Add Task</div>
    </div>
    <div class="modal-body">
      <div class="content">
        <form>
          <div class="form-group">
            <input class="form-input text-primary" id="title" name="title" type="text" placeholder="New Task">
          </div>
          <div class="form-group">
            <textarea class="form-input text-primary" id="input-example-3" placeholder="Description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label text-gray" for="time">Set date and time:</label>
            <input type="datetime-local" class="form-input text-primary" id="time" name="time">
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary btn-block">Add</button>
    </div>
  </div>
</div>
`;

export const getLiTaskTemplate = (taskObject: Task ) : string => {
  return `
<div class="tile tile-centered">
  <div class="tile-content">
    <div class="tile-title text-large text-primary">${taskObject.title}
    <span class="text-tiny text-normal float-right text-primary bg-secondary mx-2">${taskObject.datetime.toLocaleString()}</span>
    </div>
    <div class="tile-subtitle text-gray">
      <span class="text-ellipsis text-small float-left text-gray">${taskObject.description}</span>
    </div>
  </div>
  <div class="tile-action">
    <button id="${taskObject.id}" class="btn btn-link btn-action btn-lg"><i class="icon icon-delete"></i></button>
    <button id="${taskObject.id}" class="btn btn-link btn-action btn-lg"><i class="icon icon-check"></i></button>
  </div>
</div>
<div class="divider"></div>
  `;
};