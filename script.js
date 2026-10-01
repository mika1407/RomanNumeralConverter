const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputEl = document.getElementById("output");
const outputBox = document.getElementById("output-box");
const presetBtns = document.querySelectorAll(".preset-btn");

// Roman Numeral lookup table in descending order
const romanLookup = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
];

const convertToRoman = (num) => {
    let result = '';
    let n = num;
    for (const [roman, value] of romanLookup) {
        while (n >= value) {
            result += roman;
            n -= value;
        }
    }
    return result;
};

const handleConversion = () => {
    const rawValue = numberInput.value.trim();

    // Requirement: Empty input check
    if (rawValue === "") {
        showError("Please enter a valid number");
        return;
    }

    const num = parseInt(rawValue, 10);

    // Requirement: Check lower bound (< 1)
    if (num < 1) {
        showError("Please enter a number greater than or equal to 1");
        return;
    }

    // Requirement: Check upper bound (>= 4000)
    if (num >= 4000) {
        showError("Please enter a number less than or equal to 3999");
        return;
    }

    // Successful conversion
    const romanNumeral = convertToRoman(num);
    showSuccess(romanNumeral);
};

const showError = (message) => {
    outputBox.className = "output-box error";
    outputEl.textContent = message;
};

const showSuccess = (romanText) => {
    outputBox.className = "output-box success";
    outputEl.textContent = romanText;
};

convertBtn.addEventListener("click", handleConversion);

numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleConversion();
    }
});

// Preset button handlers
presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-val");
        numberInput.value = val;
        handleConversion();
    });
});