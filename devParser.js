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

function requestFile(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null, xhr.response)
            } else {
                callback(xhr.status, null)
            }
        }
    }
    xhr.open('get', url, true)
    xhr.send();
}

function getExpressions(file, miniAst) {
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

astObject = {};
astObject.Declaration = function (name, value, type, constant) {//constant is boolean, type = "var" or "str" or "num"
    this.name = name;
    this.value = value;
    this.type = type;
    this.constant = constant;
};

astObject.Comment = function () {
    this.type = "comment"
};

astObject.Log = function (value, type) { //value is log value, type is like error or success
    this.value = value;
    this.type = type;
};

astObject.Conditional = function (condition, miniAst) {//constant is boolean, type = "var" or "str" or "num"
    this.condition = condition;
    this.miniAst = miniAst;
};

astObject.Do = function (nameCalled, params) {//constant is boolean, type = "var" or "str" or "num"
    this.nameCalled = nameCalled;
    this.params = params;
};

astObject.Function = function (name, params, miniAst) {//constant is boolean, type = "var" or "str" or "num"
    this.name = name;
    this.params = params;
    this.miniAst = miniAst;
};

astObject.Loop = function (varName, loopLength, miniAst) {
    this.varName = varName;
    this.loopLength = loopLength;
    this.miniAst = miniAst;

}

function parseDeclaration(ex, etype) {
    var name, value, type, constant;
    //constant is boolean (if 2 equals signs), type = "var" or "str" or "num"
    var nonConstantExp = /\)[^\\]*=/g //Matches if contains closing parenthese, then any character except for forward slash, then equals sign
    var constantExp = /\)[^\\]*==/g
    name = /[^\(\)]+/g.exec(/\([^\)]*\)/g.exec(/[\w][\w][\w]\(([^\)]*)\)/g.exec(ex)))
    var includingAndAfterEqualExp = /=[ ]*["'\w_\-\.\d ]*/g
    value = includingAndAfterEqualExp.exec(ex).toString().replace('=', '').trim()
    if (etype === "string") {
        type = "str"
    } else if (etype === "number") {
        type = "num"
    } else if (etype === "variable") {
        type = "var"
    }

    if (nonConstantExp.test(ex)) {
        constant = false
    } else if (constantExp.test(ex)) {
        constant = true
    }

    return new astObject.Declaration(name, value, type, constant)
}

function parseComment(ex) {
    return new astObject.Comment
}

function parseLog(ex) {
    var value, type;
    var withBracketsExp = /\[([^]*)\]/g
    var insideBracketsExp = /[^\[\]]+/g
    var hasTypeExp = /"[ ]*,[^"]*/g
    var insideBrackets = insideBracketsExp.exec(withBracketsExp.exec(ex))
    if (hasTypeExp.test(insideBrackets)) {
        type = /\w*/g.exec(hasTypeExp.exec(insideBrackets))
    } else {
        type = "default"
    }
    value = /[^'"][^]+[^'"]/g.exec(/"[^]+"/.exec(insideBrackets))
    return new astObject.Log(value, type)
}

function parseConditional(ex) {
    var condition, miniAst;
    condition = /[^\|]+/.exec(/\|[^(\|)]*\|/.exec(ex))
    console.log("conditional condition: " + condition)
    var innerContent = ex.toString().replace(/If\|[^(\|)]*\|/, '')
    innerContent = innerContent.toString().replace(innerContent.substr(innerContent.length - 1), '')
    var innerExps = getExpressions(innerContent, true)
    console.log("conditional innerExps: " + innerExps)
    miniAst = generateAstFromExps(innerExps)
    console.log("conditional miniAst: " + JSON.stringify(miniAst))
    return new astObject.Conditional(condition, miniAst)
}

function parseDo(ex) {
    var nameCalled, params;
    nameCalled = /\[[\w]*/.exec(ex).toString().replace("[", "")
    params = /\[[^\]\[]*\]/.exec(ex).toString().replace("[", "").toString().replace("]", "")
    params = params.toString().split(",")
    console.log("do params: " + params)
    return new astObject.Do(nameCalled, params);
}

function parseFunction(ex) {
    var name, params, miniAst;
    params = /[^\]\[\|]+/.exec(/\|[^(\|)]*\|/.exec(ex)).toString().replace(/\s/g, '').toString().split(',')
    name = /[^\(\)]+/.exec(/\([^\)]*\)/.exec(/Func\(([^\)]*)\)/.exec(ex)))
    var innerContent = ex.toString().replace(/Func\([^]*\)[ ]*=[ ]*\|[^(\|)]*\|/, '')
    innerContent = innerContent.slice(0, -1)
    var innerExps = getExpressions(innerContent, true)
    console.log("function innerExps: " + innerExps)
    miniAst = generateAstFromExps(innerExps)
    console.log("function miniAst: " + JSON.stringify(miniAst))

    return new astObject.Function(name, params, miniAst)
}

function parseLoop(ex) {
    var varName, loopLength, miniAst;
    loopLength = /\[\d+/.exec(ex).toString().replace("[", "");
    varName = /[\d\w\-\_]+\]/.exec(ex).toString().replace("]", "");
    var innerContent = /\|[^]*\|/.exec(ex)
    console.log("loop innerContent: " + innerContent)
    innerContent = innerContent.toString().slice(1, -1);
    console.log("loop innerContent2: " + innerContent)
    var innerExps = getExpressions(innerContent, true)
    console.log("loop innerExps: " + innerExps)
    miniAst = generateAstFromExps(innerExps)
    console.log("loop miniAst: " + JSON.stringify(miniAst))
    return new astObject.Loop(varName, loopLength, miniAst)
}

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


generateAstFromFile('test.mnip')