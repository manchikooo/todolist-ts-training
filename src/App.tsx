import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {
    addEmptyArrOfTasksAC,
    addTaskAC, changeTaskNameAC,
    changeTaskStatusAC,
    removeArrOfTasksAC,
    removeTaskAC,
    TasksReducer
} from "./reducers/TasksReducer";
import {
    addTodolistAC,
    changeTodolistNameAC,
    removeTodolistAC,
    todolistFilterAC,
    TodolistsReducer
} from "./reducers/TodolistsReducer";

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
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, todolistsDispatch] = useReducer(TodolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, tasksDispatch] = useReducer(TasksReducer, {
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
    });

    // TASKS
    const addTask = (title: string, todolistId: string) => {
        tasksDispatch(addTaskAC(title, todolistId))
    }
    const removeTask = (id: string, todolistId: string) => {
        tasksDispatch(removeTaskAC(id, todolistId))
    };
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        todolistsDispatch(todolistFilterAC(value, todolistId))
    };
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        tasksDispatch(changeTaskStatusAC(id, isDone, todolistId))
    };
    const changeTaskName = (todolistID: string, taskID: string, newTitle: string) => {
        tasksDispatch(changeTaskNameAC(todolistID, taskID, newTitle))
    }
    console.log(tasks)

    // TODOLISTS
    const addTodolist = (newItemTitle: string) => {
        const newID = v1()
        todolistsDispatch(addTodolistAC(newID, newItemTitle))
        tasksDispatch(addEmptyArrOfTasksAC(newID))
    }
    const removeTodolist = (id: string) => {
        todolistsDispatch(removeTodolistAC(id))
        tasksDispatch(removeArrOfTasksAC(id))
    }
    const changeTodolistName = (todolistID: string, newItemTitle: string) => {
        todolistsDispatch(changeTodolistNameAC(todolistID, newItemTitle))
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
                    {todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                        }

                        return <Grid item>
                            <Paper elevation={5} style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskName={changeTaskName}
                                    changeTodolistName={changeTodolistName}/>
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
