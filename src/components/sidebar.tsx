import TabButton from "./tab-button";
import { RiSettings5Fill, RiSettings5Line } from "react-icons/ri";
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { RiHome2Fill, RiHome2Line } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/user";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const { setUser, logout } = useUser();
  const navigate = useNavigate();

  return (
    <div className='bg-primary h-full rounded-3xl flex flex-col items-center justify-between'>
      <div className='flex flex-col items-center'>
        <div className='rounded-full w-16 h-16 flex items-center justify-center overflow-hidden m-6 mb-20'>
          <img className='w-14' src='src/assets/avatar-pro.png' alt='avatar' />
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
      <div className='w-full flex justify-center items-center' onClick={logout}>
        <GoSignOut className='w-8 h-8 text-white my-6' />
      </div>
    </div>
  );
}
