const convertHour = (hr) => {
const hrs = {
      1 : "one",
      2 : "two",
      3 : "three",
      4 : "four",
      5 : "five",
      6 : "six",
      7 : "seven",
      8 : "eight",
      9 : "nine",
      10 : "ten",
      11 : "eleven",
      12 : "twelve",
      13 : "one"

};

return hrs[hr];
}

const convertMinutes = (min) => {
const mins = {
      0 : "o' clock",
      1 : "one",
      2 : "two",
      3 : "three",
      4 : "four",
      5 : "five",
      6 : "six",
      7 : "seven",
      8 : "eight",
      9 : "nine",
      10 : "ten",
      11 : "eleven",
      12 : "twelve",
      13 : "thirteen",
      14 : "fourteen",
      15 : "fifteen",
      16 : "sixteen",
      17 : "seventeen",
      18 : "eighteen",
      19 : "ninteen",
      20 : "twenty"
};

return mins[min];
}

const convertPrefix = (pre) => {
const prefix = ["", "", "twenty", "thrity"];

    return prefix[pre];
};

const displayHour = (hr) => {
    return convertHour(hr);
}

const displayMinute = (min) => {
    const strMin = String(min);
    if(min > 19 && strMin[1] > 0) return `${convertPrefix(strMin[0])} ${convertMinutes(strMin[1])}`
    if(min > 19) return `${convertPrefix(strMin[0])}`;
    return convertMinutes(min);
}

const displayQuarters = (min) => {
    switch(min){
        case 15:
            return "quarter past";
        case 30:
            return "half past";
        case 45:
            return "quarter to";
        default:
            return "";
    }
}

module.exports = {
    displayHour : displayHour,
    displayMinute : displayMinute,
    displayQuarters : displayQuarters
};