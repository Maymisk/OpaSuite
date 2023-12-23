import { server } from './http/app';
import './websocket/chat';

server.listen(3333, () => console.log('Server is Running!'));
