import Axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";


export default function Index() {
  const navigate = useNavigate();
  const publisher_id = localStorage.getItem('user');
  const [paper_name, setPaper_name] = useState();
  const [publication_date, setPublication_date] = useState();
  const [publication_place, setPublication_place] = useState();
  const [paper_full_text, setPaper_full_text] = useState();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [papers, setPapers] = useState([])

  useEffect(()=> {
    if(localStorage.getItem('loggedin') !== 'true'){
      window.location.href = "/login";
    }
    fetch('http://localhost:3001/paper/getPaper/')
        .then((resp) => resp.json())
        .then((resp) => setPapers(resp))
        .catch((error) => console.log(error));
  }, [file]);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    
  };
  
  const submit_paper = () => {
    Axios.post("http://localhost:3001/paper/publish/", {
      paper_name: paper_name,
      publication_date: publication_date,
      publication_place: publication_place,
      paper_full_text: paper_full_text,
      publisher_id: publisher_id,
    }).then((response) => {
      if(response.data=="Paper published"){
        alert("Paper published");
        window.location.href = "/..";
      }else{
        alert("Error");
      }
    });
  }


  return (
    <div>
      <div>
        <h1>Papers</h1>
        <br></br>
        <table>
          <tr>
            <th>Paper Name</th>
            <th>Paper id</th>
            <th>Publisher id</th>
          </tr>
          {papers.map((paper) => (
            <tr>
              <td>{paper.paper_name}</td>
              <td>{paper.id}</td>
              <td>{paper.publishers_id}</td>
            </tr>
          ))}
        </table>
      </div>
      
      Paper Publish
        <div>
          <input
          type= "text"
            required
            id="paper_name"
            label="Paper Name"
            defaultValue=""
            variant="outlined"
            onChange={(e) => {
              setPaper_name(e.target.value);
            }}
          />
          <br></br><br></br>
          <input
            required
            id="publication_date"
            label="Publication Date"
            defaultValue=""
            variant="outlined"
            onChange={(e) => {
              setPublication_date(e.target.value);
            }}
          />
          <br></br><br></br>
          <input
            required
            id="publication_place"
            label="Publication Place"
            defaultValue=""
            variant="outlined"
            onChange={(e) => {
              setPublication_place(e.target.value);
            }}
          />
          <br></br><br></br>
          <input
            required
            id="paper_full_text"
            label="Paper Full Text"
            defaultValue=""
            variant="outlined"
            onChange={(e) => {
              setPaper_full_text(e.target.value);
            }}
          />
          <br></br><br></br>

          <button variant="contained" onClick={submit_paper}>Submit</button>

          </div> 
    </div>
    
  )
}
