import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { NavbarItems, NavStateItem } from './database'

const useStyles = makeStyles({
    root : {
        padding : 0,
    },
    title : {
        flexGrow : 1
    }
})


const NavigationBar : React.FC = () => {

    const classes = useStyles()
    const [Items, setItems] = useState<NavStateItem[]>(NavbarItems)

    return (
        <AppBar position="static" style={{ backgroundColor : "#212121"}}>
            <Container>    
                <Toolbar className={classes.root}>
                    <Typography variant="h5" className={classes.title}> Ikigai App </Typography>
                        <Tabs>
                            { Items.map((item : NavStateItem, index : number)  => {
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
