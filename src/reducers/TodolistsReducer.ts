import {TodolistType} from "../App";
import {v1} from "uuid";

export const TodolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newState = [...state]
            return [...newState, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        }
        default:
            return state
    }
};

type ActionType = removeTodolistACType | addTodolistACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: id
        }
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (id: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            id: id,
            title: title
        }
    } as const
}


