/* eslint-disable react/prop-types */
import { useContext } from "react";
import { StateContext } from "../App";

const BlockDays = () => {
    const { days } = useContext(StateContext);
    return (
        <div>
            <ul>
                <li>{days < 10 ? `0${days}` : days}</li>
                <li>Days</li>
            </ul>
        </div>
    );
};

export default BlockDays;
