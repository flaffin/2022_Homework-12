'use strict';

const btnRegisterUser = document.querySelector('#registerUser'),
listUser = document.querySelector('#list'),
month = ['января', 'февраля', 'марта', 'апереля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
btnloginUser = document.querySelector('#login'),
nameUser = document.querySelector('#username'),
date = new Date(),
dateDay = date.getDate(),
dateMonth = date.getMonth(),
dateYear = date.getFullYear(),
dateTimeHours =date.getHours(),
dateTimeMinutes =date.getMinutes(),
dateTimeSeconds =date.getSeconds();


let userBase = [];

window.addEventListener('load', function(){
    userBase = JSON.parse(localStorage.getItem('Зарегистрированные пользователи'));
   render();
});


btnRegisterUser.addEventListener('click', function(){

    let nameLastname =prompt('Введите Имя и Фамилию, через пробел', 'Андрей Иванов');
    nameLastname= nameLastname.split(' ');
    console.log(nameLastname);
    if (nameLastname.length >2){
        alert('Введите только Имя и Фамилию');
        return;
    }

    let userLogin = prompt('Введите логин пользователя', 'Ivan');
    let userPass = prompt('Введите пароль пользователя', '12345');
    nameLastname.push(userLogin);
    nameLastname.push(userPass);
       
    const newUserBase = {
        Name: nameLastname[0],
        LastName: nameLastname[1],
        Login: nameLastname[2],
        Pass: nameLastname[3],
        RegistrayionDate: dateDay + ' ' +  month[dateMonth] + ' ' + dateYear + 'г.' ,
        RegistrationTime: dateTimeHours + ':' + dateTimeMinutes + ':' + dateTimeSeconds ,
    };

    userBase.push(newUserBase);

    let json = JSON.stringify(userBase);
 localStorage.setItem('Зарегистрированные пользователи',json);
    render();
});


btnloginUser.addEventListener('click', function(){
    let userLoginVerify = prompt('Введите логин пользователя', 'Ivan');
    let userPassVerify = prompt('Введитеnt пароль', '12345');

    if (userBase.find(item => item.Login === userLoginVerify && item.Pass === userPassVerify)){
        console.log('привет');
        nameUser.innerHTML = userLoginVerify;
    } else {
        alert('Пользователь не зарегистрирован!!!');
    }

});

const render = function(){ 
    listUser.textContent = '';
    userBase.forEach(function(item){

        const li = document.createElement('li');
         li.classList.add('.user-Base');
        
        let registrationString = ' Имя: ' + item.Name + ', ' + ' Фамилия: ' + ', ' + item.LastName + '. Зарегистрирован: '+ item.RegistrayionDate + ', ' + item.RegistrationTime + '  ';
        li.innerHTML = '<span class="user-Base">' + registrationString  + '</span>' +
        // '<div>' +
        '<button class="remove" style="width: 100px; background:LightCyan; font-size: 10pt; position: absolute; right: 30%">Удалить</button>' + 
        // '<div>' + 
        '</div>';
        listUser.append(li);

        const userBaseRemove = li.querySelector('.remove');
        userBaseRemove.addEventListener('click', function(){
        
            let userBaseIndex = userBase.indexOf(item);
            userBase.splice(userBaseIndex,1);
            let json = JSON.stringify(userBase);
            localStorage.setItem('Зарегистрированные пользователи',json);
           render();
        });
    });

};
