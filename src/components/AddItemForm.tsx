import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './AddFormStyle.module.css'
import {Button, TextField} from "@mui/material";

type PropsType = {
    addItem: (newItemTitle: string) => void
}

const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div className={classes.AddFormStyle}>
            {error
                ? <TextField
                    autoFocus
                    size='small'
                    error
                    id="filled-error-helper-text"
                    label="Error"
                    defaultValue=""
                    helperText="Title is required"
                    variant="filled"
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                : <TextField autoFocus
                             size='small'
                             id="outlined-basic" label="TDlist name" variant="outlined"
                             value={title}
                             onChange={onChangeHandler}
                             onKeyPress={onKeyPressHandler}
                    // sx={{background: error ? 'red' : ""}}
                />}
            <Button size='small' variant="contained" onClick={addTask}>Add</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

export default AddItemForm;