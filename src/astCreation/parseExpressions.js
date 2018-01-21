function parseDeclaration(expression, etype) {
    var name, value, type, constant;
    //constant is boolean (if 2 equals signs), type = "var" or "str" or "num"
    var nonConstantExp = new RegExp('\)[^\\]*=', 'g'); //Matches if contains closing parenthese, then any character except for forward slash, then equals sign
    var constantExp = new RegExp('\)[^\\]*==', 'g');
    if (etype === "string") {
        type = "str"
    } else if (etype === "number") {
        type = "num"
    } else if (etype === "variable") {
        type = "var"
    }

    if (nonConstantExp.test(expression)) {
        constant = false
    } else if (constantExp.test(expression)) {
        constant = true
    }

    return astObject.Declaration(name, value, type, constant)
}

function parseComment(expression) {

}

function parseLog(expression) {

}

function parseConditional(expression) {

}

function parseDo(expression) {

}

function parseFunction(expression) {

}
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

astObject.Conditional = function (name, value, type, constant) {//constant is boolean, type = "var" or "str" or "num"
    this.name = name;
    this.value = value;
    this.type = type;
    this.constant = constant;
};

astObject.Do = function (name, value, type, constant) {//constant is boolean, type = "var" or "str" or "num"
    this.name = name;
    this.value = value;
    this.type = type;
    this.constant = constant;
};

astObject.Function = function (name, value, type, constant) {//constant is boolean, type = "var" or "str" or "num"
    this.name = name;
    this.value = value;
    this.type = type;
    this.constant = constant;
};