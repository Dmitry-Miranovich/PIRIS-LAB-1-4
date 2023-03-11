import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import WorkerPage from "./components/home/WorkerPage";
import LoginPage from "./components/login/LoginPage";
import UserPage from "./components/home/UserPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={"/"}>
      <Routes>
          <Route path={"/home/*"} element={<WorkerPage/>}/>
          <Route path={"/login/*"} element={<LoginPage/>}/>
          <Route path={"/client/:id/*"} element={<UserPage/>}/>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
