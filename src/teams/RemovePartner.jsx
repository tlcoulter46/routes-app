import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import "./teams.css";

const RemovePartner = ({ currentName, handleRemove }) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='search'>Search</label>
      <input
        id='search'
        type='text'
        placeholder='Search Available Names'
        value={currentName}
        readOnly
      />

      <div className='icon-container'>
        <FontAwesomeIcon
          icon={faMinusSquare}
          className='remove-icon'
          onClick={handleRemove} />
      </div>
    </form>
  )
}

export default RemovePartner;