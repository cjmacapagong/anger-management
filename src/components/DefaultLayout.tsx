import Header from "./Header";
import BodyPage from "../pages/BodyPage";
import React from "react";
interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ backgroundColor: "#ECFDF5" }}
    >
      {/* <Header /> */}
      <div className="w-75">
        <BodyPage />
      </div>
    </div>
  );
};

export default DefaultLayout;
