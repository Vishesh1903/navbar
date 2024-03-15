import React from "react";
import "./Navbar.css";
import logo from "../../assets/upsurge-logo.png";
import search_icon_light from "../../assets/search-w.png";
import search_icon_dark from "../../assets/search-b.png";
import toggle_light from "../../assets/night.png";
import toggle_dark from "../../assets/day.png";
import { IoIosArrowDropupCircle } from "react-icons/io";

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" className="logo-img" />
        <h2>Upsurge.Club</h2>
      </div>

      <div className="navlinks">
        <div className="learn-container">
          <div>
            Learn
            <div className="mega-menu">
              <div className="megamenuitems">
                <h1>COURSE CATEGORIES</h1>
                <ul>
                  <li>Option Trading</li>
                  <li>Technical Analysis Trading Strategies</li>
                  <li>Stock Market Investing </li>
                  <li>Stock Market</li>
                  <li>Basics Stock</li>
                  <li>Market Courses in Hindi</li>
                  <li>Algo Trading</li>
                  <li>Other Courses</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="arrow-div">
            <IoIosArrowDropupCircle className="arrow" />
          </div>
        </div>

        <div>MasterClass</div>
        <div className="pro-container">
          <div className="new-pro">New</div>
          <div>Upsurge.Club PRO</div>
        </div>
      </div>

      <div className="search-box-div">
        <div className="search-box">
          <img src={theme === 'light'?search_icon_dark:search_icon_light} alt="" />
          <input
            type="text"
            placeholder="Search for Options, Strategies, Mutual Funds..."
          />
          <div className="search-results">
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
          </div>
        </div>

        <div>
          <button className="btns login">Login</button>
        </div>

        <div>
          <button className="btns sign-up">Sign Up</button>
        </div>
      </div>

      <img
        onClick={() => {
          toggle_mode();
        }}
        src={theme == "light" ? toggle_light : toggle_dark}
        alt=""
        className="toggle-icon"
      />
    </div>
  );
};

export default Navbar;
