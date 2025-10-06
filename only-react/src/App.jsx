import { useState, useRef, useEffect } from "react"
import './App.css'

import InputForm from "./components/inputForm"

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

  function validatePasswordRepeat(value, password) {
    if (value && value !== password) {
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
        <InputForm
          type="email"
          name="email"
          placeholder="Введите свой email"
          valueForm={email}
          blurFunction={setEmailTouched}
          changeFunction={emailChange}
          error={emailTouched ? emailError : null}
          label="Email:"
        />

        <InputForm
          type="text"
          name="text"
          placeholder={"Введите свой пароль"}
          valueForm={password}
          changeFunction={passwordChange}
          error={passwordError}
          label="Пароль:"
        />

        <InputForm
          type="text"
          name="text"
          placeholder="Повторите введенный пароль "
          valueForm={passwordRepeat}
          blurFunction={setPasswordRepeatTouched}
          changeFunction={passwordRepeatChange}
          disabled={!password}
          error={passwordRepeatTouched ? passwordRepeatError : null}
        />

        <button type="submit" disabled={!isFormValid} ref={submitButtonRef}>
          Отправить
        </button>
      </form>
    </>
  )
}

export default App
