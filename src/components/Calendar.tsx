import React, { useState } from 'react'
import { Typography, Button, Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//Importing Functions
import { dayNames, calendar } from './database'

const useStyles = makeStyles({
    root : {
        padding : '2em',
        color : 'black',
    },
    componentTitle : {
        padding : '10px',
        '& p' : {
            fontSize : '2rem',
            fontWeight : 500,
            fontFamily : 'Nunito'
        }
    },
    addBorder : {
        border : '1px solid #55555 !important'
    },
    dateGrid : {
        display : 'grid',
        padding : '2em 0',
        gridTemplateColumns : 'repeat(7,1fr)',
        gridTemplateRows : '50px repeat(6,1fr)',
    },
    dateItem : {
        padding : '10px',
        minHeight : '50px',
        '& button' : {
            borderRadius : '100%',
            minWidth : "35px",
            minHeight : "35px"
        }
    },
    today : {
        color : 'white',
        backgroundColor : '#3f51b5',
    }
})


// Just Destructuring current Date. Need Fixes. 
const currentDate = new Date()
const currentDayNum = currentDate.getDay()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const currentDay = currentDate.getDate()
const pastYear = currentYear - 1
const nextYear = currentYear + 1

const monthName = calendar[currentMonth].monthName

let pastMonth = currentMonth - 1
let nextMonth = currentMonth + 1

if ( currentMonth === 1 ){
    pastMonth = 12
} 

if ( currentMonth === 12 ){
    nextMonth = 1
} 


const pastMonthDays = calendar[pastMonth].daysCount
const nextMonthDays = calendar[nextMonth].daysCount
const currentMonthDays = calendar[currentMonth].daysCount

// Iterating template to make it Easier 
let iterator : number[] = []
let numbers : number[] = []

for (let i = pastMonthDays-currentDayNum; i < pastMonthDays; i++) {
    numbers.push(i)
}

for (let i = 1; i <= 42; i++) {
    iterator.push(i as number)
    
}

const Calendar = () => {
    const classes = useStyles()
    const [ currentDate, setCurrentDate ] = useState<Date>( new Date())


    return (
        <div className={classes.root}>
            <Grid container className={classes.componentTitle}>
                <Grid item lg={3}>
                    <Typography> { monthName } </Typography>
                </Grid>
                <Grid item lg={1}>
                    <IconButton>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Grid>
                <Grid item lg={1}>
                    <IconButton>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
                <Grid item></Grid>
                <Grid item></Grid>

            </Grid>
            <div className={classes.dateGrid} style={{color : 'black'}}>
            
            { dayNames.map( name => {
                return (
                    <div className={classes.dateItem}>
                        { name }
                    </div>
                )
            })}
            { iterator.map( item => {
                if ( item <= currentDayNum ){
                    return (
                        <div className={classes.dateItem}>
                            <Button disabled> {numbers[item-1]} </Button>
                        </div>
                    )
                } else if ((item - currentDayNum ) > currentMonthDays){
                    return (
                        <div className={classes.dateItem}>
                            <Button disabled> { item - 31 - currentDayNum } </Button> 
                        </div>
                    )
                } else if ( (item-currentDayNum) === currentDay ) {
                    return (
                        <div className={classes.dateItem}>
                            <Button className={classes.today}>{item - currentDayNum}</Button>
                        </div>
                    )
                } else {
                    return (
                        <div className={classes.dateItem}>
                            <Button>{item - currentDayNum}</Button>
                        </div>
                    )
                }
            })}
            </div>       
        </div>
        
    )
}

export default Calendar
