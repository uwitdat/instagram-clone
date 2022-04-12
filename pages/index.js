import React from 'react';
import NavHeader from "../components/NavHeader";
import NavFooter from "../components/NavFooter";
import Home from "./home";

export default function App() {
  return (
    <React.Fragment>
      <NavHeader />
      <Home />
      <NavFooter />
    </React.Fragment>
  )
}