let submitButton;
let Xs_checked = 0;
let Rs_checked = 0;

function updateSubmitButton(yIsCheckedAndCorrect = false) {
    if (submitButton === undefined) {
        submitButton = document.getElementById("submit_button");
    } else {
        // check x, y, z
        submitButton.disabled = !(
            Xs_checked > 0
            && Rs_checked > 0
            && (yIsCheckedAndCorrect || validateY(document.getElementById('Y')))
        );
    }
}

// todo changeX/R - тупо, надо сделать через jQuery (когда-нибудь точно получится)
function changeX(element) {
    if (element.checked) Xs_checked++;
    else Xs_checked--;
    updateSubmitButton();
}

function changeR(element) {
    if (element.checked) Rs_checked++;
    else Rs_checked--;
    updateSubmitButton();
}

function validateY(yInputElement) {
    let y = yInputElement.value.trim().replace(",", ".")
    if (y === "") {
        yInputElement.setCustomValidity("Введите значение");
        return false;
    } else if (!isFinite(+y)) {
        yInputElement.setCustomValidity("Значение должно быть числом");
        return false;
    } else if (+y <= -3 || +y >= 5) {
        yInputElement.setCustomValidity("Число должно входить в диапазон (-3 ... 5)")
        return false;
    } else {
        updateSubmitButton(true);
        return true;
    }
}