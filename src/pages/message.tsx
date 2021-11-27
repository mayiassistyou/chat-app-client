import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import messageApi from "../api/message";
import AppBox from "../components/app-box";
import AppInput from "../components/app-input";
import Layout from "../components/layout";
import LoadingOverlay from "../components/loading-overlay";
import MessageItem from "../components/message-item";
import PersonItem from "../components/person-item";
import { useUser } from "../contexts/user";
import { IConversation, IMessage } from "../interface";
import io from "socket.io-client";

export default function MessagePage() {
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useUser();
  const scrollRef = useRef<any>();

  const [conversationList, setConversationList] = useState<
    IConversation[] | undefined
  >([]);
  const [currentChat, setCurrentChat] = useState<IConversation | undefined>(
    undefined
  );
  const [messageContent, setMessageContent] = useState<IMessage[] | undefined>(
    []
  );
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io("https://chat-choichoi-socket.herokuapp.com/", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
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
        return [...prevState, arrivalMessage];
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
  }, [user]);

  // load message on selected conversation
  useEffect(() => {
    const getMessage = async () => {
      const response = await messageApi.getMessages(currentChat?._id as string);
      setMessageContent(response.data);
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
        const response = await messageApi.sendMessage(message);
        messageContent && setMessageContent([...messageContent, response.data]);
        setValue("message", "");
      } catch (error) {
        console.log(error);
      }
    };

    sendMessage();
  };

  // scroll to lastest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageContent]);

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
                const friendId = conversation.members.filter(
                  (mem: string) => mem !== user?._id
                );
                return (
                  <PersonItem
                    key={conversation._id}
                    friendId={friendId[0]}
                    onClick={() => {
                      setCurrentChat(conversation);
                    }}
                    isSelected={currentChat?._id === conversation._id}
                  />
                );
              })}
            </AppBox>
          </div>

          {/* CHAT BOX */}
          <div className='h-full flex-1'>
            <AppBox>
              <div className='h-full flex flex-col justify-between'>
                <div className='overflow-auto'>
                  {messageContent?.map((msg, index) => {
                    return (
                      <div key={index} ref={scrollRef}>
                        <MessageItem
                          text={msg.text}
                          isOwned={msg.senderId === user?._id}
                        />
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmit(onSendMessage)} className='flex'>
                  <input {...register("message")}></input>
                  <button type='submit'>send</button>
                </form>
              </div>
            </AppBox>
          </div>
        </div>
      </div>
    </Layout>
  );
}
