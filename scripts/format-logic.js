/*const fs = require("fs");
const standardFilePath = "scripts\\modeStandard.js";
const recallFilePath = "scripts\\modeRecall.js";*/
//let logicString = "";
//let logicStringArray = [];
let locationAccessString = "";
let itemAccessString = "";
let locationAccessBlocks = [];
let itemAccessBlocks = [];
let logicBlockTitleArray = [];
let logicBlockBodyArray = [];

// function formatLogic() {
//    //Split each line up.
//    logicStringArray = logicString.split("\n");

//    //Remove new lines and whitespace at the front and back front of each string.
//    for (i = 0; i < logicStringArray.length; i++) {
//       if (
//          logicStringArray[i].includes("can") ||
//          logicStringArray[i].includes("has") ||
//          logicStringArray[i].includes("major") ||
//          logicStringArray[i].includes("minor") ||
//          logicStringArray[i].includes("tanks")
//       ) {
//          //Trim the before and after whitespaces.
//          logicStringArray[i] = logicStringArray[i].trim();
//       } else {
//          logicStringArray.splice(i, 1);
//          i--;
//       }
//    }
// }

const clearLogic = () => {
   document.getElementById("logic").innerText = "";
}

function removeAndSplitLogicText(logicString) {
   //Remove or the text from the beginning of the code file
   //and set logicString to the latter half.
   var logicStringArray = logicString.split(
      "// Common logic used at item locations."
   );
   logicString = logicStringArray[1];

   //Split the remaining string into location access logic anditem access logic.
   logicStringArray = logicString.split(
      "// Logic for each item location."
   );

   locationAccessString = logicStringArray[0];
   itemAccessString = logicStringArray[1];

   splitLogicIntoBlocks(locationAccessString, itemAccessString);
   
}

function splitLogicIntoBlocks(locationString, itemString) {
   locationAccessBlocks = locationString.split("};");
   itemAccessBlocks = itemString.split("});");
}

