import React from 'react'
import { UseMainClasses } from './Theming'


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
        fill: true,
        lineTension: 0.2,
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
    const mainClasses = UseMainClasses()
    return (
        <div>
            <Typography className={ mainClasses.sectionHeader}> How are you Feelin Today? </Typography>
            <Grid container justify="center" alignItems="center"  style={{ margin : "1em 0"}}>
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
            </Grid>
            <TextField 
                fullWidth
                multiline
                rows={4}
                label="How do you feel?"
                variant="outlined"
            />
            <Typography variant="h6" className={ mainClasses.title}>Last 7 Days</Typography>
            <div style={{backgroundColor:"white", padding: "30px 40px"}}> 
                <Line data={data} />
            </div>
            
        </div>
    )
}

export default MoodTracker
