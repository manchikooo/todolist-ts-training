import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'graphQL', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    const removeTask = (taskID: string) => {
        let filteredTasks = tasks.filter(t => t.id !== taskID)
        console.log(tasks)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [...tasks, task]
        setTasks(newTasks)
    }
    const changeStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
