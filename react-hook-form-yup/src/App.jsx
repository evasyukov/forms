import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { useEffect, useRef } from "react"
import "./App.css"

const schemaRegistration = yup.object({
  email: yup.string().email("Некорректный email").required("Введите email"),
  password: yup
    .string()
    .matches(/^[\w]*$/, "Пароль: только буквы и цифры")
    .min(6, "Должно быть не менее 6 символов")
    .required("Введите пароль"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Повторите введенный пароль"),
})

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schemaRegistration),
  })

  const submitButtonRef = useRef(null)

  useEffect(() => {
    if (isValid) submitButtonRef.current?.focus()
  }, [isValid])

  const onSubmit = (data) => {
    // имитируем отправку формы
    console.log({ email: data.email, password: data.password })
  }

  return (
    <>
      <form className="registration" onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        {errors.email && (
          <div className="errorLabel">{errors.email?.message}</div>
        )}
        <input
          type="email"
          name="email"
          placeholder="Введите свой email"
          {...register("email")}
        />
        <label>Пароль:</label>
        {errors.password && (
          <div className="errorLabel">{errors.password?.message}</div>
        )}
        <input
          type="text" // текст чтобы сразу смотреть вводимый текст
          name="password"
          placeholder="Введите свой пароль"
          {...register("password")}
        />
        {errors.passwordRepeat && (
          <div className="errorLabel">{errors.passwordRepeat?.message}</div>
        )}
        <input
          type="text" // текст чтобы сразу смотреть вводимый текст
          name="passwordRepeat"
          placeholder="Повторите введенный пароль "
          {...register("passwordRepeat")}
        />
        <button type="submit" disabled={!isValid} ref={submitButtonRef}>
          Отправить
        </button>
      </form>
    </>
  )
}

export default App
