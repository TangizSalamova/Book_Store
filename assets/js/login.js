import { ref, set, onValue, get, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {db} from "./firebase.js";

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("pass");

window.addEventListener("load", ()=>{
    const loginAcc = JSON.parse(sessionStorage.getItem("log"));
    if(loginAcc !== null){
        usernameInput.value = loginAcc.username;
        passwordInput.value = loginAcc.password;
    }
});

document.getElementById("login").addEventListener("submit", e=>{
    e.preventDefault();

    get(ref(db, 'adminLogin')).then(snapshot =>{
        const loginAcc = snapshot.val();
        if(usernameInput.value === loginAcc.username && passwordInput.value === loginAcc.password){
            sessionStorage.setItem("log", JSON.stringify(loginAcc));
            location.replace("../assets/Pages/adminPanel.html");
        }else{
            document.getElementById("login").insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert" id="dangerZone">
               Username or password is wrong!
            </div>`);
        }
    });

});