import { useState } from 'react'
import './App.css'

function Title() {
  return <h1>ToDo list</h1>
}

function Header(props) {
  return (
    <div className="input-block">
      <div className="input-wrapper">
        <input 
          placeholder='Введите задачу' 
          className="input" 
          onChange={(event) => props.onChangeInput(event.target.value)}></input>
      </div>
      <div className="button-wrapper">
        <button className="button" onClick={props.data}>Add task</button>
      </div>
    </div>
  )
}

function Task(props) {
  return (
    <div className="output-block">

      <div className={props.completed2 ? "output-item checked" : "output-item"}>
        <div className="description">{props.output}</div>
        <div className="buttons">
          <input 
            id={props.id2}
            className="btn-complete" 
            onClick={props.changeCheckbox} 
            type= 'checkbox'/>
          <button className="btn-delete" id={props.id2} onClick={props.changeDelete}>Delete</button>
        </div>
      </div>
   
    </div>
  )
}

function List(props) {
  const arr = props.tasks;
  return (
    <div>
        {arr.map((el) => 
         <Task
            key={el.id}
            output={el.taskName}
            completed2={el.completed}
            changeCheckbox={props.changeCheckbox}
            id2={el.id}
            changeDelete={props.changeDelete}
          />
        )}
    </div>
  ) 
}



function App() {
  const [taskText, setTaskText] = useState('');
  const [listTasks, setListTasks] = useState([]);

  function handleChange(text) {
    setTaskText(text);
  }

  function handleTask() {
    const obj = {
      taskName: taskText,
      completed: false,
      id: Date.now(),
    }
    setListTasks(listTasks.concat(obj));
  }

  function handleCheckbox(event) {
    const taskId = Number(event.target.id);
    const listTaskesCompleted = listTasks.map((el) => el.id === taskId ? {
                                                                            taskName: el.taskName,
                                                                            completed: !el.completed,
                                                                            id: el.id,
                                                                          } : el); 
    // setListTasks(listTaskesCompleted);
    filterTasks(listTaskesCompleted);
  }

  function handleCheckboxDelete(event) {
    const taskId = Number(event.target.id);
    const listTaskesDelete = listTasks.filter((el) => el.id !== taskId);
    setListTasks(listTaskesDelete);
  }

  function filterTasks(tasks) {
    const openTasks = tasks.filter((el) => el.completed === true);
    const closeTask = tasks.filter((el) => !el.completed);
    setListTasks([...closeTask, ...openTasks]); 
  }

  return (
    <div className="todo-wrapper">
      <Title/>
      <Header onChangeInput={handleChange} data={handleTask}/>
      <h2>Tasks for the day</h2>
      {/* <Task output={taskText}/> */}
      <List tasks={listTasks} changeCheckbox={handleCheckbox} changeDelete={handleCheckboxDelete}/>
    </div>
  )
}



export default App
