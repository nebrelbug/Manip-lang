function nameVar(type, value) {
  this.type = type;//Either str, constStr, num, constNum, var, constVar
  this.value = value;//Whatever the value is
}//End of function nameVar

function nameFunc(expressions) {
  this.miniAst = generateAst(expressions);
}

function astObject(content, names) {
  this.content =  content;
  this.names = names;
}
