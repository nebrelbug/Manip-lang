function evaluateType(expression) {
    var commentExp = new RegExp('\/\/[^]*?\/\/', 'g');
    var stringExp = new RegExp('Str\(', 'g');
    var numExp = new RegExp('Num\(', 'g');
    var varExp = new RegExp('Var\(', 'g');
    var logExp = new RegExp('Log\[[^]*\]', 'g')
    var conditionalExp = new RegExp('If\|[^]*?\|[^]*?\|', 'g')
    var doExp = new RegExp('Do\[[^]*?\]', 'g')
    var funcExp = new RegExp('Func\([^]*?\)', 'g')
    //But we actually won't use these fancy exp's now...
    if (expression.substring(0, 2) === "//") {
        return "comment"
    } else if (expression.substring(0, 3) === "Str") {
        return "string"
    } else if (expression.substring(0, 3) === "Num") {
        return "number"
    } else if (expression.substring(0, 3) === "Var") {
        return "variable"
    } else if (expression.substring(0, 3) === "Log") {
        return "log"
    } else if (expression.substring(0, 2) === "If") {
        return "conditional"
    } else if (expression.substring(0, 2) === "Do") {
        return "do"
    } else if (expression.substring(0, 4) === "Func") {
        return "function"
    } else if (expression.substring(0, 3) === "For") {
        return "loop"
    }
}