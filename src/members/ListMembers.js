import LinePlayer from './LineMember';

const MemberList = ({ members, handleCheck, handleDelete, handleEdit }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {members.map((member) => (
        <LinePlayer
          key={member.id}
          member={member}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </ul>
  )
}

export default MemberList;