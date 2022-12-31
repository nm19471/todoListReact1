import React from 'react'
import { useEffect } from 'react'
// import { useState } from 'react'
import './style.css'

// get from local storage
const getLocalData =()=>{
     const lists= localStorage.getItem("mytodolist")

     if(lists){
      return JSON.parse(lists);   // used json to convert again into array
     }else{
      return []
     }
}

const Todo = () => {
  const [inputData,setInputData]=React.useState("")
  const [item,setItems]=React.useState(getLocalData());
  const [isEditItem,setIsEditItem]=React.useState("")
  const [togglebtn,settogglebtn]=React.useState(false)
 // add item
  const addItem=()=>{
      if(!inputData){
        alert("Please fill Data")
      }
      else if(inputData && togglebtn){
        setItems(item.map((currEle)=>{
          if(currEle.id === isEditItem){
            return {...currEle,name: inputData}
          }
          return currEle
        }))

        setInputData("")
        setIsEditItem(null)
        settogglebtn(false)
      }
      else{
        const myNewInputData={
          id: new Date().getTime().toString(),
          name: inputData,
        }
        setItems([...item,myNewInputData])
        setInputData("")
      }
  }

  // edit item
  const editItem=(index)=>{
     const item_todo_edited= item.find((currEle)=>{
      return currEle.id === index
     })
     setInputData(item_todo_edited.name)
     setIsEditItem(index)
     settogglebtn(true)
  }

  // delete Elem

  const deleteItem=(index)=>{
       const updatedItem = item.filter((currEle)=>{
         return currEle.id !== index
       })
       setItems(updatedItem)
  }

  // Remove all elements
  const removeAll=()=>{
    setItems([])
  }
   // adding to local storag
   useEffect(()=>{
    localStorage.setItem('mytodolist',JSON.stringify(item))  // used json to convert into string , local storage saves in string
   },[item])


  return (
    <div>
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="./image/t.png" alt="todolist"/>
                <figcaption>Add your List Here</figcaption>
            </figure>
            <div className='addItems'>
                <input type='text'
                placeholder='Add Items' 
                className="form-control"
                value={inputData}
                onChange={(event)=> setInputData(event.target.value)}
                />
                {togglebtn?(<i class="fa fa-edit add-btn" onClick={addItem}></i>):(<i class="fa fa-solid fa-plus" onClick={addItem}></i>)}
                
            </div>
            {/* show our items */}
            <div className='showItems'>
              {
                item.map((currEle)=>{
                    return (
                      <div className='eachItem' key={currEle.id}>
                      <h3>{currEle.name}</h3>
                      <div className='todo-btn'>
                        <i className="far fa-edit add-btn" onClick={()=> editItem(currEle.id)}></i>
                        <i className='far fa-trash-alt add-btn' onClick={()=>deleteItem(currEle.id)}></i>
                      </div>
                    </div>
                    )
                })
              } 
            </div>
            <div className="showItems">
              <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                <span>Check List</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Todo