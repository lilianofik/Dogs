'use strict'

const $ = document.querySelector.bind(document);

window.onload = function(){

    this.fetch('https://dog.ceo/api/breeds/list/all').
    then(r => r.json()).
    then(data => {

        Object.keys(data.message).forEach(creatButton);
        
    });

    onLogin( user => {

        if(user){
            //user just logged in
            $('#addCommentDiv').style.display = 'block';
            $('.signUpForm').style.display = 'none';
            $('.loginForm').style.display = 'none';
        }else{
            //user just logged out
            $('.loginForm').style.display = 'block';
            $('#addCommentDiv').style.display = 'none';
        }

    });

    $('#signUpLink').onclick = function() {

        $('.signUpForm').style.display = 'block';
        $('.loginForm').style.display = 'none';

    }

    $('#loginLink').onclick = function() {

        $('.signUpForm').style.display = 'none';
        $('.loginForm').style.display = 'block';

    }

    $('#loginButton').onclick = function() {

        login( $('#emailInputLogin').value, $('#passwordInputLogin').value )
        .catch( err => $('.error').innerText = err.message );

    }

    $('#signInButton').onclick = function() {

        signup( $('#emailInputSignUp').value, $('#passwordInputSignUp').value )
        .catch( err => $('.error').innerText = err.message );

    }

    $('#addCommentBtn').onclick = function() {

        addComment($('#newComment').value)
        .then( () => {
            createComment({comment: $('#newComment').value});
            $('#newComment').value = '';
        })
        .catch( err => $('.error').innerText = err.message );

    }

    $('#slattbratha').onclick = function() {
        logout();
    }

    forEachComment( createComment );

};

function createComment( doc ){
    var div = document.createElement('div');
    div.innerText = doc.comment;
    div.className = 'comment';
    $('#comments').appendChild(div);
}

function showImage(event) {

    var breed = this.innerHTML;

    var previouslySelected = $('.selected');

    if(previouslySelected) {
        previouslySelected.className = 'eachButton';
    }

    this.classList.add("selected");

    fetch(`https://dog.ceo/api/breed/${breed}/images/random`).
    then(r => r.json()).
    then(data => {
        $('#choice').innerHTML = `You Chose ${breed} :)`;
        $('#pic').src = data.message;

    });
}

function creatButton(txt) {
    var btn = document.createElement('button');
    btn.innerHTML = txt;

    btn.classList.add("eachButton");

    $('#buttons').appendChild(btn);
    btn.onclick = showImage;
}
