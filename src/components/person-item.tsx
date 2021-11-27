import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { BiCheckDouble } from "react-icons/bi";
import userApi from "../api/user";
import { IUser } from "../interface";
import defaultAvatar from "../assets/default.jpg";

interface Props {
  numOfMes?: number;
  hasSeen?: boolean;
  friendId: string;
  onClick: () => void;
  isSelected?: boolean;
}

export default function PersonItem(props: Props) {
  const { numOfMes, hasSeen, friendId, onClick, isSelected = false } = props;

  const [friendInfo, setFriendInfo] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const getFriend = async () => {
      const response = await userApi.getFriend(friendId);
      setFriendInfo(response.data);
    };
    getFriend();
  }, []);

  return (
    <div
      className={clsx(
        "flex justify-between items-end p-2 rounded-lg cursor-pointer",
        isSelected && "bg-gray"
      )}
      onClick={onClick}
    >
      <div className='flex'>
        <div className='rounded-full w-12 h-12 flex items-center justify-center overflow-hidden'>
          {friendInfo?.avatar ? (
            <img src={friendInfo.avatar} alt='avatar' className='w-14' />
          ) : (
            <img className='w-18' src={defaultAvatar} alt='avatar' />
          )}
        </div>
        <div className='pl-2'>
          <h2 className='font-bold text-lg'>{friendInfo?.name}</h2>
          <p>Yes, sure</p>
        </div>
      </div>
      <div className='flex flex-col justify-between items-end'>
        <p className='text-xs text-gray-dark font-semibold'>Today, 9:25pm</p>
        {numOfMes !== 0 && numOfMes !== undefined ? (
          <div className='rounded-full bg-yellow text-white font-semibold w-5 h-5 flex items-center justify-center text-sm'>
            {numOfMes}
          </div>
        ) : (
          <BiCheckDouble
            className={clsx(
              "w-6 h-6",
              hasSeen ? "text-primary" : "text-gray-dark"
            )}
          />
        )}
      </div>
    </div>
  );
}
