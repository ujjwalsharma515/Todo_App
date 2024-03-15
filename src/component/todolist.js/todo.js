import React,{useState,useEffect} from 'react'
import "./style.css"

const Todo = () => {

   // to get items from local storage
   const toGetItems = ()=>{
    const list = localStorage.getItem('mytodolist');
    if(list){
        return JSON.parse(list);
    }
    else{
        return [];
    }
}


     
    const[inputdata,setinputdata]=useState("");
    const[items, setItem]= useState(toGetItems());
    const[IsEditItem, setIsEditItem]=useState("");
    const[toggleButton , setToggleButton]= useState(false);
    

    

    const addItem=()=>{
        if(!inputdata){
            alert("type something");
        }
        else if(inputdata && toggleButton){
            setItem(
                items.map((curElem)=>{
                    if(curElem.id===IsEditItem){
                return {...curElem,name:inputdata};
         }
         return curElem;
         }))}
        
        else{
            const myinputdata = {
                id:new Date().getTime().toString(),
                name:inputdata
            }
            setItem([...items,myinputdata]);
            setinputdata('');
        }
        setIsEditItem("");
        setinputdata("");
        setToggleButton(false);
       

    };

    // to delte elements
     const deleteItems = (index)=>{
       const updatedItems = items.filter((curElem)=>{
     return curElem.id !== index;
       })
       setItem(updatedItems);
     }


    //  to remove all
    const removeAll = ()=>{
        setItem([]);
    }


    //to add value in local storage 
    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));

    },[items]);
    
    // to edit value 
    const editItems = (index) =>{
        const updateEdit = items.find((curElem)=>{
            return curElem.id === index;  
        })
        setIsEditItem(index);
        setinputdata(updateEdit.name);
        setToggleButton(true);
    };

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                   <div className='title'>
                   <img src="./images/todo.svg" alt="todolist" className='image-todo' />
                   <br /><br />
                    <h3>Makes your notes here ✌️</h3>
                   </div>



                    <div className='add-items'>
                        <input type="text" placeholder=' ✍️Type here' className='text' value={inputdata} onChange={(event)=>setinputdata(event.target.value)}/>
                        {toggleButton? ( <i className="fa-solid fa-edit add-btn" onClick={addItem}></i> ):(<i className="fa-solid fa-plus add-btn" onClick={addItem}></i>)}
                        {/* <i className="fa-solid fa-pen-to-square"></i> */}
                        </div>

                        <div className='show-items'>
                           {items.map((curElem)=>{
                           
                            return(<>
                            <div className='each-item' key={curElem.id}>
                            <h4>{curElem.name}</h4>
                            <div className='icon-btn'>
                            
                            <i className="fa-solid fa-edit add-btn" onClick={()=>editItems(curElem.id)}></i>
                            <i className="fa-solid fa-trash add-btn" onClick={()=>deleteItems(curElem.id)}></i>
                            </div>
                            </div><br />
                            </>
                            
                            );
                           })}
                        </div>


                <div className='check'>
                <button className='button effect04' onClick={()=>removeAll()}>Remove all</button>
                </div>


                </div>
                
            </div>
        </>
    )
}

export default Todo;