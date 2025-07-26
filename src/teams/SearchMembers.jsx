import "./teams.css";

const SearchMembers = ({ currentName, handleRemove }) => {
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
      <i onClick={handleRemove}
        className="fa fa-minus-square"
        style={{ fontSize: '2rem', color: 'red', background: 'white' }}>
      </i>
    </form>
  )
}

export default SearchMembers;