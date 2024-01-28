// Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

let theCounter = 0;
let theRightAnswer = 0
function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;
      getQuestionsNumber(qCount)
      addQuestionData(questionsObject[theCounter],qCount)
      submitButton.onclick = () =>{
        let rightAnswer = questionsObject[theCounter].right_answer
        theCounter++;
        checkAnswer(rightAnswer,qCount)
        answersArea.innerHTML = "";
        quizArea.innerHTML = "";
        addQuestionData(questionsObject[theCounter],qCount)
        handelBullets()
        totalDegree(qCount)
      }
    }
  }
  
  myRequest.open("GET", "TestQuestions.json", true);
  myRequest.send();
}
getQuestions();
  
function getQuestionsNumber (length){
  countSpan.innerHTML = length;
  
  for(let i = 0; i < length ; i++){
    let theBullet = document.createElement("span");
      if(i === 0){
        theBullet.className = "on"
        
    }
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(opj,count){
if (theCounter < count){
// create h2
let questionTitle = document.createElement("h2");
// create question text 
let questionText = document.createTextNode(opj.title)
// append question text
questionTitle.appendChild(questionText)
quizArea.appendChild(questionTitle)

// create radio button

for (let i = 1; i <= 4; i++){
  let mainDiv = document.createElement("div");
  // add class name to div
  mainDiv.className = "answer"

  // create radio button 
  let radioInput = document.createElement("input");
  radioInput.type = "radio"
  radioInput.name = "question"
  radioInput.id = `answer_${i}`
  radioInput.dataset.answer = opj[`answer_${i}`]

  if (i === 1){
    radioInput.checked = true
  }
  // create label 
  let theLabel  = document.createElement("label");
  theLabel.htmlFor = `answer_${i}`
  let labelText = document.createTextNode(opj[`answer_${i}`])
  theLabel.appendChild(labelText)

  // append radio + label to main div 
  mainDiv.appendChild(radioInput)
  mainDiv.appendChild(theLabel)

  // append main div to answers Area

  answersArea.appendChild(mainDiv)

}
}
}
function checkAnswer(rightAnswer,qCount){
  let answer = document.getElementsByName("question")
  let theChooseAnswer;
  for (let i = 0; i < answer.length ; i++){
    if (answer[i].checked){
      theChooseAnswer = answer[i].dataset.answer
    }
  }
  if (rightAnswer === theChooseAnswer) {
    theRightAnswer++
}
}
function handelBullets(){
  let bulletsSpan = document.querySelectorAll(".bullets .spans  span")
  let mySpans = Array.from(bulletsSpan);
  mySpans.forEach((ele,index)=>{
    if (theCounter === index) {
      ele.className = "on"
    }
  })
}
//  check the degree
function totalDegree(count){
  let theTotalDegree;
  if (theCounter === count) {
  quizArea.remove()
  answersArea.remove()
  submitButton.remove()
  bulletsSpanContainer.remove()
  if (theRightAnswer === count){
    theTotalDegree = `<spam>total degree : ${theRightAnswer} (perfect degree)</spam>`
  }else if (theRightAnswer < count / 2){
    theTotalDegree  = `<spam>total degree : ${theRightAnswer} (bad degree)</spam>`
  }else{
    theTotalDegree  = `<spam>total degree : ${theRightAnswer} (Average degree)</spam>`
  }
  bullets.innerHTML = theTotalDegree
  
  }
}