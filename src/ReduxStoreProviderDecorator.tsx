import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {TasksReducer} from "./reducers/TasksReducer";
import {TodolistsReducer} from "./reducers/TodolistsReducer";
import {FilterValuesType, TasksStateType} from "./App";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistsReducer,
})

type initialGlobalStateType = {
    todolists: [
        { id: string, title: string, filter: FilterValuesType },
        { id: string, title: string, filter: FilterValuesType }
    ],
    tasks: TasksStateType
}
const initialGlobalState: initialGlobalStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

// это HOC. Принимает компоненту и возвращает компоненту, обернутую провайдером
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};