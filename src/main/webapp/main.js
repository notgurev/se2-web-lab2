let submitButton;
let checked_x;
let checked_r;

function updateSubmitButton(yIsCheckedAndCorrect = false) {
    if (submitButton === undefined) {
        submitButton = document.getElementById("submit_button");
    } else {
        // check x, y, z
        submitButton.disabled = !(
            checked_x !== undefined
            && checked_r !== undefined
            && (yIsCheckedAndCorrect || validateY(document.getElementById('Y')))
        );
    }
}

function changeX(element) {
    if (element.checked) {
        if (checked_x !== undefined) {
            checked_x.checked = false;
        }
        checked_x = element;
    } else {
        checked_x = undefined;
    }
    updateSubmitButton();
}

function changeR(element) {
    if (element.checked) {
        if (checked_r !== undefined) {
            checked_r.checked = false;
        }
        checked_r = element;
        foregroundCanvas.style.cursor = "crosshair";
        drawPoints(checked_r.value);
        rNotChosenError(false);
    } else {
        checked_r = undefined;
        foregroundCanvas.style.cursor = "not-allowed";
        drawPoints(null)
    }
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