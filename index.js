let startTime = document.querySelector('#startTime');
let workTime = document.querySelector('#worktime');
let breakStart = document.querySelector('#breakStart');
let breakEnd = document.querySelector('#breakEnd');
let overtime = document.querySelector('#overtime');
let endTime = document.querySelector('#endTime');

let addBreak= document.querySelector('#add-break');

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

function calcEndTime(time1, time2, breakDuration, overtime) {
    let totalMinutes = timeToMinute(time1) + timeToMinute(time2);

    if (breakDuration) {
        totalMinutes += parseInt(breakDuration)
    }

    if (overtime) {
        totalMinutes -= parseInt(overtime)
    }

    return minutesToTimeString(totalMinutes);
}

function calcBreakDuration(breakStart, breakEnd) {
    return timeToMinute(breakEnd) - timeToMinute(breakStart)
}

function updateEndTime() {
    let breakDuration = calcBreakDuration(breakStart, breakEnd)
    endTime.innerHTML= calcEndTime(startTime, workTime, breakDuration, overtime.value);
}

function addBreakElements() {
    alert('in progress');
    var breakStartDiv = document.createElement('div');
    breakStartDiv.className = 'col form-group mb-4';
    breakStartDiv.innerHTML = `
                <label for="breakStart">Break Start*</label>
                <input type="time" class="form-control" id="breakStart" name="worktime" value="12:00" required>
            `;

    var breakEndDiv = document.createElement('div');
    breakEndDiv.className = 'col form-group mb-4';
    breakEndDiv.innerHTML = `
                <label for="breakEnd">Break End*</label>
                <input type="time" class="form-control" id="breakEnd" name="worktime" value="12:30" required>
            `;

    var container = document.getElementById('break-holder');
    container.appendChild(breakStartDiv);
    container.appendChild(breakEndDiv);
}

addBreak.addEventListener('click', addBreakElements)

updateEndTime()
startTime.addEventListener('input', updateEndTime);
workTime.addEventListener('input', updateEndTime);
breakStart.addEventListener('input', updateEndTime);
breakEnd.addEventListener('input', updateEndTime);
overtime.addEventListener('input', updateEndTime);

