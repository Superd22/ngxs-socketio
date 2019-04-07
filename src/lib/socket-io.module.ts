import { NgModule, ModuleWithProviders, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsSocketIOPluginOptions, NGXS_SOCKETIO_OPTIONS } from './symbols';
import { SocketIOHandler } from './socket-io-handler';
import { SocketIOSubject } from './socket-io-subject';
import { noop } from './symbols';

export function websocketOptionsFactory(options: NgxsSocketIOPluginOptions) {
    return {
        reconnectInterval: 5000,
        reconnectAttempts: 10,
        typeKey: 'type',
        deserializer(e: MessageEvent) {
            return JSON.parse(e.data);
        },
        serializer(value: any) {
            return JSON.stringify(value);
        },
        ...options,
    };
}

export const USER_OPTIONS = new InjectionToken('USER_OPTIONS');

@NgModule({
    imports: [NgxsModule],
})
export class NgxsSocketIOPluginModule {
    static forRoot(options?: NgxsSocketIOPluginOptions): ModuleWithProviders {
        return {
            ngModule: NgxsSocketIOPluginModule,
            providers: [
                SocketIOSubject,
                SocketIOHandler,
                {
                    provide: USER_OPTIONS,
                    useValue: options,
                },
                {
                    provide: NGXS_SOCKETIO_OPTIONS,
                    useFactory: websocketOptionsFactory,
                    deps: [USER_OPTIONS],
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: noop,
                    deps: [SocketIOHandler],
                    multi: true,
                },
            ],
        };
    }
}
