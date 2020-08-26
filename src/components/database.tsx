// Import UUID
import { uuid } from 'uuidv4'


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

export { dummyTasks }
export type { Task, Priority }