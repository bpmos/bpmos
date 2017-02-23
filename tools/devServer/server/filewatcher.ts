import { Config, getArtifactByPath, dropDependencies } from './bpmos-config';

import chokidar = require('chokidar');

export function fileWatcher(config: Config) {

    config.packages.forEach(function (p) {
        chokidar.watch(p.rootPath).on('all', (event, path) => {
            var a = getArtifactByPath(path);
            if (a) dropDependencies(a);
        });
    })

}