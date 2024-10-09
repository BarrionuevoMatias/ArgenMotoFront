
// Funcion para mostrar las pestañas
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    const activeButton = [...buttons].find(button => button.innerText.toLowerCase() === tabName);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}
