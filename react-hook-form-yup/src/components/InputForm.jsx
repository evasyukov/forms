import './InputForm.css'

function InputForm({ label, type, name, placeholder, errors, register }) {
  return (
    <>
      <label>{label}</label>
      {errors && <div className="errorLabel">{errors?.message}</div>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      />
    </>
  )
}

export default InputForm
