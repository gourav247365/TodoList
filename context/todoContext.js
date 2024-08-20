import {createContext} from 'react'

export const TodoContext = createContext({
    todos:[
        {
            id: 1,
            title: "todo title",
            completed: false,
            desc: "todo description",
            due: "todo due date",
            priority: "todo priority",
        }
    ],
    addTodo: ()=>{},
    updateTodo: ()=>{},
    updateDesc: ()=>{},
    updateDue: ()=>{},
    updatePriority: ()=>{},
    deleteTodo: ()=>{},
    toggleCompleted: ()=>{},
})

export const Provider= TodoContext.Provider