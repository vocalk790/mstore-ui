import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import DemoDashboard from "./pages/DemoDashboard";
import ConfigPage from "./pages/ConfigPage";
export default function App(){
  return (<div>
    <nav style={{padding:12,borderBottom:"1px solid #eee"}}>
      <Link to="/">대시보드</Link> | <Link to="/config" style={{marginLeft:8}}>설정</Link>
    </nav>
    <Routes>
      <Route path="/" element={<DemoDashboard/>}/>
      <Route path="/config" element={<ConfigPage/>}/>
    </Routes>
  </div>);
}
