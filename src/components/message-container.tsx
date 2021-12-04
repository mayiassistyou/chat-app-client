import clsx from "clsx";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { RiSendPlaneFill } from "react-icons/ri";
import defaultAvatar from "../assets/avatar-pro.png";
import { useUser } from "../contexts/user";
import { IMessage, IUser } from "../interface";
import AppBox from "./app-box";
import MessageItem from "./message-item";
import { format } from "timeago.js";
interface Props {
  messages: IMessage[] | undefined;
  onSubmit: () => void;
  register: UseFormRegister<FieldValues>;
  friendInfo: IUser;
  isActive: boolean;
}

// let isActive = true;

export default function MessageContainer(props: Props) {
  const { messages, onSubmit, register, friendInfo, isActive } = props;
  const { user } = useUser();

  return (
    <AppBox>
      <div className='h-full flex flex-col justify-between divide-gray divide-solid divide-y-2'>
        <div className='flex items-center mb-6  '>
          <div className='w-12 h-12 relative'>
            {friendInfo?.avatar ? (
              <img
                src={friendInfo.avatar}
                alt='avatar'
                className='rounded-full'
              />
            ) : (
              <img className='rounded-full' src={defaultAvatar} alt='avatar' />
            )}
            <div
              className={clsx(
                "absolute rounded-full border-2 border-white -bottom-3 right-0 w-3 h-3",
                isActive ? "bg-green" : "bg-yellow"
              )}
            />
          </div>
          <div className='ml-6'>
            <p className='text-xl font-bold'>{friendInfo?.name}</p>
            <p className='text-sm'>{isActive ? "Active now" : "Away"}</p>
          </div>
        </div>

        <div className='overflow-auto flex-1 flex flex-col-reverse py-4'>
          {messages?.map((msg, index) => {
            return (
              <div key={index}>
                <MessageItem
                  text={msg.text}
                  isOwned={msg.senderId === user?._id}
                  time={msg.createdAt}
                />
              </div>
            );
          })}
        </div>

        <div>
          <form onSubmit={onSubmit} className='flex justify-between mt-4'>
            <input
              type='textarea'
              autoComplete='off'
              {...register("message")}
              className='resize-none outline-none flex-1 bg-gray rounded-2xl py-4 px-6 placeholder-semibold placeholder-gray-dark mr-2 text-opacity-10'
              placeholder='Type your message here...'
            />
            <button
              type='submit'
              className='text-white bg-primary-dark px-4 rounded-2xl'
            >
              <RiSendPlaneFill className='w-6 h-6' />
            </button>
          </form>
        </div>
      </div>
    </AppBox>
  );
}
