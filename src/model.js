//a space to create all classes without any functionality

//ORDER
//create order class (date of order, products included, client associated)
//TODO: connect product and client to order
class Order{
    constructor(date, name, uid){
        this.date = date
        this.name = name
        this.uid = uid
    }
}

/*example of creating a new order by calling the constructor
let order 1 = new Order (Date(), pName, client.uid)
*/

//PRODUCT
//create product class - a representation of the product inside of the app - it doesn't matter which database is being used
class Product {
    constructor(name, pDescription, pPrice){
        this.name = name
        this.pDescription = pDescription
        this.pPrice = pPrice
    }
}

/*example of creating a new product
let product1 = new Product("Annual tax", "2022", 250)
example of creating a new product with input from html elements
let product1 = new Product(pNameInput, pDescInpit, pPriceInput)*/


//CLIENT
//create client class - a representation of the client inside of the app - it doesn't matter which database is being used
export class Client {
    constructor(name, email, phone, notes){
        this.name = name
        this.lastContact = Date()
        this.email = email
        this.phone = phone
        this.notes = notes
        this.uid = createUid()
    }
}

//a repository class manages the storage of a model
// a repository is the interface to a database - like this when you change the database you'd only have to change the repository code, but not the models themselves
export class Repository{
    constructor(){
        this.clients = {}
    }
    saveToLocalStorage(){
        //localstorage only takes strings hence, stringify will be needed
        localStorage.setItem("data", JSON.stringify({
            clients: this.clients
        }))
    }
    addClient(client){
        this.clients[client.uid] = client
        this.saveToLocalStorage()
    }
    //specs: static(to create a repository, not to call it from an existing repository)
    static loadFromLocalStorage(){
        //load clients database from local storage
        let retrievedData = localStorage.getItem("data");
    
        //check whether retrievedClients returns undefined, if yes, create object, if not, parse it
        let repository = new Repository()
        if (retrievedData != null) {
            const {clients} = JSON.parse(retrievedData)
            repository.clients = clients
        }
        return repository
    }
}