/* eslint-disable react/prop-types */
import { useContext } from "react";
import { StateContext } from "../App";

const BlockMinutes = () => {
    const { minutes } = useContext(StateContext);
    return (
        <div>
            <ul>
                <li>{minutes < 10 ? `0${minutes}` : minutes}</li>
                <li>Minutes</li>
            </ul>
        </div>
    );
};

export default BlockMinutes;
