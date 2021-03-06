import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import messageApi from "../api/message";
import AppBox from "../components/app-box";
import AppInput from "../components/app-input";
import Layout from "../components/layout";
import PersonItem from "../components/person-item";
import { useUser } from "../contexts/user";
import { IConversation, IMessage, IUser } from "../interface";
import io from "socket.io-client";
import MessageContainer from "../components/message-container";
import userApi from "../api/user";
import SearchInput from "../components/search-input";

export default function MessagePage() {
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useUser();

  const [conversationList, setConversationList] = useState<
    IConversation[] | undefined
  >([]);
  const [onlineUser, setOnlineUser] = useState<any[]>([]);
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

  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io("localhost:8900", {
      transports: ["websocket"],
    });
    socket.current.on("getMessage", (data: any) => {
      setArrivalMessage({
        conversationId: data._id,
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // received message
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessageContent((prevState) => {
        if (!prevState) return [arrivalMessage];
        return [arrivalMessage, ...prevState];
      });
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    setConversationList((prevState: any) => {
      if (!prevState) return;
      const newConvesationList = [...prevState];

      const conversation = newConvesationList.find((c) =>
        c.members.includes(arrivalMessage?.senderId as string)
      );
      if (!conversation) return;
      const index = newConvesationList.findIndex((c) =>
        c.members.includes(arrivalMessage?.senderId as string)
      );

      newConvesationList.splice(index, 1);
      return [
        {
          ...conversation,
          updateTime: Date.now(),
          lastMessage: arrivalMessage?.text,
        },
        ...newConvesationList,
      ];
    });
  }, [arrivalMessage]);

  // get user online
  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users: any) => {
      setOnlineUser(users);
    });
  }, [user]);

  // load conversation list
  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await messageApi.getConvesations(user?._id as string);
        setConversationList(response.data);
        setCurrentChat(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
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

    setConversationList((prevState: any) => {
      if (!prevState) return;
      const newConvesationList = [...prevState];

      const conversation = newConvesationList.find((c) =>
        c.members.includes(receiverId)
      );
      if (!conversation) return;
      const index = newConvesationList.findIndex((c) =>
        c.members.includes(receiverId)
      );

      newConvesationList.splice(index, 1);
      return [
        {
          ...conversation,
          updateTime: Date.now(),
          lastMessage: data.message,
        },
        ...newConvesationList,
      ];
    });
  };

  //click on people search
  const handlePeopleClick = (people: IUser) => {
    // console.log(people);

    //check people in current conversation list
    const conversation = conversationList?.find((c) =>
      c.members.includes(people._id)
    );

    if (conversation) {
      //people into conversation list
      setCurrentChat(conversation);
    } else {
      //people dont into conversation list
      setCurrentChat(undefined);
      setCurrentfriend(people);
    }
  };

  //create conversation
  const handleCreateConversation = (data: { message: string }) => {
    if (!data.message) return;
    const createConversation = async () => {
      try {
        const response = await messageApi.createConversation(
          user?._id as string,
          currentFriend?._id as string
        );

        conversationList &&
          setConversationList([response.data, ...conversationList]);
        setCurrentChat(response.data);

        setMessageContent([
          {
            conversationId: response.data._id,
            senderId: user?._id as string,
            text: data.message,
            createdAt: Date.now(),
          },
        ]);
        setValue("message", "");

        await messageApi.sendMessage({
          conversationId: response.data._id as string,
          senderId: user?._id as string,
          text: data.message,
        });
      } catch (error) {
        console.log(error);
      }
    };
    createConversation();
  };

  return (
    <Layout>
      <div className='px-4 h-full'>
        <div className='flex h-full justify-between'>
          {/* PERSON LIST */}
          <div className='w-96 flex flex-col mr-4'>
            <SearchInput onClick={handlePeopleClick} />

            <AppBox className='mt-4 flex-1'>
              {conversationList?.length ? (
                <>
                  <h2 className='font-semibold text-xl'>Person</h2>
                  {conversationList?.map((conversation) => {
                    const id =
                      user &&
                      conversation.members.find(
                        (member) => member !== user._id
                      );
                    return (
                      <PersonItem
                        key={conversation._id}
                        onClick={() => {
                          setCurrentChat(conversation);
                        }}
                        isSelected={currentChat?._id === conversation._id}
                        friendId={id as string}
                        time={conversation.updateTime}
                        lastMessage={conversation.lastMessage}
                      />
                    );
                  })}
                </>
              ) : (
                <div className='text-lg text-gray-600'>No messages found</div>
              )}
            </AppBox>
          </div>

          {/* CHAT BOX */}
          {currentChat ? (
            <div className='h-full flex-1'>
              <MessageContainer
                messages={messageContent}
                onSubmit={handleSubmit(onSendMessage)}
                register={register}
                friendInfo={currentFriend as IUser}
                isActive={onlineUser.some(
                  (user) => user.userId === currentFriend?._id
                )}
              />
            </div>
          ) : currentFriend ? (
            <div className='h-full flex-1'>
              <MessageContainer
                messages={undefined}
                onSubmit={handleSubmit(handleCreateConversation)}
                register={register}
                friendInfo={currentFriend as IUser}
                isActive={onlineUser.some(
                  (user) => user.userId === currentFriend?._id
                )}
              />
            </div>
          ) : (
            <div className='flex-1 text-2xl text-gray-500 font-semibold flex items-center justify-center w-full'>
              Select a chat or start a new conversation
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
