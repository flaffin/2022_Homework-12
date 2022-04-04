'use strict';

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoIist = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

window.addEventListener('load', function(){
    todoData = JSON.parse(localStorage.getItem('Все планы'));
    render();
});

const render = function(){ 

    todoIist.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' + 
        '</div>';
         todoIist.append(li);

        if (item.completed){
            todoCompleted.append(li);
        } else{
            todoIist.append(li);
        }
    const btnTodoComplete = li.querySelector('.todo-complete');

    btnTodoComplete.addEventListener('click', function(){
        item.completed = !item.completed; 
        let json = JSON.stringify(todoData);
        localStorage.setItem('Все планы',json);
        render();
    });
    
    const todoRemove = li.querySelector('.todo-remove');

    todoRemove.addEventListener('click', function(){

        let todoDataIndex = todoData.indexOf(item);
        todoData.splice(todoDataIndex,1);
        let json = JSON.stringify(todoData);
        localStorage.setItem('Все планы',json);
        render();

    });
     });
};

todoControl.addEventListener('submit', function(event){
event.preventDefault();

if (headerInput.value == ''){
    alert('Добавьте новое дело');
} else{
const newTodo = {
    value: headerInput.value,
    completed: false
};

todoData.push(newTodo);
let json = JSON.stringify(todoData);
localStorage.setItem('Все планы',json);
render();
headerInput.value ='';
}
});

render();