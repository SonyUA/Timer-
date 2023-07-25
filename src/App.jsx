import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [dateParagraf, setDateParagraf] = useState("");
    let [seconds, setSeconds] = useState("");
    let [precentOfsecunds, setPrecentOfSecunds] = useState(0);
    const [isTimeGo, setIsTimeGo] = useState(false);
    const secValueRef = useRef(null);
    const precentSecRef = useRef(null);
    useEffect(() => {}, [precentOfsecunds, seconds]);
    const inputValue = (e) => {};

    const getTime = (e) => {
        if (isTimeGo) {
            setIsTimeGo(!isTimeGo);
            stop();
        }
        if (Date.parse(e.target.value) > Date.parse(new Date())) {
            setDateParagraf(e.target.value);
            setIsTimeGo(!isTimeGo);
        } else {
            setDateParagraf("No coorect");
            return;
        }

        function totalTime() {
            const total = Date.parse(e.target.value) - Date.parse(new Date());
            setSeconds((seconds = Math.floor((total / 1000) % 60)));
            setPrecentOfSecunds((precentOfsecunds = 100 - (100 / 60) * seconds));
            secValueRef.current.innerHTML = `${seconds}`;
            precentSecRef.current.style = `background: conic-gradient(#02c2c2 0 ${precentOfsecunds}%, #303238 ${precentOfsecunds}% 100%)`;
            console.log("seconds", seconds);
            console.log("precentSec", precentOfsecunds);
            if (total === 0) {
                clearInterval(stopTime);
            }
        }
        totalTime();
        const stopTime = setInterval(totalTime, 1000);
        function stop() {
            return clearInterval(stopTime);
        }
    };

    return (
        <div className='wrapper'>
            <section className='section'>
                <div className='input-date-block'>
                    <div>
                        <span>Виьбрати дату</span>
                        <input type='date' name='date' id='input-date' onInput={getTime} />
                    </div>
                    <p>{dateParagraf}</p>
                </div>

                <div className='time-block' id='days'>
                    <div>
                        <ul>
                            <li>00</li>
                            <li>Days</li>
                        </ul>
                    </div>
                </div>
                <div className='time-block' id='hours'>
                    <div>
                        <ul>
                            <li>00</li>
                            <li>Hours</li>
                        </ul>
                    </div>
                </div>
                <div className='time-block' id='minutes'>
                    <div>
                        <ul>
                            <li>00</li>
                            <li>Minutes</li>
                        </ul>
                    </div>
                </div>
                <div ref={precentSecRef} className='time-block' id='seconds'>
                    <div>
                        <ul>
                            <li ref={secValueRef}>00</li>
                            <li>Seconds</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
