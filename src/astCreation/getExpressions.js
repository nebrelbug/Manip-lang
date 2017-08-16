function getExpressions(file) {
var noWhiteSpaceFile = file.replace(/\s/g,'');
var expressions = noWhiteSpaceFile.split(";");
return expressions;
}
