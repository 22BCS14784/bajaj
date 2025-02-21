let responseData = null; // Stores processed data

function processData() {
    const input = document.getElementById("jsonInput").value;
    const errorEl = document.getElementById("error");
    const resultEl = document.getElementById("result");

    // Clear previous error and result
    errorEl.innerText = "";
    resultEl.innerHTML = "";

    try {
        const parsedInput = JSON.parse(input);
        if (!Array.isArray(parsedInput.data)) {
            throw new Error("Invalid format. Expected { \"data\": [..] }");
        }

        // Extract numbers and alphabets
        const numbers = parsedInput.data.filter(item => !isNaN(item));
        const alphabets = parsedInput.data.filter(item => /^[a-zA-Z]$/.test(item));
        const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

        // Store result
        responseData = { numbers, alphabets, highest_alphabet };
        showFilteredData();
    } catch (error) {
        errorEl.innerText = "Invalid JSON format.";
    }
}

function toggleFilter(type) {
    showFilteredData();
}

function showFilteredData() {
    if (!responseData) return;

    const resultEl = document.getElementById("result");
    resultEl.innerHTML = "";

    const filters = document.querySelectorAll("#filters input:checked");
    filters.forEach(filter => {
        const key = filter.parentNode.innerText.toLowerCase().replace(" ", "_");
        if (responseData[key] && responseData[key].length > 0) {
            resultEl.innerHTML += `<p>${key}: ${JSON.stringify(responseData[key])}</p>`;
        }
    });
}
