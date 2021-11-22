import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";
import userApi from "../api/user";
import { IUser } from "../interface";

interface IContext {
  user: IUser | undefined;
  setUser?: React.Dispatch<React.SetStateAction<IUser>> | undefined;
  getUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<IContext>(undefined as any);

interface Props {
  children: React.ReactNode;
}

export function UserProvider(props: Props) {
  const [user, setUser] = useState<IUser | undefined>(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // User is undefined if there's no token
    if (!token) return undefined;

    // Decode if there's token
    const decoded: IUser = jwtDecode(token);

    // Set id and role as user data
    // => Will re-render routes and push to / (user role's homepage)
    return {
      _id: decoded._id,
      name: decoded.name,
    } as IUser;
  });

  const getUser = async () => {
    try {
      const user = await userApi.getProfile();
      setUser(user.data);
    } catch (error) {
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
        setUser(undefined);
        localStorage.removeItem("token");
        Swal.fire("Success!", "Logout successfully!", "success");
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, getUser, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
