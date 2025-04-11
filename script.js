// let arr = []
const baseURL = 'https://67f804312466325443eb919f.mockapi.io/todo' 

// function getList() {
//     fetch(URL),{
//         method:'GET',
//         headers:{
//             'content-type': 'application/json'
//         },
//     }
//     .then(res => res.json())
//     .then(data => showlist(data))
//     .catch(err => console.log('Error catching data', err))
// }
// getList()

async function getList() {
    const response = await fetch(baseURL)
    const data = await response.json()
    showList(data)
    
}
getList()

const list = document.querySelector('ul')
const text = document.getElementById('text') 

function showList(data) {
    let code = ''
    data.map(item => {
        code +=
        `
        <li>
            <div class="mx-auto border-b border-gray-300 p-3 flex justify-between">
                <span>${item.text}</span>
                <div>
                    <button onclick = "editTaskFromButton(this)" data-id="${item.id}" data-text="${item.text}" type="submit" class="text-white bg-blue-600 font-medium rounded-lg text-sm px-4 py-2 ">EDIT</button>
                    <button onclick = "removeTask(${item.id})" type="submit" class="text-white bg-gray-400 font-medium rounded-lg text-sm px-4 py-2 ">DELETE</button>
                </div>
            </div>
        </li>
        ` 
    })
    list.innerHTML = code
}

function editTaskFromButton(firstEdit) {
    const id = firstEdit.getAttribute('data-id')
    const text = firstEdit.getAttribute('data-text')
    editTask(id, text);
   
    
}

// my logical hottakes
// goruntunu bir defe burda yazirsan mentiq olaraq, ve sonrada elave et sil ve edit eti yazirsan.
// possible errors : "" - quotes after the onclick = / if there is it's - you should give me data-id and write inside first diff functiona nd the add your func ther
// if there isnull it means your value is empty so find why it is returning empty 

function addTask(){
    if (text.value != '') {
        fetch(baseURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                text: text.value
            })
        })
            .then(res => {
                if (res.ok) {
                    // eger server uguarla qebul edibse onda we upload we new data
                    getList()
                }
            })
    }else {
        alert('Please, fill the input!')
    }
    text.value = ''
}

function removeTask(id) {
    fetch(`${baseURL}/${id}`,{
        // /todo/5 - -mockapi code icindeki nmberdi
        method:'DELETE',
        headers:{
            'content-type': 'application/json'
        }
    })
    .then(res => {
        res.json()
        if (res.ok) {
            getList()
        }
    })
}
function editTask(id, text) {
    let pr = prompt('Please, add value to Update!', text)
    // prompt(message, defaultValue)
    // let userInput = prompt("What's your name?", "Turkan")

    if (pr != '' && pr != null) {
        fetch(`${baseURL}/${id}`,{
         method: 'PUT',
         headers: {
             'content-type': 'application/json'
         },
         body: JSON.stringify({text: pr})
         
        })
        .then(res =>{
        res.json()
            if (res.ok) {
                getList()
            } 
        } )
        
        
    }
}
