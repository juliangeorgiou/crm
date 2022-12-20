import {Client} from "./model.js" 

//parameters name, notes create the UID and then create the client object
function createUid(repository) {
    return Math.max(...Object.keys(repository.clients).map(id => parseInt(id, 10))) + 1
}
export function registerClientCreateListener(repository){
    //createClient connect to input boxes
    const registerClientBtn = document.getElementById('registerbtn'); 

    //when clicking "Register client" take user input and assign that to the object.
    //click function
    registerClientBtn.addEventListener('click', (event) => {
        event.preventDefault()
        //declare vars for form input
        let nameInput = document.getElementById('reg-name-input').value;
        let emailInput = document.getElementById('reg-email-input').value;
        let phoneInput = document.getElementById('reg-phone-input').value;
        let notesInput = document.getElementById('reg-notes-input').value;
        console.log("Input boxes OK", nameInput, emailInput, phoneInput, notesInput)

        //create new client class with form input to create object
        const client = new Client(nameInput, emailInput, phoneInput, notesInput)
        repository.addClient(client)

        //confirm user created and clear text boxes
        let userCreatedPrompt = document.getElementById("user-created-prompt")
        userCreatedPrompt.style.display = "block"
        setTimeout(function hidePrompt(){
            userCreatedPrompt.style.display = "none"

            let nameInput = document.getElementById('reg-name-input');
            let emailInput = document.getElementById('reg-email-input');
            let phoneInput = document.getElementById('reg-phone-input');
            let notesInput = document.getElementById('reg-notes-input');

            nameInput.value = "";
            emailInput.value = "";
            phoneInput.value = "";
            notesInput.value = ""
        }, 1500)
    })
}

//declare vars for form input
let editNameInput = document.getElementById("edit-name-input")
let editEmailInput = document.getElementById("edit-email-input")
let editPhoneInput = document.getElementById("edit-phone-input")
let editNotesInput = document.getElementById("edit-notes-input")

//ILLEGAL create a global var client
//global variables are evil, if anywhere in the code the var clientToEdit is used, it might get overwritten by the load edit page function
let clientToEdit

//fucntion that gets triggered when the edit button is pressed
function loadEditPage(client) {
    clientToEdit = client
    //load edit page
    navigateTo("edit-client")
    // load client inside input boxes
    editNameInput.value = client.name
    editEmailInput.value = client.email
    editPhoneInput.value = client.phone
    editNotesInput.value = client.notes
}

//clicking "save changes" overwrites data into client
/*let saveClientChanges = document.getElementById("save-client-changes");

saveClientChanges.addEventListener("click", (event) => {
    event.preventDefault()
    let client = clientToEdit
    //use form input to change object
    client.name = editNameInput.value
    client.email = editEmailInput.value
    client.phone = editPhoneInput.value
    client.notes = editNotesInput.value

    //store object to localstorage each time a client is edited
    localStorage.setItem("clients", JSON.stringify(clients))

    //confirm changes were made
    let changesMadePrompt = document.getElementById("user-edited-prompt")
    changesMadePrompt.style.display="block"
    setTimeout(function hidePrompt() {
        changesMadePrompt.style.display="none"
    }, 1500)
})*/

//when clicking "Clients" or "back to clients list" clients-table is deleted and created again from object
//create a function to delete clients-table and create it again from the object
//call this function when "clients" or "back to clients list" is clicked

//delete clients-table function to be called when reloading clients list
function refreshTable(repository) {
    // Object.entries() gets key-value pairs Object.values() gets only values of object Object.keys() gets only keys
    //TODO: replace clients with repository
    let clientsArr = Object.entries(repository.clients)
    let clientsTable = document.getElementById("clients-table")

    clientsTable.replaceChildren(...clientsArr.map(uidAndClient => {
        const uid = uidAndClient[0]
        const client = uidAndClient[1]
        //create a row
        let row = document.createElement("tr")

        //create an edit button cell(td) in the row
        let editButton = document.createElement("td")
        editButton.innerText = "Edit"
        editButton.addEventListener("click", () => {
            loadEditPage(client)
        })
        row.appendChild(editButton)

        //create UID cell(td) in the row
        let uidElement = document.createElement("td")
        //assigns the data within the uidElement
        uidElement.innerText = uid
        //assign uidElement to the row
        row.appendChild(uidElement)

        //create name cell(td) in the row
        let nameElement = document.createElement("td")
        //assigns the data within the nameElement
        nameElement.innerText = client.name
        //assign nameElement to the row
        row.appendChild(nameElement)

        //create last contact cell(td) in the row
        let lContactElement = document.createElement("td")
        //assigns the data within the lContactElement
        lContactElement.innerText = client.lastContact
        //assign lContactElement to the row
        row.appendChild(lContactElement)

        //create email cell(td) in the row
        let emailElement = document.createElement("td")
        //assigns the data within the notesElement
        emailElement.innerText = client.email
        //assign notesElement to the row
        row.appendChild(emailElement)

        //create notes cell(td) in the row
        let phoneElement = document.createElement("td")
        //assigns the data within the notesElement
        phoneElement.innerText = client.phone
        //assign notesElement to the row
        row.appendChild(phoneElement)

        //create notes cell(td) in the row
        let notesElement = document.createElement("td")
        //assigns the data within the notesElement
        notesElement.innerText = client.notes
        //assign notesElement to the row
        row.appendChild(notesElement)

        return row
    }))
}

//create timestamps for later on when contact actions(email, sms, call) are taking place

let dateStorage = []
dateStorage.push(Date())

//anonymize

//TODO: ADD USER DATE CREATED
//TODO: USER LOGIN ONLINE AUTHENTICATION
//TODO: ONLINE ENCRYPTED SYNC
//TODO: ONLINE PAYMENTS
