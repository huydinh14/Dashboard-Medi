import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/sidebar/Sidebar";
import TopNav from "../component/topbar/Topbar";
import "./mainlayout.css";

const MainLayout = (props) => {
  return (
    <>
      <div className="main-container">
        <div className="sidebar-main">
          <Sidebar {...props}/>
        </div>
        <div className="main">
          <div className="main__content">
            <TopNav />
            <div className="main_content-layout">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
