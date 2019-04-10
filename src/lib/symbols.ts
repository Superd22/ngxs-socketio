import { InjectionToken } from '@angular/core';
import ConnectOpts = SocketIOClient.ConnectOpts;

export const NGXS_SOCKETIO_OPTIONS = new InjectionToken('NGXS_SOCKETIO_OPTIONS');

export interface NgxsSocketIOPluginOptions {
    /**
     * URL of the websocket.
     */
    url?: string;

    connectOpts?: ConnectOpts;

    tokenFn?: () => string;

    /**
     * The property name to distigunish this type for the store.
     * Default: 'type'
     */
    typeKey?: string;


    /**
     * The name of the SocketIO event to use to listen for actions
     * Default: 'actions'
     */
    eventForActions?: string;

    /**
     * Interval to try and reconnect.
     * Default: 5000
     */
    reconnectInterval?: number;

    /**
     * Number of reconnect attemps.
     * Default: 10
     */
    reconnectAttempts?: number;

    /**
     * Serializer to call before sending messages
     * Default: `json.stringify`
     */
    serializer?: (data: any) => string;

    /**
     * Deseralizer before publishing the message.
     */
    deserializer?: (e: MessageEvent) => any;
}

export function noop(arg) {
    return () => { };
}

/**
 * Action to connect to the websocket. Optionally pass a URL.
 */
export class ConnectSocketIO {
    static readonly type = '[SocketIO] Connect';
    constructor(public payload?: NgxsSocketIOPluginOptions) { }
}

/**
 * Action triggered when a error ocurrs
 */
export class SocketIOMessageError {
    static readonly type = '[SocketIO] Message Error';
    constructor(public payload: any) { }
}

/**
 * Action to disconnect the websocket.
 */
export class SocketIOWebSocket {
    static readonly type = '[SocketIO] Disconnect';
}


/**
 * Send message to socket io
 */
export class SendSocketIOEvent<T=any> {
    static readonly type = '[SocketIO] Send Message';

    /** data we want to send */
    public payload: T;
    /** name of the event for socketio, defaults to 'actions' */
    public eventName = "actions";

    /**
     * @param payload the data to send via socket-io
     * @param name type of event to send
     */
    constructor(payload: T)
    constructor(payload: T, name: string)
    constructor(payload: T, name?: string) {
        this.payload = payload;
        if (name) this.eventName = name;
    }
}


/**
 * Action to send to the server.
 */
export class SendSocketIOAction {
    static readonly type = '[SocketIO] Send Action';
    constructor(public payload: any) { }
}

export class SocketIOConnected {
    static readonly type = '[SocketIO] Connected';
    constructor(public payload: { socketId: string }) { }
}

export class SocketIODisconnected {
    static readonly type = '[SocketIO] Disconnected';
}

export class AuthenticateSocketIO {
    static readonly type = '[SocketIO] authenticate';
}