function removeExtraneousText(stringArray) {

   // for (i = 0; i < stringArray.length; i++) {
   //    var tempStringArray = stringArray[i].split("\n");

   //    for (j = 0; j < tempStringArray.length; j++) {
   //       if (j > 0) {
   //          tempStringArray[j]
   //       }
   //       else {

   //       }
   //    }
   // }

   //Remove most of the syntax and whitespace for lines we want, and remove lines we don't want.
   for (i = 0; i < stringArray.length; i++) {
      if (
         stringArray[i].includes("can") ||
         stringArray[i].includes("has") ||
         stringArray[i].includes("major") ||
         stringArray[i].includes("minor") ||
         stringArray[i].includes("tanks")
      ) {
         //Trim the before and after whitespaces.
         stringArray[i] = stringArray[i].trim();

         //Remove most of the syntax
         stringArray[i] = stringArray[i].replace(/const /g, "");
         stringArray[i] = stringArray[i].replace(/load/g, "");
         stringArray[i] = stringArray[i].replace(/return/g, "");
         //stringArray[i] = stringArray[i].replace(/\r\n/g, "");
         stringArray[i] = stringArray[i].replace(/;/g, "");
         stringArray[i] = stringArray[i].replace(/\}/g, "");
         stringArray[i] = stringArray[i].replace(/\{/g, "");
         stringArray[i] = stringArray[i].replace(/\./g, "");
         stringArray[i] = stringArray[i].replace(/>=/g, "is greater than or equal to");
         stringArray[i] = stringArray[i].replace(/=>/g, "");
         stringArray[i] = stringArray[i].replace(/>/g, "is greater than");
         stringArray[i] = stringArray[i].replace(/&&/g, "AND");
         stringArray[i] = stringArray[i].replace(/\|\|/g, "OR");
         stringArray[i] = stringArray[i].replace(/=/g, "");
         stringArray[i] = stringArray[i].replace(/\(\)/g, "");
         stringArray[i] = stringArray[i].replace(/true/g, "Always Accessible");
         stringArray[i] = stringArray[i].replace(/major\(\"/g, "Major Item - ");
         stringArray[i] = stringArray[i].replace(/minor\(\"/g, "Minor Item - ");
         stringArray[i] = stringArray[i].replace(/\"/g, "");
         stringArray[i] = stringArray[i].replace(/\,/g, "");
         //stringArray[i] = stringArray[i].replace(/\(/g, "\n\r\(");
         //stringArray[i] = stringArray[i].replace(/\)/g, "]");
      } else {
         //Get rid of lines we don't want.
         stringArray.splice(i, 1);
         i--;
      }

      //Now that we have the chunks of logic code we want,
      //break the logic block up into individual strings per line of code.
      //Then get rid of any lines we don't want, and store the title of the
      //block into the title block array (to be used for mouse hovering stuff later).
      var tempStringArray = stringArray[i].split("\n");
      var tempHasStoredTitle = false;
      for (j = 0; j < tempStringArray.length; j++) {
         if (stringContainsLetters(tempStringArray[j])) {
            if (!tempHasStoredTitle) {
               logicBlockTitleArray.push(tempStringArray[j]);
               tempHasStoredTitle = true;
            }
         }
         else {
            tempStringArray.splice(j, 1);
            j--;
         }
      }

      //Put the logic block's body strings back together into one string (not including the title string).
      for (k = 0; k < tempStringArray.length; k++) {
         if (k > 1) {
            tempStringArray[k] = tempStringArray[k - 1] + tempStringArray[k];
         }
      }

      //Store the body string into the body block array (to be used for mouse hovering later).
      logicBlockBodyArray.push(tempStringArray[tempStringArray.length - 1]);
   }
}

function stringContainsLetters(string) {
   if (
   string.includes("a") ||
   string.includes("b") ||
   string.includes("c") ||
   string.includes("d") ||
   string.includes("e") ||
   string.includes("f") ||
   string.includes("g") ||
   string.includes("h") ||
   string.includes("i") ||
   string.includes("j") ||
   string.includes("k") ||
   string.includes("l") ||
   string.includes("m") ||
   string.includes("n") ||
   string.includes("o") ||
   string.includes("p") ||
   string.includes("q") ||
   string.includes("r") ||
   string.includes("s") ||
   string.includes("t") ||
   string.includes("u") ||
   string.includes("v") ||
   string.includes("w") ||
   string.includes("x") ||
   string.includes("y") ||
   string.includes("z") ||
   string.includes("0") ||
   string.includes("1") ||
   string.includes("2") ||
   string.includes("3") ||
   string.includes("4") ||
   string.includes("5") ||
   string.includes("6") ||
   string.includes("7") ||
   string.includes("8") ||
   string.includes("9") ) {
      return true;
   }
   else {
      return false;
   }
}

function createElements() {
   clearLogic();
   let logicDiv = document.getElementById("logic");

   for (i = 0; i < logicBlockTitleArray.length; i++) {

      newDiv = document.createElement("div", { is: "title" });
      newStrong = null;
      newTitle = null;
      newUnderline = null;

      newUnderline = document.createElement("u");
      newTitle = document.createTextNode(logicBlockTitleArray[i]);
      newBody = document.createTextNode(logicBlockBodyArray[i]);
      newUnderline.appendChild(newTitle);
      newDiv.appendChild(newUnderline);
      newDiv.appendChild(document.createElement("br"));
      newDiv.appendChild(newBody);
 
      newDiv.appendChild(document.createElement("br"));
      newDiv.appendChild(document.createElement("br"));

      logicDiv.appendChild(newDiv);
   }
   
   //Clear these arrays so we can push to them again with different logic.
   logicBlockTitleArray = [];
   logicBlockBodyArray = [];

}

function readAndFormatLogicFile(logicString) {

removeAndSplitLogicText(logicString);
removeExtraneousText(locationAccessBlocks);
removeExtraneousText(itemAccessBlocks);
createElements();

/*
   //[DONE (removeAndSplitLogicText function)] Split the strings into 2 strings (location logic string and item logic string).
   //[DONE (splitLogicIntoBlocks function)]Split the two string into individual logic blocks
   //[DONE]Remove syntax, whitespace and blank lines
   //[DONE] Create lists, or tables, or something to store a logic header, and a logic body, so we can reference these later for mouse hover functions
      //One way to do this is to store the first line (the logic header) in one array and the rest of the logic body in another array so you can point 
      //from one array's index to another and get the header and body. 
   //[DONE for now]Display in a nice format the logic (in a table or using different text styles)
   //Create a combo box that allows you to select standard or recall logic to view.



      //Remove or replace text from the code file's string
      logicStringArray = logicString.split(
         //"Logic starts marker (do not remove this comment)"
         "// Common logic used at item locations."
      );
      logicString = logicStringArray[1];
      logicStringArray = logicString.split("};");


      // logicString = logicStringArray[1];


      //Split each line up.
      //logicStringArray = logicString.split("\n");

      //Remove new lines and whitespace at the front and back front of each string.
      for (i = 0; i < logicStringArray.length; i++) {
         if (
            logicStringArray[i].includes("can") ||
            logicStringArray[i].includes("has") ||
            logicStringArray[i].includes("major") ||
            logicStringArray[i].includes("minor") ||
            logicStringArray[i].includes("tanks")
         ) {
            //Trim the before and after whitespaces.
            logicStringArray[i] = logicStringArray[i].trim();

            logicStringArray[i] = logicStringArray[i].replace(/const /g, "");
            logicStringArray[i] = logicStringArray[i].replace(/load/g, "");
            logicStringArray[i] = logicStringArray[i].replace(/return/g, "");
            logicStringArray[i] = logicStringArray[i].replace(/\(/g, "");
            logicStringArray[i] = logicStringArray[i].replace(/\)/g, "");
            logicStringArray[i] = logicStringArray[i].replace(/;/g, "");
            logicStringArray[i] = logicStringArray[i].replace(/\}/g, "");
            logicStringArray[i] = logicStringArray[i].replace(/\{/g, "");
            logicStringArray[i] = logicStringArray[i].replace(/\./g, "");
            logicStringArray[i] = logicStringArray[i].replace(/>=/g, "is greater than or equal to");
            logicStringArray[i] = logicStringArray[i].replace(/=>/g, "");
            logicStringArray[i] = logicStringArray[i].replace(/>/g, "is greater than");
            logicStringArray[i] = logicStringArray[i].replace(/&&/g, "and");
            logicStringArray[i] = logicStringArray[i].replace(/\|\|/g, "or");
            logicStringArray[i] = logicStringArray[i].replace(/=/g, "");

         } else {
            logicStringArray.splice(i, 1);
            i--;
         }
      }

      let logicDiv = document.getElementById("logic");
      //logicDiv.innerText = logicString;

      for (i = 0; i < logicStringArray.length; i++) {
         tempStringArray = logicStringArray[i].split("\n");

         newDiv = null;
         newStrong = null;
         newContent = null;
         //newSpace = document.createElement("br");

         for (j = 0; j < tempStringArray.length; j++) {
            if (j > 0) {
               newStrong = document.createElement("strong");
               newContent = document.createTextNode(tempStringArray[j]);
               newStrong.appendChild(newContent);
               newDiv.appendChild(newStrong);
               //newDiv.appendChild(newContent);
               //logicDiv.appendChild(newStrong);
            }
            else {
               newDiv = document.createElement("div", { is: "title" });
               newContent = document.createTextNode(tempStringArray[j]);
               newDiv.appendChild(newContent);
            }

            newDiv.appendChild(document.createElement("br"));
         }
         newDiv.appendChild(document.createElement("br"));
         logicDiv.appendChild(newDiv);
         
      }
      */
}


//readAndFormatLogicFile(recallFilePath, "recall_logic.txt");
//readAndFormatLogicFile(standardFilePath, "standard_logic.txt");

//formatLogic();

