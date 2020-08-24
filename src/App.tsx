import React from 'react';
import { Grid } from '@material-ui/core'
// import { createStyles }

//Components
import NavigationBar from './components/NavigationBar'
import MainContent from './components/MainContent'

const Navbar = [
  {
    title : "Home", 
    link : "#",
  },
  {
    title : "About", 
    link : "#",
  }, 
  {
    title : "Login", 
    link : "#",
  }

]


function App() {
  return (
    <div className="App" style={{ backgroundColor : "#353535", color : 'white'}}>
      <Grid container direction="column">
          <Grid item style={{ marginBottom : '2em'}}>
            <NavigationBar items={Navbar} />
          </Grid>
          <Grid item>

          </Grid>
          <Grid item>
            <MainContent />
          </Grid>

      </Grid>
        
    </div>
  );
}

export default App;
