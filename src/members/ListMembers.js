import LineMember from './LineMember';

const MemberList = ({ members, handleEdit, handleDelete }) => {
  return (
    <ul style={{ listStyle: 'none', padding: '0 0.25rem 0.25rem' }}>
      {members.map((member) => (
        <LineMember
          key={member.id}
          member={member}
          handleEdit={() => handleEdit(member)}
          handleDelete={() => handleDelete(member.id)}
        />
      ))}
    </ul>
  )
}

export default MemberList;