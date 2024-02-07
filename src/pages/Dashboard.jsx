import React, { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar"
import ConfirmationModal from "../components/core/Dashboard/ConfirmationModal";

const Dashboard = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { isBlurred } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  return (
    <div
      className={`flex h-[calc(100vh-3.5rem)] ${
        isBlurred ? " backdrop-blur-sm " : ""
      } relative mt-[56px] overflow-hidden`}
    >
      <div className="h-[calc(100vh-3.5rem)] md:flex hidden    ">
        <Sidebar setConfirmationModal={setConfirmationModal} />
      </div>
      <div className="h-[calc(100vh-3.5rem)] relative w-full overflow-auto  overflow-x-hidden mb-5">
        <div className="lg:mx-auto  md:mx-0 w-full   pt-5 ">
          <Outlet />
          <div className="absolute top-[20%] sm:left-[30%] leftClassSideModal  sm:min-w-[350px] min-w-[250px] ">
            {confirmationModal && (
              <ConfirmationModal modalData={confirmationModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
