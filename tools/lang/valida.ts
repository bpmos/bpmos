function validaArquivo(document): Diagnostic[]
{
  let lines = document.getText().split(/\r?\n/g);
	console.dir(lines);
	lines.forEach((line, i) => {
		let index = line.indexOf('typescript');
		if (index >= 0) {
			diagnostics.push({
				severity: DiagnosticSeverity.Warning,
				range: {
					start: { line: i, character: index },
					end: { line: i, character: index + 10 }
				},
				message: `${line.substr(index, 10)} should be spelled TypeScript`,
				source: 'ex'
			});
		}
	})
  return diagnostics;
}
