export { NgxsSocketIOPluginModule } from './lib/socket-io.module';
export {
    NgxsSocketIOPluginOptions,
    NGXS_SOCKETIO_OPTIONS,
    ConnectSocketIO as ConnectWebSocket,
    SocketIOWebSocket as DisconnectWebSocket,
    SocketIOConnected as WebSocketConnected,
    SocketIODisconnected as WebSocketDisconnected,
    AuthenticateSocketIO as AuthenticateWebSocket,
    SendSocketIOAction as SendWebSocketAction,
    SocketIOMessageError as WebsocketMessageError,
} from './lib/symbols';
