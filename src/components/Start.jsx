import React, { useRef } from "react";
import "../styles/start.css";

const Start = ({ setUsername }) => {
    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.value && setUsername(inputRef.current.value);
    };

    return (
        <div className="start">
            <input
                placeholder="Escribe tu nombre"
                className="startInput"
                ref={inputRef}
            />
            <button className="startButton" onClick={() => handleClick()}>
                Iniciar
            </button>
        </div>
    );
};

export default Start;
