import React from 'react';
import './App.css';
import {TaskType} from './Todolist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid} from "@mui/material";
import {addTodolistAC} from "./reducers/TodolistsReducer";
import {useDispatch} from "react-redux";
import {TodolistMap} from "./TodolistsMemo";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let dispatch = useDispatch()

    const addTodolist = (newItemTitle: string) => {
        dispatch(addTodolistAC(newItemTitle))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px 10px 30px 10px'}}>
                    <AddItemForm addItem={addTodolist} addLabel={'Todolist name'}/>
                </Grid>
                <Grid container spacing={5}>
                    {<TodolistMap/>}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
