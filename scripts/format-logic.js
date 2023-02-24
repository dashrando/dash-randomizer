//Global variables
let locationAccessString = "";
let itemAccessString = "";
let locationAccessBlocks = [];
let itemAccessBlocks = [];
let logicBlockTitleArray = [];
let logicBlockBodyArray = [];

/* ---------------------------------------------
Function to remove the printed logic text when
the user switches between logic types from the
drop down list in readable-logic.html
-----------------------------------------------*/ 
const clearLogic = () => {
   document.getElementById("logic").innerText = "";
};

/* ---------------------------------------------
Function for any variables that need to be reset
before attempting to print a full body of logic
to readable-logic.html.
-----------------------------------------------*/ 
function resetVariables() {
   logicBlockTitleArray.length = 0;
   logicBlockBodyArray.length = 0;
}

/* ---------------------------------------------
Function to split up an store the code file's text
and remove the initial chunks we don't want.
-----------------------------------------------*/ 
function removeAndSplitLogicText(logicString) {
   //Remove or the text from the beginning of the code file
   //and set logicString to the latter half.
   var logicStringArray = logicString.split(
      "// Common logic used at item locations."
   );
   //Set logicString to be the entire latter half string
   //we got after splitting up the code file into two strings.
   logicString = logicStringArray[1];

   //Split the remaining string into location access logic anditem access logic.
   logicStringArray = logicString.split("// Logic for each item location.");

   //Set variables to be the location access and item access entire
   //strings.
   locationAccessString = logicStringArray[0];
   itemAccessString = logicStringArray[1];

   //Then split each string into individual strings for each logic block
   //in the code.
   splitLogicIntoBlocks(locationAccessString, itemAccessString);
}

/* ---------------------------------------------
Function to split each full logic string into 
individual strings for each logic block in the code.
-----------------------------------------------*/ 
function splitLogicIntoBlocks(locationString, itemString) {
   locationAccessBlocks = locationString.split("};");
   itemAccessBlocks = itemString.split("});");
}

/* ---------------------------------------------
Function to remove all the syntax from the code and
replace particular syntax with words so it's 
interpretable by anyone reading it. 
-----------------------------------------------*/ 
function removeExtraneousText(stringArray) {
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
         stringArray[i] = stringArray[i].replace(
            />=/g,
            "is greater than or equal to"
         );
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

      } else {
         //Get rid of lines we don't want.
         stringArray.splice(i, 1);
         //If we're at the end of the list we don't need to go back an index.
         if (i != stringArray.length) {
            i--;
         }
      }
      
      /*Now that we have the chunks of logic code we want,
      break the logic block up into individual strings per line of code.
      Then get rid of any lines we don't want, and store the title of the
      block into the title block array (to be used for mouse hovering stuff later). */
      if (stringArray[i] != null) {

         var tempStringArray = stringArray[i].split("\n");
         var tempHasStoredTitle = false;
         for (j = 0; j < tempStringArray.length; j++) {
            if (stringContainsLetters(tempStringArray[j])) {
               if (!tempHasStoredTitle) {
                  logicBlockTitleArray.push(tempStringArray[j]);
                  tempHasStoredTitle = true;
               }
            } else {
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
}

/* ---------------------------------------------
Function to check if a line contains any letters or 
numbers. Necessary to remove unwanted lines in the 
code easily.
-----------------------------------------------*/ 
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
      string.includes("9")
   ) {
      return true;
   } else {
      return false;
   }
}

/* ---------------------------------------------
Function to remove and trim new line characters
as needed.
-----------------------------------------------*/ 
function removeNewLineCharacters(myStringArray) {
   for (i = 0; i < myStringArray.length; i++) {
      myStringArray[i] = myStringArray[i].replace(/(\r\n|\r|\n)/g, '');
      myStringArray[i] = myStringArray[i].trim();
   }
}

