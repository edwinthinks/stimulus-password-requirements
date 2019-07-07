import { Controller } from "stimulus";

class PasswordInputController extends Controller {
  static targets = [
    "length",
    "lowercaseLetter",
    "uppercaseLetter",
    "number",
    "identical",
    "sequential"
  ]

  connect() {
    this.validatePassword();
  }

  input(event) {
    console.log(event);
    this.password = event.target.value;
  }

  set password(value) {
    this.data.set("password", value);
    this.validatePassword();
  }

  get password() {
    if (!this.data.has("password")) {
      this.password = "";
    }

    return this.data.get("password")
  }

  validatePassword() {

    // Validate lowercase letters
    let lowerCaseLetters = /[a-z]/g;
    if (this.password.match(lowerCaseLetters)) {
      this.lowercaseLetterTarget.classList.toggle('invalid', false);
    } else {
      this.lowercaseLetterTarget.classList.toggle('invalid', true);
    }

    // Validate capital letters
    let upperCaseLetters = /[A-Z]/g;
    if (this.password.match(upperCaseLetters)) {
      this.uppercaseLetterTarget.classList.toggle('invalid', false);
    } else {
      this.uppercaseLetterTarget.classList.toggle('invalid', true);
    }

    // Validate numbers
    let numbers = /[0-9]/g;
    if (this.password.match(numbers)) {
      this.numberTarget.classList.toggle('invalid', false);
    } else {
      this.numberTarget.classList.toggle('invalid', true);
    }

    // Validate length
    if (this.password.length >= 8) {
      this.lengthTarget.classList.toggle('invalid', false);
    } else {
      this.lengthTarget.classList.toggle('invalid', true);
    }

    // Validate no 3 or more consecutive identical characters
    const identicalRegex = /([\s\S])\1\1/g;
    if (!this.password.match(identicalRegex)) {
      this.identicalTarget.classList.toggle('invalid', false);
    } else {
      this.identicalTarget.classList.toggle('invalid', true);
    }

    // Validates no 3 or more consecutive sequential characters
    const seqRegex = new RegExp(['(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm',
      '|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|',
      '012|123|234|345|456|567|678|789)+'].join(''), 'gi');

    if (!this.password.match(seqRegex)) {
      this.sequentialTarget.classList.toggle('invalid', false);
    } else {
      this.sequentialTarget.classList.toggle('invalid', true);
    }
  }

}

export { PasswordInputController }
