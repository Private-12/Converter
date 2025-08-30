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
var octal = "Octal";

window.onload = function() {
    if (localStorage.getItem("inputstate")) {
        inputstate = localStorage.getItem("inputstate");
        document.getElementById("lang1").innerText = inputstate;
        document.getElementById("input").placeholder = "Enter " + inputstate + " text here";

    } else {
        inputstate = ascii;
    }
    if (localStorage.getItem("outputstate")) {
        outputstate = localStorage.getItem("outputstate");
        document.getElementById("lang2").innerText = outputstate;
        document.getElementById("output").placeholder = outputstate + " Output will appear here";
    }   else {
        outputstate = binary;
    }
    select1 = document.getElementById("language");
    select2 = document.getElementById("language2");
    inputbox = document.getElementById("input");
    outputbox = document.getElementById("output");
    document.getElementById("input").addEventListener('input', converter);
    document.title = inputstate + " to " + outputstate + " Converter";
    if (localStorage.getItem("selected1")) {
        select1.value = localStorage.getItem("selected1");
    }
    if (localStorage.getItem("selected2")) {
        select2.value = localStorage.getItem("selected2");
    }
    if (localStorage.getItem("input")) {
        inputbox.value = localStorage.getItem("input");
    }
    if (localStorage.getItem("output")) {
        outputbox.value = localStorage.getItem("output");
    }
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
    localStorage.setItem("inputstate", inputstate);
    localStorage.setItem("selected1", select1.value);
}
function changeLanguage2(lang) {
    outputstate = lang;
    document.getElementById("lang2").innerText = lang;
    outputbox = document.getElementById("output");
    outputbox.placeholder = lang + " Output will appear here";
    document.title = inputstate + " to " + lang + " Converter";
    converter()
    localStorage.setItem("outputstate", outputstate);
    localStorage.setItem("selected2", select2.value);
}
function converter() {
    outputbox.value = convertfromdecimal(converttodecimal());
    localStorage.setItem("input", inputbox.value);
    localStorage.setItem("output", outputbox.value);
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
    else if (inputstate == octal) {
        let chunks = inputbox.value.trim().split(/\s+/);
        for (let chunk of chunks) {
        if (chunk) arr.push(parseInt(chunk, 8));
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
    else if (outputstate == octal) {
        return arr.map(num => isNaN(num) ? "" : (num >>> 0).toString(8)).join(' ');
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
    if (inputstate == octal) {
        if (!/^[0-7 ]*$/.test(val)) {
            inputbox.value = val.replace(/[^0-7 ]/g, '');
            inputbox.classList.add("error");
            document.getElementById("output").value = "Invalid character detected! Only 0-7 and spaces are allowed.";
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

    localStorage.setItem("inputstate", outputstatetemp);
    localStorage.setItem("outputstate", inputstatetemp);
    localStorage.setItem("input", output);
    localStorage.setItem("output", input);
    localStorage.setItem("selected1", selected2);
    localStorage.setItem("selected2", selected1);

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
