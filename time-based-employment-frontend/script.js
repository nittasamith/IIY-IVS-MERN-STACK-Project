const API = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", () => {

setupRegister();
setupLogin();
updateAuthUI();

postJob();
loadJobs();
applyJob();

loadNotifications();
setupLanguage();

});


/* REGISTER */

function setupRegister(){

const btn=document.getElementById("registerBtn");
if(!btn) return;

btn.onclick=async()=>{

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const pass=document.getElementById("password").value;
const confirm=document.getElementById("comfirmpassword").value;

const role=document.querySelector("input[name='role']:checked");

if(!name||!email||!pass||!role){
alert("Fill all fields");
return;
}

if(pass!==confirm){
alert("Passwords do not match");
return;
}

const res = await fetch(`${API}/users/register`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
name,
email,
password:pass,
role:role.value
})
});

const data = await res.json();

if(res.ok){
alert("Registration successful");
window.location="userlogin.html";
}
else{
alert(data.message||"Registration failed");
}

};

}


/* LOGIN */

function setupLogin(){

const btn=document.querySelector(".login-form-btn");
if(!btn) return;

btn.onclick=async()=>{

const email=document.getElementById("loginEmail").value;
const pass=document.getElementById("loginPassword").value;

const res = await fetch(`${API}/users/login`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
email,
password:pass
})
});

const data = await res.json();

if(!res.ok){
alert("Invalid credentials");
return;
}

localStorage.setItem("tw_current_user",JSON.stringify(data.user));
localStorage.setItem("tw_token",data.token);

window.location="homepage.html";

};

}


/* NAVBAR AUTH */

function updateAuthUI(){

let authArea=document.getElementById("authArea");
if(!authArea) return;

let user=JSON.parse(localStorage.getItem("tw_current_user"));

if(user){

authArea.innerHTML=`
<span class="profile">Hello ${user.name}</span>
<button id="logoutBtn" class="login-btn">Logout</button>
`;

document.getElementById("logoutBtn").onclick=()=>{
localStorage.removeItem("tw_current_user");
localStorage.removeItem("tw_token");
location.reload();
};

}

}


/* POST JOB */

function postJob(){

const btn=document.getElementById("postJobBtn");
if(!btn) return;

btn.onclick=async()=>{

const title=document.getElementById("jobTitle").value;
const location=document.getElementById("jobLocation").value;
const duration=document.getElementById("jobDuration").value;
const wage=document.getElementById("jobWage").value;
const desc=document.getElementById("jobDescription").value;

if(!title||!location||!duration||!wage){
alert("Fill job details");
return;
}

const res = await fetch(`${API}/jobs`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
title,
location,
duration,
wage,
description:desc
})
});

if(res.ok){

addNotification("New Job Posted: "+title);

alert("Job posted successfully");

location.reload();

}

};

}


/* LOAD JOBS */

async function loadJobs(){

let container=document.getElementById("jobList");
if(!container) return;

const res = await fetch(`${API}/jobs`);

const jobs = await res.json();

container.innerHTML="";

if(jobs.length===0){
container.innerHTML="<p>No jobs available</p>";
return;
}

jobs.forEach(job=>{

container.innerHTML+=`

<div class="job-card">

<div class="job-left">

<div>
<div class="job-title">${job.title}</div>
<div class="job-meta">${job.location} • ${job.duration}</div>
</div>

</div>

<div>

₹${job.wage}

<button class="apply-btn" data-id="${job._id}">
Apply
</button>

</div>

</div>

`;

});

}


/* APPLY JOB */

function applyJob(){

document.addEventListener("click",async(e)=>{

if(!e.target.classList.contains("apply-btn")) return;

let user=JSON.parse(localStorage.getItem("tw_current_user"));

if(!user){
alert("Please login first");
return;
}

let id=e.target.dataset.id;

const res = await fetch(`${API}/applications`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
job:id,
worker:user._id
})
});

if(res.ok){

addNotification("Application submitted");

e.target.innerText="Applied";
e.target.disabled=true;

}

});

}


/* NOTIFICATIONS */

function addNotification(msg){

let notes=JSON.parse(localStorage.getItem("tw_notifications"))||[];

notes.push({
message:msg,
date:new Date()
});

localStorage.setItem("tw_notifications",JSON.stringify(notes));

}

function loadNotifications(){

let container=document.getElementById("notificationList");
if(!container) return;

let notes=JSON.parse(localStorage.getItem("tw_notifications"))||[];

container.innerHTML="";

notes.reverse().forEach(n=>{

container.innerHTML+=`

<div class="card">

<div>
<div class="card-title">${n.message}</div>
<div class="card-text">${new Date(n.date).toLocaleString()}</div>
</div>

<span class="badge new">New</span>

</div>

`;

});

}


/* LANGUAGE SYSTEM */

function setupLanguage(){

const translations={

en:{home:"Home",findJobs:"Find Jobs",postJob:"Post Job",notifications:"Notifications"},
te:{home:"హోమ్",findJobs:"ఉద్యోగాలు",postJob:"ఉద్యోగం పోస్ట్ చేయండి",notifications:"నోటిఫికేషన్లు"},
hi:{home:"होम",findJobs:"नौकरियां",postJob:"नौकरी पोस्ट करें",notifications:"सूचनाएं"}

};

let lang=localStorage.getItem("tw_lang")||"en";

document.querySelectorAll("[data-translate]").forEach(el=>{
let key=el.dataset.translate;
if(translations[lang][key]){
el.innerText=translations[lang][key];
}
});

let selector=document.getElementById("languageSelector");

if(selector){

selector.value=lang;

selector.addEventListener("change",(e)=>{
localStorage.setItem("tw_lang",e.target.value);
location.reload();
});

}

}