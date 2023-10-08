// Title
const titleWork = document.getElementById('title-work');
const titlePlay = document.getElementById('title-play');
const titleStudy = document.getElementById('title-study');
const titleExercise = document.getElementById('title-exercise');
const titleSocial = document.getElementById('title-social');
const titleSelfCare = document.getElementById('title-self-care');

// Current
const currentWork = document.getElementById('current-work');
const currentPlay = document.getElementById('current-play');
const currentStudy = document.getElementById('current-study');
const currentExercise = document.getElementById('current-exercise');
const currentSocial = document.getElementById('current-social');
const currentSelfCare = document.getElementById('current-self-care');

// Previous
const previousWork = document.getElementById('previous-work');
const previousPlay = document.getElementById('previous-play');
const previousStudy = document.getElementById('previous-study');
const previousExercise = document.getElementById('previous-exercise');
const previousSocial = document.getElementById('previous-social');
const previousSelfCare = document.getElementById('previous-self-care');

// Buttons
const dailyBtn = document.getElementById('daily');
const weeklyBtn = document.getElementById('weekly');
const monthlyBtn = document.getElementById('monthly');

const idName = {
    0: {title: titleWork, current: currentWork, previous: previousWork},
    1: {title: titlePlay, current: currentPlay, previous: previousPlay},
    2: {title: titleStudy, current: currentStudy, previous: previousStudy},
    3: {title: titleExercise, current: currentExercise, previous: previousExercise},
    4: {title: titleSocial, current: currentSocial, previous: previousSocial},
    5: {title: titleSelfCare, current: currentSelfCare, previous: previousSelfCare}
};

window.onload = function() {
    weeklyBtn.focus();
}

let type = "weekly";

function display() {
    fetch('data.json')
    .then(response => response.json())
        .then(data => {

            data.forEach((item, index) => {
                let titleValue = data[index].title;
                let currentValue = data[index].timeframes[type].current;
                let previousValue = data[index].timeframes[type].previous;
            
                idName[index].title.innerHTML = titleValue;
                idName[index].current.innerHTML = `${currentValue}hrs`;
                if (type == "daily") {
                    idName[index].previous.innerHTML = `Yesterday  - ${previousValue}hrs`;
                } else if (type == "weekly") {
                    idName[index].previous.innerHTML = `Last Week  - ${previousValue}hrs`;
                } else {
                    idName[index].previous.innerHTML = `Last Month  - ${previousValue}hrs`;
                }

            });

        })
        .catch(error => {
            console.error('Error:', error);
    });
}

function changeType(typeValue) {
    type = typeValue;
}

dailyBtn.addEventListener("click", function() {
    changeType("daily");
    display();
});

weeklyBtn.addEventListener("click", function() {
    changeType("weekly");
    display();
});

monthlyBtn.addEventListener("click", function() {
    changeType("monthly");
    display();
});
