// Get ⚡ All Levels
// part-1 dynamic button gulo webpage e dekhano holo
function loadLevel(){
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displayLevel(data.data))
}
loadLevel()

function displayLevel(datas){
    //console.log(datas)
    const levelContainer = document.getElementById("level-container");
    for(let dt of datas){
        //console.log(dt.level_no)
        const div = document.createElement("div");
        div.innerHTML = `
            <button id="btn-${dt.level_no}" onclick="loadLevelCard(${dt.level_no})" class="click-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson-${dt.level_no}</button>
        `
        levelContainer.appendChild(div);
    }
}

// part- shob gulo card dekhabe...
function loadCard(){
    fetch("https://openapi.programming-hero.com/api/level/5")
    .then(res => res.json())
    .then(data => displayCard(data.data))
}
//loadCard()

// part-2 sei button er upor click korle bivinno card dekhano holo
const loadLevelCard = (levelNo) => {
    //console.log(levelNo);
    showLoader();
    const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;
    //console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // remove active button call kora holo..
            removeActiveClass();
            
            // click kora btn dhorar jonne
            const clickedButton = document.getElementById(`btn-${levelNo}`);
            clickedButton.classList.add("active");
            
            //console.log(clickedButton);

            // level wise data pass
            displayCard(data.data);
        })
}

function displayCard(datas){
    //console.log(datas[0].level)
    const cardContainer = document.getElementById("card-container");
    
    cardContainer.innerHTML = "";

    //console.log(datas.length)
    //select korar por kono information na pele...
    if(datas.length == 0){
        cardContainer.innerHTML = `
            <div class="col-span-full  text-center py-16 bg-[#F8F8F8] rounded-3xl">
                <div class="flex justify-center">
                    <img class="mb-4" src="assets/alert-error.png" alt="">
                </div>
                <p class="hind-siliguri text-sm text-[#79716B] mb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয় নি ।</p>
                <h2 class="hind-siliguri sm:text-4xl text-2xl font-medium text-[#292524]">নেক্সট Lesson এ যান</h2>
            </div>
        `
        hideLoader();
        return;
    }

    for(let dt of datas){
        //console.log(dt.word)
        //let p = dt.word;
        //console.log(p)
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="p-10 text-center bg-white rounded-xl inter shadow hover:bg-sky-50">
                        <h2 class="font-bold text-2xl">${dt.word}</h2>
                        <p class="py-3 font-medium text-xl">Meaning /Pronounciation</p>
                        <h2 class="hind-siliguri font-semibold text-xl text-[#18181B]">"${dt.meaning != null ? `${dt.meaning}` : `অর্থ নেই`} / ${dt.pronunciation}"</h2>
                        <div class="mt-10 flex justify-between items-center">
                            <button onclick="loadCardDetails(${dt.id})" class="btn bg-[#1A91FF10] border-none"><i class="fa-solid fa-circle-info"></i></button>
                            <button onclick="pronounceWord(${dt.word})" class="btn bg-[#1A91FF10] border-none"><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
        `
        cardContainer.appendChild(div);
        hideLoader();
    }
}

// part-3 ek button theke onno button e click korle ager button er active color remove korar jonne...
function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active");

    for(let btn of activeButtons){
        btn.classList.remove("active");
    }
    //console.log(activeButtons);
}

// part-4 card er moddhe details dekhar jonne
function loadCardDetails(cardId){
    //console.log(cardId);
    showLoader();
    const url = `https://openapi.programming-hero.com/api/word/${cardId}`;

    fetch(url)
    .then(res => res.json())
        .then(data => displayCardDetails(data.data))
}

function displayCardDetails(details){
    document.getElementById("card_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
        <div class="p-6 border border-[#EDF7FF] rounded-xl mb-6">
                    <h1 class="poppins font-semibold text-2xl mb-5">${details.word} (<i class="fa-solid fa-volume-low"></i> :${details.pronunciation})</h1>
                    <h2 class="poppins font-semibold text-xl mb-1">Meaning</h2>
                    <h2 class="hind-siliguri font-medium text-xl mb-5">${details.meaning != null ? `${details.meaning}` : `অর্থ পাওয়া যায়নি`}</h2>
                    <h2 class="poppins font-semibold text-xl mb-1">Example</h2>
                    <p class="poppins text-xl mb-5">${details.sentence}</p>
                    <h2 class="hind-siliguri font-medium text-xl mb-1">সমার্থক শব্দ গুলো</h2>
                    
                    ${details.synonyms.length != 0 ? `<div class="flex gap-5 opacity-80 poppins text-xl ">
                        <button class="btn hover:bg-white bg-[#EDF7FF]">${details.synonyms[0]}</button>
                        <button class="btn hover:bg-white bg-[#EDF7FF]">${details.synonyms[1]}</button>
                        <button class="btn hover:bg-white bg-[#EDF7FF]">${details.synonyms[2]}</button>
                        </div>` : ``}
                    
                </div>
    `
    hideLoader();

}



// challenge part start
// banner section bade baki shob hide thakbe..

document.getElementById("hide-header").style.display = "none";
document.getElementById("hide-main").style.display = "none";
document.getElementById("login").addEventListener("click",
    function (event){
        event.preventDefault();
        const name = document.getElementById("name").value;
        const pass = document.getElementById("pass").value;
        //console.log(pass)
        if(name == false){
            pronounceWord("Please, Enter Your Name");
            alert("Please Tell use your Name first");
        }
        else if(pass == 123456){
            //console.log(pass)
            pronounceWord("You are Welcome !");
            document.getElementById("hide-banner").style.display = "none";
            document.getElementById("hide-header").style.display = "block";
            document.getElementById("hide-main").style.display = "block";
            //alert("Login Successfull !!!")

            // sweet alert....
            Swal.fire({
                width: "350px",
                title: "অভিনন্দন",
                text: "চলুন আজ নতুন কিছু শেখা যাক",
                icon: "success",
                confirmButtonText: "OK"
            })
            

        }
        else{
            pronounceWord("Your Password is wrong. Please, Enter Your right password");
            alert("Wrong Password. Contact admin to get your Login Code");
        }
    }
)

document.getElementById("logout-1").addEventListener("click",
    function (event) {
        event.preventDefault();
        pronounceWord("Logout Successfully. thank you. please, come again");
        document.getElementById("hide-banner").style.display = "flex";
        document.getElementById("hide-header").style.display = "none";
        document.getElementById("hide-main").style.display = "none";

        //console.log(pass)

    }
)

document.getElementById("logout-2").addEventListener("click",
    function (event) {
        event.preventDefault();
        pronounceWord("Logout Successfully. thank you. please, come again");
        document.getElementById("hide-banner").style.display = "flex";
        document.getElementById("hide-header").style.display = "none";
        document.getElementById("hide-main").style.display = "none";

        //console.log(pass)

    }
)


// loading preccess dekhano..
const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
}

const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("card-container").classList.remove("hidden");
}


// pronunciation
function pronounceWord(word) {
    console.log(word);
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
}

// function pronounceWord(word) {
//     if ('speechSynthesis' in window) {
//         const utterance = new SpeechSynthesisUtterance(word);
//         utterance.lang = 'en-US';
//         window.speechSynthesis.speak(utterance);
//     } else {
//         console.error('Speech Synthesis API is not supported in this browser.');
//     }
// }