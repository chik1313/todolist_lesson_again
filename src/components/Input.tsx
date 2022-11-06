import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type InputPropsType = {
    callback:(newTitle:string)=> void,
}
const Input = (props:InputPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.callback(newTitle)
            setTitle('')
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>
            <TextField
                error={error}
                value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""} id="outlined-basic" label={error ?"Title is required" : "Type in ..."} variant="outlined" size="small" />
            <Button size='small' variant="contained" style={{
                maxWidth: '40px',
                maxHeight: '40px',
                minWidth: '40px',
                minHeight: '40px',backgroundColor:"black"
            }}  onClick={addTask}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Input;
