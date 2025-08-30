document.getElementById("input").addEventListener('input', Convertcheck);

window.onload = function() {
    var savedInput = localStorage.getItem("input");
    var savedOutput = localStorage.getItem("output");
    var switchState = localStorage.getItem("switch");

    document.getElementById("input").value = savedInput;
    document.getElementById("output").value = savedOutput;
    if (switchState == ConvertBinaryToAscii) {
        Switch();
    }

}

let functionCheck = ConvertAsciiToBinary
function Convertcheck() {
    var input = document.getElementById("input").value
    functionCheck(input)
    Charsetcheck()
}

function Switch() {
    if (functionCheck == ConvertAsciiToBinary) {
        functionCheck = ConvertBinaryToAscii
        document.getElementById("heading").innerHTML = "Binary to Ascii converter"
        document.getElementById("input").placeholder = "Enter Binary text here..."
        document.getElementById("output").placeholder = "Ascii output will appear here..."
        localStorage.setItem("switch", functionCheck)
    }   else {
        functionCheck = ConvertAsciiToBinary
        document.getElementById("heading").innerHTML = "Ascii to Binary converter"
        document.getElementById("input").placeholder = "Enter ASCII text here..."
        document.getElementById("output").placeholder = "Binary output will appear here..."
        localStorage.setItem("switch", functionCheck)
    }
    let inputval = document.getElementById("input").value
    let outputval = document.getElementById("output").value
    document.getElementById("input").value = outputval
    document.getElementById("output").value = inputval
}

function ConvertAsciiToBinary(ascii) {
    var binary = toBinary(ascii);
    document.getElementById("output").value = binary;
    localStorage.setItem("input", ascii);
    localStorage.setItem("output", binary);
}

function ConvertBinaryToAscii(binary) {
    if (binary.trim().length == 0) {
        document.getElementById("output").value = "";
        return;
    }
    var ascii = binaryToText(binary);
    document.getElementById("output").value = ascii;
    localStorage.setItem("input", binary);
    localStorage.setItem("output", ascii);
}

function toBinary(ascii) {
    return ascii.split('').map((char) => char.charCodeAt(0).toString(2)).join(' ')
}

function binaryToText(binary) {
  return binary.split(' ').filter(bin => bin.trim() !== '').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}

function Charsetcheck() {
    var inputbox = document.getElementById("input");
    var char = inputbox.value.charAt(inputbox.value.length - 1);
    if (functionCheck == ConvertAsciiToBinary) {return}
    if (functionCheck == ConvertBinaryToAscii) { 
        if (!/^[01 ]*$/.test(char))
    {
            inputbox.value = inputbox.value.slice(0, -1);
            inputbox.classList.add("error");
            outputval = document.getElementById("output").value
            document.getElementById("output").value = "Invalid character detected! Only 0 , 1 and spaces are allowed.";
            setTimeout(() => {
                inputbox.classList.remove("error");
                document.getElementById("output").value = outputval;
            }, 1000);
        }
    }
}