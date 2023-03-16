import React, { PropsWithChildren, useState } from "react";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid grid-cols-12 grid-flex-row min-h-screen">
      <div className="col-span-2">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>
      <div className="col-span-10">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
