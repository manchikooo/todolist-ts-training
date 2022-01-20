import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './AddItemFormStyle.module.css'
import {Icon, TextField} from "@mui/material";

type PropsType = {
    addItem: (newItemTitle: string) => void
    addLabel: string
}

export const AddItemForm = React.memo((props: PropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div className={classes.AddFormStyle}>

            <TextField
                size='small'
                id="standard-basic"
                label={error ? "Title is required" : props.addLabel}
                variant="standard"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
            />
            <Icon onClick={addItem}
                  style={{marginLeft: '10px', fontSize: 30}}
                  color="primary">add_circle
            </Icon>
        </div>
    );
})
