
console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')


messageOne.textContent = 'TEST'

weatherForm.addEventListener('submit', (E) => {
    E.preventDefault()

    const location= search.value

    console.log(location)

    fetch('/weather?address='+location).then((response) => {

    response.json().then((data) =>  {

        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            console.log(data)
            messageOne.textContent = data.Location
            messageTwo.textContent = data.Weather.desc


        }

    })

    })





    console.log(location)
})