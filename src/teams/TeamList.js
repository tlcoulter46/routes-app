import TeamItem from "./TeamItem";
import "./teams.css";

const TeamList = ({ members, handleAdd }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {members.map((member) => (
        <TeamItem
          key={member.id}
          member={member}
          handleAdd={handleAdd}
        />
      ))}
    </ul>
  )
}

export default TeamList;