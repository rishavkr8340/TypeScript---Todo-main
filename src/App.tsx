import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material"
import TodoItem from "./components/TodoItems"
import { useEffect, useState } from "react"
import { getTodos, saveTodos } from "./utils/features"

function App() {
  



  const [todos , setTodos] = useState<TodoItemType[]>(getTodos());

  const [title, setTitle] = useState<TodoItemType["title"]>("")

  useEffect(()=>{
     saveTodos(todos);
  },[todos])


  const completeHandler = (id : TodoItemType["id"]) : void => {
    
    const NewTodos : Array<TodoItemType> = todos.map(i => {
      if(i.id === id)
      {
        i.isCompleted = !i.isCompleted;
      }
      return i;
    })

    setTodos(NewTodos);
    saveTodos(todos);
  };


  const deleteHandler = (id : TodoItemType["id"]) : void => {
    const NewTodos : Array<TodoItemType> = todos.filter((i) => 
         i.id !== id
    )
    setTodos(NewTodos);
    saveTodos(todos);
  };

  const submitHandler = () : void => {
        const newTodo:TodoItemType = {
          title,
          isCompleted:false,
          id:String(Math.random() * 1000)
        }
        setTodos((prev)=>[...prev,newTodo]);
        saveTodos(todos);
        setTitle("");
   }

 
  const editHandler = (id : TodoItemType["id"] , Newtitle : TodoItemType["title"]) : void => {
    const NewTodos : Array<TodoItemType> = todos.map(i => {
      if(i.id === id)
      {
        i.title = Newtitle;
      }
      return i;
    })

    setTodos(NewTodos);
    saveTodos(todos);
  }  
  
  return (
    <Container maxWidth="sm" sx={{height:"85vh"}} >
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {
          todos.map((i) => (
            <TodoItem 
            completeHandler={completeHandler}
            deleteHandler ={deleteHandler }
            editHandler= {editHandler}
            key={i.id} 
            todo={i}
            ></TodoItem>
          ))
        }
      </Stack>
      <TextField 
      onChange={(e) => setTitle(e.target.value)}
      fullWidth 
      label={"New Task"}
      onKeyDown={(e)=>{
        if(e.key === "Enter" && title !== ""){
          submitHandler();
        }
      }} 
      >
      </TextField>
      <Button disabled={title === ""} onClick= {submitHandler } sx={{margin:"1rem 0"}} fullWidth variant="contained">ADD</Button>
    </Container>
  )
}

export default App
