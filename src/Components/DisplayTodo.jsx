import React, { useState, useContext, useRef, forwardRef } from 'react'
import { TodoContext } from '../../context/todoContext'

function DisplayTodo({ todo }) {
  const { updateTodo, deleteTodo, toggleCompleted, updateDesc, updateDue, updatePriority } = useContext(TodoContext)
  const [msg, setMsg] = useState(todo.title)
  const [desc, setDesc] = useState(todo.desc)
  const [priority, setPriority] = useState(todo.priority)
  const [date, setDate] = useState(todo.due)
  const [dropbox, setDropbox] = useState(false)
  const [edit,setEdit]= useState(false)
  const inputRef= useRef(null)
  // const btnRef= useRef(null)

  async function editBTN(){
    if(todo.completed) 
      return
    await setEdit((cur)=> !cur)
    inputRef.current?.focus()
    if(edit)
      updateTodo(todo.id,msg)
    // console.log(inputRef.current);
    
  }
  function dropBtn() {
    setDropbox((cur) => !cur)
  }

  return (
    <div className='w-11/12 sm:w-auto flex flex-col  items-center bg-blue-300 border-blue-300 border-4 rounded-lg '>
      <div className='w-full bg-pink-300 flex flex-col sm:flex-row h-fit justify-between items-center rounded-md border-2 relative '>
        <div className='flex sm:block '>
          <input
            type="checkbox"
            className='m-2 absolute sm:static top-0 left-0'
            checked={todo.completed}
            onChange={()=>toggleCompleted(todo.id)}
          />
          <input
            type="text"
            value={msg.toUpperCase()}
            ref={inputRef}
            onChange={(e)=>{setMsg(e.target.value)}}
            disabled={!edit}
            className={` w-96 text-center sm:text-start text-lg bg-transparent sm:text-2xl sm:font-medium py-1 sm:py-2 ${todo.completed ? " text-green-700 line-through " : ""} `}
          />
        </div>
        <div className='m-1 flex'>
          <button
            onClick={editBTN}
            className='sm:text-xl bg-purple-300 rounded-md border-white border-[1px] hover:border-black active:bg-purple-400 sm:py-[2px] sm:px-4 px-2  mx-1'
          >{edit ? "Save " : "Edit"} </button>
          <button
            className='sm:text-xl bg-purple-300 rounded-md border-white border-[1px] hover:border-black active:bg-purple-400 sm:py-[2px] sm:px-4 px-2  mx-1'
            onClick={() => deleteTodo(todo.id)}
          >Delete</button>
          <button className=' w-[1.6rem] sm:w-[2.2rem] sm:text-xl bg-purple-300 rounded-md border-white border-[1px] hover:border-black active:bg-purple-400   mx-1'
            onClick={dropBtn}
          >{dropbox ? "-" : "+"}</button>
        </div>
      </div>

      <div className={` bg-blue-300 w-full flex overflow-hidden items- ${dropbox ? " h-44 sm:h-56 " : "h-0"}  transition-all border-2 sm:border-[3px] ${priority=="Low" ?  "border-green-500" : priority=="High"? "border-red-500" : priority=="Medium"? "border-orange-400" : "" } `}>
        <div className={`flex flex-col justify-center items-center border-[1px]  h-full w-1/2 text-center ${priority=="Low" ?  "border-green-500" : priority=="High"? "border-red-500" : priority=="Medium"? "border-orange-400" : "" } sm:text-xl`}
          onSubmit={(e) => {
            e.preventDefault()
            updateDesc(todo.id,desc)
          }}
        >
          Notes
          <textarea 
            placeholder='add a description...'
            className='bg-transparent border-black border-[1px] h-4/5 w-11/12 self-center '
            name="" id=""
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value)
              updateDesc(todo.id,e.target.value )
            }}
          />
          <button 
           type='submit'
           className=' bg-purple-300 border-[1px] border-white hover:border-black active:bg-purple-400 rounded-md px-2 my-1  sm:py-[2px] sm:px-4 sm:text-xl'
          >Add</button>
        </div>
        <div className={` border-[1px] h-full w-1/2 flex flex-col items-center justify-evenly ${priority=="Low" ?  "border-green-500" : priority=="High"? "border-red-500" : priority=="Medium"? "border-orange-400" : "" } `}>
          <div className='bg-transparent border-black border-[1px] h-2/5 w-11/12 flex flex-col justify-evenly items-center sm:text-xl '  >
            Due Date
            
              <input
                type="date"
                className='bg-purple-300 w-5/6 sm:w-auto text-sm  border-[1px] border-white hover:border-black active:bg-purple-400 rounded-md px-1 py-[2px] sm:py-[2px] sm:px-4 sm:text-xl'
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                  updateDue(todo.id, e.target.value)
                }}
              />
            
          </div>
          <div className='bg-transparent border-black border-[1px] h-2/5 w-11/12 flex flex-col justify-center
             items-center sm:text-xl '
          >
            Priority
            <div className='flex'>
              <select value={priority} name="" id="" className=' bg-purple-300  border-[1px] border-white hover:border-black active:bg-purple-400 rounded-md px-1 py-[2px] sm:py-[2px] sm:px-4 sm:text-xl'
                onChange={(e) => {
                  // console.log(e.target.value, typeof e.target.value);
                  setPriority(e.target.value)
                  updatePriority(todo.id, e.target.value)
                }}
              >
                <option value="none" >Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DisplayTodo