import clsx from "clsx";
import React from "react";
import Sidebar from "./sidebar";
interface Props {
  children: React.ReactNode;
  hasSidebar?: boolean;
  box?: boolean;
}

export default function Layout(props: Props) {
  const { children, hasSidebar = true, box = true } = props;

  return (
    <div className='bg-primary h-screen w-screen flex items-center justify-center'>
      <div
        className={clsx(box && "h-5/6 w-10/12", "flex bg-gray rounded-4xl p-8")}
      >
        {hasSidebar && <Sidebar />}
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  );
}
