import { io } from "socket.io-client";
import { baseUrl } from ".";

export const Chatsocket =()=>{

    return io(baseUrl)
}