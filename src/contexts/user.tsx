import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import userApi from "../api/user";
import { IUser } from "../interface";

interface IContext {
  user: IUser | undefined;
  getUser: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<IContext>(undefined as any);

interface Props {
  children: React.ReactNode;
}

export function UserProvider(props: Props) {
  const [user, setUser] = useState<IUser | undefined>(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) return undefined;

    const decoded: IUser = jwtDecode(token);

    return {
      _id: decoded._id,
      name: decoded.name,
    } as IUser;
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) return;

  //   getUser();
  // });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const user = await userApi.getProfile();
      setUser(user.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const logout = () => {
    Swal.fire({
      title: "Logout",
      text: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        setUser(undefined);
        localStorage.removeItem("token");
        setIsLoading(false);
        Swal.fire("Success!", "Logout successfully!", "success");
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, getUser, logout, isLoading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
