import React, { useState } from 'react'
import { Container, Typography, TextField, Button } from '@material-ui/core'

import { Task } from './database'

const EditTaskModal : React.FC<{ 
        task : Task, 
        editHandler : ( item : Task ) => void , 
        modalHandler : () => void
    }> = ({ task, editHandler, modalHandler }) => {
    // Form Handler 
    const [ editTodoForm, setEditTodoForm ] = useState<string>(task.note)

    // Task object handler 
    const commitEdit = () => {
        task.note = editTodoForm;
        editHandler(task);
        modalHandler();
    }
    
    return (
        <Container style={{ minHeight : '200px', maxWidth : '700px', backgroundColor : 'white', padding : "2em 3em"}}>  
            <Typography variant="h6"> { task.title } </Typography>
            <TextField
                value={editTodoForm}
                fullWidth
                multiline
                rows={4}
                onChange={ e => setEditTodoForm(e.target.value)}
                variant="outlined"
            />
            <Button style={{ marginTop: '1em'}} onClick={commitEdit}> Submit Change </Button>
        </Container>
    )
}

export default EditTaskModal
