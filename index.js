document.getElementById("input").addEventListener('input', Convertcheck);
let functionCheck = ConvertAsciiToBinary
function Convertcheck() {
    var input = document.getElementById("input").value
    functionCheck(input)
}

function Switch() {
    if (functionCheck == ConvertAsciiToBinary) {
        functionCheck = ConvertBinaryToAscii
        document.getElementById("heading").innerHTML = "Binary to Ascii converter"
        document.getElementById("input").placeholder = "Enter Binary text here..."
        document.getElementById("output").placeholder = "Ascii output will appear here..."
    }   else {
        functionCheck = ConvertAsciiToBinary
        document.getElementById("heading").innerHTML = "Ascii to Binary converter"
        document.getElementById("input").placeholder = "Enter ASCII text here..."
        document.getElementById("output").placeholder = "Binary output will appear here..."
    }
    let inputval = document.getElementById("input").value
    let outputval = document.getElementById("output").value
    document.getElementById("input").value = outputval
    document.getElementById("output").value = inputval
}
function ConvertAsciiToBinary(ascii) {
    var binary = toBinary(ascii);
    document.getElementById("output").value = binary;
}
function ConvertBinaryToAscii(binary) {
    var ascii = binaryToText(binary);
    document.getElementById("output").value = ascii;
}
function toBinary(ascii) {
    return ascii.split('').map((char) => char.charCodeAt(0).toString(2)).join(' ')
}

function binaryToText(binary) {
  return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('')
}