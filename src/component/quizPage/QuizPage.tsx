import React, { useEffect, useState } from "react";
import QuestionModel from "../../models/QuestionModel";
import QuizModel from "../../models/QuizModel";
import { useParams } from "react-router-dom";
import QuizService from "../../services/QuizService";

import "./QuizPage.css";
interface Props {
    quizId: number | undefined;
    setQuizId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const QuizPage = (props: Props) => {
    const { idQuiz } = useParams();
    const quizId = parseInt(idQuiz!);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: number[] }>({});
    const [quiz, setQuiz] = useState<QuizModel>();
    const [questionList, setQuestionList] = useState<QuestionModel[]>([]);
    const [nameOfStudent, setnameOfStudent] = useState(null);
    const [totalScoreQuiz, setTotalScoreQuiz] = useState(null);
    const [lessonToRepeat, setlessonToRepeat] = useState(null);
    const [showSubmitButton, setShowSubmitButton] = useState<boolean>(true);
    const [quizSubmitted, setQuizSubmitted] = useState(false);


    useEffect(() => {
        QuizService.getQuizById(quizId!).then((res) => {
            setQuiz(res.data.data);

            console.log(res.data.data.lessons, "sono qui in QuizPage res.data.data.quiz");
            setQuestionList(res.data.data.questions);
        });
    }, [quizId]);



