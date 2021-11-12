import { useEffect, useState } from 'react'

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
}

type ValueInput = string | number | FileList | null

export default function useForm<TypeInput>(initial: TypeInput) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState<TypeInput>(initial)
  const initialValues = Object.values(initial).join('')

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial)
  }, [initialValues])

  function handleChange(e: HTMLElementEvent<HTMLInputElement>) {
    // console.log(e.target.name)
    let { value, name, type } = e.target
    let finalValue: ValueInput = value
    if (type === 'number') {
      finalValue = parseInt(value)
    }
    if (type === 'file') {
      finalValue = e.target.files
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: finalValue,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blankState: any = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    )
    setInputs(blankState)
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  }
}
