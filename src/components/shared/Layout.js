import React from "react";
import Header from "../shared/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex-1">
      <Header />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
