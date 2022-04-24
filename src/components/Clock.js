import React, {useState, useEffect} from "react";
const {displayHour, displayMinute, displayQuarters} = require("../logic/timeInWords");

const Clock = () => {

    const [time, setTime] = useState({hour : "12", minute : "00"})
    const [convertedTime, setConvertedTime] = useState({hour : time.hour, minute :time.minute});

    useEffect(() => {
        setConvertedTime({hour : Number(time.hour), minute : Number(time.minute)});
    }, [time])

    const submitHandler = (e) => {
        e.preventDefault();
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
            <Display hour={convertedTime.hour} minute={convertedTime.minute} />
        </form>
    )
}

const Display = ({hour, minute}) => {
    const [words, setWords] = useState({hour : "", minute : "", quarters : "", phrasing : ""});

    const singularOrPlural = (min) => {
        return min == 1 || min == 59 ? "minute" : "minutes";
    }

    useEffect(() => {
        setWords({hour : displayHour(minute > 39 ? hour + 1 : hour), minute : displayMinute(minute > 39 ? 60 - minute : minute), quarters : displayQuarters(minute), phrasing : minute > 39 ? `${singularOrPlural(minute)} to` : `${singularOrPlural(minute)} past`});
    }, [hour, minute])

    let wording = "";
    if(minute == 0){
        wording = `${words.hour} ${words.minute}`;
    }
    else if(words.quarters){
        wording = `${words.quarters} ${words.hour}`
    }
    else{
        wording = `${words.minute} ${words.phrasing} ${words.hour}`;
    }


    return (
        <>
            <h1>{wording}</h1>
        </>
    )
}

export default Clock;