import React from "react";
import "./topbar.css";
import Dropdown from "../dropdown/Dropdown";

import notifications from "../../assets/JsonData/notification.json"
import { Link } from "react-router-dom";

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
)

const Topbar = () => {
  return (
    <div className="topbar-container">
      <div className="topbar-search">
        <input type="text" placeholder="Search" />
        <i className="bx bx-search"></i>
      </div>
      <div className="topbar-right">
        <div className="topbar-right-item">
          <Dropdown  icon="bx bx-user"/>
        </div>
        <div className="topbar-right-item">
          <Dropdown 
          icon="bx bx-bell"
          badge='12'
          contentData={notifications}
          renderItems={(item, index) => renderNotificationItem(item, index)}
          renderFooter= {() => <Link to='/'>View All</Link>}
          />
        </div>
        <div className="topbar-right-item">
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
