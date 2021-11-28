import clsx from "clsx";
import { format } from "timeago.js";

interface Props {
  text: string;
  isOwned?: boolean;
  time: string;
}

export default function MessageItem(props: Props) {
  const { text, isOwned, time } = props;

  return (
    <div
      className={clsx(
        "flex w-full mb-4 px-4",
        isOwned ? "justify-end" : "flex-start"
      )}
    >
      <div
        className={clsx(
          "flex flex-col max-w-md",
          isOwned ? "items-end" : "items-start"
        )}
      >
        <div
          className={clsx(
            "p-4 font-medium rounded-2xl relative",
            isOwned
              ? "bg-primary-dark text-white own-chat-item mr-4"
              : "bg-gray text-black text-opacity-70 friend-chat-item ml-4"
          )}
        >
          {text}
        </div>
        <p className='text-sm text-gray-dark font-semibold mt-1'>
          {format(time)}
        </p>
      </div>
    </div>
  );
}
