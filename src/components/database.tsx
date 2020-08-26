// Import UUID
import { uuid } from 'uuidv4'

type Task = {
    id : string,
    title : string, 
    note : string, 
    tags : string[],
    completed : boolean
}

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
        completed : false 
    }
]

export { dummyTasks }
export type { Task }