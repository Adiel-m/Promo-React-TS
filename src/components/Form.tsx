import { ReactElement } from "react"

export interface FormProps {
  btnText?: string
}

export const Form = ({...props}: FormProps): ReactElement<HTMLFormElement> => {

  const {btnText} = props
  // Data
  const fetchFormData = async () => {
    const res = await fetch('http://localhost:5173/')
    const data = await res.json()
    return data
  }

  return (
    <form className="form" onSubmit={() => fetchFormData}>
      <div className="form-grp">
        <label htmlFor="fName">Full Name:</label>
        <input id="fName" type="text" />
      </div>
      <div className="form-grp">
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" />
      </div>
      <button className="btn">{btnText}</button>
    </form>
  )
}
