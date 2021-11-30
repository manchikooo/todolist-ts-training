import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TasksType} from "./components/Tasks";
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}


export function TodoList(props: PropsType) {

    let [title, setTitle] = useState('')

    const setAll = () => props.changeFilter('all')
    const setActive = () => props.changeFilter('active')
    const setCompleted = () => props.changeFilter('completed')
    const mappedTasks = props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            debugger
            console.log(e)
            console.log(e.currentTarget.checked)
            props.changeTaskStatus(t.id, newIsDoneValue)
        }
        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type='checkbox' checked={t.isDone} onChange={onChangeHandler}/>
            <span>{t.title}</span>
            <button onClick={removeTaskHandler}>x</button>
        </li>
    })

    let [error, setError] = useState<string>('')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is requied')
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) =>
        e.key === 'Enter' ? addTask() : setError('')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {mappedTasks}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button onClick={setAll} className={props.filter === 'all' ? 'activeButton' : 'unActiveButton'}>All
                </button>
                <button onClick={setActive}
                        className={props.filter === 'active' ? 'activeButton' : 'unActiveButton'}>Active
                </button>
                <button onClick={setCompleted}
                        className={props.filter === 'completed' ? 'activeButton' : 'unActiveButton'}>Completed
                </button>
            </div>
        </div>)
}