class TodoList{

    constructor(){

        /* this.todos=[];  */
        this.getTodos();
    }

    addTodo(todo){

        this.todos.push(todo);
        this.saveTodos();
        /* console.log(this.todos); */
    }

    saveTodos(){

        localStorage.setItem('todos',JSON.stringify(this.todos));

    }
    markCompleted(id) {

        for (const todo of this.todos) {

            if (id == todo.id) {

                todo.completed = !todo.completed;
                this.saveTodos();
                break;
            }

        }


    }
    
    eliminarTodo(id) {
      
         this.todos = this.todos.filter(todo => todo.id !=id)/* regresare un nuevo arreglo excluyendo el todo del id */
         this.saveTodos();
    }

    eliminarCompletados(){

        this.todos=this.todos.filter(todo=>!todo.completed);
        this.saveTodos();
    }

    getTodos(){

        this.todos=(localStorage.getItem('todos'))?JSON.parse(localStorage.getItem('todos')):[];
        
    }
     
    getPendientes(){

       const pendientes=this.todos.filter(todo=>todo.completed==false);
        return pendientes.length; 
    }


}
