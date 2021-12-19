import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import EditableSpan from "./components/EditableSpan";
import classes from './components/AddFormStyle.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, ButtonGroup, Checkbox, Grid, TextField, Typography} from "@mui/material";

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

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addTask(newTitle, props.id);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const changeTodolistNameCallback = (newItemTitle: string) => {
        props.changeTodolistName(props.id, newItemTitle)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3><EditableSpan title={props.title} changeTitle={changeTodolistNameCallback}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <div className={classes.AddFormStyle}>
            <TextField size='small' value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onChangeTitleHandler = (newItemTitle: string) => props.changeTaskName(props.id, t.id, newItemTitle)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox size={'small'} onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={onChangeTitleHandler}/>
                        <Grid >
                            <DeleteIcon onClick={onClickHandler}/>
                        </Grid>
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


