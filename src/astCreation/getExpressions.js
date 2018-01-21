function getExpressions(file, miniAst) {
    //var noWhiteSpaceFile = file.replace(/\s/g, '');
    var expressions;
    if (miniAst) {
        var expressions = file.split(",");
    } else {
        var expressions = file.split(";");
    }
    for (var i = 0; i < expressions.length; i++) {
        expressions[i] = expressions[i].trim().replace(/[^\S ]+/g, '')
    }
    return expressions;
}
