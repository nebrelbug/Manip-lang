function getExpressions(file, miniAst) {//miniAst is boolean, true if it's a miniAst
    var expressions;
    if (miniAst) {
        var expressions = file.toString().split(",");
    } else {
        var expressions = file.toString().split(";");
    }
    for (var i = 0; i < expressions.length; i++) {
        expressions[i] = expressions[i].trim().toString().replace(/[^\S ]+/g, '')
    }
    return expressions;
}