/* ---------------------------------------------
Function to add and set the specifics of every
element we want to print, in order, to the
readable-logic.html page.
-----------------------------------------------*/ 
function createElements() {
   clearLogic();
   let logicDiv = document.getElementById("logic");

   for (i = 0; i < logicBlockTitleArray.length; i++) {
      const title = logicBlockTitleArray[i];

      //Variables for creating and appending elements for the interactable logic text.
      newDiv = document.createElement("div", { is: "title" });
      newTitle = document.createTextNode(title);
      newUnderline = document.createElement("u");
      newBody = document.createElement("div");
      newBodyContents = document.createElement("div");
      logicReferenceElement = null;

      //Variables for parsing logic text to create elements for interactable events.
      tempFullString = logicBlockBodyArray[i];
      tempTextElement = null;
      tempLogicRefs = [];
      tempCurrentSingleString = "";
      tempLogicSingleString = logicBlockBodyArray[i];
      tempLogicBodySplitStrings = [];
      tempFoundLogicRef = false;
      tempFirstLogicRef = "";

      //Check to see if the body of the logic contains any previously defined logic names.
      //For example "canHellRun."
      for (j = 0; j < logicBlockTitleArray.length; j++) {
         if (j == 0) {
            tempFoundLogicRef = false;
         }

         //Do we have a logic ref string match in the logic body to any logic title?
         if (logicBlockBodyArray[i].includes(logicBlockTitleArray[j])) {
            tempFoundLogicRef = true;

            //Store all references found in the logic body in the tempLogicRefs array.
            for (n = 0; n < logicBlockTitleArray.length; n++) {
               if (logicBlockBodyArray[i].includes(logicBlockTitleArray[n])) {
                  tempLogicRefs.push(logicBlockTitleArray[n]);
               }
            }
            
            //Do a loop for the amount of logic refs we have
            for (p = 0; p < tempLogicRefs.length; p++) {

               //Used to know when we can stop looping.
               haveReachedTheBeginningofTheString = false;

               /*Split at the first logic ref. Whether or not it's 
               that actual one we want isn't important here because 
               we'll loop through to find the first (left most) one in the next for loop.*/
               tempLogicBodySplitStrings = tempLogicSingleString.split(tempLogicRefs[p]);

               //Loop until we find the first instance of a logic ref in the whole string (if there is another one at all).
               for (r = 0; r < tempLogicRefs.length; r++) {
                  if (tempLogicBodySplitStrings[0].includes(tempLogicRefs[r])) {
                     tempLogicBodySplitStrings = tempLogicBodySplitStrings[0].split(tempLogicRefs[r]);
                     tempFirstLogicRef = tempLogicRefs[r];
                  }
               }

               /*If the previous loop didn't find any other
               logic refs, then we only have 1and we can 
               assign it to the temp variable.*/
               if (tempFirstLogicRef == "") {
                  tempFirstLogicRef = tempLogicRefs[p];
               }
               
               /*The beginning of the string has any characters in it, 
               it means the logic ref wasn't at the beginning of the string
               and we need to append that text before the logic ref append.*/
               tempLogicBodySplitStrings[0] = tempLogicBodySplitStrings[0].trim();
               if (tempLogicBodySplitStrings[0] != "") {
                  //create an element for the NON-LOGIC REF string and append it to contentsbody
                  newBodyContents.appendChild(document.createTextNode(tempLogicBodySplitStrings[0]));
                  newBodyContents.appendChild(document.createTextNode("\xa0"));
                  haveReachedTheBeginningofTheString = true;
               }

               /*Create a new element for the logic reference
               that's inside the logic body and add a unique id to the element.*/
               logicReferenceElement = document.createElement('strong');
               logicReferenceElement.id = tempFirstLogicRef + "_" + i;
               logicReferenceElement.classList.add("popup");

               /*These next two lines are the way we are able to pass in what
               element id is being hovered over, and return the appropriate
               body logic text.*/
               logicReferenceElement.setAttribute("onpointerenter", 
                                                  "showLogicText(" + logicReferenceElement.id + ", \"enter\")");
               logicReferenceElement.setAttribute("onpointerleave", 
                                                  "showLogicText(" + logicReferenceElement.id + ", \"leave\")");

               logicReferenceElement.style.color = "limegreen";

               //Create the popup element and assign its settings.
               popupSpan = document.createElement("span");
               popupSpan.classList.add("popuptext");
               popupSpan.style.fontStyle = "normal";

               //Append everything to newBodyContents
               logicReferenceElement.appendChild(popupSpan);
               tempTextElement = document.createTextNode(tempFirstLogicRef);
               logicReferenceElement.appendChild(tempTextElement);
               newBodyContents.appendChild(logicReferenceElement);

               //Add a space
               newBodyContents.appendChild(document.createTextNode("\xa0"));


               //Reset the string to it's original state before we started spitting it.
               if (tempCurrentSingleString == "") {
               tempLogicSingleString = logicBlockBodyArray[i];
               }

               /*Remove what we've already appended to the div and
               remove/replace the two strings from the logic body
               string so we can search again without these strings.*/
               tempLogicSingleString = tempLogicSingleString.replace(tempLogicBodySplitStrings[0], "");
               tempLogicSingleString = tempLogicSingleString.replace(tempFirstLogicRef, "");  
               
               /*Set our current string to whatever it is we end up
               with after replacing what we've already appended.*/
               tempCurrentSingleString = tempLogicSingleString;

               //if this is the last iteration through the loop, create and append the last remaining string.
               if (p >= tempLogicRefs.length - 1) {
                  //!We probably need to do the code below (reset string and remove strings) before we run this code, else we'll get dupes!
                  newBodyContents.appendChild(document.createTextNode(tempCurrentSingleString));
               }

               //Reset variables for the next iteration.
               tempFirstLogicRef = "";
            }
            //Reset variables for the next iteration, and stop looping.
            tempLogicRefs.length = 0;
            tempCurrentSingleString = "";
            break;
         } 
      }

      //If there are no logic refs found...
      if (tempFoundLogicRef == false) {
         newBodyContentsNoChange = document.createElement("div");
         newBodyContentsNoChange.id = "No_Change_" + i;
         newBodyContentsNoChange.appendChild(document.createTextNode(tempLogicSingleString));
         newBody.appendChild(newBodyContentsNoChange);
      }

      //Append everything we need, in order, to the DOM.
      newBody.appendChild(newBodyContents);
      newUnderline.appendChild(newTitle);
      newDiv.appendChild(newUnderline);
      newDiv.appendChild(document.createElement("br"));
      newDiv.appendChild(newBody);
      newDiv.appendChild(document.createElement("br"));
      newDiv.appendChild(document.createElement("br"));
      logicDiv.appendChild(newDiv);
   }
}

