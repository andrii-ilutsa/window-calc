// Square
const $squareWidthField          = document.querySelector('#squareWidth');
const $squareHeightField         = document.querySelector('#squareHeight');
const $squareAreaButton          = document.querySelector('#squareAreaButton');

// Hemisphere
const $hemisphereRadiusField     = document.querySelector('#hemisphereRadius');
const $hemisphereAreaButton      = document.querySelector('#hemisphereAreaButton');

// Circle
const $circleRadiusField         = document.querySelector('#circleRadius');
const $circleAreaButton          = document.querySelector('#circleAreaButton');
const $halfCircleAreaButton      = document.querySelector('#halfCircleAreaButton');

// Others
const $form                      = document.querySelector('#form');
const $totalAreaCostField        = document.querySelector('#totalAreaCostField');
const $totalAreaCostByMeterField = document.querySelector('#totalAreaCostByMeterField');
const $totalAreaField            = document.querySelector('#totalAreaField');
const $detailsCountField         = document.querySelector('#detailsCountField');
const $windowTypeField           = document.querySelector('#windowTypeField');
const $totalCostButton           = document.querySelector('#totalCostButton');
const $resetFormButton           = document.querySelector('#resetFormButton');
const $windowTypesList           = document.querySelector('.window-types-list');

let s = 0;

function updateAreaField(value) {
    $totalAreaField.value = value;
}
function updateTotalAreaCostField(value) {
    $totalAreaCostField.value = value.toFixed(2);
    $totalAreaCostByMeterField.value = (value / s).toFixed(2);
}
function resetFieldsAlerts() {
    document.querySelectorAll('#app .form-field .form-control').forEach(element => {
        element.classList.remove('is-invalid');
    });
}

let template = '';
for (key in config.windowType) {
    template += '<div class="form-field input-group">' +
                    '<label class="input-group-text">' + key + '</label>' +
                    '<input id="' + key + '" type="number" class="form-control" value="0">' +
                    '<label class="input-group-text">%</label>' +
                '</div>';
}
$windowTypesList.innerHTML = template;
            

$squareAreaButton.addEventListener('click', event => {
    if (!$squareWidthField.value || !$squareHeightField.value) {
        (!$squareWidthField.value)
            ? $squareWidthField.classList.add('is-invalid')
            : $squareWidthField.classList.remove('is-invalid');
        (!$squareHeightField.value)
            ? $squareHeightField.classList.add('is-invalid')
            : $squareHeightField.classList.remove('is-invalid');
    } else {
        resetFieldsAlerts();
        s = $squareWidthField.value * $squareHeightField.value;
        updateAreaField(s);
    }
});
$hemisphereAreaButton.addEventListener('click', event => {
    if (!$hemisphereRadiusField.value) {
        $hemisphereRadiusField.classList.add('is-invalid')
    } else {
        resetFieldsAlerts();
        s = 9.42 * Math.pow($hemisphereRadiusField.value, 2);
        updateAreaField(s);
    }
});
$circleAreaButton.addEventListener('click', event => {
    if (!$circleRadiusField.value) {
        $circleRadiusField.classList.add('is-invalid');
    } else {
        resetFieldsAlerts();
        s = 3.14 * Math.pow($circleRadiusField.value, 2);
        updateAreaField(s);
    }
});
$halfCircleAreaButton.addEventListener('click', event => {
    if (!$circleRadiusField.value) {
        $circleRadiusField.classList.add('is-invalid');
    } else {
        resetFieldsAlerts();
        s = 1.57 * Math.pow($circleRadiusField.value, 2);
        updateAreaField(s);
    }
});
$totalCostButton.addEventListener('click', event => {
    if ($totalAreaField.value == 0 || !$detailsCountField.value) {
        ($totalAreaField.value == 0)
            ? $totalAreaField.classList.add('is-invalid')
            : $totalAreaField.classList.remove('is-invalid');
        (!$detailsCountField.value)
            ? $detailsCountField.classList.add('is-invalid')
            : $detailsCountField.classList.remove('is-invalid');
    } else {
        resetFieldsAlerts();

        let n = $detailsCountField.value;
        let b = s / n;

        let totalWindowsCalcRes = 0;
        let totalWindowsCalcPersent = 0;
        for (key in config.windowType) {
            let c = document.querySelector('#' + key).value;
            totalWindowsCalcPersent += parseFloat(c);
            totalWindowsCalcRes += ((s / 100) * c) * config.windowType[key] * 1.3;
        }

        if (totalWindowsCalcPersent > 100) {
            $windowTypesList.classList.add('is-invalid');
        } else {
            $windowTypesList.classList.remove('is-invalid');
            let e = (totalWindowsCalcRes + Math.sqrt(b) * 4 * n * config.linearMeterPrice + (n / 10) + n * config.salary + n * config.rent) * 2 * config.totalFactor;
            updateTotalAreaCostField(e);
        }


    }
});
$resetFormButton.addEventListener('click', event => {
    resetFieldsAlerts();
    $form.reset();
});