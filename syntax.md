The syntax of Manip is fairly simple. Code in Manip is separated into expressions, which are separated by semicolons. Here is an example Manip file.

```Manip
##LANG:Manip##;

//This is a comment//;
Str(testString) = "hello"; //Here is a variable string with type defined//
Str(constString) == "helloforever"; //Here is a constant string//
Num(testNum) = 7; //Here is a variable num with type defined//
Num(constNum) == 42; //Here is a constant num//
Var(testVar) = "hello"; //Here is a variable variable, flex type//
Var(const) == "hello"; //Here is a const, but it makes more sense to call it using Var//


//Below is a conditional! Notice the similarities between it and functions//
If|string.contains["hello"]|
Log["String contains Hello"]
|;

Log[str[backwards]]; //This is a predefined function that logs to the console. In general, predefined functions are capitalized.//


//Below is a function. Pretty sweet, eh? Notice how (similarly to above) the parameters are in square brackets. That pattern continues.//
Func(myFunction) = |[param, param]|
log[param+param], //Sub-expressions are separated by commas//
testString = "goodbye" //Comments can be put anywhere, even in the middle of an expression.//
|;

Do[myFunction[1,1]];//Use the 'Do' operator to call functions//

Do[50]|//Or to act as a repeat operator//
testString = testString + "Hi"//Modify variables just like in JavaScript.//
|;
```
