'use strict';

import * as path from 'path';

import { workspace, Disposable, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, SettingMonitor, ServerOptions, TransportKind } from 'vscode-languageclient';


export function activate(context: ExtensionContext) {

    let serverModule = context.asAbsolutePath(path.join('server', 'server.js'));
    let debugOptions = {
        execArgv: [
            "--nolazy",
            "--debug=6004"
        ]
    };
    let serverOptions: ServerOptions = {
        run: {
            module: serverModule, 
            transport: TransportKind.ipc
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions
        }
    }


    let clientOptions: LanguageClientOptions = {
        documentSelector: ['bpmos'], 
        synchronize: {
            configurationSection: 'languageServerExample',
            fileEvents: workspace.createFileSystemWatcher('**/clientrc')
        }
    }
    let disposable = new LanguageClient('languageServerExample', 'Example', serverOptions, clientOptions).start();
    context.subscriptions.push(disposable);
}