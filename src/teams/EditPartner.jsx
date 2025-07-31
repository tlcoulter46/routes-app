import { FaMinusSquare } from 'react-icons/fa';
import "./teams.css";

const EditPartner = ({ currentName, handleRemove }) => {
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

      <button onClick={() => handleRemove(currentName)} className='btn' >
        <FaMinusSquare className='remove-icon' />
      </button>
    </form >
  )
}

export default EditPartner;

// style={{ fontSize: '2rem', color: 'red', background: 'white' }}
