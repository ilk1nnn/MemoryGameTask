

function getRandom(max) {
    return Math.floor(Math.random() * max);
}


const flipcard = [
    { transform: "rotateY(0)" },
    { transform: "rotateY(180deg)" },
    { backgroundColor: 'red' }
];



const flipcardTiming = {
    duration: 1000,
    iterations: 1
};


function FlipCardFunc(element, time, deg = "180deg", bg = "red") {
    setTimeout(() => {
        
        element.animate(flipcard, flipcardTiming);
        element.style.transform = `rotateY(${deg})`
        element.style.backgroundColor = '#f4c531'
        element.style.backfaceVisibility = 'visible';
        element.style.color = bg;
        element.style.transformStyle = '3d';
        let child = element.firstChild
        child.style.display = 'none'
    }, time);
}

function getNumbersWithRandom() {
    let myConstantList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
    let myRandomIndexList = [];
    let myRandomList = [];
    for (let i = 0; i < myConstantList.length; i++) {
        let random = getRandom(16);
        if (!myRandomIndexList.includes(random)) {
            myRandomIndexList[i] = random
        }
        else {
            i--;
        }
        
    }

    for (let i = 0; i < myRandomIndexList.length; i++) {
        myRandomList[i] = myConstantList[myRandomIndexList[i]]
    }
    return myRandomList;
}


function FillArea() {
    let randomList = getNumbersWithRandom();
    let index = 0
    let imagesList = []
    for (let i = 0; i < 9; i++) {
        imagesList.push(`<img src='images/${i}.png'></img>`)
    }
    for (let i = 0; i < 4; i++) {
        
        for (let k = 0; k < 4; k++) {
            let element = document.getElementById(`${i + 1}${k + 1}`)
            element.style.objectFit = "scale-down"
            
            element.innerHTML = imagesList[randomList[index]]
            
            index++;
        }
    }
    
    for (let i = 0; i < 4; i++) {
        
        for (let k = 0; k < 4; k++) {
            let element = document.getElementById(`${i + 1}${k + 1}`)
            FlipCardFunc(element, 4000);
        }
    }
    
}



function CheckIfImagesAreEqual(first, second) {
    let img1Id = String(first.innerHTML).split("/")[1]
    let img2Id = String(second.innerHTML).split("/")[1]
    console.log(img1Id)
    console.log(img2Id)
    if (img1Id[0] == img2Id[0]) {
        console.log("true")
        return true
    }
}
var current_num1;
var current_num2;

function ClickingCard(id) {
    let element = document.getElementById(id);
    element.style.transform = 'rotateY(0)'
    element.style.backgroundColor = 'transparent'
    let child = element.firstChild
    child.style.display = 'inline'
    
    if (current_num2 != undefined) {
        current_num1 = undefined
        current_num2 = undefined
        current_num1 = element
    }
    else if (current_num1 == undefined) {
        console.log("Current num 1")
        current_num1 = element
    }
    else if (current_num1 != undefined) {
        
        if (CheckIfImagesAreEqual(current_num1, element)) {
            element.onclick = "";
            current_num1.onclick = "";
            element.style.backgroundColor = "green"
            current_num1.style.backgroundColor = "green"
            
            current_num1 = undefined
            current_num2 = undefined
            return
        }
        else {
            setTimeout(() => {
                FlipCardFunc(current_num1, 1)
                FlipCardFunc(element, 1)
                console.log("wrong-------------")
                current_num1 = undefined
                current_num2 = undefined
                return
            }, 1000);
            
            
        }
    }
    
}

function Game() {
    let mytable = document.getElementById("myTable");
    let content = "";
    let id = 1;
    let numbers = [];
    let counter = 0
    for (let i = 0; i < 4; i++) {
        content += "<tr>";
        for (let k = 0; k < 4; k++) {
            let buffer = getRandom(10);
            numbers.push(buffer);

            content += `
            <td id='${i + 1}${k + 1}' onclick='ClickingCard(id)'>
            <br>
            </td>
            `;
            ++id;
            ++counter;
        }
        content += "</tr>";
    }
    mytable.innerHTML = content;
    FillArea()
}



Game()