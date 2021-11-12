// Imports :

// React & Packages
import { createRef, SyntheticEvent } from 'react'
import styled, { StyledComponent } from 'styled-components'
// Components
// Hooks & Lib
import useOnClickOutside from '@/lib/useOnClickOutside'
// GraphQL Queries & Mutations
// Generated TypeScript

// End Imports

const CustomInputStyles = styled.div`
  cursor: pointer;
  border-radius: 3px;
  :hover {
    background-color: #e6e6e6;
  }

  form {
    display: none;
  }

  &.on-edit {
    .custom-input-name {
      display: none;
    }

    form {
      display: block;
    }
  }
`

interface ICustomInputProps {
  inputName: string
  handleChange: (e: any) => void
  BoxStyles?: any | null
  TextStyles: StyledComponent<any, any>
  FormStyles: StyledComponent<'form', any>
  value: string
  onSubmit: () => void
  submitOnBlur: boolean
  buttonText?: string | null
}

export const CustomInput = ({
  BoxStyles = null,
  TextStyles,
  FormStyles,
  inputName,
  value,
  handleChange,
  onSubmit,
  submitOnBlur,
  buttonText = null,
}: ICustomInputProps) => {
  // Reference : Used to set focus and classes when edit
  // console.log(CustomInputStyles)
  const textRef = createRef<HTMLDivElement>()
  const inputRef = createRef<HTMLInputElement>()

  function handleClick() {
    textRef.current?.classList.add('on-edit')
    inputRef.current?.focus()
  }

  function stopEdit() {
    textRef.current?.classList.remove('on-edit')
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    stopEdit()
    onSubmit()
  }

  const handleClickOutside = async () => {
    stopEdit()
    if (submitOnBlur && textRef.current?.classList.contains('on-edit')) {
      onSubmit()
    }
  }

  useOnClickOutside(textRef, handleClickOutside)
  return (
    <CustomInputStyles ref={textRef} onClick={handleClick}>
      <TextStyles className="custom-input-name">
        {buttonText ? buttonText : value}
      </TextStyles>
      <FormStyles onSubmit={handleSubmit}>
        <input
          type="text"
          name={inputName}
          ref={inputRef}
          value={value}
          onChange={handleChange}
        />
      </FormStyles>
      {/* <IconEdit /> <IconDelete onClick={handleDelete} /> */}
    </CustomInputStyles>
  )
}
