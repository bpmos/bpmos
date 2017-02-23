import { Application, Package } from './bpmos-ast';
import fs = require('fs');

var config: Config;

export interface Config {
    workdir: string;
    builders: Builder[];
    packages: Package[];
    artifacts: Artifact[];
}

export interface Builder {
    name: string;
    build(config: Config, app: Application);
    active: boolean,
    devServer(): boolean
}

export interface Artifact {
    package: Package;
    path: string;
    dependencies: Artifact[]
}

export function getConfig() {
    return config;
}

export function setConfig(value: Config) {
    config = value;
}

export function getArtifactByPath(path: string) {
    var r: Artifact;
    config.artifacts.some((a) => {
        var found = a.path === path;
        if (found)
            r = a;
        return found;
    });
    return r;
}

export function dropDependencies(artifact: Artifact) {
    artifact.dependencies.forEach(d => {
        fs.unlink(d.path);
        dropDependencies(d);
    });
}