import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import './members.css';

const LineMember = ({ member, handleEdit, handleDelete }) => {
  return (
    <li className='member'>
      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
        {member.name}
      </div>

      <div className='icon-container'>
        <FontAwesomeIcon
          icon={faEdit}
          className='edit-icon'
          onClick={handleEdit} />
        <FontAwesomeIcon
          icon={faTrash}
          className='trash-icon'
          onClick={handleDelete} />
      </div>
    </li>
  )
}

export default LineMember;