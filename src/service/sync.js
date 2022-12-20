//TODO function to concatenate iv and salt (arraybuffers)
function concatArrayBuffers(a, b) {
    let aAndB = new Uint8Array(a.byteLength + b.byteLength);
    aAndB.set(new Uint8Array(a), 0);
    aAndB.set(new Uint8Array(b),a.byteLength);
    return aAndB
}
//TODO split array buffer

function splitArrayBuffer(buffer, lengthOfFirstPart){
    const a = new Uint8Array(buffer.slice(0, lengthOfFirstPart));
    const b = new Uint8Array(buffer.slice(lengthOfFirstPart));
    return [a, b]
}

//TODO Turn password to encryptionKey
//todo: HTTPS IS NEEDED FOR UPLOADING DATABASE
function passToEncryptionKey(password, salt){
    let enc = new TextEncoder();
    let encodedPassword = enc.encode(password)
    //asynchronous function starts here

    return new Promise(resolve => {
        crypto.subtle.importKey(
            "raw",
            encodedPassword,
            "PBKDF2",
            false,
            ["deriveBits", "deriveKey"]
            //masterkey is like a coded lock box with keys for airbnbs
        ).then((masterKey) => {
            crypto.subtle.deriveKey(
                {
                    name: "PBKDF2",
                    salt: salt,
                    iterations: 100000,
                    hash: "SHA-256"
                },
                masterKey,
                {
                    name: "AES-CBC",
                    length: "256"
                },
                false,
                ["encrypt", "decrypt"]
                //encryptionkey is the key specifically made for the airbnb door
            ).then((encryptionKey) => {
                resolve(encryptionKey)
            })
        }).catch((error) => {
            console.error("Error while deriving key from password", error)
        })
    })
}

/*
//This is encrypting the clients database

 //synchronous
            const encoded = enc.encode(JSON.stringify(clients))
            const initializationVector = window.crypto.getRandomValues(new Uint8Array(16));
            crypto.subtle.encrypt(
                {
                    name: "AES-CBC",
                    initializationVector
                },
                encryptionKey,
                encoded
            ).then((ciphertext) => {
                console.log(ciphertext)
            })
* */

//TODO: Function that encrypts any string
function encryptData(dataToEncrypt, encryptionKey) {
    let enc = new TextEncoder();
    const encoded = enc.encode(dataToEncrypt)
    const initializationVector = window.crypto.getRandomValues(new Uint8Array(16));
    return new Promise ((resolve, reject) => {
        crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv: initializationVector
            },
            encryptionKey,
            encoded
        ).then((ciphertext) => {
            resolve(concatArrayBuffers(initializationVector, ciphertext))
        }).catch( error => {
            reject(error)
        })
    })
}

//TODO: decrypt database
//encryption and decryption rely on encryptionKey

//dataToDecrypt = "ciphertext" - dataToEncrypt = "plaintext"
function decryptData(dataToDecrypt, encryptionKey) {
    //todo inverse of cancatenating function
    const [initializationVector, cipherText] = splitArrayBuffer(dataToDecrypt, 16)
    return new Promise ( (resolve, reject) => {
        crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: initializationVector
            },
            encryptionKey,
            cipherText
        ).then((plaintext) => {
            resolve(plaintext)
        }).catch( error => {
            reject(error)
        })
    })
}

//encrypt data with a password
//Asynchronous operations need to be executed sequentially with the help of .then
/*let salt = window.crypto.getRandomValues(new Uint8Array(16));
passToEncryptionKey("password", salt).then(encryptionKey => {
    encryptData(JSON.stringify(clients), encryptionKey).then(ciphertext => {
        const saltAndCiphertext = concatArrayBuffers(salt, ciphertext)
        //up to here encryption is done and then decryption begins
        const [newSalt, newCipherText] = splitArrayBuffer(saltAndCiphertext, 16)
        //decrypt data with the same password
        //TODO fix issue where the same encryption key is used to decrypt data
        passToEncryptionKey("password", newSalt).then(encryptionKey => {

            decryptData(newCipherText, encryptionKey).then((plaintext) => {
                let enc = new TextDecoder();
                const clientsDecrypted = enc.decode(plaintext)
                console.log(clientsDecrypted)
            }).catch( error => {
                console.error("decryption failed", error)
            })

        }).catch( error => {
            console.error("pass to encryption key failed", error)
        })

    }).catch( error => {
        console.error("encrypting data failed", error)
    })
}).catch( error => {
    console.error("pass to encryption key failed", error)
})*/