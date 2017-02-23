#!/usr/bin/env node
"use strict";

import React = require('react');
import { renderToString } from 'react-dom/server'

import express = require('express');
import fs = require('fs');
import { Config, setConfig } from './bpmos-config';
import { Application, Package } from './bpmos-ast';
import { node_html5_builder } from './node-html5-builder/node-html5-builder';
import { fileWatcher } from './filewatcher';

import { Home } from './node-html5-builder/serverRendering/home';
import { App } from './node-html5-builder/serverRendering/app';

import Fiber = require('fibers');

var config: Config = {
    workdir: process.env.HOME + '/bpmos/workdir',
    builders: [node_html5_builder],
    artifacts: [],
    packages: [
        {
            name: 'helloword',
            rootPath: '/home/hoda51/bpmos/samples/helloworld',
            remotes: {
            }
        },
        {
            name: 'doctorz',
            rootPath: '/home/hoda51/zscan',
            remotes: {
                origin: 'https://github.com/thr0w/zscan.git'
            }
        },
        {
            name: 'h5blob',
            rootPath: '/home/hoda51/hoda5/blob'
        },
        {
            name: 'restaurante',
            rootPath: '/home/hoda51/projetosEmPlanejamento/restaurante'
        },
        {
            name: 'pozzzo',
            rootPath: '/home/hoda51/projetosEmPlanejamento/hoteis'
        },
        {
            name: 'jarbasdoles',
            rootPath: '/home/hoda51/sites/jarbasdoles'
        }
    ]
};
setConfig(config);
var app = express();
fileWatcher(config);

hRoute('/', () => {
    debugger
    return Home(config);
})
config.packages.forEach((p) => {
    hRoute('/' + p.name, () => <app pkg={p} />)
})

function hRoute(path: string, fn: () => any) {
    app.get(path, function (req, res) {
        Fiber(function () {
            res.send(renderToString(fn()));
        }).run();
    });
}

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(['BPMOS dev server running at http://localhost:', port].join(''));
});

config.packages.forEach(function (p) {
    config.builders.forEach(function (b) {
        if (p.name == 'helloword' && b.name == 'html5 - node') {
            app.get('/' + p.name, function (req, res) {

            });
        }
        // b.devServer(p);
    });
});

