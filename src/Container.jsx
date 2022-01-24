import { useEffect, useMemo, useState } from "react";
import Trivia from "./components/Trivia";
import "./styles/app.css";
import { moneyPyramid as moneyPyramide } from "./data/datos";
import Timer from "./components/Timer";
import Start from "./components/Start";

const Container = () => {
    const [username, setUsername] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [stop, setStop] = useState(false);
    const [earned, setEarned] = useState("$ 0");

    const moneyPyramid = useMemo(() => moneyPyramide, []);

    useEffect(() => {
        questionNumber > 1 &&
            setEarned(
                moneyPyramid.find((money) => money.id === questionNumber - 1).amount
            );
    }, [moneyPyramid, questionNumber]);

    return (
        <div className="app">
            {username ? (
                <>
                    <div className="main">
                        {stop ? (
                            <h1 className="endText">Tu puntaje: {earned} </h1>
                        ) : (
                            <>
                                <div className="top">
                                    <div className="timer">
                                        <Timer setStop={setStop} questionNumber={questionNumber} />
                                    </div>
                                </div>

                                <div className="bottom">
                                    <Trivia
                                        setStop={setStop}
                                        questionNumber={questionNumber}
                                        setQuestionNumber={setQuestionNumber}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="pyramid">
                        <ul className="moneyList">
                            {moneyPyramid.map((money) => (
                                <li
                                    key={money.id}
                                    className={
                                        questionNumber === money.id
                                            ? "moneyListItem active"
                                            : "moneyListItem"
                                    }
                                >
                                    <span className="moneyListItemNumber">{money.id}</span>
                                    <span className="moneyListItemAmount">{money.amount}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <Start setUsername={setUsername} />
            )}
        </div>
    );
};

export default Container;
