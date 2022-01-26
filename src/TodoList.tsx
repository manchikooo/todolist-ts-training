import React, {useCallback, useState} from 'react';
import {TodolistType} from './App';
import EditableSpan from "./components/EditableSpan";
import classes from './components/AddItemFormStyle.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store";
import {addTaskAC} from "./reducers/TasksReducer";
import {changeTodolistNameAC, removeTodolistAC, todolistFilterAC} from "./reducers/TodolistsReducer";
import {AddItemForm} from "./components/AddItemForm";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    tl: TodolistType
}

export const Todolist = React.memo((props: PropsType) => {

    // console.log('todolist')

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    let tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[props.tl.id])

    let dispatch = useDispatch()

    // const removeTask = (taskId: string) => {
    //     dispatch(removeTaskAC(taskId, props.tl.id))
    // };
    // const changeTaskStatus = (id: string, isDone: boolean) => {
    //     dispatch(changeTaskStatusAC(id, isDone, props.tl.id))
    // };
    // const changeTaskName = (taskID: string, newTitle: string) => {
    //     dispatch(changeTaskNameAC(props.tl.id, taskID, newTitle))
    // }

    const addTask = useCallback(function (title: string) {
        let newTitle = title.trim();
        if (newTitle !== "") {
            dispatch(addTaskAC(newTitle, props.tl.id))
            setTitle("");
        } else {
            setError("Title is required");
        }
    }, [dispatch, props.tl.id])

    const changeTodolistNameCallback = (newItemTitle: string) => {
        dispatch(changeTodolistNameAC(props.tl.id, newItemTitle))
    }

    const removeTodolist = () => dispatch(removeTodolistAC(props.tl.id))

    const onAllClickHandler = useCallback(() => dispatch(todolistFilterAC("all", props.tl.id)), [dispatch, props.tl.id])
    const onActiveClickHandler = useCallback(() => dispatch(todolistFilterAC("active", props.tl.id)), [dispatch, props.tl.id])
    const onCompletedClickHandler = useCallback(() => dispatch(todolistFilterAC("completed", props.tl.id)), [dispatch, props.tl.id])

    // const onChangeTitleHandler = (newItemTitle: string, itemID: string) => changeTaskName(itemID, newItemTitle)

    let tasksForTodolist = tasks;

    if (props.tl.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (props.tl.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    const filterButtonsStyle = tasks.length === 0 ? classes.filterButtonsBlock : ''

    return <div>
        <h3><EditableSpan title={props.tl.title} changeTitle={changeTodolistNameCallback}/>
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
                    return <Task key={t.id} task={t} todolistID={props.tl.id}/>
                })
            }
        </ul>
        <div>
            <ButtonGroup className={filterButtonsStyle} size={'small'}
                         color={"primary"}>
                <Button className={props.tl.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button className={props.tl.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button className={props.tl.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
})



