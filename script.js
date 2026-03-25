const words=[
"apple","bridge","candle","desert","eagle","forest","galaxy","hammer","island","jacket",
"kettle","ladder","mirror","notebook","ocean","pencil","quartz","rocket","shadow","tunnel",
"umbrella","velvet","window","xylophone","yellow","zipper","anchor","blossom","crystal","dolphin",
"ember","feather","glacier","horizon","ivory","jungle","kingdom","lantern","marble","nectar",
"orbit","prism","quarry","ripple","summit","thunder","unity","vortex","whisper","zenith",
"arcade","beacon","canyon","drift","emberlight","flare","granite","harbor","insight","journey",
"keystone","legacy","meadow","nebula","oasis","phoenix","quest","radiant","skyline","torrent",
"utopia","venture","willow","xenon","yonder","zephyr","alchemy","breeze","cascade","destiny",
"echo","fragment","glow","haven","illusion","jewel","kinetic","lucid","mosaic","nexus",
"opal","pulse","quantum","realm","spark","tide","uplift","vivid","wave","yearn","zest",
"alloy","bloom","circuit","dawn","emberfall","frost","gleam","harboring","ignite","junction",
"kindle","lumen","magnet","north","origin","particle","quiver","resonance","solar","tempo",
"unitycore","vector","wander","xenial","yield","zen","apex","binary","cobalt","delta",
"element","flux","grid","halo","impulse","jolt","kernel","layer","matrix","node",
"optic","phase","query","ratio","signal","trace","unit","value","width","axis",
"byte","code","data","edge","frame","graph","hash","index","java","key",
"logic","memory","network","object","pixel","queue","render","script","token","user",
"variable","web","xml","yaml","zip","array","block","cache","debug","engine",
"file","gateway","host","input","json","link","module","number","output","port",
"queryable","route","server","thread","upload","version","write","execute","zone",
"alpha","beta","gamma","deltaic","epsilon","theta","lambda","sigma","omega",
"vectorial","scalar","tensor","matrixed","orbiting","spiraled","fractured","polished",
"glowing","drifting","blazing","frozen","cracked","woven","twisted","carved",
"painted","sculpted","layered","shattered","blooming","fading","rising","falling",
"turning","shifting","glowingly","softly","harshly","quickly","slowly","brightly",
"dimly","boldly","calmly","wildly","neatly","roughly","sharply","smoothly",
"lightly","deeply","barely","fully","partly","mostly","rarely","often",
"always","never","sometimes","clearly","truly","deeplyset","highland","lowland",
"upland","downriver","upstream","midpoint","outskirts","downtown","inland",
"coastal","offshore","hillside","riverside","lakeside","seashore","countryside",
"farmland","woodland","grassland","wetland","dryland","borderland","heartland" ];

const textContainer=document.getElementById('text-container');
const timerElement=document.getElementById('timer')
const tryAgainButton =document.getElementById('try-again');
const finalScoreElement=document.getElementById('final-score')
let totalTyped ='';
let currentCharIndex = 0;
let errors = 0 ;
let longText = generateLongText()
let timeLeft = 60;
let timerInterval;
let typingStarted = false;

// textContainer.textContent=longText


//shuffle the words array
function shuffleArray(array){
    for(let i = array.length -1; i>0; i--) {
        const j =Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]]
    }
    return array;
}

 //combine shuffle words
 function  generateLongText(){
    const shuffledWords = shuffleArray([...words]);
    return shuffledWords.join(' ');
 }

 // start countdown timer
 function startTimer(){
    if(!typingStarted){
        typingStarted  = true;
        timerInterval = setInterval(() =>{
                timeLeft--
            timerElement.textContent = `Time left: ${timeLeft}s `
            if (timeLeft <= 0) {                                       
                clearInterval(timerInterval)
                endTest()
            }
        }, 1000)
    }
 }

 //end the test and display the final result
 function endTest(){
    timerElement.textContent = `Time's up!`
//    finalScoreElement.textContent = `Final WPN: `
 finalScoreElement.textContent = `Final WPM: ${calculateWPN()}`;  // ✅ score add kiya
    textContainer.style.display='none'
    tryAgainButton.style.display = 'block'
    calculateWPN()
}

//calculate word per min

function calculateWPN(){
    const wordsTyped = totalTyped.trim().split(/\s+/).length
    const baseWPN = Math.round((wordsTyped / 6)* 60)
    const adjustedWPN = Math.max(baseWPN - errors, 0)
    return adjustedWPN
}
 // handle typed over displayed text and scrolling
 document.addEventListener('keydown', (e)=> {
   startTimer()



    if (e.key === 'Backspace') {
        if (totalTyped.length>0){
            currentCharIndex = Math.max(currentCharIndex-1, 0);
            totalTyped=totalTyped.slice(0,-1)
        } 
    }else if(e.key.length===1 && !e.ctrlKey && !e.metaKey){

            totalTyped += e.key     
            currentCharIndex++  
        }
    //console.log('e.key',e.key, 'totalTyped',totalTyped, 'currentCharIndex', currentCharIndex);
    const textArray=longText.split('')
    //console.log(textArray)
    textContainer.innerText='';

    errors = 0;

    for ( let i = 0 ; i< textArray.length;i++) {
        const span = document.createElement('span')

        if(i<totalTyped.length)
            {
                if(totalTyped[i]===textArray[i]){
                    span.classList.add('correct')
                }else{
                     span.classList.add('error')
                     errors++
                }
            }
            span.textContent = textArray[i]
            textContainer.appendChild(span)
    }

    //scroll the container only after 20 characters
    if (totalTyped.length >=20){
        const scrollAmount = (totalTyped.length - 20)* 14
        textContainer.scrollLeft= scrollAmount
    }
 })
 function resetTest() {
    clearInterval(timerInterval)
    timeLeft = 60
    timerElement.textContent = `Time left: ${timeLeft}s `
    finalScoreElement.textContent = ''
    textContainer.style.display ='block'
    tryAgainButton.style.display = 'none'
    totalTyped = ''
    typingStarted = false
    currentCharIndex = 0
    errors = 0
    textContainer.scrollLeft = 0
    longText = generateLongText()
    init()

    
 }
 // initiate the test
 function init(){
    if(isMobileDevice()){
        showMobileMessage()
    }else{
        textContainer.innerText = longText
        timerElement.textContent = `Time left: ${timeLeft}s `
    }
   

 }
 // try again button listner
 tryAgainButton.addEventListener('click', resetTest)

 // detect the device is mobile

 function isMobileDevice(){
    return /Mobi|Andriod/i.test(navigator.userAgent) || window.innerWidth < 800
 }

 // show message for mobile user
 function showMobileMessage(){
    textContainer.textContent = 'This typing test is designed for desktop use only'
 }
 //startup
 init()