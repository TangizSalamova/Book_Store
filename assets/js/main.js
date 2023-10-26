import { ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {db} from "./firebase.js";
import  * as google from  "./searchaApi.js";

const bookNameInput = document.getElementById("bName");
const bookAuthorNameInput = document.getElementById("aName");
const bookImgUrlInput = document.getElementById("Burl");
const bookDescriptionInput = document.getElementById("dscrptn");
const bookCategoryInput = document.getElementById("bCategory");

let books = [];
let categories = [];
let contacts = [];

document.getElementById("makeSearchGoogle").addEventListener("click", (e)=>{
    e.stopPropagation()
 
    document.getElementById("searchResult").style.display = "block";
 
    google.makeARequest(document.getElementById("searchGoogleInput").value).then(answer =>{
       showSearchResults(answer);
        }
    );
 });

 function showSearchResults(results) {
    // console.log(results['items']['volumeInfo'])
    let searchTag = document.getElementById("searchResult");
 
    while (searchTag.firstChild) {
       searchTag.removeChild(searchTag.lastChild);
    }
 
    for (let resultKey in results['items']) {
 
       searchTag.insertAdjacentHTML('beforeend',
           ` <div class="result">
               <i class="fa-regular fa-clock"></i>
               <p id="res-${resultKey}">${results['items'][resultKey]['volumeInfo']['title']} ${results['items'][resultKey]['volumeInfo']['authors']}</p>
             </div>`)
    //    console.log(resultKey['volumeInfo']['title']);
 
       document.getElementById(`res-${resultKey}`).addEventListener("click", ()=>{
          bookNameInput.value = results['items'][resultKey]['volumeInfo']['title'];
          bookAuthorNameInput.value = results['items'][resultKey]['volumeInfo']['authors'];
          bookImgUrlInput.value = results['items'][resultKey]['volumeInfo']['imageLinks']['thumbnail'];
          bookDescriptionInput.value = results['items'][resultKey]['volumeInfo']['description'];
       })
    }
 
 
 }