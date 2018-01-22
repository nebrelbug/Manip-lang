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