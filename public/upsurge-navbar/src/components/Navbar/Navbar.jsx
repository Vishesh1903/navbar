import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/upsurge-logo.png";
import search_icon_light from "../../assets/search-w.png";
import search_icon_dark from "../../assets/search-b.png";
import toggle_light from "../../assets/night.png";
import toggle_dark from "../../assets/day.png";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { CgPlayButtonO } from "react-icons/cg";

const Navbar = ({ theme, setTheme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    names: [],
    learningPaths: [],
    courses: [],
    masterclasses: [],
  });

  let debounceTimer;

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchSearchResults(value);
    }, 500);
  };

  const fetchSearchResults = async (value) => {
    if (value.trim() !== "") {
      try {
        const response = await fetch(
          `http://localhost:5000/categories/${encodeURIComponent(value)}`
        );
        console.log(encodeURIComponent(value));
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults({
        names: [],
        learningPaths: [],
        courses: [],
        masterclasses: [],
      });
    }
  };

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
          <div className="learn">
            Learn
            <div className="mega-menu">
              <div className="megamenuitems">
                <div className="club-courses">
                  <div className="cl-title">
                    <div className="play-ico-container">
                      <CgPlayButtonO className="play-ico" />
                    </div>
                    <div>
                      <h2>Upsurge.Club Courses</h2>
                      <p>Choose from a wide range of Stock Market courses.</p>
                    </div>
                  </div>
                </div>

                <div className="ccategories-container">
                  <h3>COURSE CATEGORIES</h3>
                  <div className="course-list-div">
                    <ul className="course-list">
                      <li>Option Trading</li>
                      <li>Technical Analysis</li>
                      <li>Trading Strategies</li>
                      <li>Stock Market Investing</li>
                      <li>Stock Market Basics</li>
                      <li>Stock Market Courses in Hindi</li>
                      <li>Algo Trading</li>
                      <li>Other Courses</li>
                    </ul>
                  </div>
                </div>
                <div className="tcourses-container">
                  <h3>TRENDING COURSES</h3>
                  <div className="tcourse-list-div">
                    <ul className="tcourse-list">
                      <li>Options Trading for Beginners</li>
                      <li>Price Action Strategy using CPR Indicator</li>
                      <li>Basics of Scalping Trading</li>
                      <li>Learn Technical Analysis in Hindi</li>
                      <li>Swing Trading and Scalping Strategies</li>
                      <li>Options Scalping Strategy</li>
                    </ul>
                  </div>
                  <div className="vac-btn">
                    <div>View All Courses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <IoIosArrowDropupCircle className="arrow" />
        </div>

        <div>MasterClass</div>
        <div className="pro-container">
          <div className="new-pro">New</div>
          <div>Upsurge.Club PRO</div>
        </div>
      </div>

      <div className="search-box-div">
        <div className="search-box">
          <img
            src={theme === "light" ? search_icon_dark : search_icon_light}
            alt=""
          />
          <input
            type="text"
            placeholder="Search for Options, Strategies, Mutual Funds..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm.length > 0 && (
            <div className="search-results">
              <ul>
                <div className="categories-container">
                  <h3>CATEGORIES</h3>

                  {searchResults.names.map((name, index) => (
                    <div className="categories" key={index}>
                      {name}
                    </div>
                  ))}
                </div>
                <div className="lcm-container">
                  <h3>LEARNING PATHS</h3>
                  {searchResults.learningPaths.map((path, index) => (
                    <div className="search-data" key={index}>
                      {path.title}: {path.description}
                    </div>
                  ))}
                </div>
                <div className="lcm-container">
                  <h3>COURSES</h3>
                  {searchResults.courses.map((course, index) => (
                    <div className="search-data" key={index}>
                      {course.title}: {course.description}
                    </div>
                  ))}
                </div>
                <div className="lcm-container">
                  <h3>MASTERCLASSES</h3>
                  {searchResults.masterclasses.map((masterclass, index) => (
                    <div className="search-data" key={index}>
                      {masterclass.title}: {masterclass.description}
                    </div>
                  ))}
                </div>
              </ul>
            </div>
          )}
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
        src={theme === "light" ? toggle_light : toggle_dark}
        alt=""
        className="toggle-icon"
      />
    </div>
  );
};

export default Navbar;
