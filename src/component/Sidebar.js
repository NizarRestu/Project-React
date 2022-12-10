import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import "../css/Sidebar.css";
import { useHistory } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();
  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.push("/");
  };
  return (
    <div className="fixed top-0 left-0 right-0  bg-gradient-to-r from-sky-500 to-indigo-500">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            bar G
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <ul>
          <a className="no-underline" href="/">
            <li
              className="link no-underline ml-[-25px]"
              activeclassName="active"
            >
              <div className="icon ml-[-5px]">
                <FaTh />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Dasboard
              </div>
            </li>
          </a>
          {localStorage.getItem("role") !== null ? (
            <>
              <a className="no-underline" href="/cart">
                <li
                  className="link no-underline ml-[-25px]"
                  activeclassName="active"
                >
                  <div className="icon ml-[-5px]">
                    <FaShoppingBag />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Cart
                  </div>
                </li>
              </a>

              <a className="no-underline" href="/login" onClick={logout}>
                <li
                  className="link no-underline ml-[-25px]"
                  activeclassName="active"
                >
                  <div className="icon ml-[-5px]">
                  <i class="fa-solid fa-right-from-bracket"></i>
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Log out
                  </div>
                </li>
              </a>
            </>
          ) : (
            <a className="no-underline" href="/login">
              <li
                className="link no-underline ml-[-25px]"
                activeclassName="active"
              >
                <div className="icon  ml-[-5px]">
                  <FaUserAlt />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Login
                </div>
              </li>
            </a>
          )}
          {localStorage.getItem("role") === "admin" ? (
            <a className="no-underline" href="/data">
              <li
                className="link no-underline ml-[-25px]"
                activeclassName="active"
              >
                <div className="icon  ml-[-5px]">
                  <FaThList />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Data Admin
                </div>
              </li>
            </a>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
