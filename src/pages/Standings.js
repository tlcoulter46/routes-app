const Standings = () => {
  const handleAdd = () => {
    alert('Add icon clicked!');
  };

  const handleRemove = () => {
    alert('Remove icon clicked!');
  };

  const handleEdit = () => {
    alert('Edit icon clicked!');
  };

  const handleDelete = () => {
    alert('Delete icon clicked!');
  };

  return (
    <div>
      <h1>Standings</h1>

      <i onClick={handleAdd}
        className="fa fa-plus-square"
        style={{ fontSize: '2rem', color: 'green', background: 'white' }}>
      </i>

      <i onClick={handleRemove}
        className="fa fa-minus-square"
        style={{ fontSize: '2rem', color: 'red', background: 'white' }}>
      </i>

      <i onClick={handleEdit}
        class="fa fa-edit"
        style={{ fontSize: '2rem', color: 'blue', background: 'white' }}
      >
      </i>

      <i onClick={handleDelete}
        className="fa fa-trash"
        style={{ fontSize: '2rem', color: 'black', background: 'white' }}>
      </i>


    </div>
  )
};

export default Standings;