import React from 'react'
import { FormControl, Container, FormLabel, RadioGroup, FormControlLabel, Radio, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { Priority } from './database'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider, 
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'

const useStyle = makeStyles({
    label : {
        marginTop : "1em"
    }
})

const AdvanceSetup : React.FC<{
        selectedDate : Date | null,
        handleDateChange : ( date : Date | null ) => void,
        priority : Priority,
        selectPriority : ( e : React.ChangeEvent<HTMLInputElement> ) => void
    }>= ({
        selectedDate, 
        handleDateChange,
        priority, 
        selectPriority
    }) => {
        const classes = useStyle()
    return (
        <Container style ={{
            padding : '2em'
        }}>
            <FormControl>
                <FormLabel>Priority</FormLabel>
                    <RadioGroup value={priority} onChange={selectPriority}>
                        <FormControlLabel value="High" control={<Radio />} label="High"/>
                        <FormControlLabel value="Medium" control={<Radio />} label="Medium"/>
                        <FormControlLabel value="Low" control={<Radio />} label="Low"/>
                        <FormControlLabel value="No Priority" control={<Radio />} label="No Priority"/>
                    </RadioGroup>
                <Divider className={classes.label}/>
                <FormLabel className={classes.label}> Deadline </FormLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        label="Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>
            </FormControl>
        </Container>
    )
}

export default AdvanceSetup
