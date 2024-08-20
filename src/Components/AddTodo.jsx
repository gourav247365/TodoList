import React, { useState } from 'react'
import { useContext } from 'react'
import {TodoContext} from '../../context/todoContext'

export default function AddTodo() {
  const {addTodo}= useContext(TodoContext)
  const [msg,setMsg]= useState('')

  return (
    <form
      className='m-4 w-full flex justify-center' 
      onSubmit={(e)=> {
      e.preventDefault()
      if (!msg) 
        return
        addTodo({title: msg})
        setMsg('')
      }}>
      
      <input
       type="text"
       className='w-1/2 h-12 rounded-md text-2xl'
       value={msg}
       onChange={(e)=> setMsg(e.target.value)}
      />
      <button
       type='submit'
       className='bg-green-300 text-2xl h-12 rounded-md border-2 border-white hover:border-blue-500 px-4 py-1' 
      >Submit</button>
    </form>
  )
}