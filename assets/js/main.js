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

class Book {
   name;
   author;
   imgUrl;
   description;
   category;
 
   constructor(name, author, imgUrl, desc, category) {
     this.name = name;
     this.author = author;
     this.imgUrl = imgUrl;
     this.description = desc;
     this.category = category;
     
   }
 }

function showBooks(myBooks){
   let booksTable = document.getElementById("books-tbody");
   if(myBooks === undefined || myBooks === null || myBooks.length === 0){
      return;
   }
   while (booksTable.firstChild) {
      booksTable.removeChild(booksTable.lastChild);
   }



   for (let i in myBooks) {
      booksTable.insertAdjacentHTML('beforeend',
          `<tr id="bookId-${i}">
              <td>${Number(i)+1}</td>
              <td>${myBooks[i].name}</td>
              <td>${myBooks[i].description.substring(0,100)}...</td>
              <td>${myBooks[i].category}</td>
              <td>${myBooks[i].author}</td>

            </tr>`);
   }
}

function showContactUs(contactList) {
   const contactTable = document.getElementById("contact-tbody");
   if(contacts === undefined || contacts === null || contacts.length === 0){
      return;
   }

   while (contactTable.firstChild) {
      contactTable.removeChild(contactTable.lastChild);
   }

   let number = 0;
   for (let i in contactList) {
      contactTable.insertAdjacentHTML('beforeend',
          `<tr id="contactId-${i}">
              <td>${number+=1}</td>
              <td>${contactList[i].fullName}</td>
              <td>${contactList[i].address}</td>
              <td>${contactList[i].email}</td>
              <td>${contactList[i].phoneNumber}</td>
            </tr>`);
   }


}

function showCategories(category) {
   let selectCatTag = document.getElementById("bCategory");
   if(category===undefined || category === null || category.length ===0){
      return;
   }

   while (selectCatTag.firstChild) {
      selectCatTag.removeChild(selectCatTag.lastChild);
   }

   for (let i in category) {
      if(i === String(category.length-1)){
         selectCatTag.insertAdjacentHTML('beforeend',
             `<option value="${i}" selected>${category[i]}</option>`)
         break;
      }
      selectCatTag.insertAdjacentHTML('beforeend',
          `<option value="${i}">${category[i]}</option>`)

   }
}

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
             </div>
             `)
 
       document.getElementById(`res-${resultKey}`).addEventListener("click", ()=>{
          bookNameInput.value = results['items'][resultKey]['volumeInfo']['title'];
          bookAuthorNameInput.value = results['items'][resultKey]['volumeInfo']['authors'];
          bookImgUrlInput.value = results['items'][resultKey]['volumeInfo']['imageLinks']['thumbnail'];
          bookDescriptionInput.value = results['items'][resultKey]['volumeInfo']['description'];

       })
    }
 
   
  }


  

 function cleanBookForm() {
   bookNameInput.value = "";
   bookAuthorNameInput.value = "";
   bookImgUrlInput.value = "";
   bookDescriptionInput.value = "";
   bookCategoryInput.value = "";
}


 document.getElementById("bookForm").addEventListener("submit", e=>{
   e.preventDefault();

   books.push(new Book(bookNameInput.value, bookAuthorNameInput.value,
       bookImgUrlInput.value, bookDescriptionInput.value, bookCategoryInput.value));

    console.log(books);

   set(ref(db, '/Catalog'), books);

   let oldBooks;
  

   get(ref(db, '/Catalog')).then(snapshot=>{
      oldBooks = snapshot.val();
      if(oldBooks!==null){
         books = oldBooks;
         showBooks(books);
      }else{
         showBooks([])
      }
      showSuccess("Book has been added!")
      cleanBookForm()
      
   });

   

});



window.addEventListener("load", (event) => {


   get(ref(db, '/userData')).then(snapshot=>{
      const joinArray = snapshot.val();
      let number = 0;
      if(joinArray !== null){
         for (let i in joinArray) {
            document.getElementById("join-tbody").insertAdjacentHTML(
                'beforeend',
                `<tr id="joinId-${i}">
              <td>${number = number+1}</td>
              <td>${joinArray[i].userName}</td>
              <td>${joinArray[i].email}</td>

            </tr>`);
         }
      }
   });

   get(ref(db, '/contactDatas')).then(snapshot=>{
      const oldContacts  = snapshot.val();
      if(oldContacts !== null){
         contacts = oldContacts;
         showContactUs(contacts);
         //addContactUsDeleteEventListeners(contacts)
      }else{
         showContactUs([])
      }
   });

   get(ref(db, '/Catalog')).then(snapshot=>{
      const oldBooks = snapshot.val();
      if(oldBooks!==null){
         books = oldBooks;
         showBooks(books);
         deleteBooks(books);
      }else{
         showBooks([])
      }
   });
})

class AboutUs {
   title;
   description;
   imgSrc;
 
   constructor(title, desc, imgSrc) {
     this.title = title;
     this.description = desc;
     this.imgSrc = imgSrc;
   }
 }

document.getElementById("aboutUsForm").addEventListener("submit", (e)=>{
   e.preventDefault()
   const aboutUs = new AboutUs(document.getElementById("titleAbout").value,
       document.getElementById("descAboutUs").value, document.getElementById("imgUrlAbout").value);

   set(ref(db, "/aboutUs"), aboutUs);

   showSuccess("About us has been edited!")
});

