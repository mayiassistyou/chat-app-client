import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import messageApi from "../api/message";
import AppBox from "../components/app-box";
import AppInput from "../components/app-input";
import Layout from "../components/layout";
import LoadingOverlay from "../components/loading-overlay";
import PersonItem from "../components/person-item";
import { useUser } from "../contexts/user";
import { IConversation, IMessage, IUser } from "../interface";
import io from "socket.io-client";
import MessageContainer from "../components/message-container";
import userApi from "../api/user";

export default function MessagePage() {
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useUser();

  const [conversationList, setConversationList] = useState<
    IConversation[] | undefined
  >([]);
  const [currentChat, setCurrentChat] = useState<IConversation | undefined>(
    undefined
  );
  const [currentFriend, setCurrentfriend] = useState<IUser | undefined>(
    undefined
  );
  const [messageContent, setMessageContent] = useState<IMessage[] | undefined>(
    []
  );
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io("localhost:8900", {
      transports: ["websocket"],
    });
    socket.current.on("getMessage", (data: any) => {
      setArrivalMessage({
        conversationId: currentChat?._id as string,
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // receied message
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessageContent((prevState) => {
        if (!prevState) return [arrivalMessage];
        return [arrivalMessage, ...prevState];
      });
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users: any) => {
      console.log(users);
    });
  }, [user]);

  // load conversation list
  useEffect(() => {
    setIsLoading(true);
    const getConversation = async () => {
      try {
        setIsLoading(true);
        const response = await messageApi.getConvesations(user?._id as string);
        setConversationList(response.data);
        setCurrentChat(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
    setIsLoading(false);
  }, [user]);

  // load message on selected conversation
  useEffect(() => {
    const id = currentChat?.members.find((member) => member !== user?._id);

    const getFriendInfo = async () => {
      const response = await userApi.getFriend(id as string);
      setCurrentfriend(response.data);
    };

    getFriendInfo();

    const getMessage = async () => {
      const response = await messageApi.getMessages(currentChat?._id as string);
      setMessageContent(response.data.messages);
    };
    getMessage();
  }, [currentChat]);

  // sending message
  const onSendMessage = (data: { message: string }) => {
    if (!data.message) return;
    const message = {
      conversationId: currentChat?._id as string,
      senderId: user?._id as string,
      text: data.message,
    };

    const receiverId = currentChat?.members.find(
      (member) => member !== user?._id
    );

    // send event send massage to socket server
    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: data.message,
    });

    const sendMessage = async () => {
      try {
        messageContent &&
          setMessageContent([
            { ...message, createdAt: Date.now() },
            ...messageContent,
          ]);
        setValue("message", "");
        await messageApi.sendMessage(message);
      } catch (error) {
        console.log(error);
      }
    };

    sendMessage();
  };

  return (
    <Layout>
      <LoadingOverlay show={isLoading} />
      <div className='px-4 h-full'>
        <div className='flex h-full justify-between'>
          {/* PERSON LIST */}
          <div className='w-96 flex flex-col mr-4'>
            <AppInput
              icon={<BiSearch />}
              name='search'
              register={register}
              placeholder='Search'
            />
            <AppBox className='mt-4 flex-1'>
              <h2 className='font-semibold text-xl'>Person</h2>
              {conversationList?.map((conversation) => {
                const id =
                  user &&
                  conversation.members.find((member) => member !== user._id);
                return (
                  <PersonItem
                    key={conversation._id}
                    onClick={() => {
                      setCurrentChat(conversation);
                    }}
                    isSelected={currentChat?._id === conversation._id}
                    friendId={id as string}
                  />
                );
              })}
            </AppBox>
          </div>

          {/* CHAT BOX */}
          <div className='h-full flex-1'>
            <MessageContainer
              messages={messageContent}
              onSubmit={handleSubmit(onSendMessage)}
              register={register}
              friendInfo={currentFriend as IUser}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
