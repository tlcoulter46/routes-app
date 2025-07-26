import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

const AddMember = ({ newMember, setNewMember, handleSubmit }) => {
  const inputRef = useRef();

  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <label htmlFor='addMember'>Add Member</label>
      <input
        autoFocus
        ref={inputRef}
        id='addMember'
        type='text'
        placeholder='Add Member'
        required
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
      />
      <i onClick={handleSubmit}
        className="fa fa-plus-square"
        style={{ fontSize: '2rem', color: 'green', background: 'white' }}>
      </i>
    </form>
  )
}

export default AddMember;