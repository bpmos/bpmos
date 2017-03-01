import * as ts from "typescript";
import * as path from "path";

function createCompilerHost(options: ts.CompilerOptions, moduleSearchLocations: string[]): ts.CompilerHost {
    return {
        getSourceFile,
        getDefaultLibFileName: () => "lib.d.ts",
        writeFile: (fileName, content) => ts.sys.writeFile(fileName, content),
        getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
        getCanonicalFileName: fileName => ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
        getDirectories(path: string): string[] {
            return [];
        },
        getNewLine: () => ts.sys.newLine,
        useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
        fileExists,
        readFile,
        resolveModuleNames
    }

    function fileExists(fileName: string): boolean {
        return ts.sys.fileExists(fileName);
    }

    function readFile(fileName: string): string {
        return ts.sys.readFile(fileName);
    }

    function getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) {
        const sourceText = ts.sys.readFile(fileName);
        return sourceText !== undefined ? ts.createSourceFile(fileName, sourceText, languageVersion) : undefined;
    }

    function resolveModuleNames(moduleNames: string[], containingFile: string): ts.ResolvedModule[] {
        return moduleNames.map(moduleName => {
            // try to use standard resolution
            let result = ts.resolveModuleName(moduleName, containingFile, options, { fileExists, readFile });
            if (result.resolvedModule) {
                return result.resolvedModule;
            }

            // check fallback locations, for simplicity assume that module at location should be represented by '.d.ts' file
            console.dir('moduleSearchLocations', moduleSearchLocations)
            for (const location of moduleSearchLocations) {
                console.log('location',location)
                const modulePath = path.join(location, moduleName + ".ts");
                console.log('modulePath',modulePath)
                if (fileExists(modulePath)) {
                    return { resolvedFileName: modulePath }
                }
            }

            return undefined;
        });
    }
}

function compile(sourceFiles: string[], moduleSearchLocations: string[]): void {
    const options: ts.CompilerOptions = { module: ts.ModuleKind.System, target: ts.ScriptTarget.ES5 };
    const host = createCompilerHost(options, moduleSearchLocations);
    const program = ts.createProgram(sourceFiles, options, host);
    /// do something with program...

}
var dir = [
    '/home/h5/bpmos'
    ] ;
compile(['e'], dir);
    console.log(ts.sys.getCurrentDirectory());

// function compile_tsbuilder(sourceFiles: string[], moduleSearchLocations: string[]): void {
//     // var p = path.join(sourceFile);
//     // console.dir(p)
//     const options: ts.CompilerOptions = { module: ts.ModuleKind.System, target: ts.ScriptTarget.ES5 };
//     const host = createCompilerHost(options, moduleSearchLocations);
//     const program = ts.createProgram(sourceFiles, options, host);
//     /// do something with program...

// }
// compile_tsbuilder(['e'], ['home/bpmos/exemplos/ts-builder']);
