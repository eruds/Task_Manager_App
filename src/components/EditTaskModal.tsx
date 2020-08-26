import React, { useState } from 'react'
import { Container, Typography, TextField, Button } from '@material-ui/core'

import { Task } from './database'

const EditTaskModal : React.FC<{ task : Task }> = ({ task }) => {
    console.log(task)
    const [ currentTask, setCurrentTask ] = useState<Task>(task)
    const [ editTodoForm, setEditTodoForm ] = useState<string>(task.note)

    
    return (
        <Container style={{ minHeight : '200px', maxWidth : '700px', backgroundColor : 'white', padding : "1em"}}>  
            <Typography variant="h6"> { currentTask.title } </Typography>
            <TextField
                value={editTodoForm}
                fullWidth
                multiline
                rows={4}
                onChange={ e => setEditTodoForm(e.target.value)}
                variant="outlined"
            />
            <Button style={{ marginTop: '1em'}}> Submit Change </Button>
        </Container>
    )
}

export default EditTaskModal
