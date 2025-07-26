import LineMember from './LineMember';

const MemberList = ({ members, handleEdit, handleDelete }) => {
  return (
    <ul style={{ listStyle: 'none', padding: '0 0.25rem 0.25rem' }}>
      {members.map((member) => (
        <LineMember
          member={member}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  )
}

export default MemberList;