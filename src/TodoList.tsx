import React, {ChangeEvent, useState, KeyboardEvent, useMemo} from 'react';
import {FilterValuesType, TasksStateType, TodolistType} from './App';
import EditableSpan from "./components/EditableSpan";
import classes from './components/AddItemFormStyle.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, ButtonGroup, Checkbox, Grid, IconButton, TextField, Typography} from "@mui/material";
import AddItemForm from "./components/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store";
import {changeTodolistNameAC, removeTodolistAC, todolistFilterAC} from "./reducers/TodolistsReducer";
import {addTaskAC, changeTaskNameAC, changeTaskStatusAC, removeTaskAC} from "./reducers/TasksReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    tl: TodolistType
}

export const Todolist: React.FC<PropsType> = ({tl}) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    let tasks = useSelector<RootReducerType, TasksStateType>(state => state.tasks)
    // let todolists = useSelector<RootReducerType, Array<TodolistType>>(state => state.todolist)

    let dispatch = useDispatch()

    const removeTask = (taskId: string) => {
        dispatch(removeTaskAC(taskId, tl.id))
    };

    const changeTaskStatus = (id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(id, isDone, tl.id))
    };
    const changeTaskName = (taskID: string, newTitle: string) => {
        dispatch(changeTaskNameAC(tl.id, taskID, newTitle))
    }

    const addTask = (title1: string) => {
        let newTitle = title1.trim();
        if (newTitle !== "") {
            dispatch(addTaskAC(newTitle, tl.id))
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const changeTodolistNameCallback = (newItemTitle: string) => {
        dispatch(changeTodolistNameAC(tl.id, newItemTitle))
    }

    const removeTodolist = () => dispatch(removeTodolistAC(tl.id))

    const onAllClickHandler = () => dispatch(todolistFilterAC("all", tl.id))
    const onActiveClickHandler = () => dispatch(todolistFilterAC("active", tl.id))
    const onCompletedClickHandler = () => dispatch(todolistFilterAC("completed", tl.id))

    const onChangeTitleHandler = (newItemTitle: string, itemID: string) => changeTaskName(itemID, newItemTitle)

    let tasksForTodolist = tasks[tl.id];

    if (tl.filter === "active") {
        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
    }
    if (tl.filter === "completed") {
        tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
    }
    console.log(tl.id)

    return <div>
        <h3><EditableSpan title={tl.title} changeTitle={changeTodolistNameCallback}/>
            <IconButton onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} addLabel={'Task name'}/>
        <div className={classes.AddFormStyle}>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox size={'small'}
                                  onChange={() => changeTaskStatus(t.id, !t.isDone)}
                                  checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={(title) => onChangeTitleHandler(title, t.id)}/>

                        <IconButton onClick={() => removeTask(t.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <ButtonGroup size={'small'} color={"primary"}>
                <Button className={tl.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button className={tl.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button className={tl.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}



