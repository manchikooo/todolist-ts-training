import React, {useState} from 'react';

type PropsType = {
    title: string
    changeTitle: (newItemTitle: string)=> void
}

const EditableSpan = (props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => setEditMode(true)
    const activateViewMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    return (
        editMode
            ? <input value={title}
                     autoFocus
                     onBlur={activateViewMode}
                     onChange={(e) => setTitle(e.currentTarget.value)}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>

    );
};

export default EditableSpan;