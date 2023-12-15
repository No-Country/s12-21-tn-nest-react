import { createContext, useEffect, useState } from "react";
import {io} from "socket.io-client";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SocketConext = createContext();


export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(() => {
      return io(BASE_URL, {
        auth: {
          token: Cookies.get("token"),}
      });
    });


    useEffect(() => {
      setSocket(
        io(BASE_URL, {
          auth: {
            token: Cookies.get("token"),}
        })
      );
    }, []);

    return (
        <SocketConext.Provider value={{socket}}>
            {children}
        </SocketConext.Provider>
    )

}
