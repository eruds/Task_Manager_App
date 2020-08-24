import React, { useState } from 'react'
import { TextField, Grid, Typography, Button, Checkbox } from '@material-ui/core'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root : {
        backgroundColor : '#EDECEE',
    }
})

const dummy = [
    {
        id : 1, 
        title : "Clean up my room",
        note : `
            Testing Note 
        `,
        completed : false 
    },{
        id : 2, 
        title : "Revolutionize the working class",
        note : `
            Testing Note 
        `,
        completed : false 
    },{
        id : 3, 
        title : "Read a book",
        note : `
            Testing Note 
        `,
        completed : false 
    }
]

interface Task {
    id : number,
    title : string, 
    note : string, 
    completed : boolean
}

const TodoList = () => {
    const classes = useStyles()
    const [tasks, setTasks] = useState<Task[]>(dummy)
    const [value, setValue] = useState<string>("")

    const addTask = () => {
        console.log("TESTED")
    }

    return (
        <div className={classes.root} style={{color : 'black'}}>
            <form autoComplete="off">
                <TextField 
                    id="outlined-basic" 
                    label="Standard"
                    value = {value} 
                    fullWidth 
                    onChange={ e => setValue(e.target.value) }
                >

                </TextField>
                <Button startIcon={<PlaylistAddIcon/>} style={{ marginTop : '10px'}} onClick={addTask}> Add Task </Button>
            </form>
            <Grid direction="column" style={{ marginTop : '1em'}}>
                { tasks.map( ( task : Task ) => {
                    return(
                        <Grid container item>
                            <Grid item xs={9} style={{ margin: '0.5em 0'}}>
                                <Typography variant="h6"> { task.title } </Typography>
                                <Typography variant="subtitle2"> { task.note } </Typography>
                            </Grid>
                            <Grid container item xs={3} alignItems="center">
                                <Grid item lg xs> 
                                    <Checkbox size="small"/>
                                </Grid>
                                <Grid item lg xs>
                                    <DeleteIcon />
                                </Grid>
                                <Grid item lg xs>
                                    < EditIcon />
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}                
            </Grid>
        </div>
    )
}

export default TodoList
