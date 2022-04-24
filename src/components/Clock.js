import React, {useState, useEffect} from "react";
const {displayHour, displayMinute, displayQuarters} = require("../logic/timeInWords");

const Clock = () => {

    const [time, setTime] = useState({hour : "12", minute : "00"})
    const [convertedTime, setConvertedTime] = useState({hour : time.hour, minute :time.minute});
    const [words, setWords] = useState({hour : "", minute : "", quarters : "", phrasing : ""});

    useEffect(() => {
        setConvertedTime({hour : Number(time.hour), minute : Number(time.minute)});
    }, [time])

    const submitHandler = (e) => {
        e.preventDefault();

        //TODO refactor this... obviously
        setWords({hour : displayHour(convertedTime.minute > 39 ? convertedTime.hour + 1 : convertedTime.hour), minute : displayMinute(convertedTime.minute > 39 ? 60 - convertedTime.minute : convertedTime.minute), quarters : displayQuarters(convertedTime.minute), phrasing : convertedTime.minute > 39 ? "minutes to " : "minutes past"});
    };

    const changeHandler = e => {
       setTime({...time, [e.target.name] : e.target.value});
    }

    return (
        <form onSubmit={submitHandler}>
            <h3>Hour</h3>
            <input type="number" name="hour" id="hour" value={time.hour} onChange={changeHandler}></input>
            <h3>Minutes</h3>
            <input type="number" name="minute" id="minute" value={time.minute} onChange={changeHandler}></input>
            <input type="submit" value="Submit"></input>
        </form>
    )
}

const Display = ({wording}) => {
    return (
        <>
            <h1>{wording}</h1>
        </>
    )
}

export default Clock;