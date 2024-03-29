import React, { useState, useEffect, useRef } from "react";
import "./topbar.css";
import Dropdown from "../dropdown/Dropdown";
import Thememenu from "../thememenu/Thememenu";
import { Link } from "react-router-dom";
import user_image from "../../assets/images/noAvatar.png";
import user_menu from "../../assets/JsonData/user_menus.json";
import mp3 from "../../assets/audio/warning.mp3";
import Login from "../login/Login";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import Profile from "../profile/Profile";
import { webSocketClient } from "../../socket/websocket.js";
import notificationApi from "../../api/modules/notification.api";
import { format } from "timeago.js";
import { setWebSocket } from "../../redux/features/socketSlice";

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
    <div className="time_ago">
      <i className="bx bx-timer"></i>
      <div>{format(item.createdAt)}</div>
    </div>
  </div>
);

const renderUseToggle = (user) => (
  <div className="topbar_right-user">
    {user.isAdmin ? (
      <div className="topbar_right-user-au">
        <label className="authorize">Admin</label>
      </div>
    ) : (
      <div></div>
    )}
    <div className="topbar_right-user-image">
      <img src={user_image} alt="user image" />
    </div>
    <div className="topbar_right-user-name">{user.displayName}</div>
  </div>
);

const Topbar = () => {
  const [message, setMessage] = useState("");
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [notification, setNotification] = useState([]);
  const audioRef = useRef();
  const audioRefTrick = useRef();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleModalCancel = () => {
    //setLogin(true);
    setIsModalOpen(false);
  };

  const handleAlertOpen = async () => {
    // const audio = new Audio(mp3);
    // try {
    //   audio.play();
    // } catch (error) {
    //   audio.play();
    //   window.location.reload();
    // }
    if(message.warningType === "Bradycardia")
    {
      await toast.error(message.message, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else if(message.warningType === "Normal")
    {
      await toast.info(message.message, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else if(message.warningType === "Tachycardia")
    {
      await toast.warn(message.message, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    //setVisible(true);
  };

  const handleAlertOpenTrick = () => {
    const audio = new Audio(mp3);
    audio.play();
  };

  const handleCloseProfile = () => {
    setIsProfileVisible(false);
  };

  const handleMenuItemClick = (id) => {
    switch (id) {
      case "menu-0":
        setIsProfileVisible(true);
        break;
      case "menu-1":
        dispatch(setUser(null));
        localStorage.removeItem("userDT");
        setIsModalOpen(true);
        break;
      default:
        break;
    }
  };
  const renderUserMenu = (item, index) => (
    <Link
      to="/"
      key={index}
      id={`menu-${index}`}
      onClick={() => handleMenuItemClick(`menu-${index}`)}
    >
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Link>
  );

  const handleMessage = async (data) => {
    console.log("🚀 ~ file: Topbar.jsx:122 ~ handleMessage ~ data:", data)
    await setMessage(data.message);
  };

  const fetchNotification = async () => {
    const { response } = await notificationApi.getAll();
    if (response) {
      const filtered = response.map((item) => {
        return {
          icon: "bx bx-error",
          content: item.patient_cccd + "-" + item.warning,
          createdAt: item.createdAt,
        };
      });
      setNotification(filtered);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  useEffect(() => {
    const warning = async () => {
      if (message) {
        await audioRef.current.click();
        await audioRefTrick.current.click();
      }
    };
    warning();
    setMessage("");
    fetchNotification();
  }, [message]);

  useEffect(() => {
    // const socketLink = "ws://157.245.204.4:5000";
    webSocketClient.connect();
    webSocketClient.addListener("warning", handleMessage);
    return () => {
      webSocketClient.removeListener("warning", handleMessage);
      webSocketClient.disconnect();
    };
  }, []);

  return (
    <div className="topbar-container">
      <div className="topbar-search">
        <input type="text" placeholder="Search" />
        <i className="bx bx-search"></i>
      </div>
      <div className="topbar_alert">
        <button
          className="topbar_button_audio"
          onClick={handleAlertOpen}
          ref={audioRef}
        ></button>
        <button
          className="topbar_button_audio"
          onClick={handleAlertOpenTrick}
          ref={audioRefTrick}
        ></button>
        {/* <div className="alert_top">
          {message && (
            <Space
              direction="vertical"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "999",
              }}
            >
              <Alert
                message="Warning"
                description={`${message}`}
                type="warning"
                showIcon
                closable
                textAlign="center"
                style={{ fontSize: "24px" }}
                afterClose={handleAlertClose}
              />
            </Space>
          )}
        </div> */}
      </div>
      <div className="topbar-right">
        <div className="topbar-right-item">
          {user ? (
            <Dropdown
              customToggle={() => renderUseToggle(user)}
              contentData={user_menu}
              renderItems={(item, index) => renderUserMenu(item, index)}
            />
          ) : (
            <Login visible={isModalOpen} onModalCancel={handleModalCancel} />
          )}
        </div>
        {/* <Dropdown
              customToggle={() =>
                renderUseToggle(user ? user : { displayName: "Login" })
              }
              renderItems={(item, index) => renderUserMenu(item, index)}
            /> */}
        <div className="topbar-right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="5"
            contentData={notification}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            //renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="topbar-right-item">
          <Thememenu />
        </div>
        {isProfileVisible && (
          <Profile open={isProfileVisible} close={handleCloseProfile} />
        )}
      </div>
    </div>
  );
};

export default Topbar;
