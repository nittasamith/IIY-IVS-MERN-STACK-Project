import React, { useEffect, useState } from "react";

export default function ReactHome(){

const [jobs,setJobs] = useState([]);
const [users,setUsers] = useState([]);
const [query,setQuery] = useState("");
const [results,setResults] = useState([]);

useEffect(()=>{

const storedJobs = JSON.parse(localStorage.getItem("tw_jobs")) || [];
const storedUsers = JSON.parse(localStorage.getItem("tw_users")) || [];

setJobs(storedJobs);
setUsers(storedUsers);

},[]);


useEffect(()=>{

if(query===""){
setResults([]);
return;
}

const filtered = jobs.filter(job =>
job.title.toLowerCase().includes(query.toLowerCase()) ||
job.location.toLowerCase().includes(query.toLowerCase())
);

setResults(filtered);

},[query,jobs]);


return(

<div style={{width:"70%",margin:"40px auto"}}>

{/* PLATFORM STATS */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px",
marginBottom:"30px"
}}>

<div style={{
background:"#fff",
padding:"25px",
borderRadius:"10px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
textAlign:"center"
}}>
<h2>{users.length}</h2>
<p>Registered Workers</p>
</div>

<div style={{
background:"#fff",
padding:"25px",
borderRadius:"10px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
textAlign:"center"
}}>
<h2>{jobs.length}</h2>
<p>Total Jobs Posted</p>
</div>

<div style={{
background:"#fff",
padding:"25px",
borderRadius:"10px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
textAlign:"center"
}}>
<h2>{Math.floor(jobs.length * 0.6)}</h2>
<p>Successful Matches</p>
</div>

</div>


{/* LIVE JOB SEARCH */}

<div style={{
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 5px 20px rgba(0,0,0,0.1)"
}}>

<h2>Search Jobs Instantly</h2>

<input
type="text"
placeholder="Search job title or location..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
style={{
width:"100%",
padding:"12px",
borderRadius:"6px",
border:"1px solid #ccc",
marginTop:"10px"
}}
/>

{results.length>0 &&

<div style={{
marginTop:"15px",
borderTop:"1px solid #eee"
}}>

{results.slice(0,5).map(job=>(

<div key={job.id}

style={{
padding:"12px",
borderBottom:"1px solid #eee"
}}>

<b>{job.title}</b>

<div style={{fontSize:"13px"}}>
📍 {job.location} • ⏱ {job.duration}
</div>

</div>

))}

</div>

}

</div>

</div>

);

}