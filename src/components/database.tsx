// Import UUID
import { uuid } from 'uuidv4'


// Type Declaration

type Priority = 'High' | 'Medium' | 'Low' | 'No Priority' | null

type Task = {
    id : string,
    title : string, 
    note : string, 
    tags : string[],
    priority? : Priority,
    deadline? : string,
    completed : boolean
}

// Calendar Stuff

const calendar = [
    { daysCount : 31,
      monthName : "January", 
    }, 
    { daysCount : 28,
      monthName : "February", 
    },
    { daysCount : 31,
      monthName : "March", 
    }, 
    { daysCount : 30,
      monthName : "April", 
    },
    { daysCount : 31,
      monthName : "May", 
    },
    { daysCount : 30,
      monthName : "Juny", 
    },
    { daysCount : 31,
      monthName : "July", 
    },
    { daysCount : 31,
      monthName : "August", 
    },
    { daysCount : 30,
      monthName : "September", 
    },
    { daysCount : 31,
      monthName : "October", 
    },
    { daysCount : 30,
      monthName : "November", 
    },
    { daysCount : 31,
      monthName : "December", 
    },
]

// // Ideas 
// class getCalendar () {
    
// } 

const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

// Dummy Tasks to fill up TodoList
const dummyTasks = [
    {
        id : uuid(), 
        title : "Clean up my room",
        note : `Testing Note`,
        tags : [],
        completed : false 
    },{
        id : uuid(), 
        title : "Revolutionize the working class",
        note : `Testing Note`,
        tags : [],
        priority : "Medium" as Priority,
        completed : false 
    },{
        id : uuid(), 
        title : "Support BLM ",
        note : ``,
        tags : [],
        completed : false 
    },{
        id : uuid(), 
        title : "Read a book",
        note : `Testing Note`,
        tags : [], 
        deadline : "Mon Nov 02 2020",
        completed : false 
    }
]

export { dummyTasks, calendar, dayNames }
export type { Task, Priority }