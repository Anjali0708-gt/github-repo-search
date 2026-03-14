import { useState,useEffect } from "react";
import "./App.css"
import axios from 'axios';
function App()
{
  const[input,setinput]=useState("");
  const[data,setdata]= useState([]);
  const[error,seterror]= useState(false);
   async function displaydata(e)
   {
    
    e.preventDefault();
    try
    {
      seterror(false)
    if(input.trim()==="")
    {
      alert("enter the value")
       setdata([]);
       return;

    }
    else
    {
      

      const API_URL =
        `https://api.github.com/search/repositories?q=${input}&sort=stars&order=desc&per_page=10`;

      const res= await axios.get(API_URL); 
      setdata(res.data.items);
      

    }
  }
    catch(e)
    {
      console.log(e.message)
      seterror(true);
    }
   }
  return(
    <>
    
    <div className="form-container">
    <form onSubmit={displaydata}>
      <input type="text" value={input} placeholder="enter technology name" onChange={(e)=> setinput(e.target.value)} />
      <button type="submit"> search</button>
      
    </form>
    </div>
      {error && <p>Error occurred</p>}
      <div className="list-container">

        {data.map((d) => (
          <div className="repo-card" key= {d.id}>
            <img src={d.owner.avatar_url} alt="cant load" />
            <h2>{d.full_name}</h2>
            <p>⭐ {d.stargazers_count}</p>
            <a href={d.html_url} target="_blank" rel="noopener noreferrer">
  View Repo
</a> 
{/*  rel = no opener is used for security */}

          </div>

          

        ))}

      </div>

    </>
  )
}
export default App;