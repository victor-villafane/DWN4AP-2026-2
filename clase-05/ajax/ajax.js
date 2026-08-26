import { Worker } from "worker_threads"

function A(){
    console.log("A")
}

function B(){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            const worker = new Worker("./ajax/worker.js")
            worker.on( "message", ( mensaje ) => console.log(mensaje) )
            worker.on( "error", ( mensaje ) => console.log(mensaje) )
            const ok = true
            if( ok ){
                resolve("B")
            }else{
                reject(":(")
            }
        }, 2000 )
    } )
}

function C(){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            const ok = true
            if( ok ){
                resolve("C")
            }else{
                reject(":(")
            }
        }, 2000 )
    } )
}

function D(){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            const ok = true
            if( ok ){
                resolve("D")
            }else{
                reject(":(")
            }
        }, 2000 )
    } )
}

// A()
// B() //callback hell
    // .then( (mensaje) => {
    //     console.log(mensaje)
    //     C()
    //         .then( (mensaje) => {
    //             console.log(mensaje)
    //             D()
    //                 .then( (mensaje) => console.log(mensaje) )
    //                 .catch( err => console.log(err) )
    //         } )
    //         .catch( err => console.log(err) )
    // } )
    // .catch( err => console.log(err) )
    // .then( (mensaje) => {
    //     console.log(mensaje)
    //     return C()
    // } )
    // .then( (mensaje) => {
    //     console.log(mensaje)
    //     return D()
    // } )
    // .then( (mensaje) => console.log(mensaje) )
    // .catch( err => console.log(err) )    
// C()
// D()

// fetch( "https://hp-api.onrender.com/api/characters" )
//     .then( res => res.json() )
//     .then( personajes => console.log(personajes) )
//     .catch( err => console.log(err) )

async function ABCD(){
    try {
        A()
        const BB = await B()
        console.log(BB)
        const CC = await C()
        console.log(CC)
        const DD = await D()
        console.log(DD)
    } catch (error) {
        console.log(error)
    }
}
// console.log("inicio")
ABCD()
// console.log("fin")
// const array = []
// array.push( B() )
// Promise.all( [ B(), C(), D() ] )
//     .then( res => console.log(res) )
//     .catch( err => console.log(err) )