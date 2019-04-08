import { Injectable, Inject } from '@angular/core';
import { SocketIOSubject } from './socket-io-subject';
import { Actions, Store, getValue, ofActionDispatched, getActionTypeFromInstance } from '@ngxs/store';
import {
    ConnectSocketIO,
    SocketIOWebSocket,
    SendSocketIOAction,
    NGXS_SOCKETIO_OPTIONS,
    NgxsSocketIOPluginOptions,
    AuthenticateSocketIO,
    SocketIOMessageError,
    SocketIOConnected,
    SocketIODisconnected,
    SendSocketIOEvent as SendSocketIOEvent,
} from './symbols';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class SocketIOHandler {
    constructor(
        store: Store,
        actions: Actions,
        socket: SocketIOSubject,
        @Inject(NGXS_SOCKETIO_OPTIONS) config: NgxsSocketIOPluginOptions,
    ) {
        actions.pipe(ofActionDispatched(ConnectSocketIO)).subscribe(event => socket.connect(event.payload));
        actions.pipe(ofActionDispatched(SocketIOWebSocket)).subscribe(event => socket.disconnect());
        actions.pipe(ofActionDispatched(SendSocketIOAction)).subscribe(({ payload }) => {
            const type = getActionTypeFromInstance(payload);
            socket.send({ ...payload, type });
        });

        actions.pipe(ofActionDispatched(SendSocketIOEvent)).subscribe((action: SendSocketIOEvent) => {
            socket.send({ ...action.payload }, action.eventName);
        })

        actions.pipe(ofActionDispatched(AuthenticateSocketIO)).subscribe(event => socket.auth({ sumo: 1 }));
        socket.connectionStatus.pipe(distinctUntilChanged()).subscribe(status => {
            if (status) {
                store.dispatch(new SocketIOConnected({ socketId: socket.id }));
            } else {
                store.dispatch(new SocketIODisconnected());
            }
        });
        socket.subscribe(
            msg => {
                const type = getValue(msg, config.typeKey);
                if (!type) {
                    throw new Error(`Type ${type} not found on message`);
                }
                store.dispatch({ ...msg, type });
            },
            err => store.dispatch(new SocketIOMessageError(err)),
        );
    }
}
