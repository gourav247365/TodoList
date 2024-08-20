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
    <div className='w-1/2 flex flex-col  items-center bg-blue-300 border-blue-300 border-4 rounded-lg '>
      <div className='w-full bg-pink-300 flex h-12 justify-between items-center rounded-md border-2'>
        <div >
          <input
            type="checkbox"
            className='m-2'
            checked={todo.completed}
            onChange={()=>toggleCompleted(todo.id)}
          />
          <input
            type="text"
            value={msg}
            ref={inputRef}
            onChange={(e)=>{setMsg(e.target.value)}}
            disabled={!edit}
            className={` min-w-[440px] bg-transparent text-2xl font-md ${todo.completed ? " text-green-700 line-through " : ""} `}
          />
        </div>
        <div className='m-1'>
          <button
            onClick={editBTN}
            className='text-lg rounded-md border-white border-[1px] hover:border-black active:bg-blue-400 px-2  mx-1'
          >{edit ? "Save " : "Edit"} </button>
          <button
            className='text-lg rounded-md border-white border-[1px] hover:border-blackactive:bg-blue-400 px-2  mx-1'
            onClick={() => deleteTodo(todo.id)}
          >Delete</button>
          <button className=' w-[1.8rem] text-lg rounded-md border-white border-[1px] hover:border-black active:bg-blue-400 mx-1'
            onClick={dropBtn}
          >{dropbox ? "-" : "+"}</button>
        </div>
      </div>

      <div className={` bg-blue-300 w-full flex overflow-hidden items- ${dropbox ? "h-44" : "h-0"}  transition-all border-[3px] ${priority=="Low" ?  "border-green-500" : priority=="High"? "border-red-500" : priority=="Medium"? "border-orange-400" : "" } `}>
        <form className={`flex flex-col justify-center items-center border-[1px]  h-full w-1/2 text-center ${priority=="Low" ?  "border-green-500" : priority=="High"? "border-red-500" : priority=="Medium"? "border-orange-400" : "" } `}
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
            }}
          />
          <button 
           type='submit'
           className='border-[1px] border-white hover:border-black active:bg-pink-400 rounded-md px-2 my-1'
          >Add</button>
        </form>
        <div className={` border-[1px] h-full w-1/2 flex flex-col items-center justify-evenly ${priority=="Low" ?  "border-green-500" : priority=="High"? "border-red-500" : priority=="Medium"? "border-orange-400" : "" } `}>
          <div className='bg-transparent border-black border-[1px] h-2/5 w-11/12 flex flex-col justify-evenly items-center  '  >
            Due Date
            <div
              className='flex justify-center gap-2'
            >
              <input
                type="date"
                className='bg-transparent border-[1px] border-white hover:border-black active:bg-pink-400 rounded-md px-1'
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                  updateDue(todo.id, e.target.value)
                }}
              />
            </div>
          </div>
          <div className='bg-transparent border-black border-[1px] h-2/5 w-11/12 flex flex-col justify-center
             items-center  '
          >
            Priority
            <div className='flex'>
              <select value={priority} name="" id="" className='bg-transparent border-[1px] border-white hover:border-black active:bg-pink-400 rounded-md px-1'
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