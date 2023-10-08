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
const timeframeBtns = document.querySelectorAll('.tf-btn');

const idName = {
    0: {title: titleWork, current: currentWork, previous: previousWork},
    1: {title: titlePlay, current: currentPlay, previous: previousPlay},
    2: {title: titleStudy, current: currentStudy, previous: previousStudy},
    3: {title: titleExercise, current: currentExercise, previous: previousExercise},
    4: {title: titleSocial, current: currentSocial, previous: previousSocial},
    5: {title: titleSelfCare, current: currentSelfCare, previous: previousSelfCare}
};

let type = "weekly";

function display() {
    fetch('data.json')
    .then(response => response.json())
        .then(data => {

            data.forEach((item, index) => {
                
                let titleValue = item.title;
                let currentValue = item.timeframes[type].current;
                let previousValue = item.timeframes[type].previous;
            
                idName[index].title.innerHTML = titleValue;
                idName[index].current.innerHTML = `${currentValue}hrs`;
                idName[index].previous.innerHTML = getPreviousLabel(type, previousValue);

            });

        })
        .catch(error => {
            console.error('Error:', error);
    });
}

function getPreviousLabel(type, previousValue) {
    switch (type) {
      case 'daily':
        return `Yesterday - ${previousValue}hrs`;
      case 'weekly':
        return `Last Week - ${previousValue}hrs`;
      case 'monthly':
        return `Last Month - ${previousValue}hrs`;
      default:
        return '';
    }
  }

function changeType(typeValue) {
    type = typeValue;
    display()
}

timeframeBtns.forEach((button, index) => {
    button.addEventListener("click", function () {
        changeType(["daily", "weekly", "monthly"][index]);
    });
});
  
window.onload = function () {
    timeframeBtns[1].focus();
}
