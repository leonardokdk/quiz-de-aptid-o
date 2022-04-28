const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull');




let currentQuestion={}
let acceptingAnswers= true
let score = 0 
let questionCounter = 0 
let availableQuestions=[]

/**perguntas de exemplo */

let questions = [
{
    question:"Qual foi sua materia favorita no ensino médio?",
    choice1:"Matematica",
    choice2:"Biologia",
    choice3:"Português",
    choice4:"Historia",
    answer: 1,
},
{
    question:"Quanto é 4 + 4?",
    choice1:"2",
    choice2:"4",
    choice3:"8",
    choice4:"17",
    answer: 3,
},
{
    question:"Quanto é 2 * 6?",
    choice1:"12",
    choice2:"4",
    choice3:"21",
    choice4:"17",
    answer: 1,
},
{
    question:"Quanto é 2 * 2?",
    choice1:'2',
    choice2:'4',
    choice3:'21',
    choice4:'17',
    answer: 2,
},
{
    question:"Quanto é 6 * 6?",
    choice1:"36",
    choice2:"4",
    choice3:"21",
    choice4:"17",
    answer: 1,
},
{
    question:"Quanto é 5 * 6?",
    choice1:"12",
    choice2:"30",
    choice3:"21",
    choice4:"17",
    answer: 2,
},
{
    question:"Quanto é 4 * 6?",
    choice1:"12",
    choice2:"4",
    choice3:"21",
    choice4:"24",
    answer: 4,
},
{
    question:"Quanto é 2 * 6?",
    choice1:"12",
    choice2:"4",
    choice3:"21",
    choice4:"17",
    answer: 1,
},
{
    question:"Quanto é 1 * 6?",
    choice1:"1",
    choice2:"4",
    choice3:"21",
    choice4:"6",
    answer: 4,
},
{
    question:"Quanto é 3 * 6?",
    choice1:"18",
    choice2:"4",
    choice3:"21",
    choice4:"17",
    answer: 1,
},
/**Começo do jogo abaixo**/

]
const SCORE_POINTS = 100
const MAX_QUESTIONS = 10    
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()                    
}

/**retorno dps de responder as questões**/
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }


        questionCounter++
        progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

 /**Logica que define as questões */
        const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
        currentQuestion = availableQuestions[questionsIndex]
        question.innerText = currentQuestion.question

       

        choices.forEach(choice => {                 
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice'+number]
        })
        
        availableQuestions.splice(questionsIndex, 1)

        acceptingAnswers = true 
}



    choices.forEach(choice => {
        choice.addEventListener('click', e =>{
            if(!acceptingAnswers) return

            acceptingAnswers = false
            const selectedChoice = e.target
            const selectedAnswer = selectedChoice.dataset['number']
            
            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect'
            if(classToApply === 'correct'){
                  incrementScore(SCORE_POINTS)
             }
     
           
             selectedChoice.parentElement.classList.add(classToApply)

             setTimeout(() => {
                 selectedChoice.parentElement.classList.remove(classToApply)
                 getNewQuestion()
             },1000)
        })
    })
 
    incrementScore = num => {
        score +=num
        scoreText.innerText = score
    } 
    startGame()
    