function generateAst(expressions) {
  this = {}
  for (var i = 0; i < expressions.length; i++) {
    var expression = expressions[i];
    var etype = evaluateType(expression);
    if (etype === "comment") {
      this[i] = parseComment()
    } else if (etype === "string") {
      this[i] = parseDeclaration(expression, etype)
    } else if (etype === "number") {
      this[i] = parseDeclaration(expression, etype)
    } else if (etype === "variable") {
      this[i] = parseDeclaration(expression, etype)
    } else if (etype === "log") {
      this[i] = parseLog(expression)
    } else if (etype === "conditional") {
      this[i] = parseConditional(expression)
    } else if (etype === "do") {
      this[i] = parseDo(expression)
    } else if (etype === "function") {
      this[i] = parseFunction(expression)
    } else if (etype === "loop") {
      this[i] = parseLoop(expression)
    }
  }
}