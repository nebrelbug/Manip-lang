function generateAstFromExps(expressions) {
  var ast = {}
  for (var i = 0; i < expressions.length; i++) {
      var expression = expressions[i];
      console.log("expression: " + expression)
      var etype = evaluateType(expression);
      if (etype === "comment") {
          ast[i] = parseComment()
          console.log("ast[" + i + "]: " + JSON.stringify(ast[i]))
      } else if (etype === "string") {
          ast[i] = parseDeclaration(expression, etype)
          console.log("ast[" + i + "]: " + JSON.stringify(ast[i]))
      } else if (etype === "number") {
          ast[i] = parseDeclaration(expression, etype)
          console.log("ast[" + i + "]: " + JSON.stringify(ast[i]))
      } else if (etype === "variable") {
          ast[i] = parseDeclaration(expression, etype)
          console.log("ast[" + i + "]: " + JSON.stringify(ast[i]))
      } else if (etype === "log") {
          ast[i] = parseLog(expression)
          console.log("ast[" + i + "]: " + JSON.stringify(ast[i]))
      } else if (etype === "conditional") {
          ast[i] = parseConditional(expression)
          console.log("ast[" + i + "]: " + JSON.stringify(ast[i]))
      } else if (etype === "do") {
          ast[i] = parseDo(expression)
          console.log("ast[" + i + "]: " + JSON.stringify(ast[i]))
      } else if (etype === "function") {
          ast[i] = parseFunction(expression)
          console.log("ast[" + i + "]: " + JSON.stringify(ast[i]))
      } else if (etype === "loop") {
          ast[i] = parseLoop(expression)
          console.log("ast[" + i + "]: " + JSON.stringify(ast[i]))
      }
  }
  console.log("our ast: " + JSON.stringify(ast))
  return ast
}

function generateAstFromFile(path) {
  requestFile(path, function doTheStuff(error, content) {
      if (error) throw error
      var expressions = getExpressions(content, false)
      console.log("expressions at 228: " + expressions)
      console.log("final ast: " + JSON.stringify(generateAstFromExps(expressions)))
      return generateAstFromExps(expressions)

  })
}


