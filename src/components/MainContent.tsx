import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { UseMainClasses } from './Theming'

import { Grid, Container, Typography } from '@material-ui/core'

import AssignmentIcon from '@material-ui/icons/Assignment';
import TodayIcon from '@material-ui/icons/Today';
import MoodIcon from '@material-ui/icons/Mood';

import TodoList from './TodoList'
import Calendar from './Calendar'
import MoodTracker from './MoodTracker'
import QuoteBar from './QuoteBar'

const useStyles = makeStyles({
    root : {
        
    }, title : {
        fontFamily : 'Nunito',
        fontWeight : 800
    }, item : {
        padding : '1.5em 2em !important',
        paddingBottom : "3em !important",
        backgroundColor : '#212121',
    }, createColumn : {
        display : 'grid',
        gridTemplateRows : '1fr 5fr',
        marginBottom : '2em'
    }, titleIcon : {
        '& svg' : {
            fontSize : '2.4rem',
        }
    }
})
const MainContent : React.FC = () => {
    const classes = useStyles()
    const mainClasses = UseMainClasses()

    return (
        <Container>
            <Grid container spacing={3} className={classes.root}>
                <Grid item lg={12} xs={12}>
                    <QuoteBar/>
                </Grid>
                <Grid container item lg={5} xs={12} spacing={2} className={classes.createColumn}>
                    <Grid container item spacing={2} alignItems="center">
                        <Grid item className={classes.titleIcon}>
                            < AssignmentIcon fontSize="large"/>
                        </Grid>
                        <Grid item>
                            <Typography className={mainClasses.title}> TodoList </Typography>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.item}>
                        <TodoList/>
                    </Grid>
                </Grid>
                <Grid container item lg={7} xs={12} spacing={2} className={classes.createColumn}>
                    <Grid container item spacing={2} alignItems="center">
                        <Grid item className={classes.titleIcon}>
                            < MoodIcon fontSize="large"/>
                        </Grid>
                        <Grid item>
                            <Typography className={mainClasses.title}> Mood Tracker </Typography>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.item}>
                        <MoodTracker />
                    </Grid>
                </Grid>
                <Grid container item lg={12} xs={12} spacing={2} className={classes.createColumn}>
                    <Grid container item spacing={2} alignItems="center">
                        <Grid item className={classes.titleIcon}>
                            < TodayIcon />
                        </Grid>
                        <Grid item>
                            <Typography className={mainClasses.title}> Calendar</Typography>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.item}>
                        <Calendar />
                    </Grid>
                </Grid>
                
                
            </Grid>
        </Container>
        
    )
}


export default MainContent