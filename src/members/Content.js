import MemberList from './ListMembers';

const Content = ({ members, handleDelete, handleEdit }) => {
  return (
    <>
      {members.length ? (
        <MemberList
          members={members}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
      )}
    </>
  )
}

export default Content