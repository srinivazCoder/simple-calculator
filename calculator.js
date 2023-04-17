const Btn = document.getElementsByClassName('btn');
const SignBtn = document.getElementsByClassName('signs');
const displayInput = document.getElementById("inputValue");
const totalSum = document.getElementById("total");
const histroy = document.getElementById("history");

let signArr = ["/", "×", "−", "+"];

function clearEntries() {
    displayInput.value = "";
    totalSum.style.display = 'none';
    document.getElementById('note').innerText="";
}

for (let i = 0; i < Btn.length; i++) {
    Btn[i].addEventListener("click", function () {
        displayInput.value += this.innerText;
    })
}
for (let j = 0; j < SignBtn.length; j++) {

    SignBtn[j].addEventListener("click", function () {



        if (displayInput.value !== "" && !signArr.includes(displayInput.value[displayInput.value.length - 1])) {
            displayInput.value += this.innerText;
        }


        // if (displayInput.value[displayInput.value.length - 1] !== ('×' || '−' || '+' || '/')) {
        //     displayInput.value += this.innerText;
        // }

    })
}

document.getElementById('equals').addEventListener('click', function () {
    document.getElementById('note').innerText="Results are calculating from left to right";
    let result = displayInput.value;

    let obj = {
        '+': ' + ',
        '×': ' × ',
        '−': ' − ',
        '/': ' / ',
    }

    let sy = "";
    for (let i = 0; i < result.length; i++) {
        if (obj[result[i]]) {
            sy += obj[result[i]];
        } else {
            sy += result[i];
        }
    }
    let splitArr = sy.split(" ");
    //    console.log(splitArr)
    //    if(splitArr[splitArr.length-1].includes('')){
    //               splitArr = splitArr.slice(0,splitArr.length-2);
    //    }

    //    console.log(splitArr)
    let total = parseInt(splitArr[0]);
    for (let j = 1; j < splitArr.length; j++) {
        if (splitArr[j] === "+") {
            total += parseInt(splitArr[j + 1]);
            j += 1;
        }
        else if (splitArr[j] === "−") {
            total -= parseInt(splitArr[j + 1]);
            j += 1;
        }
        else if (splitArr[j] === "×") {
            total *= parseInt(splitArr[j + 1]);
            j += 1;
        }
        else if (splitArr[j] === "/") {
            total /= parseInt(splitArr[j + 1]);
            j += 1;
        }
    }

    if (!isNaN(total)) {
        totalSum.innerText = `${'Total = '}` + total;
        totalSum.style.display = 'block';
        displayInput.value = "";

        const div = document.createElement('div');
        const li = document.createElement('li');

        div.classList.add('div_list')

        li.innerText = result + " = " + total;
        li.classList.add("li_histroy")

        const span = document.createElement('span');
        span.innerText = '✖';
        span.setAttribute('class', 'cancel_list');



        div.appendChild(li);
        div.appendChild(span);
        histroy.appendChild(div);

        let hisDel = document.getElementsByClassName('cancel_list');

        for (let i = 0; i < hisDel.length; i++) {
            hisDel[i].addEventListener("click", function () {
                this.parentElement.remove();
            })
        }

    }



    //    for histroy



});

document.getElementById('cancel').addEventListener('click', function () {
    displayInput.value = displayInput.value.slice(0, displayInput.value.length - 1);
    
});



