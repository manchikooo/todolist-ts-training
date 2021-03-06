import React, {useState} from 'react';

type PropsType = {
    title: string
    changeTitle: (newItemTitle: string) => void
}

const EditableSpan = React.memo((props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => setEditMode(true)
    const activateViewMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title}
                     autoFocus
                     onBlur={activateViewMode}
                     onChange={changeNewTitle}
            />
            : <span onDoubleClick={activateEditMode}>{title}</span>
    );
})

export default EditableSpan;