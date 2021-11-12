import { useState } from 'react'
import { ManageBoardPopup } from './ManageBoardPopup'

export const CreateBoardButton = () => {
  const [showPopup, setShowPopup] = useState(false)
  return (
    <>
      {showPopup && (
        <ManageBoardPopup type="create" close={() => setShowPopup(false)} />
      )}
      <div style={{ cursor: 'pointer' }} onClick={() => setShowPopup(true)}>
        <a>+ Create a Board</a>
      </div>
    </>
  )
}
