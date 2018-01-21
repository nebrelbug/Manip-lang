function parseDeclaration(ex, etype) {
    var name, value, type, constant;
    //constant is boolean (if 2 equals signs), type = "var" or "str" or "num"
    var nonConstantExp = new RegExp('\)[^\\]*=', 'g'); //Matches if contains closing parenthese, then any character except for forward slash, then equals sign
    var constantExp = new RegExp('\)[^\\]*==', 'g');
    name = /[^\(\)]+/g.exec(/\([^\)]*\)/g.exec(/[\w][\w][\w]\(([^\)]*)\)/g.exec(ex)))
    var includingAndAfterEqualExp = /=[ ]*["'\w_\-\.\d ]*/g
    value = includingAndAfterEqualExp.exec(ex).replace('=', '').trim()
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

    return astObject.Declaration(name, value, type, constant)
}

function parseComment(ex) {
    return astObject.Comment
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
    return astObject.Log(value, type)
}

function parseConditional(ex) {
    var condition, miniAst;
    condition = /[^\|]+/.exec(/\|[^(\|)]*\|/.exec(ex))
    var innerContent = ex.replace(/If\|[^(\|)]*\|/, '')
    innerContent = innerContent.replace(innerContent.substr(innerContent.length - 1), '')
    var innerExps = getExpressions(innerContent, true)
    miniAst = generateAst(innerExps)
    return astObject.Conditional(condition, miniAst)
}

function parseDo(ex) {
    var nameCalled, params;
    nameCalled = /\[[\w]*/.exec(ex).replace("[", "")
    params = /\[[^\]\[]*\]/.exec(ex).replace("[", "").replace("]", "")
    params = params.split(",")
    return astObject.Do(nameCalled, params);
}

function parseFunction(ex) {
    var name, params, miniAst;
    params = /[^\]\[\|]+/.exec(/\|[^(\|)]*\|/.exec(ex)).replace(/\s/g, '').split(',')
    name = /[^\(\)]+/.exec(/\([^\)]*\)/.exec(/Func\(([^\)]*)\)/.exec(ex)))
    var innerContent = ex.replace(/Func\([^]*\)[ ]*=[ ]*\|[^(\|)]*\|/, '')
    innerContent = innerContent.slice(0,-1)
    var innerExps = getExpressions(innerContent, true)
    miniAst = generateAst(innerExps)
    return astObject.Function(name, params, miniAst)
}

function parseLoop(ex) {
    var varName, loopLength, miniAst;
    loopLength = /\[\d+/.exec(ex).replace("[", "");
    varName = /[\d\w\-\_]+\]/.exec(ex).replace("]", "");
    var innerContent = /\|[^]*\|/.exec(ex)
    innerContent = innerContent.slice(1, -1);
    var innerExps = getExpressions(innerContent, true)
    miniAst = generateAst(innerExps)
    return astObject.Loop(varName, loopLength, miniAst)
}