import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./components/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";
import {changeTaskNameAC, changeTaskStatusAC, removeTaskAC} from "./reducers/TasksReducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    todolistID: string
}

export const Task = React.memo(({todolistID, task}: TaskPropsType) => {

    console.log('Task')

    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(taskId, todolistID))
    }, [todolistID, dispatch])
    const changeTaskStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let isDone = event.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, isDone, todolistID))
    }, [task.id, todolistID, dispatch])
    // const changeTaskName = useCallback((taskID: string, newTitle: string) => {
    //     dispatch(changeTaskNameAC(todolistID, taskID, newTitle))
    // }, [todolistID, dispatch])
    const onChangeTitleHandler = useCallback((newItemTitle: string) => dispatch(changeTaskNameAC(todolistID, task.id, newItemTitle)), [dispatch, task.id, todolistID])


    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox size={'small'}
                      onChange={changeTaskStatus}
                      checked={task.isDone}/>
            <EditableSpan title={task.title} changeTitle={onChangeTitleHandler}/>

            <IconButton onClick={() => removeTask(task.id)}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})


