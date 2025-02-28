document.getElementById("generate").addEventListener("click", function() {
    const length = document.getElementById("length").value;
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/";
    let allChars = "";
    if (useUppercase) allChars += uppercase;
    if (useLowercase) allChars += lowercase;
    if (useNumbers) allChars += numbers;
    if (useSymbols) allChars += symbols;
    let password = "";
    for (let i = 0; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    document.getElementById("password").value = password;
    document.addEventListener('DOMContentLoaded', (event) => {
        const lengthInput = document.getElementById('length');
        const lengthValue = document.getElementById('lengthValue');
    
        lengthInput.addEventListener('input', () => {
            lengthValue.textContent = lengthInput.value;
        });
    });
});