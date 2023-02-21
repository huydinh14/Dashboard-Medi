import React from "react";
import "./topbar.css";
import Dropdown from "../dropdown/Dropdown";
import Thememenu from "../thememenu/Thememenu";
import notifications from "../../assets/JsonData/notification.json";
import { Link } from "react-router-dom";
import user_image from "../../assets/images/noAvatar.png";
import user_menu from "../../assets/JsonData/user_menus.json";

const current_user = {
  display_name: "Huy Dinh",
  image: user_image,
};

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUseToggle = (user) => (
  <div className="topbar_right-user">
    <div className="topbar_right-user-image">
      <img src={user.image} alt="user image" />
    </div>
    <div className="topbar_right-user-name">{user.display_name}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to="/" key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const Topbar = () => {
  return (
    <div className="topbar-container">
      <div className="topbar-search">
        <input type="text" placeholder="Search" />
        <i className="bx bx-search"></i>
      </div>
      <div className="topbar-right">
        <div className="topbar-right-item">
          <Dropdown
            customToggle={() => renderUseToggle(current_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topbar-right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="topbar-right-item">
          <Thememenu />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
