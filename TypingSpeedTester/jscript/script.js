// JavaScript file for handling the logic for the application

// Global variables used in the application
var textarea = document.querySelector("#textarea"); //Object of the textarea where the user types
var htmlTimer = document.querySelector("#timer"); //Object of the htmlTimer which shows the time
var speedTestText = document.querySelector("#speedtesttext"); //Text used for testing the typing speed
var resetButton = document.querySelector("#resetbutton"); //Reset button
var timer = [0, 0, 0]; //Timer array contains minutes, seconds and 100 of the second
var interval; //Used to control the setInterval method
var timerStarted = false; //Variable showing the status of the timer
var wordsPerMin = 0; //Words per minute
var mistakesDone = 0; //Mistakes comitted
var totalWords = 0; //Total words the user type
var typingEfficiency = 0; //Tyoing efficiency of the user
var legalMistakes = true; //Used in the accurate counting of mistakes made by user

// inital values when the application is first loaded or it is reloaded
textarea.value = "";
textarea.addEventListener("input", handleTextAreaInput, false);
resetButton.addEventListener("click", resetAll, false);


// This method handles the input event fired by textarea
function handleTextAreaInput(){
  //count the total words user has to type and store it in the totalWords variable
  totalWords = countWords(speedTestText.innerHTML);

  //Condition for starting the timer
  if(textarea.value.length === 1 && !timerStarted){
    interval = setInterval(startTimer, 10);
    timerStarted = true;
  }

  //Matches the text every time the user inputs in the textarea
  textMatcher();
}

//This function will make the timer run
function startTimer(){
  //logic to convert the time in second, and minutes
  timer[2]++;
  if(timer[2] %100 == 0){
    timer[1]++;
    timer[2] = 0;
    if(timer[1] % 60 == 0){
      timer[0]++;
      timer[1] = 0;
    }
  }
  htmlTimer.innerHTML = timeFormat(timer[0]) + ":" + timeFormat(timer[1]) + ":" + timeFormat(timer[2]);
}

//This function is purely for asthetic purpose
function timeFormat(time){
  //logic to show the time in proper format
  var properFormat = "";
  if(time <= 9){
    properFormat = "0"+time;
  }
  else{
    properFormat = ""+time;
  }
  return properFormat;
}

//This function detects whether the user is typing the correct text or not
function textMatcher(){
  var textAreaString = textarea.value;
  var speedtesttextString = speedtesttext.innerHTML;
  var length = textarea.value.length;

  //If the user has typed the text completely and correctly then make text green
  if(textAreaString === speedtesttextString){
    textarea.style.color = "green";
    clearInterval(interval);
    timerStarted = false;
    var totalMin = timer[0] + timer[1]/60 + (timer[2]/100)/60;
    wordsPerMin = Math.floor(totalWords/totalMin);
    typingEfficiency = ((totalWords-mistakesDone)/totalWords)*100
    alert("Words per Minute::"+wordsPerMin + "\n Mistakes done::"+mistakesDone+"\n Efficiency::"+Math.floor(typingEfficiency)+"%");
    resetAll();
  }
  else
  if(textAreaString != speedtesttextString.slice(0, length)){ //If user make mistake then make text red
    textarea.style.color = "red";
    if(legalMistakes){
      mistakesDone++;
      legalMistakes = false;
    }
  }
  else{ //If user is typing correctly then make the text blue
    textarea.style.color = "blue";
    legalMistakes = true;
  }
}

//This method will reset all the entities
//This function is called when the reset button is pressed
function resetAll(){
  textarea.value = "";
  clearInterval(interval);
  timerStarted = false;
  timer = [0,0,0];
  mistakesDone = 0;
  htmlTimer.innerHTML = "00:00:00";
}

//Function to count the no of words in a string
function countWords(str){
  var totalNoWords = 0;
  words = str.split(" ");
  for(var i = 0; i < words.length; i++){
    if(words[i] !== ""){
      totalNoWords++;
    }
  }
  return totalNoWords;
}
