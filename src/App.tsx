import React from 'react';
import { Grid, Paper } from '@material-ui/core'
import { ThemeProvider} from '@material-ui/core/styles'
import { darkTheme } from './components/Theming'
// import { createStyles }

//Components
import NavigationBar from './components/NavigationBar'
import MainContent from './components/MainContent'
// style={{ backgroundColor : "#353535", color : 'white'}}


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper className="App">
        <Grid container direction="column">
            <Grid item style={{ marginBottom : '2em'}}>
              <NavigationBar />
            </Grid>
            <Grid item>
              <MainContent />
            </Grid>
        </Grid>  
      </Paper>
    </ThemeProvider>
    
  );
}

export default App;
