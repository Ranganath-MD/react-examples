import React from 'react';
import './App.css';
import NavigationBar from "./navigationBar"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <br/>
    </BrowserRouter>
  );
}

export default App;
