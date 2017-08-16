var ast;

var globalAst;

function nameVar(type, value) {
    this.type = type;
    this.value = value;
}

function nameFunc(expressions) {
    this.miniAst = generateAst(expressions);
}

function astObject(content, names) {
    this.content = content;
    this.names = names;
}

function requestFile(path) {
    var httpRequest;
    var retrievedFile;
    function makeRequest() {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            console.log("Giving up :( Cannot create an XMLHTTP instance");
            return false;
        }
        httpRequest.onreadystatechange = storeContents;
        httpRequest.open("GET", path);
        httpRequest.send();
    }
    function storeContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                retrievedFile = httpRequest.responseText;
                console.log(httpRequest.responseText);
            } else {
                console.log("There was a problem with the request.");
            }
        }
    }
    makeRequest();
    return retrievedFile;
}

function getExpressions(file) {
    var noWhiteSpaceFile = file.replace(/\s/g, "");
    var expressions = noWhiteSpaceFile.split(";");
    return expressions;
}

astObject.prototype.evaluateType = function(expression) {};

var ast;

var globalAst;

function nameVar(type, value) {
    this.type = type;
    this.value = value;
}

function nameFunc(expressions) {
    this.miniAst = generateAst(expressions);
}

function astObject(content, names) {
    this.content = content;
    this.names = names;
}

function requestFile(path) {
    var httpRequest;
    var retrievedFile;
    function makeRequest() {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            console.log("Giving up :( Cannot create an XMLHTTP instance");
            return false;
        }
        httpRequest.onreadystatechange = storeContents;
        httpRequest.open("GET", path);
        httpRequest.send();
    }
    function storeContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                retrievedFile = httpRequest.responseText;
                console.log(httpRequest.responseText);
            } else {
                console.log("There was a problem with the request.");
            }
        }
    }
    makeRequest();
    return retrievedFile;
}

function getExpressions(file) {
    var noWhiteSpaceFile = file.replace(/\s/g, "");
    var expressions = noWhiteSpaceFile.split(";");
    return expressions;
}

astObject.prototype.evaluateType = function(expression) {};

function nameVar(e, t) {
    this.type = e, this.value = t;
}

function nameFunc(e) {
    this.miniAst = generateAst(e);
}

function astObject(e, t) {
    this.content = e, this.names = t;
}

function requestFile(e) {
    function t() {
        n.readyState === XMLHttpRequest.DONE && (200 === n.status ? (s = n.responseText, 
        console.log(n.responseText)) : console.log("There was a problem with the request."));
    }
    var n, s;
    return function() {
        if (!(n = new XMLHttpRequest())) return console.log("Giving up :( Cannot create an XMLHTTP instance"), 
        !1;
        n.onreadystatechange = t, n.open("GET", e), n.send();
    }(), s;
}

function getExpressions(e) {
    return e.replace(/\s/g, "").split(";");
}

var ast, globalAst;

astObject.prototype.evaluateType = function(e) {};