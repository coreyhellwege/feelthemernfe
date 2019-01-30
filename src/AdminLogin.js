import React from 'react';
import Login from './Login';
import logo from "./assets/icons/skyefit_logo.svg"

const AdminLogin = (props) => {
  return (
    <div className="main-container">
      <div className="content-container">
        <img id="logo" src={logo} alt="SkyeFIT Logo"></img>
        <h2>Welcome Skye</h2>
        <Login history={props.history}/>
      </div>
    </div>
  )
}

export default AdminLogin;