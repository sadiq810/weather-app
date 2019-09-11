console.log('Client side javascript loaded.');


let form = document.querySelector('form');
let input = document.querySelector('input');
let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading ....';
    messageTwo.textContent = '';

    fetch('/weather?address='+input.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.address;
                messageTwo.textContent = data.forecast;
            }
        });
    });
})