/* ---------------------------------------------
Function to display the popup text window and underline
the current logic ref that's being hovered over.
-----------------------------------------------*/ 
function showLogicText(elementId, direction) {

   var bodyLogicToShow = "";
   var currentElement = document.getElementById(elementId.id);
   var currentElementsChildren = currentElement.children;

   for (i = 0; i < logicBlockTitleArray.length; i++) {
      if (elementId.innerHTML.includes(logicBlockTitleArray[i])) {
         //Grab the corresponding body logic for the current logic ref we're hovering over.
         bodyLogicToShow = logicBlockBodyArray[i];
         for (j = 0; j < currentElementsChildren.length; j++) {
            if (currentElementsChildren[j].tagName == "SPAN") {
               currentElementsChildren[j].innerHTML = bodyLogicToShow;
               //If we're entering or leaving the logic ref element...
               if(direction == "enter") {
                  currentElement.style.textDecoration = "underline";
               } else {
                  currentElement.style.textDecoration = "none";
               }
               currentElementsChildren[j].classList.toggle("show");
               break;
            }
         }
         break;
      }
   }
}

/* ---------------------------------------------
This is the main function called by readable-logic.html
-----------------------------------------------*/ 
function readAndFormatLogicFile(logicString) {
   //Reset variables so we start with fresh arrays (if the logic has been reprinted by the user).
   resetVariables();
   removeAndSplitLogicText(logicString);
   removeExtraneousText(locationAccessBlocks);
   removeExtraneousText(itemAccessBlocks);
   removeNewLineCharacters(logicBlockTitleArray);
   createElements();
}

