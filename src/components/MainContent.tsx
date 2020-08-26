import React from 'react'
import { Grid, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import AssignmentIcon from '@material-ui/icons/Assignment';
import TodayIcon from '@material-ui/icons/Today';
import MoodIcon from '@material-ui/icons/Mood';

import TodoList from './TodoList'
import Calendar from './Calendar'
import MoodTracker from './MoodTracker'

const useStyles = makeStyles({
    root : {
        
    }, title : {
        fontFamily : 'Nunito',
        fontWeight : 800
    }, item : {
        padding : '1.5em 2em !important',
        backgroundColor : '#EDECEE',
    }, createColumn : {
        display : 'grid',
        gridTemplateRows : '1fr 5fr',
        marginBottom : '2em'
    }
})
const MainContent : React.FC = () => {
    const classes = useStyles()

    return (
        <Container>
            <Grid container spacing={3} className={classes.root}>
                <Grid container item lg={5} xs={12} spacing={2} className={classes.createColumn}>
                    <Grid container item spacing={2} alignItems="flex-end">
                        <Grid item>
                            < AssignmentIcon fontSize="large"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" className={classes.title}> TodoList </Typography>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.item}>
                        <TodoList/>
                    </Grid>
                </Grid>
                <Grid container item lg={7} xs={12} spacing={2} className={classes.createColumn}>
                    <Grid container item spacing={2} alignItems="flex-end">
                        <Grid item>
                            < MoodIcon fontSize="large"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" className={classes.title}> Mood Tracker </Typography>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.item}>
                        <TodoList/>
                    </Grid>
                </Grid>
                <Grid container item lg={12} xs={12} spacing={2} className={classes.createColumn}>
                    <Grid container item spacing={2} alignItems="flex-end">
                        <Grid item>
                            < TodayIcon fontSize="large"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" className={classes.title}> Calendar</Typography>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.item}>
                        <Calendar/>
                    </Grid>
                </Grid>
                
                
            </Grid>
        </Container>
        
    )
}


export default MainContent