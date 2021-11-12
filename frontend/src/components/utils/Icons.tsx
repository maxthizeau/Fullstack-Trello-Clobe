import styled from 'styled-components'

export const DeleteIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px 8px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: var(--lightGrey);
  }

  &:before {
    content: '🗑️';
  }
`

export const IconEdit = styled.span`
  visibility: visible;

  background-clip: padding-box;
  background-color: #f4f5f7;
  background-origin: initial;
  border-radius: 3px;
  opacity: 0.8;
  padding: 4px 6px;
  position: absolute;
  right: 2px;
  top: 2px;
  z-index: 40;
  visibility: hidden;

  :before {
    content: '✏️';
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    width: 20px;

    /* z-index: 40; */
  }

  :hover {
    background-color: #f7f7f8;
  }
`
