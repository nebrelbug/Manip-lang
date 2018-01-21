function getExpressions(file) {
    var noWhiteSpaceFile = file.replace(/\s/g, '');
    var expressions = noWhiteSpaceFile.split(";");
    for (var i = 0; i<expressions.length;i++) {
        expressions[i] = expressions[i].trim()
    }
    return expressions;
}
