import React from "react";
import "./sidebar.css";

import logo from "../../assets/images/logo.png";

import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  return (
    <div className="sidebar_item">
      <div className={`sidebar_item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const {user} = useSelector((state) => state.user);
  const location = useLocation();
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === location.pathname
  );
  return (
    <div className="sidebar">
      <div className="sidebar_logo">
        <img src={logo} className="img-logo" alt="logo" />
      </div>
      <div className="sidebar-item-main">
        {/* {user &&
          sidebar_items.map((item, index) => {
            return item.role === "admin" ? (
              <Link to={item.route} key={index}>
                <SidebarItem
                  title={item.display_name}
                  icon={item.icon}
                  active={index === activeItem}
                ></SidebarItem>
              </Link>
            ) : (
              <SidebarItem
                title={item.display_name}
                icon={item.icon}
                active={index === activeItem}
              ></SidebarItem>
            );
          })} */}
        {user?.isAdmin
          ? sidebar_items.map(
              (item, index) =>
                (
                  <Link to={item.route} key={index}>
                    <SidebarItem
                      title={item.display_name}
                      icon={item.icon}
                      active={index === activeItem}
                    ></SidebarItem>
                  </Link>
                )
            )
          : sidebar_items.map(
              (item, index) =>
                item.role === "user" && (
                  <Link to={item.route} key={index}>
                    <SidebarItem
                      title={item.display_name}
                      icon={item.icon}
                      active={index === activeItem}
                    ></SidebarItem>
                  </Link>
                )
            )
        }
      </div>
    </div>
  );
};

export default Sidebar;
