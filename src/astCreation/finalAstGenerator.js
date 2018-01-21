var ast = {};

function requestFile(path) {
    var httpRequest;
    var retrievedFile;
    //generate parameter can either be true or false depending on whether to generate an Ast for the file
    function makeRequest() {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = storeContents;
        httpRequest.open('GET', path);
        httpRequest.send();
    }

    function storeContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                retrievedFile = httpRequest.responseText;
                console.log(httpRequest.responseText);
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }
    makeRequest();
    return retrievedFile;
}//end of requestFile

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
    }
}

function getExpressions(file) {
    var noWhiteSpaceFile = file.replace(/\s/g, '');
    var expressions = noWhiteSpaceFile.split(";");
    return expressions;
}

function generateAst(expressions) {
    this = {}
    for (var i = 0; i < expressions.length; i++) {
        var expression = expressions[i];
        var etype = evaluateType(expression);
        if (etype === "comment") {
            this[i] = new astObject.Comment
        } else if (etype === "string") {

        } else if (etype === "number") {
            
        } else if (etype === "variable") {
            
        } else if (etype === "log") {
            
        } else if (etype === "conditional") {
            
        } else if (etype === "do") {
            
        } else if (etype === "function") {
            
        }
    }


