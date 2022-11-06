import React, {ChangeEvent, useState} from 'react';

type SpanPropsType = {
    title:string
    callback: (currentTitle:string) => void
}

export const EditableSpan = (props:SpanPropsType) => {
    const [edit,setEdit] = useState(false)
    const [currentTitle , setCurrentTitle] = useState(props.title)
    const changeEdit = () => {
        setEdit(!edit)
        changeTitle()
    }
    const changeTitle = () => {
        let newTitle = currentTitle.trim();
            props.callback(newTitle)
    }
    const onChangeHandler= (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }
    return (
        edit
        ? <input value={currentTitle} onBlur={changeEdit} autoFocus onChange={onChangeHandler}/>
            :  <span onDoubleClick={changeEdit}>{props.title}</span>
    );
};


