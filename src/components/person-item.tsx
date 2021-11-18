import clsx from "clsx";
import React from "react";
import { BiCheckDouble } from "react-icons/bi";

interface Props {
  numOfMes?: number;
  hasSeen?: boolean;
}

export default function PersonItem(props: Props) {
  const { numOfMes, hasSeen } = props;
  return (
    <div className='flex justify-between items-end py-2'>
      <div className='flex'>
        <div className='rounded-full w-12 h-12 flex items-center justify-center overflow-hidden'>
          <img src='src/assets/avatar.jpeg' alt='avatar' className='w-14' />
        </div>
        <div className='pl-2'>
          <h2 className='font-bold text-lg'>Jack Winbow</h2>
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
