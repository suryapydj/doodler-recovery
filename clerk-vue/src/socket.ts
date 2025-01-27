import { io } from 'socket.io-client';

const socket = io('https://24b40356-a00d-4a97-ad9b-fc6d249fb385-00-36bsdd8s97b2j.worf.replit.dev:5173/');
export const useSocket = () => {
  return socket;
};