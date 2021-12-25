import {TasksStateType} from "../App";
import {v1} from "uuid";

export const TasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: [...state[action.payload.todolistID], {
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }]
            }
        }
        case 'ADD-EMPTY-ARR-OF-TASKS': {
            return {
                ...state,
                [action.payload.id]: state[action.payload.id] = []
            }
        }
        case 'REMOVE-ALL-TASKS': {
            let copyTasks = {...state}
            delete copyTasks[action.payload.todolistID]
            return copyTasks
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(f => f.id === action.payload.id ? {
                    ...f,
                    isDone: action.payload.isDone
                } : f)
            }
        }
        case 'CHANGE-TASK-NAME': {
            return {...state, [action.payload.id]: state[action.payload.id].map(s=> s.id === action.payload.taskID ? {...s, title: action.payload.title} : s)}
        }
        default:
            return state
    }
};

type ActionType =
    removeTaskACType
    | addTaskACType
    | removeArrOfTasksACType
    | changeTaskStatusACType
    | addEmptyArrOfTasksACType
    | changeTaskNameACType

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type removeArrOfTasksACType = ReturnType<typeof removeArrOfTasksAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type addEmptyArrOfTasksACType = ReturnType<typeof addEmptyArrOfTasksAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskNameACType = ReturnType<typeof changeTaskNameAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id,
            todolistID: todolistId
        }
    } as const
}
export const removeArrOfTasksAC = (todolistId: string) => {
    return {
        type: 'REMOVE-ALL-TASKS',
        payload: {
            todolistID: todolistId
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            todolistID: todolistId
        }
    } as const
}
export const addEmptyArrOfTasksAC = (todolistId: string) => {
    return {
        type: 'ADD-EMPTY-ARR-OF-TASKS',
        payload: {
            id: todolistId
        }
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id: id,
            isDone: isDone,
            todolistID: todolistId
        }
    } as const
}
export const changeTaskNameAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-NAME',
        payload: {
            id: todolistID,
            taskID: taskID,
            title: newTitle
        }
    } as const
}