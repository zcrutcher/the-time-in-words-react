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
            : "Please enter an Hour value of 1 - 12",
      });
    }
    if (e.target.name == "minute") {
      setErrors({
        ...errors,
        minute:
          e.target.value > -1 && e.target.value < 60
            ? null
            : "Please enter a Minute value of 0 - 59",
      });
    }
    setTime({ ...time, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className="flex flex-row justify-center">
        <div className="flex flex-col">
          <h3 className="text-center text-3xl">Hour</h3>

          <input
            className="bg-slate-200 m-3 text-center text-2xl h-16 w-32 rounded-md"
            type="text"
            name="hour"
            id="hour"
            maxLength="2"
            value={time.hour}
            onChange={changeHandler}
          ></input>
        </div>
        <div className="text-4xl mt-6 flex self-center">:</div>

        <div className="flex flex-col">
          <h3 className="text-center text-3xl">Minutes</h3>

          <input
            className="bg-slate-200 m-3 text-center text-2xl h-16 w-32 rounded-md"
            type="text"
            name="minute"
            id="minute"
            maxLength="2"
            value={time.minute}
            onChange={changeHandler}
          ></input>
        </div>
      </form>

      {errors.hour || errors.minute ? (
        <Errors hour={errors.hour} minute={errors.minute} />
      ) : (
        <div className="text-center text-4xl m-4 capitalize">
          <Display hour={convertedTime.hour} minute={convertedTime.minute} />
        </div>
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

const Errors = ({ hour, minute }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/2">
        {hour && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4 text-center">
            {hour}
          </div>
        )}
        {minute && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4 text-center">
            {minute}
          </div>
        )}
      </div>
    </div>
  );
};
export default Clock;