    const goToNextQuestion = () => {
        if (currentQuestionIndex < questionList.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const areAllQuestionsAnswered = () => {
        return questionList.every(question => userAnswers[question.id] !== undefined);
    };


    const handleAnswerSelection = (questionId: number, answerId: number) => {
        setUserAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers };
            const maxSelectableAnswers = questionList[currentQuestionIndex].answers.filter(answer => answer.correct).length;

            // Verifica se la domanda corrente ha più di una risposta corretta
            const multipleCorrectAnswers = maxSelectableAnswers > 1;

            // Verifica se la risposta selezionata è già presente nell'array delle risposte per la domanda corrente
            const isAnswerSelected = updatedAnswers[questionId]?.includes(answerId);

            // Se l'opzione è già selezionata, rimuoviamola
            if (isAnswerSelected) {
                updatedAnswers[questionId] = updatedAnswers[questionId]?.filter(id => id !== answerId);
            } else {
                // Controlla se il numero massimo di risposte selezionate è stato raggiunto
                if (updatedAnswers[questionId]?.length >= maxSelectableAnswers && multipleCorrectAnswers) {
                    // Se sì, non aggiungere ulteriori risposte
                    return updatedAnswers;
                }
                // Altrimenti, aggiungiamola all'array delle risposte
                updatedAnswers[questionId] = updatedAnswers[questionId]
                    ? [...updatedAnswers[questionId], answerId]
                    : [answerId];
            }

            // Disabilita le checkbox non selezionate quando il numero massimo di risposte corrette è stato raggiunto
            if (multipleCorrectAnswers) {
                const checkboxes = document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="question-${questionId}"]`);
                checkboxes.forEach(checkbox => {
                    checkbox.disabled = !checkbox.checked && updatedAnswers[questionId]?.length >= maxSelectableAnswers;
                });
            }

            return updatedAnswers;
        });
    };




    const sendAnswers = () => {
        if (!quizId || !quiz) {
            console.error('Quiz ID or quiz data not available');
            return;
        }

        const answersMap: { [key: number]: number[] } = {};
        Object.keys(userAnswers).forEach((questionId) => {
            const questionIdNum = parseInt(questionId, 10);
            answersMap[questionIdNum] = userAnswers[questionIdNum];
        });

        console.log(answersMap);

        QuizService.sendQuizResult(quizId, answersMap)
            .then((response) => {
                console.log('Risposte inviate con successo:', response.data);
                console.log('Total score: ', response.data.data.totalScore);
                console.log('Nome: ', response.data.data.user.firstName);
                //TODO - LEZIONE DA RIPETERE SETLESSONTOREPEAT
                setnameOfStudent(response.data.data.user.firstName);
                setTotalScoreQuiz(response.data.data.totalScore);

                setShowSubmitButton(false);
                setQuizSubmitted(true);
            })
            .catch((error) => {
                console.error('Errore durante l\'invio delle risposte:', error);
            });
    };

    const currentQuestion = questionList[currentQuestionIndex];

    let scoreMessage = null;
    const totalScorePercentage = totalScoreQuiz !== null ? Math.floor(totalScoreQuiz) : null;
    if (totalScorePercentage !== null) {
        if (totalScorePercentage === 100) {
            scoreMessage = <span style={{ color: 'green' }}>Ottimo lavoro {nameOfStudent}! Hai risposto correttamente a tutte le domande del quiz!</span>;
        } else if (totalScorePercentage < 40) {
            scoreMessage = <span style={{ color: 'red' }}>Peccato {nameOfStudent}, non hai superato il test. Hai risposto correttamente solo al {totalScorePercentage}% delle domande del quiz.</span>;
        } else if (totalScorePercentage >= 40 && totalScorePercentage < 60) {
            scoreMessage = <span style={{ color: 'red' }}>Test non superato. Potresti fare di meglio {nameOfStudent}! Hai risposto correttamente al {totalScorePercentage}% delle domande del quiz. Ci sei quasi!</span>;
        } else if (totalScorePercentage >= 60) {
            scoreMessage = <span style={{ color: 'green' }}>Test superato {nameOfStudent}! Hai risposto correttamente al {totalScorePercentage}% delle domande del quiz.</span>;
        }
    }



    return (
        <>
            <h1>Ciaooo id quiz: {quiz?.id}</h1>


            <div className="quizBox">

                <div className="quizTitle"><h1>{quiz?.title}</h1></div>

                {!quizSubmitted && currentQuestion && (
                    <div className="questionCard">
                        <div className="indexQuestion">
                            <h2>Domanda {currentQuestionIndex + 1} su {questionList.length}</h2>
                        </div>

                        <div className="textQuestion">
                            <h3>{currentQuestion.textQuestion}</h3>
                        </div>


                        {currentQuestion.answers.map((answer) => (
                            <div key={answer.id}>
                                {currentQuestion.answers.filter(ans => ans.correct).length > 1 ? (
                                    // Se ci sono più risposte corrette, utilizza checkbox
                                    <input type="checkbox"
                                        id={`answer-${answer.id}`}
                                        name={`question-${currentQuestion.id}`}
                                        value={answer.id}
                                        checked={userAnswers[currentQuestion.id]?.includes(answer.id) || false}
                                        onChange={() => handleAnswerSelection(currentQuestion.id, answer.id)} />
                                ) : (
                                    // Altrimenti, utilizza radio button per vero o falso o per domande che contengono solo una risposta esatta
                                    <input type="radio"
                                        id={`answer-${answer.id}`}
                                        name={`question-${currentQuestion.id}`}
                                        value={answer.id}
                                        checked={userAnswers[currentQuestion.id]?.includes(answer.id) || false}
                                        onChange={() => handleAnswerSelection(currentQuestion.id, answer.id)} />
                                )}
                                <label htmlFor={`answer-${answer.id}`}>{answer.text}</label>
                            </div>
                        ))}

                        <div className="navigationButtons">
                            <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}> Back </button>
                            <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questionList.length - 1 || !userAnswers[currentQuestion.id] || userAnswers[currentQuestion.id]?.length === 0}>Next</button>
                        </div>
                        {showSubmitButton && <button className="sendQuizButton" disabled={!areAllQuestionsAnswered()} onClick={sendAnswers}>Invia</button>}
                    </div>
                )}

                {quizSubmitted && (
                    <div className="quizSubmittedMessage">
                        <h2>Quiz inviato con successo!</h2>
                        {scoreMessage && <div className="scoreMessage">{scoreMessage}</div>}
                    </div>
                )}

            </div>




        </>
    );



};



export default QuizPage;