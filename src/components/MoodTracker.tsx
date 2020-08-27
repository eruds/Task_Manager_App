import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, TextField, Grid, IconButton } from '@material-ui/core'
import {Line} from 'react-chartjs-2';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Mood',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [5, 1, 4, 3, 4, 5, 1]
      }
    ]
  };
  

const MoodTracker = () => {
    return (
        <div>
            <Typography variant="h4" style={{ color : 'black',}}>Last 7 Days</Typography>
            <Line data={data}/>
            <Typography variant="h6" style={{ color : 'black', padding: '20px 0'}}> How are you Feelin Today? </Typography>
            <Grid container justify="flex-start">
                <Grid item lg>
                    <IconButton>
                        <SentimentVeryDissatisfiedIcon />
                    </IconButton>
                </Grid>
                <Grid item lg>
                    <IconButton>
                        <SentimentDissatisfiedIcon />
                    </IconButton>
                </Grid>
                <Grid item lg>
                    <IconButton>
                        <SentimentSatisfiedIcon />
                    </IconButton>
                </Grid>
                <Grid item lg>
                    <IconButton>
                        <SentimentVerySatisfiedIcon />
                    </IconButton>
                </Grid>
                <Grid item lg>
                    <IconButton>
                        <EmojiEmotionsIcon />
                    </IconButton>
                </Grid>
                <Grid item lg></Grid>
                <Grid item lg></Grid>
                <Grid item lg></Grid>
                <Grid item lg></Grid>
                <Grid item lg></Grid>
            </Grid>
            <TextField 
                fullWidth
                multiline
                rows={4}
                label="How do you feel?"
                variant="outlined"
            />
        </div>
    )
}

export default MoodTracker
