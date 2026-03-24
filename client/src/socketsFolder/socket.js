import { io } from "socket.io-client";
const url = "http://localhost:3000";
const socket = io(url, {autoConnect: false});
export const messageSocket = io(`${url}/messages`, { autoConnect: false });

export default socket;
