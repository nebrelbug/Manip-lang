function generateAst(expressions) {
  ast = new astObject (0, 0);
  for (var i=0; i<expressions.length; i++) {
    var expression = expressions[i];
    ast.evaluateType(expression);
}

//generateAstFromExpressions(getExpressions(file));
