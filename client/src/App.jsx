// import { useState } from 'react'
import "./App.css";
import Header from "./Components/Header/Header";
import Cards from "./Components/Body/Cards";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";


function App() {
  
  const [shoe, setShoe] = useState([
    {
      id: "",
      title: "",
      price: "",
      imageUrl: "",
    },
  ]);
  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((jsonRes) => setShoe(jsonRes));
  }, []);

  useEffect(() => {
    console.log(shoe);
  });
  return (
    <div className="App">
      <Header />
      <Grid sx={{flexGrow: 1, justifyContent: "center"}} container spacing={{xs:2, md:0}}>
      <Cards shoe={shoe} />
      </Grid>
    </div>
  );
}

export default App;
