var ast = {};
var names = {};
function requestFile(path) {
var httpRequest;

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.log('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = storeContents;
    httpRequest.open('GET', path);
    httpRequest.send();
  }

  function storeContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var mnipFile = httpRequest.responseText;
        console.log(httpRequest.responseText);
        parseFile(mnipFile);
      } else {
        console.log('There was a problem with the request.');
      }
    }
  }
    makeRequest();
}//end of requestFile


requestFile('test.mnip');

function parseFile(file) {
  //console.log("file: " + file);
  //console.log("With no spaces: " + file.replace(/\s/g,''));
  var noWhiteSpaceFile = file.replace(/\s/g,'');
  var expressions = noWhiteSpaceFile.split(";");
  //console.log("expressions: " + expressions);
  
  function nameFunc(miniAst) {
    this.miniAst = miniAst;
}//End of function nameFunc
  
  
  function nameVar(type, value) {
    this.type = type;//Either str, constStr, num, constNum, var, constVar
    this.value = value;//Whatever the value is
  }//End of function nameVar
  
  for (var i=0; i<expressions.length; i++) {
    //(for each expression)
    var type = 0;
    var action = 0;
    var rest = 0;
    var value = 0;
    var expressionEval = expressions[i];
    console.log("expressionEval: " + expressionEval);
    
    
    //if expression is declaring a string
    if(expressionEval.charAt(0) + expressionEval.charAt(1) + expressionEval.charAt(2) === "Str") {
      type = "varDec";
      var insideParentheses = /\(([^)]+)\)/;
var varName = insideParentheses.exec(expressionEval);
      varName = varName[1];
      var afterEqualsRegExp = /=(.+)/;
value = afterEqualsRegExp.exec(expressionEval);
      ast.names = {};
      ast.names[varName] = {
        value: varName[1]
      }
      action = "set";
      value = varName[1];
    }
    //End of if expression is declaring a string
    
    //If expression is logging something
    if(expressionEval.charAt(0) + expressionEval.charAt(1) + expressionEval.charAt(2) === "log") {
      type = "log";
      var insideParentheses = /\(([^)]+)\)/;
var logValue = insideParentheses.exec(expressionEval);
      logValue = varName[1];
      value = logValue;
      action = "log";
      rest = 0;
    }
    //End of if expression is logging something
    
    //If expression is if statement
    if(expressionEval.charAt(0) + expressionEval.charAt(1) === "if") {
      type = "conditional";
      var insideParentheses = /\(([^)]+)\)/;
var condition = insideParentheses.exec(expressionEval);
      varName = varName[1];                              
    }
//End of if expression is if statement
    //If expression is do
    
    if(expressionEval.charAt(0) + expressionEval.charAt(1) === "do") {
      type = "do";
      var insideParentheses = /\(([^)]+)\)/;
var varName = insideParentheses.exec(expressionEval);
      varName = varName[1];
      var afterEqualsRegExp = /\(([^)]+)\)/;
value = afterEqualsRegExp.exec(expressionEval);
      ast.names = {};
      ast.names[varName] = {
        value: value[1]
      }                                    
    }
    
    if(expressionEval.charAt(0) + expressionEval.charAt(1) + expressionEval.charAt(2) +expressionEval.charAt(3) === "Func") {
      type = "funcDec";
      var insideParentheses = /\(([^)]+)\)/;
var varName = insideParentheses.exec(expressionEval);
      varName = varName[1];
      var afterEqualsRegExp = /\(([^)]+)\)/;
value = afterEqualsRegExp.exec(expressionEval);
      ast.names = {};
      ast.names[varName] = {
        value: value[1]
      }                                    
    }
    ast[i] = new astExpression(type, action, rest, value);
  }
  console.log(ast);
  
}
