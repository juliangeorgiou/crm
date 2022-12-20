import download from "./download-file.mjs"
//export button
let exportBtn = document.getElementById("export-btn")

exportBtn.addEventListener("click", () => {
    let salt = window.crypto.getRandomValues(new Uint8Array(16));
    passToEncryptionKey("password", salt).then(encryptionKey => {
        encryptData(JSON.stringify(clients), encryptionKey).then(ciphertext => {
            const saltAndCiphertext = concatArrayBuffers(salt, ciphertext)
            //TODO BASE64 ENCODING OF THE BUFFER (ENCRYPTED DATA) TO PUT IT IN A URL (ONLY WORKS WITH STRINGS)
            //Base64.encode
            download("clients " + Date() + ".json", saltAndCiphertext)
        }).catch( error => {
            console.error("encrypting data failed", error)
        })
    }).catch( error => {
        console.error("pass to encryption key failed", error)
    })
})

//import button with browser-built-in UI file selector
//takes the .json file and replaces the existing clients object with the selected file
// doesn't append existing clients cretead in current browser/session
let importBtn = document.getElementById("import-btn")

importBtn.addEventListener("change", () => {
    //file browser prompt is built-in within the browser
    //access selected file
    const selectedFile = document.getElementById('import-btn').files[0]
    console.log("Database imported")
    console.log(selectedFile)

    const reader = new FileReader();
    reader.onload = (e) => {
        repository.clients = JSON.parse(e.target.result)
        repository.saveToLocalStorage()
        refreshTable()
    };
    reader.readAsText(selectedFile);
})