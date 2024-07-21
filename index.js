const startTime = document.querySelector('#startTime');
const workTime = document.querySelector('#worktime');

const breakStart = document.querySelector('#breakStart0');
const breakEnd = document.querySelector('#breakEnd0');

const breakStart1 = document.querySelector('#breakStart1');
const breakEnd1 = document.querySelector('#breakEnd1');

const breakStart2 = document.querySelector('#breakStart2');
const breakEnd2 = document.querySelector('#breakEnd2');

const overtime = document.querySelector('#overtime');
const endTime = document.querySelector('#endTime');

const addBreak = document.querySelector('#add-break');

const container1 = document.querySelector('#break-holder-1');
const container2 = document.querySelector('#break-holder-2');
const removeBreak1 = document.querySelector('#remove-break1');
const removeBreak2 = document.querySelector('#remove-break2');

// I HATE JAVASCRIPT

function timeToMinute(time) {
    const [hours, minutes] = time.value.split(':').map(Number)
    return hours * 60 + minutes;
}

function convertMinToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hoursStr = String(hours).padStart(2, '0');
    const minsStr = String(mins).padStart(2, '0');
    return `${hoursStr}:${minsStr}`;
}

function calcEndTime() {
    let totalMinutes = timeToMinute(startTime) + timeToMinute(workTime);
    let breakDuration = calcBreakDuration(breakStart, breakEnd)

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

    return convertMinToHours(totalMinutes);
}

function calcBreakDuration(breakStart, breakEnd) {
    return timeToMinute(breakEnd) - timeToMinute(breakStart)
}

function updateEndTime() {
    endTime.innerHTML = calcEndTime();
}

function addBreakInput() {
    if (container1.style.display === '') {
        container2.style.display = '';
    } else {
        container1.style.display = '';
    }
}

function hideBreakInput1() {
    container1.style.display = 'none';
    breakStart1.value = '';
    breakEnd1.value = '';
    updateEndTime()
}

function hideBreakInput2() {
    container2.style.display = 'none';
    breakStart2.value = '';
    breakEnd2.value = '';
    updateEndTime()
}

addBreak.addEventListener('click', addBreakInput)
removeBreak1.addEventListener('click', hideBreakInput1)
removeBreak2.addEventListener('click', hideBreakInput2)

startTime.addEventListener('input', updateEndTime);
workTime.addEventListener('input', updateEndTime);

breakStart.addEventListener('input', updateEndTime);
breakEnd.addEventListener('input', updateEndTime);

breakStart1.addEventListener('input', updateEndTime);
breakEnd1.addEventListener('input', updateEndTime);

breakStart2.addEventListener('input', updateEndTime);
breakEnd2.addEventListener('input', updateEndTime);

overtime.addEventListener('input', updateEndTime);

updateEndTime()