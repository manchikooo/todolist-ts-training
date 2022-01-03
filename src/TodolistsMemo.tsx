import React from 'react';
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {RootReducerType} from "./store";
import {TodolistType} from "./App";

const TodolistsMemo = () => {

    const todolists = useSelector<RootReducerType, Array<TodolistType>>(state => state.todolist)

    return (
        <>
            {todolists.map(tl => <Grid item>
                    <Paper elevation={5} style={{padding: '10px'}}>
                        <Todolist
                            key={tl.id}
                            tl={tl}/>
                    </Paper>
                </Grid>
            )}
        </>
    );
};

export const TodolistMap = React.memo(TodolistsMemo)
