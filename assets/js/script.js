const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLength = 16

function generatePassword() {
    let chars = "abcdefgihjkmnopqrstuvwxys"

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numberChars = "0123456789"
    const symbolChars = "?!@&*()[]"

    if (upperCaseCheckEl.checked) chars += upperCaseChars
    if (numberCheckEl.checked) chars += numberChars
    if (symbolCheckEl.checked) chars += symbolChars

    let password = ""

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password

    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round(((passwordLength / 32) * 35) + (upperCaseCheckEl.checked ? 15 : 0) + (numberCheckEl.checked ? 20 : 0) + (symbolCheckEl.checked ? 30 : 0))
    securityIndicatorBarEl.style.width = `${percent}%`

    if (percent < 40) {
        securityIndicatorBarEl.classList.remove("safe")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("critical")
    } else if (percent < 75) {
        securityIndicatorBarEl.classList.remove("safe")
        securityIndicatorBarEl.classList.add("warning")
        securityIndicatorBarEl.classList.remove("critical")
    } else {
        securityIndicatorBarEl.classList.add("safe")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.remove("critical")
        if (percent >= 100) {
            securityIndicatorBarEl.classList.add("completed")
        } else {
            securityIndicatorBarEl.classList.remove("completed")
        }
    }
}

function calculateFontSize() {
    if (passwordLength > 24) {
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-sm")
    } else if (passwordLength > 18) {
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-sm")
    } else {
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-sm")
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function () {
    document.querySelector("#password-length-text").innerHTML = passwordLength = passwordLengthEl.value
    generatePassword()
})

upperCaseCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", generatePassword)

generatePassword()