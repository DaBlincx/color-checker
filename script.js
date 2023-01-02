const button = document.getElementById('add-button');
const parent = document.querySelector('.parent');
const colorPicker = document.getElementById("color-picker");

button.addEventListener('click', () => {

    createChild();
});

function createChild() {
    const useColor = getColor();
    if (useColor != null) {
        const html = `<div class="child" style="background-color: ${useColor};"><p class="child-text">${useColor}</p></div>`;

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
    } else {
        colorPicker.value = "Invalid hex code."
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