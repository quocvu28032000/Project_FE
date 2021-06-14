const container = document.querySelector('.container');

const arrValue = [];

const endElements = document.querySelectorAll('.end span');
for (let i = 0; i < endElements.length; i++) {
    createValue(endElements[i], i);
}

function createValue(element, index) {
    element.textContent = Math.floor(Math.random() *5);
    arrValue[index] = element.textContent;
    let count = 0;
    for (let i = 0; i < arrValue.length; i++) {
        if(arrValue[i] === arrValue[index]) {
            count++;
        }
    }
    if(count <=2 ) {
        arrValue[index] = element.textContent;
    }
    else{
        createValue(element, index);
    }
}


container.onclick = function(e) {
    if(definedValue - dem > 0) {
        const element = e.target.closest('.box');
        element.classList.toggle('active');
        check();
    }
}

function restart() {
    restartBtn.onclick = function() {
        restartBtn.style.display = 'none';
        const elements = document.querySelectorAll('.box.defined');
        Array.from(elements).forEach(function(element) {
            return element.classList.remove('defined');
        })
        if(checkRs) {
            definedValue = 5;
            dem = 0;
            checkRs = false;
            checkValue = 0;
        }
        else{
            dem = 0;
            definedValue++;
            checkValue = 0; 
        }
        pElement.innerHTML  =  `Bạn có ${definedValue-dem}/${definedValue} luợt`;
    }
}

let definedValue = 5;
let dem = 0;
let checkValue = 0;
let checkRs = false;
const pElement = document.querySelector('p');
const restartBtn = document.querySelector('input');
pElement.innerHTML  = `Bạn có ${definedValue}/${definedValue} luợt`;

function check() {
    const count = document.querySelectorAll('.box.active');
    if(count.length === 2) {
        setTimeout(function() {
                count[0].classList.remove('active');
                count[1].classList.remove('active');
            },300);

        if(count[0].querySelector('.end').textContent === count[1].querySelector('.end').textContent) {
            checkValue++;
            setTimeout(function() {
                count[0].classList.add('defined');
                count[1].classList.add('defined');
            },300)
        }

        dem++;
        if(definedValue - dem === 0 && checkValue < endElements.length / 2) {
            pElement.innerHTML  =  `Bạn đã thua cuộc`;
            restartBtn.style.display = 'block'; 
            restart();
        }
        else if (definedValue - dem >= 0 && checkValue === endElements.length /2) {
            checkRs = true;
            restartBtn.style.display = 'block';
            pElement.innerHTML  =  `Bạn đã chiến thắng`;
            restart();
        }
        else{
            pElement.innerHTML =  `Bạn có ${definedValue-dem}/${definedValue} luợt`
        }
    }
}

function event(e) {
    alert(e);
    e.stopPropagation();
}

event('hello vu');
