'use strict'

const $ = document.querySelector.bind(document);

window.onload = function(){

    this.fetch('https://dog.ceo/api/breeds/list/all').
    then(r => r.json()).
    then(data => {

        Object.keys(data.message).forEach(creatButton);

    });

};

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
