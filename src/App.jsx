import Layout from "./components/Layout/Layout.jsx";
import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthContextProvider from "./context/AuthContext.jsx";
import UrlContextProvider from "./context/UrlContext.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import PrivateRoute from "./service/PrivateRoute.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Register from "./pages/register/Register.jsx";
import CreateUrl from "./components/CreateUrl/CreateUrl.jsx";
import RedirectSite from "./components/RedirectSite/RedirectSite.jsx";
import About from "./pages/about/About.jsx";

function App() {

  return (
    <AuthContextProvider>
      <UrlContextProvider>
        <Routes>
          <Route path="/redirect/:urlId" element={<RedirectSite />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<CreateUrl />} />
            </Route>
          </Route>
        </Routes>
      </UrlContextProvider>
    </AuthContextProvider>
  );
};

export default App;
