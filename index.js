let startTime = document.querySelector('#startTime');
let workTime = document.querySelector('#worktime');
let breakDuration = document.querySelector('#breakDuration');
let overtime = document.querySelector('#overtime');
let endTime = document.querySelector('#endTime');

// I HATE JAVASCRIPT

function timeToMinute(time) {
    const [hours, minutes] = time.value.split(':').map(Number)
    return hours * 60 + minutes;
}

function minutesToTimeString(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hoursStr = String(hours).padStart(2, '0');
    const minsStr = String(mins).padStart(2, '0');
    return `${hoursStr}:${minsStr}`;
}

function addTimes(time1, time2, breakDuration, overtime) {
    let totalMinutes = timeToMinute(time1) + timeToMinute(time2);

    if (breakDuration){
        totalMinutes += parseInt(breakDuration)
    }

    if (overtime){
        totalMinutes += parseInt(overtime)
    }

    return minutesToTimeString(totalMinutes);
}

function updateEndTime()
{
    endTime.value = addTimes(startTime, workTime, breakDuration.value, overtime.value);
}

endTime.value = addTimes(startTime, workTime, breakDuration.value, overtime.value);
startTime.addEventListener('input', updateEndTime);
workTime.addEventListener('input', updateEndTime);
breakDuration.addEventListener('input', updateEndTime);
overtime.addEventListener('input', updateEndTime);

