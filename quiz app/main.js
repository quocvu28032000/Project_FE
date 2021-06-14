const data = [
    {
        question: 'Ngôn ngữ lập trình web fullstack là gì?',
        a:'Javascript',
        b:'PHP',
        c:'Java',
        d:'Python',
        correct: 'a'
    },

    {
        question: 'tam giác có bao nhiêu cạnh?',
        a:'1',
        b:'2',
        c:'3',
        d:'4',
        correct: 'c'
    },
    {
        question: 'hình vuông có bao nhiêu cạnh?',
        a:'2',
        b:'3',
        c:'4',
        d:'5',
        correct: 'c'
    },
    {
        question: 'what is your name?',
        a:'Vu',
        b:'Quy',
        c:'Viet',
        d:'Nam',
        correct: 'd'
    }
];

let arrValues = [];

const arrCorrect = [];
for(let i = 0; i < data.length; i++) {
    arrCorrect.push(data[i].correct);
}
console.log(arrCorrect);

let count = 0;

const question = document.querySelector('.question span');
const a = document.querySelector('#a_text');
const b = document.querySelector('#b_text');
const c = document.querySelector('#c_text');
const d = document.querySelector('#d_text');
const error = document.querySelector('p');
const nextBtn = document.querySelector('#next');
const returnBtn = document.querySelector('#return');
const submitBtn = document.querySelector('#submit');
const restartBtn = document.querySelector('#restart');
const form = document.querySelector('form');

function check() {
    if(count > 0 && count < data.length - 1) {
        nextBtn.classList.add('active');
        returnBtn.classList.add('active');
        returnBtn.style.display = 'block';
        nextBtn.style.display = 'block'
    }
    else if(count === data.length - 1){
        nextBtn.style.display = 'none';
        nextBtn.classList.remove('active');
        returnBtn.classList.remove('active');
    }
    else if(count === 0) {
        returnBtn.style.display = 'none';
        nextBtn.classList.remove('active');
        returnBtn.classList.remove('active');
    }
    
}

function run (index) {
    if(index < data.length) {
        question.innerHTML = `Question ${index+1}:${data[index].question}`;
        a.innerHTML = data[index].a;
        b.innerHTML = data[index].b;
        c.innerHTML = data[index].c;
        d.innerHTML = data[index].d;
    }
    const rs = document.querySelector('[name]:checked');
    if(rs) {
        rs.checked = '';
    }
    check();
}
run(count);

nextBtn.onclick = function () {
    const option = document.querySelector('[name]:checked');
    if(option){
        if(!arrValues[count]) {
            arrValues.push(option.value);
        }
        console.log(arrValues);
        if(count + 1 > 0 && count + 1 < data.length ) {
            count++;
            run(count);
            if(arrValues[count]){
                const rs = Array.from(document.querySelectorAll('[name]')).find(function (element) {
                    return element.value === arrValues[count];
                })
                rs.checked = 'checked';
            }
            else if (count === data.length - 1) {
                form.onclick = function () {
                    const element = document.querySelector('[name]:checked');
                    arrValues.push(element.value);
                    console.log(arrValues);
                }
            }
        }
        error.innerHTML = ''
    }
    
    else{
        error.innerHTML = 'Vui lòng chọn đáp án';
    }

    // AMAZING
    // form.onclick = function () {
    //     const element = document.querySelector('[name]:checked');
    //     arrValues[count] = element.value;
    //     console.log(arrValues);
    // }

}

returnBtn.onclick = function () {
    count--;
    run(count);
    const value = arrValues[count];
    if(value){
        const rs = Array.from(document.querySelectorAll('[name]')).find(function (element) {
            return element.value === value;
        })
        rs.checked = 'checked';
    }
    if(document.querySelectorAll('[name]:checked')){
        error.innerHTML = '';
    }

}
// AMAZING
form.onclick = function () {
    const element = document.querySelector('[name]:checked');
    arrValues[count] = element.value;
    console.log(arrValues);
}

submitBtn.onclick = function () {
    const options = document.querySelector('[name]:checked');
    if(options){
        let result = 0;
        console.log(arrValues);
        error.innerHTML = '';
        form.classList.add('clear');
        for(let i=0; i < data.length; i++){
            if(arrValues[i] === arrCorrect[i]){
                result++;
            }
        }
        console.log(result);
        submitBtn.classList.add('active');
        question.innerHTML = `Bạn đã làm đúng: ${result}/${data.length}`;
    }
    else{
        error.innerHTML = 'Vui lòng chọn đáp án';
    }
}

restartBtn.onclick = function(){
    submitBtn.classList.remove('active');
    form.classList.remove('clear');
    nextBtn.style.display = 'block';
    returnBtn.style.display = 'none';
    count = 0;
    arrValues = [];
    run(count);
}

