import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import "./App.css";

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
            setStopTime(null);
            setTotal(0);
        }
    };
    function totalTime(e) {
        const newTotal = Date.parse(e) - Date.parse(new Date());
        setTotal((total = newTotal));

        setSeconds((seconds = Math.floor((total / 1000) % 60)));
        setPrecentOfSeconds((precentOfseconds = 100 - (100 / 60) * seconds));
        if (precentSecRef.current) {
            precentSecRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfseconds}%, #303238 ${precentOfseconds}% 100%)`;
        }

        setHours((hours = Math.floor(((total / (1000 * 60 * 60)) % 24) - 3)));
        setPrecentOfHours((precentOfHours = 100 - (100 / 24) * hours));
        if (precentHoursRef.current) {
            precentHoursRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfHours}%, #303238 ${precentOfHours}% 100%)`;
        }

        setMinutes((minutes = Math.floor((total / 1000 / 60) % 60)));
        setPrecentOfMinutes((precentOfMinutes = 100 - (100 / 60) * minutes));
        if (precentMinRef.current) {
            precentMinRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfMinutes}%, #303238 ${precentOfMinutes}% 100%)`;
        }

        setDays((days = Math.floor(total / (1000 * 60 * 60 * 24))));
        setPrecentOfDays((precentOfDays = 100 / days));
        if (precentDaysRef.current) {
            precentDaysRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfDays}%, #303238 ${precentOfDays}% 100%)`;
        }

        if (days === 0) {
            setPrecentOfDays(0);
        }
        if (total === 0) {
            clearInterval(stopTime);
            setStopTime(null);
        }
    }

    return (
        <div className='wrapper'>
            <section className='section'>
                <div className='input-date-block'>
                    <div>
                        <input type='date' name='date' id='input-date' onChange={getTime} />
                        {/* <span>Виьбрати дату</span> */}
                    </div>
                    <p>{dateParagraf}</p>
                </div>

                <div ref={precentDaysRef} className='time-block' id='days'>
                    <div>
                        <ul>
                            <li>{days < 10 ? `0${days}` : days}</li>
                            <li>Days</li>
                        </ul>
                    </div>
                </div>
                <div ref={precentHoursRef} className='time-block' id='hours'>
                    <div>
                        <ul>
                            <li>{hours < 10 ? `0${hours}` : hours}</li>
                            <li>Hours</li>
                        </ul>
                    </div>
                </div>
                <div ref={precentMinRef} className='time-block' id='minutes'>
                    <div>
                        <ul>
                            <li>{minutes < 10 ? `0${minutes}` : minutes}</li>
                            <li>Minutes</li>
                        </ul>
                    </div>
                </div>
                <div ref={precentSecRef} className='time-block' id='seconds'>
                    <div>
                        <ul>
                            <li>{seconds < 10 ? `0${seconds}` : seconds}</li>
                            <li>Seconds</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
