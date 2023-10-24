import BoardView from '../view/board-view.js';
import TaskListView from '../view/task-list-view.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import {render, unrender} from '../src/render.js';
import { generateTask } from '../model/task.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  taskListComponent = new TaskListView();

  init = (boardContainer, tasksModel) => {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
    this.boardTasks = [...this.tasksModel.getTasks()];

    render(this.boardComponent, this.boardContainer);
    render(this.taskListComponent, this.boardComponent.getElement());

    for (let i = 1; i < this.boardTasks.length; i++) {
      render(new TaskView(this.boardTasks[i]), this.taskListComponent.getElement());
    }

    render(new LoadMoreButtonView(), this.boardComponent.getElement());
  };

  newTask = () => {
    this.tasksModel.addTask(generateTask());
    render(new TaskEditView(this.boardTasks[this.boardTasks.length], this.submitHandler, this.deleteHandler), this.taskListComponent.getElement());
  };

  deleteHandler = (target) => {
    this.tasksModel.removeTask(this.boardTasks.indexOf(target));
    console.log(target);
    unrender(target);
  }

  submitHandler = (target) => {
    unrender(target)
    render(new TaskView(this.boardTasks.indexOf(target)), this.taskListComponent.getElement());
  }
}