import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/sidebar/Sidebar";
import TopNav from "../component/topbar/Topbar";
import "./mainlayout.css";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import userApi from "../api/modules/user.api.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = (props) => {
  const dispatch = useDispatch();
  //const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="main-container">
        <div className="sidebar-main">
          <Sidebar {...props} />
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
