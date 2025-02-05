const container = document.getElementById('container');
let timer = { minutes:0,seconds:0,milliSeconds:0,counter:0,lapCount:0}; 
let timerStart=false;

function incLapCount(){
    timer.lapCount++;
}

function createLap(){
    incLapCount();
    return {id: timer.lapCount, name: 'Lap-'+timer.lapCount, min: timer.minutes, sec:timer.seconds, ms: timer.milliSeconds};
}

function addLap(lapObj){
    const lapListContainer = document.getElementById('lap-list-container');
    let lapContainer = document.createElement('div');
    lapContainer.id='lap-'+lapObj.id;
    lapContainer.classList.add('lap-container');

    let lapName = document.createElement('label');
    lapName.id='lap-'+lapObj.id+'-name';
    lapName.classList.add('lap-name-label');
    lapName.innerText="Lap-"+lapObj.id;

    let lapTime = document.createElement('label');
    lapTime.id='lap-'+lapObj.id+'-time';
    lapTime.classList.add('lap-time-label');
    lapTime.innerText= checkTime(lapObj.min) + ":" + checkTime(lapObj.sec)+ ":" + checkTime(lapObj.ms);;

    lapContainer.appendChild(lapName);
    lapContainer.appendChild(lapTime);

    /* if(lapListContainer.children.length>4){
        lapListContainer.removeChild(lapListContainer.lastChild);
    } */

    lapListContainer.insertBefore(lapContainer, lapListContainer.firstChild);
}
function createStopWatch(){
    let timeContainer = document.createElement('div');
    timeContainer.classList.add('time-container');
    timeContainer.id= "time-container";

    let timeLabel = document.createElement('label');
    timeLabel.innerText='00:00:00';
    timeLabel.id='timer';
    
    timeContainer.appendChild(timeLabel);
    container.appendChild(timeContainer);

    let ctrlBtnContainer = document.createElement('div');
    ctrlBtnContainer.id='ctrl-btn-container';
    ctrlBtnContainer.classList.add('ctrl-btns-container');
    ctrlBtnContainer.addEventListener('click', function(event){
        let invoker = event.target;
        if(invoker.id === 'start-btn-container' || invoker.id === 'start-btn'){
            timerStart = !timerStart;
            let startBtn = document.getElementById('start-btn');
            if(startBtn.innerText =='Start'){
                startBtn.innerText='Stop';
                startBtn.parentElement.classList.add('stop-btn-container');
                document.getElementById('lap-btn').innerText = 'Lap';
            }else{
                startBtn.innerText='Start';
                startBtn.parentElement.classList.remove('stop-btn-container');
                document.getElementById('lap-btn').innerText = 'Reset';
            }
        }else if(invoker.id === 'lap-btn-container' || invoker.id === 'lap-btn'){
            let startBtn = document.getElementById('start-btn');
            if(startBtn.innerText =='Start'){
                resetWatch();
            }else{
                let lapObj = createLap();
                addLap(lapObj);
            }
            
        }
    });

    let lapBtnContainer =document.createElement('div');
    lapBtnContainer.classList.add("btn-container");
    lapBtnContainer.id = "lap-btn-container";
    let lapBtn = document.createElement('span');
    lapBtn.id = 'lap-btn';
    lapBtn.classList.add('ctrl-btns');
    lapBtn.innerText="Reset";
    lapBtnContainer.appendChild(lapBtn);
    
    let startBtnContainer = document.createElement('div');
    startBtnContainer.classList.add("btn-container");
    startBtnContainer.classList.add('start-btn-container');
    startBtnContainer.id = "start-btn-container";
    let startBtn = document.createElement('span');
    startBtn.id = 'start-btn';
    startBtn.classList.add('ctrl-btns');
    startBtn.innerText="Start";
    startBtnContainer.appendChild(startBtn);

    ctrlBtnContainer.appendChild(lapBtnContainer);
    ctrlBtnContainer.appendChild(startBtnContainer);
    container.appendChild(ctrlBtnContainer);

    let lapListContainer =document.createElement('div');
    lapListContainer.id='lap-list-container';
    lapListContainer.classList.add('lap-list-container');
    
    container.appendChild(lapListContainer);
}
function checkTime(i) {
if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
return i;
}

function resetWatch(){
    timerStart=false;
    timer.minutes=0;
    timer.seconds=0;
    timer.milliSeconds=0;
    timer.counter=0;
    timer.lapCount=0;
    document.getElementById('timer').innerText='00:00:00';
    document.getElementById('lap-list-container').innerHTML = "";
}

function setWatch(){
    document.getElementById('timer').innerText =  checkTime(timer.minutes) + ":" + checkTime(timer.seconds)+ ":" + checkTime(timer.milliSeconds);
}
function incWatch(){
    timer.counter++;
    timer.milliSeconds = timer.counter%100;
    timer.seconds = Math.floor(timer.counter/100)%60;
    timer.minutes = Math.floor(Math.floor(timer.counter/100)/60)%60;
}
function startWatch(){
    setInterval(function(){
        if(timerStart===true){
            setWatch();
            incWatch();
        }
    }, 10);
}




createStopWatch();
startWatch();