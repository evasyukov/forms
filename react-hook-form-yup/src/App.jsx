import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { useEffect, useRef } from "react"
import "./App.css"
import InputForm from "./components/InputForm"

const schemaRegistration = yup.object({
  email: yup.string().email("Некорректный email"),
  password: yup
    .string()
    .matches(/^[\w]*$/, "Пароль: только буквы и цифры")
    .min(6, "Должно быть не менее 6 символов"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
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
        <InputForm
          label="Email:"
          type="email"
          name="email"
          placeholder="Введите свой email"
          errors={errors.email}
          register={register}
        />

        <InputForm
          label="Пароль:"
          type="text"
          name="password"
          placeholder="Введите свой пароль"
          errors={errors.password}
          register={register}
        />

        <InputForm
          type="text"
          name="passwordRepeat"
          placeholder="Повторите введенный пароль"
          errors={errors.passwordRepeat}
          register={register}
        />

        <button type="submit" disabled={!isValid} ref={submitButtonRef}>
          Отправить
        </button>
      </form>
    </>
  )
}

export default App
