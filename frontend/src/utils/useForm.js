import {useState} from "react";

export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
  };

  return {
    values,
    handleChange,
    setValues
  };
}