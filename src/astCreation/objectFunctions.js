astObject = {};
astObject.Declaration = function (name, value, type, constant) {//constant is boolean, type = "var" or "str" or "num"
    this.name = name;
    this.value = value;
    this.type = type;
    this.constant = constant;
    this.astType = "declaration"
};

astObject.Comment = function () {
    this.astType = "comment"
};

astObject.Log = function (value, type) { //value is log value, type is like error or success
    this.value = value;
    this.type = type;
    this.astType = "log"
};

astObject.Conditional = function (condition, miniAst) {//constant is boolean, type = "var" or "str" or "num"
    this.condition = condition;
    this.miniAst = miniAst;
    this.astType = "conditional"
};

astObject.Do = function (nameCalled, params) {//constant is boolean, type = "var" or "str" or "num"
    this.nameCalled = nameCalled;
    this.params = params;
    this.astType = "do"
};

astObject.Function = function (name, params, miniAst) {//constant is boolean, type = "var" or "str" or "num"
    this.name = name;
    this.params = params;
    this.miniAst = miniAst;
    this.astType = "function"
};

astObject.Loop = function (varName, loopLength, miniAst) {
    this.varName = varName;
    this.loopLength = loopLength;
    this.miniAst = miniAst;
    this.astType = "loop"

}