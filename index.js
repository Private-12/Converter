document.getElementById("input").addEventListener('input', ConvertAsciiToBinary);
function ConvertAsciiToBinary() {
    var ascii = document.getElementById("input").value;
    var binary = toBinary(ascii);
    document.getElementById("output").value = binary;
}
function toBinary(ascii) {
    return ascii.split('').map((char) => char.charCodeAt(0).toString(2)).join(' ')
}