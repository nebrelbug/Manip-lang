function generateAst(expressions) {
  this = {}
  for (var i = 0; i < expressions.length; i++) {
      var expression = expressions[i];
      var etype = evaluateType(expression);
      if (etype === "comment") {
          this[i] = new astObject.Comment
      } else if (etype === "string") {
          this[i] = parseExpression(expression, etype)
      } else if (etype === "number") {
        this[i] = parseExpression(expression, etype)
      } else if (etype === "variable") {
        this[i] = parseExpression(expression, etype)  
      } else if (etype === "log") {
          
      } else if (etype === "conditional") {
          
      } else if (etype === "do") {
          
      } else if (etype === "function") {
          
      }
  }