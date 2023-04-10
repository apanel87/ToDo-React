import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Title() {
  return <h1>ToDo list</h1>
}

function Header(props) {
  return (
    <div className="input-block">
      <div className="input-wrapper">
        <input placeholder='Введите задачу' className="input" onChange={(event) => props.onChangeInput(event.target.value)}></input>
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
          <input className="btn-complete" onClick={props.changeCheckbox} type={props.completed2 ? 'checkbox checked' : 'checkbox'}/>
          <button className="btn-delete"  onClick="taskDelete(${index})">Delete</button>
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
            changeCheckbox={() => props.changeCheckbox2(el.id)}
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

  function handleCheckbox(id) {
    setListTasks()
  }

  return (
    <div className="todo-wrapper">
      <Title/>
      <Header onChangeInput={handleChange} data={handleTask}/>
      <h2>Tasks for the day</h2>
      {/* <Task output={taskText}/> */}
      <List tasks={listTasks} changeCheckbox2={handleCheckbox}/>
    </div>
  )
}

export default App
