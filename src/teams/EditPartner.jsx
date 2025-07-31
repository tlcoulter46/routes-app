import { FaMinusSquare } from 'react-icons/fa';
import "./teams.css";

const EditPartner = ({ member, handleRemove }) => {
  return (
    <div className='edit-partner'>
      <span>{member.name}</span>

      {member.name !== null && (
        <button onClick={() => handleRemove(member)} className='btn' >
          <FaMinusSquare className='remove-icon' />
        </button>
      )}
    </div>

  )
}

export default EditPartner;