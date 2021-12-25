import {FilterValuesType, TodolistType} from "../App";

export const TodolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        }
        case 'FILTER-TODOLIST': {
            let todolist = state.find(f => f.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.value
            }
            return [...state]
            //  ВТОРОЙ ВАРИАНТ ТЕРНАРНИКОМ (find работает быстрее)
            // return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.value} : t)
        }
        case 'CHANGE-TODOLIST-NAME': {
            return state.map(s => s.id === action.payload.id ? {...s, title: action.payload.title} : s)
        }
        default:
            return state
    }
};

type ActionType = removeTodolistACType | addTodolistACType | todolistFilterACType | changeTodolistNameACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type todolistFilterACType = ReturnType<typeof todolistFilterAC>
export type changeTodolistNameACType = ReturnType<typeof changeTodolistNameAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: id
        }
    } as const
}
export const addTodolistAC = (id: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            id: id,
            title: title
        }
    } as const
}
export const todolistFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'FILTER-TODOLIST',
        payload: {
            value: value,
            id: todolistId
        }
    } as const
}
export const changeTodolistNameAC = (todolistID: string, newItemTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-NAME',
        payload: {
            id: todolistID,
            title: newItemTitle
        }
    } as const
}