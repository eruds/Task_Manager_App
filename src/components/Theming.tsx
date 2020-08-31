import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const UseMainClasses = makeStyles ({
    container : {
        padding : '2rem 3rem',
        '& p' : {
            marginBottom : '1rem'
        }   
    },
    sectionHeader : {
        fontFamily : 'Nunito',
        fontSize : '2rem',
        fontWeight : 600
    },
    sectionHeaderContainer : {
        maxHeight : '100px',
    },
    title : {
        fontFamily : 'Nunito',
        fontSize : '2.3rem',
        fontWeight : 800,
        margin : "20px 0",
    },
    subtitle : {
        fontFamily : 'Raleway',
        fontSize : '1.5rem',
        fontWeight : 600
    },
    subtitle2 : {

    }
})

const darkTheme = createMuiTheme({
    palette : {
      type : 'dark'
    }
  })

export { UseMainClasses, darkTheme }
