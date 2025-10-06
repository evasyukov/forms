import './InputForm.css'

function InputForm({
  type,
  name,
  placeholder,
  valueForm,
  blurFunction,
  changeFunction,
  disabled,
  error,
  label
}) {
  return (
    <>
    <label>{label}</label>
      {error && (
        <div className="errorLabel">{error}</div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={valueForm}
        onBlur={() => blurFunction && blurFunction(true)}
        onChange={changeFunction}
        disabled={disabled}
      />
    </>
  )
}

export default InputForm
