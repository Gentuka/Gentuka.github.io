const startTime = document.querySelector("#startTime");
const workTime = document.querySelector("#worktime");

const breakStart = document.querySelector("#breakStart0");
const breakEnd = document.querySelector("#breakEnd0");

const breakStart1 = document.querySelector("#breakStart1");
const breakEnd1 = document.querySelector("#breakEnd1");

const breakStart2 = document.querySelector("#breakStart2");
const breakEnd2 = document.querySelector("#breakEnd2");

const overtime = document.querySelector("#overtime");
const endTime = document.querySelector("#endTime");
const countdown = document.querySelector("#countdown");

const addBreak = document.querySelector("#add-break");

const container1 = document.querySelector("#break-holder-1");
const container2 = document.querySelector("#break-holder-2");
const removeBreak1 = document.querySelector("#remove-break1");
const removeBreak2 = document.querySelector("#remove-break2");

let totalMinutes;

function timeToMinute(time) {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes;
}

function convertMinToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hoursStr = String(hours).padStart(2, "0");
    const minsStr = String(mins).padStart(2, "0");
    return `${hoursStr}:${minsStr}`;
}

function calcEndTime() {
    totalMinutes = timeToMinute(startTime.value) + timeToMinute(workTime.value);

    let breakDuration = calcBreakDuration()

    if (breakDuration) {
        totalMinutes += parseInt(breakDuration)
    }

    if (breakStart1.value && breakEnd1.value) {
        totalMinutes += calcBreakDuration(breakStart1, breakEnd1)
    }

    if (breakStart2.value && breakEnd2.value) {
        totalMinutes += calcBreakDuration(breakStart2, breakEnd2)
    }

    if (overtime.value) {
        totalMinutes -= parseInt(overtime.value)
    }

    if (totalMinutes < 0){
        totalMinutes = 0;
    }

    setCookie("startTime", startTime.value, 365);
    setCookie("workTime", workTime.value, 365);
    setCookie("breakStart", breakStart.value, 365);
    setCookie("breakEnd", breakEnd.value, 365);

    timeoutForEndtime();
    return convertMinToHours(totalMinutes);
}

function calcBreakDuration() {
    return timeToMinute(getCookie("breakEnd") || "12:30") - timeToMinute(getCookie("breakStart") || "12:00");
}

function updateEndTime() {
    endTime.innerHTML = calcEndTime();
}

function addBreakInput() {
    if (container1.style.display === "") {
        container2.style.display = "";
    } else {
        container1.style.display = "";
    }
}

function hideBreakInput1() {
    container1.style.display = "none";
    breakStart1.value = "";
    breakEnd1.value = "";
    updateEndTime()
}

function hideBreakInput2() {
    container2.style.display = "none";
    breakStart2.value = "";
    breakEnd2.value = "";
    updateEndTime()
}

function timeoutForEndtime() {
    let currentTimeInMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    let diff = totalMinutes - currentTimeInMinutes;

    if (diff < 0){
        diff = 0;
    }

    countdown.innerHTML = convertMinToHours(diff)
    setTimeout(timeoutForEndtime, 60000);
}

function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=/";}

function getCookie(name) {
    let decodedCookie = decodeURIComponent(document.cookie)
    let cookieArr = decodedCookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (cookiePair[0] === name) {
            return cookiePair[1];
        }
    }
    return null;
}

function fillInputWithCookieValue() {
    startTime.value = getCookie("startTime") || "08:00";
    workTime.value =  getCookie("workTime") || "07:42";
    breakStart.value =  getCookie("breakStart") || "12:00";
    breakEnd.value =  getCookie("breakEnd") || "12:30";
}

function debug() {
    console.log('### START DEBUG ###');
    console.log(startTime.value);
    console.log(workTime.value);
    console.log(breakStart.value);
    console.log(breakEnd.value);
    console.log('### END DEBUG ###');
}

addBreak.addEventListener("click", addBreakInput)
removeBreak1.addEventListener("click", hideBreakInput1)
removeBreak2.addEventListener("click", hideBreakInput2)

startTime.addEventListener("input", updateEndTime);
workTime.addEventListener("input", updateEndTime);

breakStart.addEventListener("input", updateEndTime);
breakEnd.addEventListener("input", updateEndTime);

breakStart1.addEventListener("input", updateEndTime);
breakEnd1.addEventListener("input", updateEndTime);

breakStart2.addEventListener("input", updateEndTime);
breakEnd2.addEventListener("input", updateEndTime);

overtime.addEventListener("input", updateEndTime);

fillInputWithCookieValue();
updateEndTime();