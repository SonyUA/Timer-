/* eslint-disable react-refresh/only-export-components */
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState, createContext, memo } from "react";
export const StateContext = createContext(null);
import "./App.css";

import InputDate from "./Components/InputDate";

import BlockHours from "./Components/BlockHours";
import BlockMinutes from "./Components/BlockMinutes";
import BlockSeconds from "./Components/BlockSeconds";
import BlockDays from "./Components/BlockDays";
import PrecentCircle from "./Components/PrecentCircle";

function App() {
    const [dateParagraf, setDateParagraf] = useState("Виберіть День");

    let [seconds, setSeconds] = useState(0);
    let [precentOfseconds, setPrecentOfSeconds] = useState(0);
    const precentSecRef = useRef(null);

    let [minutes, setMinutes] = useState(0);
    let [precentOfMinutes, setPrecentOfMinutes] = useState(0);
    const precentMinRef = useRef(null);

    let [hours, setHours] = useState(0);
    let [precentOfHours, setPrecentOfHours] = useState(0);
    const precentHoursRef = useRef(null);

    let [days, setDays] = useState(0);
    let [precentOfDays, setPrecentOfDays] = useState(0);
    const precentDaysRef = useRef(null);
    let [total, setTotal] = useState("");
    let [stopTime, setStopTime] = useState(false);
    const stateDatas = { days, hours, minutes, seconds };

    const getTime = (e) => {
        if (stopTime) {
            clearInterval(stopTime);
            setStopTime(null);
            setTotal(false);
        }

        if (Date.parse(e.target.value) > Date.parse(new Date())) {
            setDateParagraf(e.target.value);
            console.log("e.target", e.target.value);
            let stop = setInterval(() => totalTime(e.target.value), 1000);
            setStopTime(stop);
        } else {
            clearInterval(stopTime);
            setDateParagraf("Некоректна дата!");
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            setDays(0);
            setPrecentOfDays(0);
            setPrecentOfHours(0);
            setPrecentOfMinutes(0);
            setPrecentOfSeconds(0);
            setStopTime(null);
            setTotal(0);
        }
    };
    function totalTime(e) {
        const newTotal = Date.parse(e) - Date.parse(new Date());
        setTotal((total = newTotal));

        setSeconds((seconds = Math.floor((total / 1000) % 60)));
        setPrecentOfSeconds((precentOfseconds = 100 - (100 / 60) * seconds));
        precentSecRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfseconds}%, #303238 ${precentOfseconds}% 100%)`;

        setHours((hours = Math.floor(((total / (1000 * 60 * 60)) % 24) - 3)));
        setPrecentOfHours((precentOfHours = 100 - (100 / 24) * hours));
        precentHoursRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfHours}%, #303238 ${precentOfHours}% 100%)`;

        setMinutes((minutes = Math.floor((total / 1000 / 60) % 60)));
        setPrecentOfMinutes((precentOfMinutes = 100 - (100 / 60) * minutes));
        precentMinRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfMinutes}%, #303238 ${precentOfMinutes}% 100%)`;

        setDays((days = Math.floor(total / (1000 * 60 * 60 * 24))));
        setPrecentOfDays((precentOfDays = 100 / days));
        precentDaysRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfDays}%, #303238 ${precentOfDays}% 100%)`;

        if (days === 0) {
            setPrecentOfDays(0);
        }
        if (total === 0) {
            clearInterval(stopTime);
            setStopTime(null);
        }
    }

    return (
        <StateContext.Provider value={stateDatas}>
            <div className='wrapper'>
                <section className='section'>
                    <div className='input-date-block'>
                        <InputDate getTime={getTime} />
                        <p>{dateParagraf}</p>
                    </div>
                    <PrecentCircle precentRef={precentDaysRef}>
                        <BlockDays />
                    </PrecentCircle>

                    <PrecentCircle precentRef={precentHoursRef}>
                        <BlockHours />
                    </PrecentCircle>

                    <PrecentCircle precentRef={precentMinRef}>
                        <BlockMinutes />
                    </PrecentCircle>

                    <PrecentCircle precentRef={precentSecRef}>
                        <BlockSeconds />
                    </PrecentCircle>
                </section>
            </div>
        </StateContext.Provider>
    );
}

export default memo(App);
