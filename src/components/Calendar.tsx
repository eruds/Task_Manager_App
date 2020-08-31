import React, { useState } from 'react'

import { Typography, Button, Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { UseMainClasses } from './Theming'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//Importing Functions
import { dayNames, getMonthName, getMonthDayCount } from './database'

const useStyles = makeStyles({
    root : {
        padding : '2em',
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
        justifySelf : 'center',
        '& button' : {
            borderRadius : '100%',
            minWidth : "35px",
            minHeight : "35px"
        }
    },
    iconButton : {
        position : 'relative',
        '& button' : {
            position : 'absolute',
        }
    },
    today : {
        color : 'white',
        backgroundColor : '#3f51b5',
    }
})

const date = new Date();

const Calendar = () => {
    const classes = useStyles()
    const mainClasses = UseMainClasses()
    const [ currentDate, setCurrentDate ] = useState<Date>(date) 
    const currentMonth = currentDate.getMonth()
    const monthName = getMonthName(currentMonth)
    
    const getTemplate = ( number : number ) => {
        let iterator = new Array(number)
        let daysCount = getMonthDayCount(currentMonth)
        
        const lastMonthDaysCount = getMonthDayCount(currentMonth-1)
        if ( currentMonth === 1 && currentDate.getFullYear() % 4 === 0){
            daysCount += 1
        } 
        for (let i = 1; i <= number; i++) {
            iterator.push(i)
        }

        const template = monthName + " 1, " + currentDate.getFullYear()
        const difference = (new Date(template)).getDay()
        let pointer = 0
        return (
            iterator.map((item) => {
                const position = item-7-difference
                const checkDisabled = position <= 0 || pointer >= daysCount ? true : false
                const dateNumber = 
                    position <= 0 ? lastMonthDaysCount + position : 
                    pointer >= daysCount ? position - daysCount : 
                    position;
                const element = item <= 7 ? 
                ( <Typography> { dayNames[item-1] } </Typography> ) :
                ( <Button disabled={checkDisabled}> {dateNumber} </Button> ) 
                if ( item - 7 > difference ){
                    pointer++;              
                }
                return (
                    <div className={classes.dateItem}>
                        { element }
                    </div>
                )
            })
        )

    }

    const nextMonth = () => {
        let currentYear = currentDate.getFullYear()
        if ( currentMonth+1 > 11 ) {
            currentYear += 1
        }
        const template = getMonthName(currentMonth+1) + " " + currentDate.getDate() + ", " + currentYear
        const newDate = new Date(template)
        setCurrentDate(newDate)
    }

    const lastMonth = () => {
        let currentYear = currentDate.getFullYear()
        if ( currentMonth-1 < 0 ) {
            currentYear -= 1
        }
        const template = getMonthName(currentMonth-1) + " " + currentDate.getDate() + ", " + currentYear
        const newDate = new Date(template)
        setCurrentDate(newDate)
    }



    return (
        <div className={classes.root}>
            <Grid container>
                
                <Grid item lg={1} xs={1} className={classes.iconButton}>
                    <IconButton onClick={lastMonth} style={{ left : '3rem' }}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Grid>
                <Grid item lg xs></Grid>
                <Grid item lg={3} xs={3} alignItems="center">
                    <Typography className={mainClasses.sectionHeader} style={{ textAlign : "center"}}> { monthName + " " + currentDate.getFullYear()} </Typography>
                </Grid>
                <Grid item lg xs></Grid>
                <Grid item lg={1} xs={1} className={classes.iconButton}>
                    <IconButton onClick={nextMonth} style={{ right : '3rem' }}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <div className={classes.dateGrid} >
                {
                    getTemplate(49)
                }
            </div>       
        </div>
        
    )
}

export default Calendar
