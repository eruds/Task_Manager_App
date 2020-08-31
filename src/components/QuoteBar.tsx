import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { UseMainClasses } from './Theming'

const useStyles = makeStyles({
    root : {
        backgroundColor : 'rgba(0,0,0,0.5)',
    }
})


type quoteItem = {
    quote : string, 
    author : string
}

const QuoteBar = () => {
    const mainClasses = UseMainClasses()
    const classes = useStyles()
    const [ { quote, author}, setCurrentQuote ] = useState<quoteItem>({ quote : "", author : ""})

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get('https://quotes.rest/qod?language=en')
            const quote = res.data.contents.quotes[0].quote
            const author = res.data.contents.quotes[0].author
            setCurrentQuote({quote, author} )
        }
        fetchPost()
    }, [])
    // console.log(quote)
    return (
        <Paper className={mainClasses.container + " " + classes.root}>
            <Typography className={mainClasses.sectionHeader}>
                Quotes Of The Day 
            </Typography>
            <Typography variant="h6" variantMapping={{h6 : "p"}} >
                { quote }
            </Typography>
            <Typography variant="subtitle2" variantMapping={{ subtitle2 : "p"}}>
                - { author }
            </Typography>
        </Paper>
    )
}

export default QuoteBar
