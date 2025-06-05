import React, { useState } from 'react'
import { useContext } from 'react'
import {TodoContext} from '../../context/todoContext'

export default function AddTodo() {
  const {addTodo}= useContext(TodoContext)
  const [msg,setMsg]= useState('')

  return (
    <form
      className='m-4 w-full flex flex-col sm:flex-row justify-center items-center gap-1' 
      onSubmit={(e)=> {
      e.preventDefault()
      if (!msg) 
        return
        addTodo({title: msg})
        setMsg('')
      }}>
      
      <input
       type="text"
       placeholder='Enter Task to be done'
       className='w-5/6 p-2 rounded-md sm:w-[400px] md:w-[550px] sm:text-2xl'
       value={msg}
       onChange={(e)=> setMsg(e.target.value)}
      />
      <button
       type='submit'
       className='bg-green-300 sm:text-2xl rounded-md border-2 border-white hover:border-black px-2 py-1 ' 
      >Add Todo</button>
    </form>
  )
}