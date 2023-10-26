export async function makeARequest(word) {
    let result = (await fetch(`https://www.googleapis.com/books/v1/volumes?q=${word}`)).json()
     return result;
 }