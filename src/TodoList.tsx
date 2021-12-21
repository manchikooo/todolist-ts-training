import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import EditableSpan from "./components/EditableSpan";
import classes from './components/AddFormStyle.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, ButtonGroup, Checkbox, Grid, IconButton, TextField, Typography} from "@mui/material";
import AddItemForm from "./components/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskName: (todolistID: string, taskID: string, newTitle: string) => void
    changeTodolistName: (todolistID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = (title1: string) => {
        let newTitle = title1.trim();
        if (newTitle !== "") {
            props.addTask(newTitle, props.id);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const changeTodolistNameCallback = (newItemTitle: string) => {
        props.changeTodolistName(props.id, newItemTitle)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onChangeTitleHandler = (newItemTitle: string, itemID: string) => props.changeTaskName(props.id, itemID, newItemTitle)

    return <div>
        <h3><EditableSpan title={props.title} changeTitle={changeTodolistNameCallback}/>
            <IconButton >
                <DeleteIcon onClick={removeTodolist}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} addLabel={'Task name'}/>
        <div className={classes.AddFormStyle}>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    // const onChangeTitleHandler = (newItemTitle: string, itemID: string) => props.changeTaskName(props.id, itemID, newItemTitle)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox size={'small'} onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={(title) => onChangeTitleHandler(title, t.id)}/>
                        <IconButton >
                            <DeleteIcon onClick={onClickHandler}/>
                        </IconButton>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <ButtonGroup size={'small'} color={"primary"}>
                <Button className={props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}


