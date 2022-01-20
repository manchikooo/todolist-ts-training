import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistType> = [
]

export const TodolistsReducer = (state = initialState , action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}]
        }
        case 'FILTER-TODOLIST': {
            // let todolist = state.find(f => f.id === action.payload.todolistId)
            // if (todolist) {
            //     todolist.filter = action.payload.value
            // }
            // return [...state]
            //  ВТОРОЙ ВАРИАНТ ТЕРНАРНИКОМ (find работает быстрее)
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.value} : t)
        }
        case 'CHANGE-TODOLIST-NAME': {
            return state.map(s => s.id === action.payload.todolistId ? {...s, title: action.payload.title} : s)
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

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId
        }
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            title: title
        }
    } as const
}
export const todolistFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'FILTER-TODOLIST',
        payload: {
            value: value,
            todolistId: todolistId
        }
    } as const
}
export const changeTodolistNameAC = (todolistID: string, newItemTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-NAME',
        payload: {
            todolistId: todolistID,
            title: newItemTitle
        }
    } as const
}