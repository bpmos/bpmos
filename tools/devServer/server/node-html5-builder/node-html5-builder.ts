import path = require('path');
import fs = require('fs');
import mkdirp_async = require('mkdirp');
import { Config, Builder } from '../bpmos-config';
import { Application, Package } from '../bpmos-ast';
import Future = require('fibers/future');

var mkdirp = Future.wrap(mkdirp_async);

export var node_html5_builder: Builder = {
    name: 'html5 - node',
    active: true,
    build(config: Config, app: Application) {
        var p = config.workdir + '/helloworld';
        mkdirp(p);
        fs.writeFileSync(p + '/package.json', '{}');
        fs.writeFileSync(p + '/main.js', `
var express = require('express');
var app = express();
var view_hello_world = require('./view_hello_world');
app.get('/', function (req, res) {
  res.send(view_hello_world());
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
  `);

        fs.writeFileSync(p + '/view_hello_world.js', `
    module.exports='Hello World!';
    `);
},
  
    // ASTChanged(config: Config, pkg: Package, path: string) {
    //     var p = config.workdir + '/helloworld';
    //     var f= p + '/view_hello_world.ast';
    //     fs.unlinkSync(f);
    //     f= p + '/view_hello_world.js';
    //     fs.unlinkSync(f);
    // },
    // serve(config: Config, pkg: Package, path: string) {
    //     // if(nao_existe_ast) gerar_ast();
    //     // if (nao_exit_js) gerar_js()
    //     // return js;
    // },
    devServer() {
        return true;
    }
}