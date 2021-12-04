import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import userApi from "../api/user";
import defaultAvatar from "../assets/default.jpg";
import { IUser } from "../interface";

interface Props {
  friendId: string;
  onClick: () => void;
  isSelected?: boolean;
  time: number;
  lastMessage: string;
  hasSeen?: boolean;
}

export default function PersonItem(props: Props) {
  const {
    friendId,
    onClick,
    isSelected = false,
    time,
    lastMessage,
    hasSeen = true,
  } = props;

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
          <p>{lastMessage}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between items-end'>
        {!hasSeen && (
          <div className='rounded-full bg-primary text-white font-semibold w-3 h-3 flex items-center justify-center text-sm mb-2'></div>
        )}
        <p className='text-xs text-gray-dark font-semibold'>{format(time)}</p>
      </div>
    </div>
  );
}
