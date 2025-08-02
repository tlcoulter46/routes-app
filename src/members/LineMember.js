import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const LinePlayer = ({ member, handleDelete, handleEdit }) => {
  return (
    <li className="member" style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #eee',
      gap: '10px'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
          {member.name}
        </div>
        {member.phone && (
          <div style={{ fontSize: '14px', color: '#666' }}>
            📞 {member.phone}
          </div>
        )}
        {member.email && (
          <div style={{ fontSize: '14px', color: '#666' }}>
            ✉️ {member.email}
          </div>
        )}
        {/* {member.handicap && (
          <div style={{ fontSize: '14px', color: '#666' }}>
            ♿ {member.handicap}
          </div>
        )} */}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <FaEdit
          onClick={() => handleEdit(member)}
          role="button"
          tabIndex="0"
          aria-label={`Edit ${member.name}`}
          style={{
            cursor: 'pointer',
            color: '#007bff',
            fontSize: '16px'
          }}
        />
        <FaTrashAlt
          onClick={() => handleDelete(member.id)}
          role="button"
          tabIndex="0"
          aria-label={`Delete ${member.name}`}
          style={{
            cursor: 'pointer',
            color: 'gray',
            fontSize: '16px'
          }}
        />
      </div>
    </li>
  )
}

export default LinePlayer;