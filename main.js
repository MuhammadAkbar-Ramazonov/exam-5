// TIME AND LEVEL 
const elForm = document.querySelector(".site-form-js");
const elFormTime = document.querySelector(".form-time-js");
const elFormLevel = document.querySelector(".form-level-js");
const setTimeOut = document.querySelector(".time-set");
const elEttamps = document.querySelector(".atammps-js");
const elScore = document.querySelector(".score-js");

// CLICK BTN 

const elBtn = document.querySelector(".form-btn-js");
const elBtnReset = document.querySelector(".reset-btn");
const elBtnWelcome = document.querySelector(".btn-welcome");

// MODAL 
const elModal = document.querySelector(".modal-inner-wrap");
const elModalGameOver = document.querySelector(".modal-game-over");
const elModalGameOverText = document.querySelector(".youwin-img");
const elList =  document.querySelector(".list");
const elTextTitle =  document.querySelector(".main-title-js");
const secondVariant = document.querySelector(".second-variant");
const elTextPoints =  document.querySelector(".text-points");
const elScoreText = document.querySelector(".text-score");
const elModalWelcome = document.querySelector(".modal-begin");
const fragmentItem =  document.createDocumentFragment();
const template = document.querySelector(".temp").content;

const titleArray = [];

// TIME 
let timeCler;

function timeFunc(time){
    let timeCler = setInterval(() => {
        let minut = Math.floor(time /60);
        let secund = time % 60 ;
        
        if(minut < 10){
            minut = "0" + minut;
        } else{
            minut = minut;
        }
        if(secund < 10){
            secund = "0" + secund;
        } else{
            secund =  secund;
        }
        setTimeOut.textContent = `${minut} : ${secund}`
        
        if(time == 0){
            clearInterval(timeCler)
            elModalGameOver.classList.add("modal-game-over-show");
            elTextTitle.style.opacity = "0";
            elTextTitle.style.pointerEvents = "none";
            elModal.classList.add("d-none");
            elList.innerHTML = "";
            elTextPoints.textContent = `Score : ${randomPoints}`;
            elScoreText.textContent = `Attempts :  ${randomChange}`
        }
        time--
    }, 1000);
}


function randomFunc() {
    let random = Math.floor(Math.random() * titleArray.length);
    elTextTitle.textContent = titleArray[random];
}

function titleFunc(item) {
    item.forEach(element => {
        titleArray.push(element.symbol_title)
    });
}

for (let i = 0; i < roadSymbol.length; i++) {
    let random1 = Math.floor(Math.random() * roadSymbol.length)
    let random2 = Math.floor(Math.random() * roadSymbol.length)
    
    const icon = roadSymbol[random1] 
    roadSymbol[random1] = roadSymbol[random2]
    roadSymbol[random2] = icon
}

// BTN CLICK 
elBtn.addEventListener("click", ()=>{
    clearInterval(timeCler);
    timeFunc(elFormTime.value);
    elModal.classList.add("modal-wrap-inner-show");
    
    mainFunc(roadSymbol.slice(0, elFormLevel.value));
    titleFunc(roadSymbol.slice(0, elFormLevel.value));
    
    randomFunc();
    elForm.style.display = "none";
    elBtn.style.display = "none";
})

// MAIN FUNCTION 
function mainFunc(item) {
    elList.innerHTML = "";
    item.forEach(arrays => {
        let temClon = template.cloneNode(true);
        temClon.querySelector(".item").dataset.id = arrays.symbol_title;
        temClon.querySelector(".item").style.backgroundImage = `url(${arrays.symbol_img})`;
        temClon.querySelector(".item").style.backgroundRepeat = "no-repeat";
        temClon.querySelector(".item").style.backgroundPosition = "center";
        temClon.querySelector(".item").style.backgroundSize = "contain";
        fragmentItem.appendChild(temClon)
    });
    elList.appendChild(fragmentItem);
}

elBtnReset.addEventListener("click" , ()=>{
    window.location.reload();
})

elBtnWelcome.addEventListener("click", ()=>{
    elModalWelcome.classList.add("modal-welcome-show");
})
let randomChange = 5;
let randomPoints = 0;

elList.addEventListener("click", (evt) =>{
    if(evt.target.matches(".item")){
        let signsId = evt.target.dataset.id;
        let signFind = roadSymbol.find((itm) => itm.symbol_title == signsId);
        let signIndex = titleArray.indexOf(signFind.symbol_title);
        
        if(signFind.symbol_title == elTextTitle.textContent){
            evt.target.style.pointerEvents = "none";
            evt.target.style.backgroundColor = "green";
            let audio = new Audio("./audios/audios.mp3");
            audio.play()
            
            setTimeout(() => {
                evt.target.style.opacity = "0";
            }, 1500);
            randomPoints+=2
            elScore.textContent = `Score : ${randomPoints}`
            titleArray.splice(signIndex, 1);
            randomFunc()
            
            evt.target.querySelector(".img-checked").style.display = "block";
            evt.target.querySelector(".img-error").style.display = "none";
            
        }else{
            randomChange--
            elEttamps.textContent = `Attempts :  ${randomChange}`;
            randomPoints--
            elScore.textContent = `Score : ${randomPoints}`;
            
            let audio = new Audio("./audios/erors.mp3");
            audio.play()
            
            evt.target.style.backgroundColor = "red";
            setTimeout(() => {
                evt.target.style.backgroundColor = "";
            }, 1000);

            evt.target.classList.add("item-show-anim");
            setTimeout(() => {
                evt.target.classList.remove("item-show-anim");
            }, 1000);
            
            evt.target.querySelector(".img-checked").style.display = "none";
            evt.target.querySelector(".img-error").style.display = "block";
            setTimeout(() => {
                evt.target.querySelector(".img-error").style.display = "none";
            }, 1000);
        }
        if(titleArray.length == 0){
            elModalGameOverText.src = `./images/win.png`;
            elModalGameOver.classList.add("modal-game-over-show");
            elModal.classList.add("d-none");
            elTextPoints.textContent = `Score : ${randomPoints}`;
            elScoreText.textContent = `Attempts :  ${randomChange}`
        }
        if(randomChange == 0){
            elModalGameOver.classList.add("modal-game-over-show");
            elModal.classList.add("d-none");
            elTextPoints.textContent = `Score : ${randomPoints}`;
            elScoreText.textContent = `Attempts :  ${randomChange}`
            
        }
    }
})