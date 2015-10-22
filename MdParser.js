// JavaScript File


// ----------------------------------------------------------------------
// Parser for MD type files
// can handle these signs: !, #, -, ', .com, .de. info, ... 
// ----------------------------------------------------------------------

var MdP = new MdParser();


// ----------------------------------------------------------------------
// constructor
// ----------------------------------------------------------------------

function MdParser() {

    var source;
    var target;

    // ----------------------------------------------------------------------
    // setting funciton to set parameters of object
    // ----------------------------------------------------------------------

    this.setTargetDivId = function(o) {
        target = o;
    }

    // ----------------------------------------------------------------------
    // Core function who does the actual parsing
    // ----------------------------------------------------------------------


    this.parse = function(obj) {

        source = obj;
        var content = source.value;

        var contentArr = content.split("\n");
        var arrayLength = contentArr.length;
        var tmpString;
        var tstString;

        var enumFlag;
        var bulletFlag;

        for (var i = 0; i < arrayLength; i++) {
            contentArr[i] = contentArr[i].trim();

            //now check for first character
            tmpString = contentArr[i];
            if (tmpString.length > 0) {
                tstString = tmpString.substring(0, 1);

                switch (tstString) {
                    case "!":
                        //code block
                        tmpString = this.exclamationMark(tmpString);
                        break;
                    case "#":
                        //code block
                        // if the flag for enumeration was off  then add the opening tag
                        break;
                    case "-":
                        // if the flag for bullet  was off  then add the opening tag
                        //code block
                        break;
                    case "'":
                        // this is the case if we completely need to ignore any processing  - it is the "  '  "   sign
                        // if the flag for bullet or enumeration  or table etc. was on then add the closing tag
                        //code block
                        break;
                    case "|":
                        // this is the case if we ahve a table. this is the start of a table. then we first split alongside the | and then later within the strings we split by whitespace
                        //code block
                        break;
                    default:
                        // if the flag for bullet or enumeration was on then add the closing tag
                        // then set flags off
                        //default code block
                }

                // now detect HREFs in line
                // we split the sring along the whitespaces. then we check if there is .com etc. and then we test if it starts with www o http and depending on this
                // we add the missing piece and wrap it in a href or a javascript function that makes it opening in new window using the <span> tag


                // now detect Tables in line with | sign
                // we split 

                contentArr[i] = tmpString;
            }

            // if the flags are still switched on, then we need to close now. 

        }

        content = "";

        for (var i = 0; i < arrayLength; i++) {
            content += contentArr[i] + "<br>";
        }

        document.getElementById(target).innerHTML = content;

    }

    // ----------------------------------------------------------------------
    //Function to handle exclamnation mark
    // ----------------------------------------------------------------------

    this.exclamationMark = function(s) {

        var tstString;
        var ret = "";

        // maybe better to user the <span> tag ???? 

        if (s.length > 0) {
            tstString = s.substring(0, 1);
            if (tstString == "!")
                ret = "<h1>" + s.substring(1, s.length - 1) + "</h1>"
        }

        if (s.length > 1) {
            tstString = s.substring(0, 2);
            if (tstString == "!!")
                ret = "<h2>" + s.substring(2, s.length - 2) + "</h2>"
        }


        if (s.length > 2) {
            tstString = s.substring(0, 3);
            if (tstString == "!!!")
                ret = "<h3>" + s.substring(3, s.length - 3) + "</h3>"
        }

        return ret;
    }

}