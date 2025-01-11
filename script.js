const hintCheatTitle = document.getElementById('hint-cheat-title');
const allCheatHints = document.getElementById('all-cheat-hints');
const recentAskedTitle = document.getElementById('recent-asked-title');
const allRecentAsked = document.getElementById('all-recent-asked');
//const nbrOfRecentAskedDOM = document.getElementById('nbr-of-recent-asked');
let recentAskedStrings;
const historyPopMsg = document.getElementById('no-history');
const result = document.getElementById('result'); 
const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
// let nbrOfRecentAsked;
// nbrOfRecentAsked = 0;

const history = (askedString) => {
        if (!historyPopMsg.matches('.none')) {
            historyPopMsg.setAttribute('class','none');
        }
        // nbrOfRecentAsked+=1;
        let listItem = document.createElement('li');
        listItem.innerHTML = `<p class="theString">${askedString}</p><div class="BinEmoji">🗑️</div>`;
        listItem.setAttribute('class','single-recent-asked');
        allRecentAsked.append(listItem);
        recentAskedStrings = document.querySelectorAll('.single-recent-asked');
        // nbrOfRecentAskedDOM.innerText = nbrOfRecentAsked;
}
const checkIfPalindrome = (textInputted) => {
    let regex,textToChange,textToCompare,loop_1,loop_2;
    let reversed = [];
    loop_2 = 0;
    regex = /[^\/():?_\s!@#\$%\^&*\.,:;'"><~`\-\+\=\{\}\[\]\|\\]+/g;
    textToChange = textInputted.match(regex)?.join('') ?? 'Invalid Input';
    textToChange = textToChange.toLowerCase();
    textToCompare = textToChange;
    textToChange = [...textToChange];
    for (loop_1 = (textToChange.length-1); loop_1>=0; loop_1--) {
        while(loop_2<textToChange.length) {
            reversed[loop_2] = textToChange[loop_1];
            loop_2++;
            break;
        }
    }
    reversed = reversed.join('');
    regex = /[^,]+/g;
    reversed = reversed.match(regex);
    if (result.matches('.none')) {
        result.removeAttribute('class','none');
    }
    if (textToCompare == reversed) {
        result.innerText =`${textInputted} is a palindrome.`;
    }
    else {
        result.innerText =`${textInputted} is not a palindrome.`;
    }
    history(textInputted);
};

const checkInputValidity = (event) => {
    event.preventDefault();
    if (!textInput.value) {
        alert('Please input a value');
    }
    else {
        checkIfPalindrome(textInput.value);
        textInput.value = null;
    }
}
allRecentAsked.addEventListener('click',(e) => {
recentAskedStrings.forEach((listItem) => {
    listItem.addEventListener('click',(e) => {
        if (e.target.innerText === '🗑️') {                
            // if (nbrOfRecentAsked === 1) {
            //     historyPopMsg.removeAttribute('class','none');
            // }
            listItem.remove();
            //nbrOfRecentAsked --;
            //nbrOfRecentAskedDOM.innerText = nbrOfRecentAsked;
        }
        else {
            allRecentAsked.setAttribute('class','hidden');
            let innerText = e.target.innerText;
            let regex = /[^\s\🗑️]/g;
            checkIfPalindrome(innerText.match(regex).join(''));
        }
    })
}) 
});

checkBtn.addEventListener('click',checkInputValidity);
recentAskedTitle.addEventListener('click',() => {
    if(allRecentAsked.matches('.hidden')) { 
        allRecentAsked.removeAttribute('class','hidden') 
     }
     else {
        allRecentAsked.setAttribute('class','hidden'); 
     }
});
hintCheatTitle.addEventListener('click',() => {
        allCheatHints.matches('.hidden') ? allCheatHints.removeAttribute('class','hidden') : allCheatHints.setAttribute('class','hidden');
});