import { useState, useEffect } from 'react'
import {  Provider } from '../context/todoContext' 
import AddTodo from './Components/AddTodo'
import DisplayTodo from './Components/DisplayTodo'

function App() {
  const [todos,setTodos]= useState([])

  const addTodo= (todo)=> {
    setTodos((cur)=> [...cur, {id: Date.now(),completed:false,desc: "",due: "",priority: "none", ...todo,}])
    // setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }
  const updateTodo= (id,val)=> {setTodos((cur)=> cur.map((curel)=> curel.id===id? {...curel, title: val} : curel))}
  const updateDesc= (id,val)=> {setTodos((cur)=> cur.map((curel)=> curel.id===id? {...curel, desc: val} : curel))}
  const updatePriority= (id,val)=> {setTodos((cur)=> cur.map((curel)=> curel.id===id? {...curel, priority: val} : curel))}
  const updateDue= (id,val)=> {setTodos((cur)=> cur.map((curel)=> curel.id===id? {...curel, due: val} : curel))}
  const deleteTodo= (id)=> {setTodos((cur)=> cur.filter((curel)=> curel.id!=id))}
  const toggleCompleted= (id)=> {setTodos((cur)=> cur.map((curel)=> curel.id===id ? {...curel,completed: !curel.completed} : curel))}

  useEffect(()=>{
    const local= JSON.parse(localStorage.getItem("todos-ContextAPI"))
    if(local && local.length>0)
      setTodos(local)
  },[])

  useEffect(()=>{
    localStorage.setItem("todos-ContextAPI",JSON.stringify(todos))
    // console.log(todos)
  },[todos])

  return (
    <Provider value={{todos,addTodo,updateTodo,deleteTodo,toggleCompleted,updateDesc,updateDue,updatePriority}}>
      <div className='w-full flex flex-col justify-center items-center'>
        <h1 className='text-white text-6xl my-4'>TodoList</h1>
        <AddTodo/>
      <div className='w-full flex flex-col justify-center items-center gap-3'>
        {
        todos && todos.map((cur)=>
          <div key={cur.id} className='w-full flex justify-center' >
          <DisplayTodo todo={cur}/>
          </div>
        )}
      </div>
        </div>
    </Provider>
  )
}

export default App
