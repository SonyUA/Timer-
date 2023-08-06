/* eslint-disable react/prop-types */
import { useContext } from "react";
import { StateContext } from "../App";

const BlockSeconds = () => {
    const { seconds } = useContext(StateContext);
    return (
        <div>
            <ul>
                <li>{seconds < 10 ? `0${seconds}` : seconds}</li>
                <li>Seconds</li>
            </ul>
        </div>
    );
};

export default BlockSeconds;
