import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, todolistId1, todolistId2} from "./TodolistsReducer";

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACT", isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true},
        {id: v1(), title: "Native JS", isDone: false}
    ]
}

export const TasksReducer = (state = initialState, action: ActionType): TasksStateType => {
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
                [action.payload.todolistID]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistID]]
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyTasks = {...state}
            delete copyTasks[action.payload.todolistId]
            return copyTasks
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(f => f.id === action.payload.taskId ? {
                    ...f,
                    isDone: action.payload.isDone
                } : f)
            }
        }
        case 'CHANGE-TASK-NAME': {
            return {
                ...state,
                [action.payload.id]: state[action.payload.id].map(s => s.id === action.payload.taskID ? {
                    ...s,
                    title: action.payload.title
                } : s)
            }
        }
        default:
            return state
    }
};

type ActionType =
    removeTaskACType
    | addTaskACType
    | removeTodolistACType
    | changeTaskStatusACType
    | addTodolistACType
    | changeTaskNameACType

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
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

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            todolistID: todolistId
        }
    } as const
}
// export const addEmptyArrOfTasksAC = (todolistId: string) => {
//     return {
//         type: 'ADD-TODOLIST',
//         payload: {
//             id: todolistId
//         }
//     } as const
// }
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId: taskID,
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