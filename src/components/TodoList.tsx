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
    InputAdornment,
    Divider,
    Grid,
    Popover,
} from '@material-ui/core'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/styles'

// Custom Hooks 

// Components 
import EditTaskModal from './EditTaskModal'
import AdvancedSetup from './AdvanceSetup'

// Import UUID
import { uuid } from 'uuidv4'

// Import Data 
import { dummyTasks, Task, Priority } from './database'

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
    // Handling empty input. This Naming scheme is dumb but who cares
    const [ isNotEmpty, isEmpty] = useState<boolean>(false)

    // Adding new Task to Tasks state
    const addTask = (e : React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if ( addTodoForm === "" ){
            isEmpty(true)
            return 
        } else {
            isEmpty(false)
        }
        const task : Task = {
            id : uuid(), 
            title : addTodoForm,
            note : ``,
            tags : [],
            priority : priority,
            deadline : selectedDate?.toDateString(),
            completed : false
        }
       setTasks([
           ...tasks, 
           task
       ])
       setAddTodoForm("")
    }

    //**** / Event Handler ****//
    // Handling Popovers 
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const openAdvancedSetup = ( e : React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const closeAdvancedSetup = () => {
        setAnchorEl(null)
    }
    
    //Handling Popover Radio Choices
    const [priority, setPriority] = React.useState<Priority>("No Priority" as Priority)

    const selectPriority = ( e : React.ChangeEvent<HTMLInputElement>) => {
        setPriority((e.target as HTMLInputElement).value as Priority)
    }

    // Handling Date Picker 
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date()
    )

    const handleDateChange = ( date : Date | null ) => {
        setSelectedDate(date)
    }

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

    //Editing a Task 
    const editTask = ( item : Task ) => {
        setTasks( tasks.map ( ( task : Task ) => {
            if ( task.id === item.id ) {
                task = item
            }
            return task 
        }))
    }


    return (
        <div className={classes.root} style={{color : 'black'}}>
            <Grid container alignItems="center" justify="flex-end" spacing={3}>
                <Grid item lg={8} xs={10}>
                    <Typography 
                        style={{ fontFamily : 'Nunito', fontSize : '2rem', fontWeight : 600}} 
                        gutterBottom
                    > Today </Typography>
                </Grid>
                <Grid item lg={2} xs={1}>
                    {/* Sort Button */}
                    <IconButton>
                        <ImportExportIcon />
                    </IconButton>
                </Grid>
                <Grid item lg={2} xs={1}>
                    <IconButton>
                    {/* More Info Button */}
                        <MoreHorizIcon />
                    </IconButton>
                </Grid>
                
            </Grid>
            
            <form autoComplete="off">
                <TextField 
                    error={ isNotEmpty }
                    label="Create a new todo"
                    value = {addTodoForm} 
                    fullWidth 
                    onChange={ e => setAddTodoForm(e.target.value) }
                    variant="outlined"
                    helperText={isNotEmpty ? "Field can't be empty" : ""}
                    InputProps={{    endAdornment : (
                            <InputAdornment position="end">
                                <IconButton onClick={ e => openAdvancedSetup(e)}>
                                    <MenuIcon />
                                </IconButton>
                                {/* Put This on a Seperate Component */}
                                <Popover    
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={closeAdvancedSetup}
                                    anchorOrigin={{
                                        vertical : 'bottom',
                                        horizontal : 'left'
                                    }}
                                    transformOrigin={{
                                        vertical : 'top',
                                        horizontal : 'center'
                                    }}
                                    
                                >
                                    < AdvancedSetup 
                                        selectedDate={selectedDate}
                                        handleDateChange={handleDateChange}
                                        priority={priority}
                                        selectPriority={selectPriority}
                                    />
                                </Popover>
                            </InputAdornment>
                        )}}
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
                        <React.Fragment>
                            <ListItem style={{padding : "8px 0", textDecoration : task.completed ? 'line-through' : 'none'}}>
                                <ListItemText primary={
                                    <React.Fragment>
                                        <Typography style={{ fontSize : '1.5rem', fontWeight : 500}}>
                                            { task.title }
                                        </Typography>
                                    </React.Fragment>
                                    } secondary={
                                        <Typography variant="subtitle2" style={{fontWeight : 350}}>
                                            {task.deadline ? task.deadline + " | " : "" }
                                            {task.priority ? task.priority + " | " : "No Priority | "}  
                                            {task.note !== "" ? task.note : "No Note"}
                                        </Typography>
                                    }/>
                                    
                                <Checkbox onChange={ () => taskCompleted(task.id)}/>
                                <IconButton onClick={ () => handleOpen(task.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={ () => deleteTask(task.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    )
                })}
            </List> 
            <Modal
                open={editStatus}
                onClose={handleClose}
                style={{ border : 'none', marginTop : "20%"}}
            >
                <EditTaskModal task={currentTask} editHandler={editTask} modalHandler={handleClose}/>
            </Modal>
        </div>
    )
}

export default TodoList
