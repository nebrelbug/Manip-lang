function evaluateType(expression) {
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