import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const dateInputRef = useRef(null);

    const focus = () => {
        console.log("yes");
        dateInputRef.current.click();
    };
    const [dateParagraf, setDateParagraf] = useState("");

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
    let total = "";
    let stopTime;

    const getTime = (e) => {
        if (Date.parse(e.target.value) > Date.parse(new Date())) {
            setDateParagraf(e.target.value);
        } else {
            setDateParagraf("No coorect");
            clearInterval(stopTime);
            return;
        }

        function totalTime() {
            total = Date.parse(e.target.value) - Date.parse(new Date());

            setSeconds((seconds = Math.floor((total / 1000) % 60)));
            setPrecentOfSeconds((precentOfseconds = 100 - (100 / 60) * seconds));
            precentSecRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfseconds}%, #303238 ${precentOfseconds}% 100%)`;

            setMinutes((minutes = Math.floor((total / 1000 / 60) % 60)));
            setPrecentOfMinutes((precentOfMinutes = 100 - (100 / 60) * minutes));
            precentMinRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfMinutes}%, #303238 ${precentOfMinutes}% 100%)`;

            setHours((hours = Math.floor((total / (1000 * 60 * 60)) % 24)));
            setPrecentOfHours((precentOfHours = 100 - (100 / 24) * hours));
            precentHoursRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfHours}%, #303238 ${precentOfHours}% 100%)`;

            setDays((days = Math.floor(total / (1000 * 60 * 60 * 24))));
            setPrecentOfDays((precentOfDays = 100 / days));
            precentDaysRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfDays}%, #303238 ${precentOfDays}% 100%)`;
            if (days === 0) {
                setPrecentOfDays(0);
            }
            if (total === 0) {
                clearInterval(stopTime);
            }
        }
        totalTime();
        stopTime = setInterval(totalTime, 1000);
    };

    return (
        <div className='wrapper'>
            <section className='section'>
                <div className='input-date-block'>
                    <div>
                        <span>Виьбрати дату</span>
                        <input ref={dateInputRef} onClick={focus} type='date' name='date' id='input-date' onInput={getTime} />
                    </div>
                    <p>{dateParagraf}</p>
                </div>

                <div ref={precentDaysRef} className='time-block' id='days'>
                    <div>
                        <ul>
                            <li>{days}</li>
                            <li>Days</li>
                        </ul>
                    </div>
                </div>
                <div ref={precentHoursRef} className='time-block' id='hours'>
                    <div>
                        <ul>
                            <li>{hours}</li>
                            <li>Hours</li>
                        </ul>
                    </div>
                </div>
                <div ref={precentMinRef} className='time-block' id='minutes'>
                    <div>
                        <ul>
                            <li>{minutes}</li>
                            <li>Minutes</li>
                        </ul>
                    </div>
                </div>
                <div ref={precentSecRef} className='time-block' id='seconds'>
                    <div>
                        <ul>
                            <li>{seconds}</li>
                            <li>Seconds</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
