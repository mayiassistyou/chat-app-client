import React from "react";
import TabButton from "./tab-button";
import { RiSettings5Fill, RiSettings5Line } from "react-icons/ri";
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { RiHome2Fill, RiHome2Line } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { ReactLocation } from "react-location";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const currentPath = new ReactLocation().current.pathname;

  return (
    <div className='bg-primary h-screen w-screen flex items-center justify-center'>
      <div className='flex h-5/6 w-10/12 bg-gray rounded-4xl p-8'>
        <div className='bg-primary h-full rounded-3xl flex flex-col items-center justify-between'>
          <div className='flex flex-col items-center'>
            <div className='rounded-full w-16 h-16 flex items-center justify-center overflow-hidden m-6 mb-20'>
              <img
                className='w-14'
                src='src/assets/avatar-pro.png'
                alt='avatar'
              />
            </div>
            <TabButton
              iconActive={<RiHome2Fill className='w-8 h-8' />}
              iconInactive={<RiHome2Line className='w-8 h-8' />}
              path='/'
              currentPath={currentPath}
            />
            <TabButton
              currentPath={currentPath}
              iconActive={<AiFillMessage className='w-8 h-8' />}
              iconInactive={<AiOutlineMessage className='w-8 h-8' />}
              path='/message'
            />
            <TabButton
              currentPath={currentPath}
              iconActive={<IoMdNotifications className='w-8 h-8' />}
              iconInactive={<IoMdNotificationsOutline className='w-8 h-8' />}
              path='/notification'
            />
            <TabButton
              currentPath={currentPath}
              iconActive={<RiSettings5Fill className='w-8 h-8' />}
              iconInactive={<RiSettings5Line className='w-8 h-8' />}
              path='/setting'
            />
          </div>
          <div
            className='w-full flex justify-center items-center'
            onClick={() => {
              console.log("halo");
            }}
          >
            <GoSignOut className='w-8 h-8 text-white my-6' />
          </div>
        </div>
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  );
}
