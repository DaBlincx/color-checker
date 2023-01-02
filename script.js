const button = document.getElementById('add-button');
const parent = document.querySelector('.parent');
const colorPicker = document.getElementById("color-picker");
const errorDisplay = document.getElementById("error-display");
const saveButton = document.getElementById("save-button");

button.addEventListener('click', () => {

    createChild();
});

function checkKey(e) {
    // Check if the Enter key was pressed
    if (e.key === "Enter") {
        // Do something here
        createChild();
    }
}

function showMSG(message) {
    errorDisplay.innerHTML = message;
    errorDisplay.style.display = "block";
    setTimeout(function () {
        errorDisplay.style.display = "none";
    }, 5000);
}

function createChild() {
    const useColor = getColor();
    if (useColor != null) {
        const html = `<div class="child" style="background-color: ${useColor};"><div class="child-text">${useColor}</div></div>`;

        parent.insertAdjacentHTML('beforeend', html);

        const children = document.querySelectorAll('.child');
        const numChildren = children.length;

        if (numChildren === 1) {
            parent.style.gridTemplateColumns = '1fr';
            parent.style.gridTemplateRows = '1fr';
        } else {
            const columns = Math.ceil(Math.sqrt(numChildren));
            const rows = Math.ceil(numChildren / columns);
            parent.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            parent.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        }
        colorPicker.value = "";
        errorDisplay.style.display = "none";
    } else {
        showMSG("Invalid hex code.");
    }
}

function getColor() {

    // Get the value of the input field
    var color = colorPicker.value;

    // Validate and format the input value as a hex string
    var hex = toHex(color);
    return hex
}

function toHex(color) {
    // Check if the input value is a 3- or 6-digit hex string
    if (/^#[0-9A-F]{3}$/i.test(color) || /^#[0-9A-F]{6}$/i.test(color)) {
        return color;
    }

    // If the input value is not a valid hex string, return an empty string
    return null;
}

function saveScheme() {
    // shoud save the color values of the .child elements to a json file and download it
    var children = document.querySelectorAll('.child');
    var colors = [];
    for (var i = 0; i < children.length; i++) {
        colors.push(rgbToHex(children[i].style.backgroundColor));
    }
    var json = JSON.stringify(colors);
    download("scheme.json", json);
}

function download(filename, content) {
    const file = new Blob([content], {
        type: 'text/plain'
    });
    saveAs(file, filename);
}

function rgbToHex(rgb) {
    // Extract the RGB values from the string
    var values = rgb.match(/\d+/g);

    // Convert the RGB values to hexadecimal format
    var hex = "#";
    for (var i = 0; i < 3; i++) {
        var value = values[i];
        hex += ("0" + parseInt(value).toString(16)).slice(-2);
    }

    return hex;
}