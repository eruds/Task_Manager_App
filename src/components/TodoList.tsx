import React, { useState } from 'react'
import { 
    TextField, 
    Typography, 
    Button, 
    IconButton, 
    Checkbox, 
    List, 
    ListItem, 
    ListItemText, 
    Modal, 
    Container,
} from '@material-ui/core'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles'

// Custom Hooks 

// Components 
import EditTaskModal from './EditTaskModal'

// Import UUID
import { uuid } from 'uuidv4'

// Import Data 
import { dummyTasks, Task } from './database'

const useStyles = makeStyles({
    root : {
        backgroundColor : '#EDECEE',
    }
})


const TodoList = () => {
    // Component Styling 
    const classes = useStyles()

    //**** Hooks ****/ 
    // Current Tasks 
    const [tasks, setTasks] = useState<Task[]>(dummyTasks)
    // Activate Modal 
    const [editStatus, setEditStatus] = useState<boolean>(false)
    // Current Selected Task to Display on Modal 
    const [currentTask, setCurrentTask]  = useState<Task>({
        id : '', title : '', note : ``, tags : [],  completed : false 
    })

    
    //****Form Handler****// 
    const [ addTodoForm, setAddTodoForm ] = useState<string>("")

    // Adding new Task to Tasks state
    const addTask = (e : React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const task : Task = {
            id : uuid(), 
            title : addTodoForm,
            note : ``,
            tags : [],
            completed : false
        }
       setTasks([
           ...tasks, 
           task
       ])
       setAddTodoForm("")
    }

    //**** / Event Handler ****//
    // Handling Modal Open and Closing 
    const handleOpen = ( id : string ) => {
        let item = tasks.filter( task => task.id === id )
        setCurrentTask(item[0])
        setEditStatus(true)
    }

    const handleClose = () => {
        setEditStatus(false)
    }


    // Deleting new Task from Tasks state
    const deleteTask = ( id : string) => {
        const lists = tasks.filter( task => task.id !== id)
        setTasks(lists)
    }

    // Marking a Task as Completed in the Tasks State
    const taskCompleted = ( id : string ) => {
        setTasks(tasks.map( ( task : Task ) => {
            if ( task.id === id ) {
                task.completed = !task.completed
            }
            return task
        }))

    }

    return (
        <div className={classes.root} style={{color : 'black'}}>
            <form autoComplete="off">
                <TextField 
                    id="outlined-basic" 
                    label="Create a new todo"
                    value = {addTodoForm} 
                    fullWidth 
                    onChange={ e => setAddTodoForm(e.target.value) }
                >
                    Testing
                </TextField>
                <Button 
                    type="submit" 
                    startIcon={<PlaylistAddIcon/>} 
                    style={{ marginTop : '10px'}} 
                    onClick={ e => addTask(e)}
                > Add Task </Button>
            </form>
            <List>
                { tasks.map( ( task : Task ) => {
                    return(
                        <ListItem style={{padding : "8px 0", textDecoration : task.completed ? 'line-through' : 'none'}}>
                            <ListItemText primary={
                                <Typography style={{ fontSize : '20px'}}>
                                    { task.title }
                                </Typography>} secondary={task.note}/>
                            <Checkbox onChange={ () => taskCompleted(task.id)}/>
                            <IconButton onClick={ () => handleOpen(task.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={ () => deleteTask(task.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List> 
            <Modal
                open={editStatus}
                onClose={handleClose}
                style={{ border : 'none', marginTop : "20%"}}
            >
                <EditTaskModal task={currentTask}/>
            </Modal>
        </div>
    )
}

export default TodoList
