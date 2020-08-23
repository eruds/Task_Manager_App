import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const btnStyle = makeStyles({
  root : {
    color : 'black', 
    padding : '6rem',
    background : 'linear-gradient(45deg, #FE6B8B 30%, #FE8E53 90%' 
  }
})

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

function App() {
  return (
    <div className="App">
        <Button className={btnStyle.root}>Hello</Button>
        <MyButton> Testing </MyButton>
    </div>
  );
}

export default App;
