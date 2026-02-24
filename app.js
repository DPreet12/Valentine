const yesBtn = document.getElementById("yesBtn")
const noBtn = document.getElementById("noBtn")
const loveMessage = document.getElementById("loveMessage")
const heading = document.querySelector(".container h1")
const buttonContainer = document.querySelector(".button-container");
console.log("heading", heading)


let yesSize = 1;
let growing = true;

function growYesButton() {
    if (growing) {
        yesSize += 0.5;
        if (yesSize >= 7) growing = false;
    } else {
        yesSize -=0.7;
        if (yesSize <=1) growing = true
    }
    yesBtn.style.transform = `scale(${yesSize})`; 
    heading.style.marginBottom = `${yesSize * 40}px`
}



function noButtonPos(){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    console.log("screenwidth", screenWidth, "screenHeight", screenHeight)

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    console.log("btnWidth", btnWidth, "BtnHeight", btnHeight)

    const maxWidth = screenWidth - btnWidth;
    const maxHeight = screenHeight - btnHeight;
    console.log("max", maxWidth, "mHeight", maxHeight)

    let isOverlapping = true;
    let attempts = 0;
    while (isOverlapping && attempts <50) {
        
        const xNew = Math.random() * maxWidth;
        const yNew = Math.random() * maxHeight;
        
        noBtn.style.position = "fixed";
        noBtn.style.left = `${xNew}px`;
        noBtn.style.top = `${yNew}px`;
        noBtn.style.transform = "none";
        
        const noRect = noBtn.getBoundingClientRect();
        const yesRect = yesBtn.getBoundingClientRect();

        isOverlapping = 
        yesRect.left < noRect.right &&
        yesRect.right > noRect.left &&
        yesRect.top < noRect.bottom &&
        yesRect.bottom > noRect.top;

       attempts++
        }
        
       return {maxWidth, maxHeight};
    }
   

noBtn.addEventListener('click', () => {
    growYesButton();
    noButtonPos();
})

yesBtn.addEventListener('click', () => {
    heading.style.display = "none";
    buttonContainer.style.display = "none"
    loveMessage.classList.remove("hidden")
     confetti({
        particleCount: 150,     // Total bits of confetti
        spread: 70,             // How wide the burst is
        origin: { y: 0.6 },     // Height: 0 is top, 1 is bottom
        colors: ['#ff4d6d', '#ff758f', '#ffffff'], // Pink/Red/White palette
        ticks: 300,             // How long they stay on screen
        gravity: 1.2,           // How fast they fall (1 is normal)
        scalar: 1.2             // Size of the particles
    });
});