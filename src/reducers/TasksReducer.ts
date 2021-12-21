import {TasksStateType} from "../App";
import {v1} from "uuid";

export const TasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    // if (action.type ==='REMOVE-TASK' ) {
    //     return {
    //         ...state,
    //         [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.id !== action.payload.id)
    //     }
    // } else if (action.type ==='ADD-TASK' ) {
    //     return {
    //         ...state,
    //         [action.payload.todolistID]: [...state[action.payload.todolistID], {
    //             id: v1(),
    //             title: action.payload.title,
    //             isDone: false
    //         }]
    //     }
    // } else if (action.type ==='REMOVE-ALL-TASKS') {
    //     let copyTasks = {...state}
    //     delete copyTasks[action.payload.todolistID]
    //     return copyTasks
    // } else if (action.type ==='CHANGE-TASK-STATUS')  {
    //     return {
    //         ...state,
    //         [action.payload.todolistID]: state[action.payload.todolistID].find(f => {
    //             if (f && f.id === action.payload.id) {
    //                  f.isDone = action.payload.isDone
    //                 else return f
    //             }
    //         })
    //     }
    // }


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
export type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id,
            todolistID: todolistId
        }
    } as const
}

export type removeArrOfTasksACType = ReturnType<typeof removeArrOfTasksAC>

export const removeArrOfTasksAC = (todolistId: string) => {
    return {
        type: 'REMOVE-ALL-TASKS',
        payload: {
            todolistID: todolistId
        }
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            todolistID: todolistId
        }
    } as const
}

export type addEmptyArrOfTasksACType = ReturnType<typeof addEmptyArrOfTasksAC>

export const addEmptyArrOfTasksAC = (todolistId: string) => {
    return {
        type: 'ADD-EMPTY-ARR-OF-TASKS',
        payload: {
            id: todolistId
        }
    } as const
}

export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

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