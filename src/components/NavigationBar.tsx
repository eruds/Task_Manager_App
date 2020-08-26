import React from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'



type NavProp = { title : string, link : string }
const useStyles = makeStyles({
    root : {
        padding : 0,
    },
    title : {
        flexGrow : 1
    }
})


const NavigationBar : React.FC<{ items : NavProp[] }> = ({items}) => {

    const classes = useStyles()

    return (
        <AppBar position="static" color="transparent">
            <Container>    
                <Toolbar className={classes.root}>
                    <Typography variant="h5" className={classes.title}> Ikigai App </Typography>
                        <Tabs>
                            { items.map((item : NavProp, index : number)  => {
                                return (
                                    <Tab label={item.title} href={item.link}/>
                                )
                            })}
                        </Tabs>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavigationBar
