import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import "./teams.css";

const TeamItem = ({ key, member, handleAdd }) => {
  return (
    <li className="member">
      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
        {member.name}
      </div>

      <div className='icon-container'>
        <FontAwesomeIcon
          icon={faPlusSquare}
          className='add-icon'
          onClick={handleAdd} />
      </div>
    </li >
  );
}

export default TeamItem;