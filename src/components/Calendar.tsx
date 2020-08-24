import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root : {

    }
})

let items : number[] = []

for ( let i = 1; i < 31; i++){
    items.push(i)
}


const Calendar = () => {
    const classes = useStyles()
    return (
        <div className={classes.root} style={{color : 'black'}}>
            <Grid container direction="column">
                <Grid item style={{ marginBottom : '3em'}}>
                    <Typography variant="h6" style={ {fontWeight : 300}}>
                        August 2020
                    </Typography>
                </Grid>
                <Grid container item justify="flex-start" spacing={5}>
                    { items.map( (item : number) =>{
                            return (
                                <Grid item style={{minWidth : '150px', minHeight : '100px'}}> 
                                    {item}
                                </Grid>
                            )
                    })}
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Calendar
