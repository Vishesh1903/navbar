import React from "react";
import "./Navbar.css";
import logo from "../../assets/upsurge-logo.png";
import search_icon_light from "../../assets/search-w.png";
import search_icon_dark from "../../assets/search-b.png";
import toggle_light from "../../assets/night.png";
import toggle_dark from "../../assets/day.png";
const Navbar = ({theme, setTheme}) => {

    const toggle_mode = () =>{
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" className="logo-img" />
        <h2>Upsurge.Club</h2>
      </div>
      <ul>
        <li>Learn</li>
        <li>MasterClass</li>
        <li>Upsurge.Club PRO</li>
      </ul>

      <div className="search-box">
        <img src={theme == 'light'?search_icon_light : search_icon_dark} alt="" />
        <input
          type="text"
          placeholder="Search for Options, Strategies, Mutual Fund ..."
        />
        
      </div>
      
      <img onClick={() => {toggle_mode();}} src={theme == 'light'?toggle_light : toggle_dark} alt="" className="toggle-icon" />
    </div>
  );
};

export default Navbar;
