// funct to check if the url is valid or not
export function isUrl(str){
    try{
        new URL(str);
        return true;
    }
    catch(e){
        return false;
    }
}

// function returning a function
function factory(string){
    return ()=>{
        console.log(`hello this is ${string}`);
    }
}
// if kind of gives a class like feature, where the created function can access the 
// original variables which were created in the father function(like during object creation
// in class). And now it can't modify the variables.
const vamp = factory("golu ");
// vamp();

// my custom nano id function , myCustomAlbhabet function is a function retunrnig a function, as in the original nanoid package

export function customAlphabet(characterSet,size){
    // function that returns the id of given size and chars selected from the character set
    return ()=>{
        const characters = characterSet.split('');
        let output = "";
        for(let i=0;i<size;i++){
            const index = Math.floor(Math.random()*characterSet.length);
            const char = characters[index];
            output+=char;
        }
        return output;
    }
}

//USAGE : 
// const idGenerator = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",5);
// const id = idGenerator();
// console.log(id);


// same thing could be done with class implementation 👇👇

// class Custom{
//     constructor(charSet,size){
//         this.charSet =charSet;
//         this.size= size;
//     }

//     nanoid(){
//         const characters = this.charSet.split('');
//         let output = "";
//         for(let i=0;i<this.size;i++){
//             const index = Math.floor(Math.random()*this.charSet.length);
//             const char = characters[index];
//             output+=char;
//         }
//         return output;
//     }
// }

// const generator = new Custom("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",5)

// console.log(generator.nanoid());