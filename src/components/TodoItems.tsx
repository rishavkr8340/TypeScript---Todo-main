import { Checkbox, Paper, Typography ,Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

type PropsType = {
    todo: TodoItemType;
    deleteHandler : (id : TodoItemType["id"]) => void;
    completeHandler : (id : TodoItemType["id"]) => void;
    editHandler : (id : TodoItemType["id"] , Newtitle : TodoItemType["title"]) => void;
}

function TodoItem(
    { 
        todo ,
        deleteHandler ,
        completeHandler ,
        editHandler,
    }: PropsType) {
    
    const [editActive,setEditActive] = useState<boolean>(false);

    const [textVal, setTextVal] = useState<TodoItemType["title"]>(todo.title)
    
    return (
        <Paper sx={{
            padding: "1rem"
        }} >
            <Stack direction={"row"} alignItems={"center"}>
               {editActive ? (
                    <TextField 
                    value={textVal} 
                    onChange={(e)=> setTextVal(e.target.value)}
                    onKeyDown={ (e) => {
                            if(e.key === "Enter" && textVal !== ""){
                                editHandler(todo.id,textVal);
                                setEditActive(false);
                            }   
                        }
                    }
                    ></TextField>
                ) : (
                    <Typography marginRight={"auto"}>
                    {
                        todo.title
                    }
                </Typography>
                )
               }
                <Checkbox
                checked={todo.isCompleted}
                onChange={()=>completeHandler(todo.id)}
                ></Checkbox>
                <Button onClick={()=>deleteHandler(todo.id)} sx={{opacity:0.5}} >Delete</Button>
                <Button
                 sx={{fontWeight:"600"}}
                 onClick={ () => {
                    editHandler(todo.id,textVal);
                    setEditActive(!editActive)
                }}
                 >{
                    editActive ? "SUBMIT" : "EDIT"
                 }</Button>
            </Stack>
        </Paper>
    )
}

export default TodoItem;