import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  iconActive: React.ReactNode;
  iconInactive?: React.ReactNode;
  path: string;
  currentPath?: string;
}

export default function TabButton(props: Props) {
  const { iconActive, iconInactive, currentPath, path } = props;

  return (
    <Link to={path} className={clsx("py-4 w-full relative mb-4")}>
      <div className='text-white flex justify-center relative z-10'>
        {currentPath === path ? iconActive : iconInactive}
      </div>
      {currentPath === path && (
        <div className='absolute top-0 bottom-0 right-0 left-4 border-r-4 border-yellow rounded-tl-xl rounded-bl-xl  bg-primary-dark'></div>
      )}
      {/* </div> */}
    </Link>
  );
}
