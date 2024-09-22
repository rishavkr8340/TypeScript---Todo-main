export const saveTodos = (todos : TodoItemType[]): void => {
    localStorage.setItem("mytodos" , JSON.stringify(todos));
} 

export const getTodos = () : Array<TodoItemType> => {
    const todos = localStorage.getItem("mytodos")

    return todos ? JSON.parse(todos) : [];

}