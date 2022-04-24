import React, { useState, useEffect } from "react";
const {
  displayHour,
  displayMinute,
  displayQuarters,
} = require("../logic/timeInWords");

const Clock = () => {
  const [time, setTime] = useState({ hour: "12", minute: "00" });
  const [convertedTime, setConvertedTime] = useState({
    hour: time.hour,
    minute: time.minute,
  });
  const [errors, setErrors] = useState({ hour: null, minute: null });

  useEffect(() => {
    setConvertedTime({ hour: Number(time.hour), minute: Number(time.minute) });
  }, [time]);

  const changeHandler = (e) => {
    if (e.target.name == "hour") {
      setErrors({
        ...errors,
        hour:
          e.target.value > 0 && e.target.value < 13
            ? null
            : "Please enter a number 1 - 12",
      });
    }
    if (e.target.name == "minute") {
      setErrors({
        ...errors,
        minute:
          e.target.value > -1 && e.target.value < 60
            ? null
            : "Please enter a number 0 - 59",
      });
    }
    setTime({ ...time, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form>
        <h3>Hour</h3>
        <h3>{errors.hour}</h3>
        <input
          type="text"
          name="hour"
          id="hour"
          maxLength="2"
          value={time.hour}
          onChange={changeHandler}
        ></input>
        <h3>Minutes</h3>
        <h3>{errors.minute}</h3>
        <input
          type="text"
          name="minute"
          id="minute"
          maxLength="2"
          value={time.minute}
          onChange={changeHandler}
        ></input>
      </form>

      {errors.hour || errors.minute ? null : (
        <Display hour={convertedTime.hour} minute={convertedTime.minute} />
      )}
    </>
  );
};

const Display = ({ hour, minute }) => {
  const [words, setWords] = useState({
    hour: "",
    minute: "",
    quarters: "",
    phrasing: "",
  });

  const singularOrPlural = (min) => {
    return min == 1 || min == 59 ? "minute" : "minutes";
  };

  const determineTense = (min) => {
    return min > 39
      ? `${singularOrPlural(min)} to`
      : `${singularOrPlural(min)} past`;
  };

  const composeMessage = () => {
    if (minute == 0) return `${words.hour} ${words.minute}`;
    if (words.quarters) return `${words.quarters} ${words.hour}`;
    return `${words.minute} ${words.phrasing} ${words.hour}`;
  };

  useEffect(() => {
    setWords({
      hour: displayHour(hour, minute),
      minute: displayMinute(minute),
      quarters: displayQuarters(minute),
      phrasing: determineTense(minute),
    });
  }, [hour, minute]);

  return (
    <>
      <h1>{composeMessage()}</h1>
    </>
  );
};

export default Clock;
