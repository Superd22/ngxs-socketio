export { NgxsSocketIOPluginModule as NgxsWebsocketPluginModule } from './lib/socket-io.module';
export {
  NgxsSocketIOPluginOptions as NgxsWebsocketPluginOptions,
  NGXS_SOCKETIO_OPTIONS,
  ConnectSocketIO as ConnectWebSocket,
  SocketIOWebSocket as DisconnectWebSocket,
  SocketIOConnected as WebSocketConnected,
  SocketIODisconnected as WebSocketDisconnected,
  AuthenticateSocketIO as AuthenticateWebSocket,
  SendSocketIOAction as SendWebSocketAction,
  SocketIOMessageError as WebsocketMessageError,
} from './lib/symbols';
