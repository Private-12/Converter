var inputstate;
var outputstate;
var inputbox;
var outputbox;
var select1;
var select2;
var ascii = "Ascii";
var binary = "Binary";
var hexadecimal = "Hexadecimal";
var decimal = "Decimal";

window.onload = function() {
    inputstate = ascii;
    outputstate = binary;
    select1 = document.getElementById("language");
    select2 = document.getElementById("language2");
    inputbox = document.getElementById("input");
    outputbox = document.getElementById("output");
    document.getElementById("input").addEventListener('input', converter);
}

function changeLanguage(lang) {
    inputstate = lang;
    document.getElementById("lang1").innerText = lang;
    inputbox = document.getElementById("input");
    inputbox.placeholder = "Enter " + lang + " text here";
    document.title = lang + " to " + outputstate + " Converter";
    swap()
    converter()
    swap()
}
function changeLanguage2(lang) {
    outputstate = lang;
    document.getElementById("lang2").innerText = lang;
    outputbox = document.getElementById("output");
    outputbox.placeholder = lang + " Output will appear here";
    document.title = inputstate + " to " + lang + " Converter";
    converter()
}
function converter() {
    outputbox.value = convertfromdecimal(converttodecimal());
    checklastchar();
}

function converttodecimal() {
    if (!inputbox.value) return [];
    let arr = [];
    if (inputstate == ascii) {
        for (let i = 0; i < inputbox.value.length; i++) {
            arr.push(inputbox.value.charCodeAt(i));
        }
    }
    else if (inputstate == binary) {
        let chunks = inputbox.value.trim().split(/\s+/);
        for (let chunk of chunks) {
            if (chunk) arr.push(parseInt(chunk, 2));
        }
    }
    else if (inputstate == hexadecimal) {
        let chunks = inputbox.value.trim().split(/\s+/);
        for (let chunk of chunks) {
            if (chunk) arr.push(parseInt(chunk, 16));
        }
    }
    else if (inputstate == decimal) {
        let chunks = inputbox.value.trim().split(/\s+/);
        for (let chunk of chunks) {
        if (chunk) arr.push(parseInt(chunk, 10));
        }
    }
    return arr;
}

function convertfromdecimal(arr) {
    if (!arr || arr.length === 0) return "";
    if (outputstate == ascii) {
        return arr.map(num => isNaN(num) ? "" : String.fromCharCode(num)).join('');
    }
    else if (outputstate == binary) {
        return arr.map(num => isNaN(num) ? "" : (num >>> 0).toString(2)).join(' ');
    }
    else if (outputstate == hexadecimal) {
        return arr.map(num => isNaN(num) ? "" : (num >>> 0).toString(16)).join(' ');
    }
    else if (outputstate == decimal) {
        return arr.join(' ');
    }
}

function checklastchar() {
    var val = inputbox.value;
    var outputval = outputbox.value;
    if (inputstate == binary) {
        if (!/^[01 ]*$/.test(val)) {
            inputbox.value = val.replace(/[^01 ]/g, '');
            inputbox.classList.add("error");
            document.getElementById("output").value = "Invalid character detected! Only 0, 1 and spaces are allowed.";
            setTimeout(() => {
                inputbox.classList.remove("error");
                document.getElementById("output").value = outputval;
            }, 1000);
        }
    }
    if (inputstate == "Decimal") {
        if (!/^[0-9 ]*$/.test(val)) {
            inputbox.value = val.replace(/[^0-9 ]/g, '');
            inputbox.classList.add("error");
            document.getElementById("output").value = "Invalid character detected! Only 0-9 and spaces are allowed.";
            setTimeout(() => {
                inputbox.classList.remove("error");
                document.getElementById("output").value = outputval;
            }, 1000);
        }
    }
    if (inputstate == hexadecimal) {
        if (!/^[0-9a-fA-F ]*$/.test(val)) {
            inputbox.value = val.replace(/[^0-9a-fA-F ]/g, '');
            inputbox.classList.add("error");
            document.getElementById("output").value = "Invalid character detected! Only 0-9, A-F and spaces are allowed.";
            setTimeout(() => {
                inputbox.classList.remove("error");
                document.getElementById("output").value = outputval;
            }, 1000);
        }
    }
}

function swap() {
    var input = inputbox.value;
    var output = outputbox.value;
    var inputstatetemp = inputstate;
    var outputstatetemp = outputstate;
    var selected1 = select1.value;
    var selected2 = select2.value;

    document.title = outputstatetemp + " to " + inputstatetemp + " Converter";
    select1.value = selected2;
    select2.value = selected1;
    inputbox.placeholder = "Enter " + outputstatetemp + " text here";
    outputbox.placeholder = inputstatetemp + " Output will appear here";
    document.getElementById("lang1").innerText = outputstatetemp;
    document.getElementById("lang2").innerText = inputstatetemp;
    inputstate = outputstatetemp;
    outputstate = inputstatetemp;
    inputbox.value = output;
    outputbox.value = input;
}
