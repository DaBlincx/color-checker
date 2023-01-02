const button = document.getElementById('add-button');
const parent = document.querySelector('.parent');
const color = document.getElementById('color-picker');

button.addEventListener('click', () => {

    createChild();
});

function createChild() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const html = `<div class="child" style="background-color: ${randomColor};">New</div>`;

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
}