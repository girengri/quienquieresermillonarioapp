import React, { useEffect, useState } from "react";
import { data } from "../data/datos";
import "../styles/trivia.css";
import useSound from "use-sound";
import play from "../sonidos/play.mp3";
import correct from "../sonidos/correct.mp3";
import wrong from "../sonidos/wrong.mp3";

const Trivia = ({ setStop, questionNumber, setQuestionNumber }) => {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");

    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    useEffect(() => {
        letsPlay();
    }, [letsPlay]);

    useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    const handleClick = (respuesta) => {
        setSelectedAnswer(respuesta);
        setClassName("answer active");
        delay(3000, () =>
            setClassName(respuesta.correct ? "answer correct " : "answer wrong")
        );

        delay(5000, () => {
            if (respuesta.correct) {
                correctAnswer();
                delay(1000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                });
            } else {
                wrongAnswer();
                delay(1000, () => {
                    setStop(true);
                });
            }
        });
    };

    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((respuesta, index) => (
                    <div
                        key={index}
                        className={selectedAnswer === respuesta ? className : "answer"}
                        onClick={() => handleClick(respuesta)}
                    >
                        {respuesta.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trivia;
