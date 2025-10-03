import { useState, useRef, useEffect } from "react"
import "./App.css"

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [passwordRepeatError, setPasswordRepeatError] = useState(null)

  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordRepeatTouched, setPasswordRepeatTouched] = useState(false)

  const submitButtonRef = useRef(null)

  const isFormValid =
    email &&
    !emailError &&
    password &&
    !passwordError &&
    passwordRepeat &&
    !passwordRepeatError &&
    password === passwordRepeat

  function validateEmail(value) {
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Некорректный email")
    } else {
      setEmailError(null)
    }
  }

  function validatePassword(value) {
    if (!/^[\w]*$/.test(value)) {
      setPasswordError("Неверный пароль. Допустимые символы: буквы и цифры")
    } else {
      setPasswordError(null)
    }
  }

  function validatePasswordRepeat(value, pwd) {
    if (value && value !== pwd) {
      setPasswordRepeatError("Пароли не совпадают")
    } else {
      setPasswordRepeatError(null)
    }
  }

  function emailChange({ target }) {
    setEmail(target.value)
    validateEmail(target.value)
  }

  function passwordChange({ target }) {
    setPassword(target.value)
    validatePassword(target.value)
    validatePasswordRepeat(passwordRepeat, target.value)
  }

  function passwordRepeatChange({ target }) {
    setPasswordRepeat(target.value)
    validatePasswordRepeat(target.value, password)
  }

  useEffect(() => {
    if (isFormValid) {
      submitButtonRef.current?.focus()
    }
  }, [isFormValid]) // отслеживаем изменение isFormValid, для автоматического фокуса на кнопку когда isFormValid = true

  function onSubmit(event) {
    event.preventDefault()
    console.log({
      email: email,
      password: password,
    })
  }

  return (
    <>
      <form className="registration" onSubmit={onSubmit}>
        <label>Email:</label>
        {emailTouched && emailError && (
          <div className="errorLabel">{emailError}</div>
        )}
        <input
          type="email"
          name="email"
          placeholder="Введите свой email"
          value={email}
          onBlur={() => setEmailTouched(true)}
          onChange={emailChange}
        />
        <label>Пароль:</label>
        {passwordError && <div className="errorLabel">{passwordError}</div>}
        <input
          type="text"
          name="password"
          placeholder="Введите свой пароль"
          value={password}
          onChange={passwordChange}
        />
        {passwordRepeatTouched && passwordRepeatError && (
          <div className="errorLabel">{passwordRepeatError}</div>
        )}
        <input
          type="text" // текст чтобы сразу смотреть вводимый текст
          name="passwordRepeat"
          placeholder="Повторите введенный пароль "
          value={passwordRepeat}
          onBlur={() => setPasswordRepeatTouched(true)}
          onChange={passwordRepeatChange}
          disabled={!password}
        />
        <button type="submit" disabled={!isFormValid} ref={submitButtonRef}>
          Отправить
        </button>
      </form>
    </>
  )
}

export default App
