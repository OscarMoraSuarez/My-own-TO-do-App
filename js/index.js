const send=document.querySelector('.send');
const todoList=new TodoList();
const taskul=document.querySelector('.task-ul');
const removeCompleted=document.querySelector('.remove-completed');
const divfilters=document.querySelector('.filters');
const anchorfiltros=document.querySelectorAll('.anchor');/* estos son lops anchor */
const pendientes=document.querySelector('.pending');/* aca voy a mostrar los pendientes */
todoList.todos.forEach(buildTodoHtml);


send.addEventListener('click',setValues);
function setValues(){

    const todoName = document.querySelector('.todoname').value;
    const todoDescription = document.querySelector('.todoDescription').value;
    if (todoName.length > 0 && todoDescription.length > 0){

        const newTodo=new todoClass(todoName,todoDescription);
              todoList.addTodo(newTodo);             
              buildTodoHtml(newTodo);  
        

    }else{

        alert('por favor rellene los campos');

    }
    
    document.querySelector('.todoname').value = "";
    document.querySelector('.todoDescription').value = "";
    location.reload()
}


function buildTodoHtml(newTodo){

    const todoLi=document.createElement('li');
    const divTask=document.createElement('div');
    todoLi.classList.add('task-li');
    divTask.classList.add('task');
    const htmlContent=`<div class="main-task ${(newTodo.completed)?'completed':''}" data-id="${newTodo.id}">
                
                            <div class="checkbox"><input type="checkbox" ${(newTodo.completed) ? 'checked' : ''} name="" id=""> </div>
                            <div class="task-data">
                                <span class="date"> <em class="items">date:</em>${newTodo.date}</span>
                                <span class="name"> <em class="items">name:</em>${newTodo.name}</span>
                                <span class="description"><em class="items">description:</em>${newTodo.description}</span>
                            </div>
                            <div class="button">
                                <button>
                                    
                                    <img style='width:18px' src="./Assets/img/remove-svgrepo-com.svg" alt="">
            
                                </button> 
                            </div>

                       </div>`;
                       
    divTask.innerHTML=htmlContent;                   
    todoLi.append(divTask);
    taskul.append(todoLi);


}
taskul.addEventListener('click',(event)=>{

   const elementname = event.target.localName;
   
   const taskli=event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    let divMainTask = event.target.parentElement.parentElement;
    let id = divMainTask.getAttribute('data-id');
    
      if(elementname.includes('input')){

        
        
        
        todoList.markCompleted(id);
        console.log(id);
        divMainTask.classList.toggle('completed');  
        
       
        


    }else if(elementname.includes('img')){
          
        let divMainTask = event.target.parentElement.parentElement.parentElement;
          let id = divMainTask.getAttribute('data-id');
        console.log(divMainTask);
        
        todoList.eliminarTodo(id);
        taskul.removeChild(taskli); 

    }  


});

removeCompleted.addEventListener('click',()=>{

    /* si se barre el arreglo de adelante hacia atras cuando se borre algún elemento
    los indices habran cambiado al eliminar algun elemento, pero si se hace de atrás hacia adelante, los indices seguiran 
    los constantes */
     todoList.eliminarCompletados();
    
        for(let i=taskul.children.length-1;i>=0;i--){

            
            const elemento = taskul.children[i].firstElementChild.firstElementChild;
            console.log(elemento);
            const taskli=elemento.parentElement.parentElement;
            console.log(taskli);
            if(elemento.classList.contains('completed')){

                taskul.removeChild(taskli);

            }
        }


});

divfilters.addEventListener('click',(event)=>{
    
   
    const filtro=event.target.text;
    anchorfiltros.forEach(element=>element.classList.remove('active'));
    event.target.classList.add('active');
    if(!filtro){return;}


    
    
  
    for (const element of taskul.children) {
        element.classList.remove('hidden');
        const completado=element.firstElementChild.firstElementChild.classList.contains('completed'); 
                
         switch (filtro) {
           case 'completed':
               if(!completado){

                   element.classList.add('hidden');
               }             
               break;
       
           case 'pending':
               if (completado) {

                   element.classList.add('hidden');

               }
               break;

           default:
               break;
       }  
     } 
    


})

const countPendingTasks=()=>{

   const taskli=taskul.children;
   const completedtasks=[];                       
    for(i=0;i<=taskli.length-1;i++){

        const elemento = taskli[i].firstElementChild.firstElementChild
           if(elemento.classList.contains('completed')){

                completedtasks.push(i);

           }         

    }
    const pendingTasks = todoList.todos.length - completedtasks.length;
    pendientes.innerText=`pendientes ${pendingTasks}`;

}
window.addEventListener("load", countPendingTasks );