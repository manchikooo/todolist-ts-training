import {combineReducers, createStore} from "redux";
import {TasksReducer} from "./reducers/TasksReducer";
import {TodolistsReducer} from "./reducers/TodolistsReducer";

let rootReducer = combineReducers({
    tasks: TasksReducer,
    todolist: TodolistsReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)