// varebals
const elSelect = document.querySelector(".site-select");
const elBtn = document.querySelector(".movies-btn");

// MODAL
const elModal = document.querySelector(".modal");
const modalTitle = elModal.querySelector(".modal-title");
const modalImgList = elModal.querySelector(".modal-img-list");
const modalQuestion = elModal.querySelector(".modal-question"); 

// ramdom variables
const randonNum = Math.floor(Math.random() * 80);

const easyRules = roadSymbols.slice(randonNum, randonNum + 12);
const mediumRules = roadSymbols.slice(randonNum, randonNum + 16);
const hardRules = roadSymbols.slice(randonNum, randonNum + 20);

const easyQuestionNum = Math.floor(Math.random() * 12);
const mediumQuestionNum = Math.floor(Math.random() * 16);
const hardQuestionNum = Math.floor(Math.random() * 20);

function renderModal(arr){
  modalImgList.innerHTML = ""
  const elModalTemplate = document.querySelector(".modal-temp").content;
  const modalFragment = document.createDocumentFragment();
  const renderArr = arr.forEach((item, index) => {
    const elCloneModal = elModalTemplate.cloneNode(true);
    
    elCloneModal.querySelector(".modal-item").classList.add("mb-2" , "rounded-3")
    elCloneModal.querySelector(".modal-img").dataset.id = item.id;
    elCloneModal.querySelector(".modal-item").classList.add("modal-item");
    elCloneModal.querySelector(".modal-img").src = item.symbol_img;
    elCloneModal.querySelector(".modal-img").classList.add("modal-img")      
    
    
    modalFragment.appendChild(elCloneModal)
  });
  modalImgList.appendChild(modalFragment);
  return renderArr;
}

function findItem(arr) {
  
  modalImgList.addEventListener("click", function(evt){
    if(evt.target.matches(".modal-img")){
      
      const findBtnId = Number(evt.target.dataset.id);
      console.log(findBtnId);
      console.log(roadSymbols[findBtnId].symbol_title)
      if (roadSymbols[findBtnId].symbol_title == modalQuestion.textContent) {
        arr.forEach(item => {
          if (item.id == findBtnId) {
            
            
            // modalImgList.classList.add("cheked-item");
          }
        })
        // arr[findBtnId].classList.add("modal-item-chek");
      }
    }
  });
}


elBtn.addEventListener("click", function(){
  if (elSelect.value == "easy") {
    renderModal(easyRules);
    
    modalQuestion.textContent = easyRules[easyQuestionNum].symbol_title;
    findItem(easyRules);
  }
  if (elSelect.value == "medium") {
    renderModal(mediumRules);
    modalQuestion.textContent = mediumRules[mediumQuestionNum].symbol_title;
    findItem(mediumRules);
    
  }
  if (elSelect.value == "hard") {
    renderModal(hardRules);
    modalQuestion.textContent = hardRules[hardQuestionNum].symbol_title;
    findItem(hardRules)
    
  }
})


