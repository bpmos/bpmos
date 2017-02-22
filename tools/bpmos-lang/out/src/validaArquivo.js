"use strict";
const vscode_languageserver_1 = require("vscode-languageserver");
function validaArquivo(document) {
    let diagnostics = [];
    let lines = document.getText().split(/\r?\n/g);
    console.dir(lines);
    lines.forEach((line, i) => {
        let index = line.indexOf('typescript');
        if (index >= 0) {
            diagnostics.push({
                severity: vscode_languageserver_1.DiagnosticSeverity.Warning,
                range: {
                    start: { line: i, character: index },
                    end: { line: i, character: index + 10 }
                },
                message: `${line.substr(index, 10)} should be spelled TypeScript`,
                source: 'ex'
            });
        }
    });
    return diagnostics;
}
exports.validaArquivo = validaArquivo;
//# sourceMappingURL=validaArquivo.js.map