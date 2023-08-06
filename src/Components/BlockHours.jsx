/* eslint-disable react/prop-types */
import { useContext } from "react";
import { StateContext } from "../App";

const BlockHours = () => {
    const { hours } = useContext(StateContext);
    return (
        <div>
            <ul>
                <li>{hours < 10 ? `0${hours}` : hours}</li>
                <li>Hours</li>
            </ul>
        </div>
    );
};

export default BlockHours;
