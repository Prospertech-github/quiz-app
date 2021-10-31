import React, { Component } from 'react'
import {QuizData} from './QuizData'
import Style from './styles.css'




export class Quiz extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userAnswer: null,
      currentIndex: 0,
      options: [],
      quizEnd: false,
      score: 0,
      disabled: true
    }
  }

  loadQuiz = () => {
    const {currentIndex} = this.state;
    
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer
      }
    })
  }

  nextQuestion = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1, 
      })
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    })
  }

  finishQuiz =() => {
    if(this.state.currentIndex === QuizData.length -1){
        this.setState({
            quizEnd:true
        })
    }
  }

  componentDidMount() {
    this.loadQuiz();
  }

  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false 
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;

    if (this.state.currentIndex != prevState.currentIndex) {
      this.setState(() => {
        return {
          question: QuizData[currentIndex].question,
          options: QuizData[currentIndex].options,
          answer: QuizData[currentIndex].answer
        }
      });
    }
  }

  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state

    if(quizEnd) {
      return (
          <div>
            <h1>Game Over. Final score is {this.state.score} points</h1>
            <p>The correct Answers for the quiz are</p>
            <ul>
              {QuizData.map((item, index) => (
                <li className='correct-answers'
                  key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
          </div>
      )
    }

    return (
      <div className='App'>
        <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>

        <h2> My Quiz App</h2>
        <h3>{question}</h3>
        {
          options.map(option =>
            <p key={option.id} className={`options ${userAnswer === option ? "selected" : null} `}
             onClick = {() => this.checkAnswer(option)}
            >
              {option}
            </p>      
          )
        }

        {currentIndex < QuizData.length - 1 &&
          <button disabled={this.state.disabled} onClick={this.nextQuestion}>
            NEXT
          </button>
        }

        {currentIndex === QuizData.length - 1 &&
          <button onClick={this.finishQuiz} disabled={this.state.disabled}>
            END QUIZ
          </button>
          
        }

      </div>
    )
  }
}



export default Quiz
