import {useState} from 'react';
import './ToDo.css';

function ToDo(props){
    const tasks = new Map([
	[1, {"id": 1, "desc": "Task 1", done: false}],
	[2, {"id": 2, "desc": "Task 2", done: false}]
    ]);

    const [nextTaskId, setNextTaskId] = useState(3);
    const [todos, setToDos] = useState(tasks);

    function onTaskStatusChange(taskId, event){
	let updatedTask = todos.get(taskId);
	updatedTask.done = event.target.checked;
	todos.set(taskId, updatedTask);
	const newTodos = new Map();
	todos.forEach((val, key) => {
	    newTodos.set(key, val);
	});
	setToDos(todos => newTodos);
    }

    function addNewTask(event) {

	if(event.target.value === ""){
	    event.target.placeholder = "Please enter new task here then press Enter..";
	    return false;
	}

	if (event.key === "Enter") {
	    const newTask = {
		"id": nextTaskId,
		"desc": event.target.value,
		"done": false
	    };
	    todos.set(nextTaskId, newTask);
	    const newTodos = new Map();
	    todos.forEach((val, key) => {
		newTodos.set(key, val);
	    });
	    setToDos(todos => newTodos);
	    setNextTaskId(nextTaskId => nextTaskId + 1);
	    event.target.value = "";
	}
    }

    function deleteTask(taskId, event) {
	todos.delete(taskId);
	const newTodos = new Map();
	todos.forEach((val, key) => {
	    newTodos.set(key, val);
	});
	setToDos(todos => newTodos);
    }
    
    const TodoItems = 
	Array.from(todos.values()).map(task => {
	    return (
		<div key={task.id} className="taskItem">
		{/* Change task state */}
		<input type="checkbox" className="taskItemCheckbox"
		onClick={e => onTaskStatusChange(task.id, e)}/>
		{/* Display task desc */}
		<p  style={{
		    textDecoration: task.done? 'line-through': ''
		}}>
		{task.desc}
		</p>
		{/* Delete Action */}
		<div className="taskDeleteContainer">
		<input type="button" value="Delete" className="taskItemDelete"
		onClick={event => deleteTask(task.id, event)}
		/>
		</div>
		</div>
	    );
	});
  
    
    return(
	<div className="todoApp">
	<div>
	<p className="appTitle">Todo App</p>
	</div>
	<div className="newTaskDiv">
	<input className="newTaskInp" type="text" onKeyPress={e => addNewTask(e)}
	placeholder="Press enter after new task here....."/>
	</div>
	{TodoItems}
	</div>
    );
}

export default ToDo;
