Suite('asaf', function() {
  caso('ok', function() {
    var doc=new Document()
    doc.text = 'ok\nTypeScript\n'
    assert.equal(valida(doc), [])
  });
  caso('fgaasfg', function() {
    var doc=new Document()
    doc.text = 'ok\ntypescript\n'
    assert.equal(valida(doc), [{message: {linha: 2, 'TypeScript'}}])
  });
);
