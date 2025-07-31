import TeamItem from "./TeamItem";
import "./teams.css";

const TeamList = ({ members, handleSwapMember }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {members.map((member) => (
        <TeamItem
          key={member.id}
          member={member}
          handleSwapMember={handleSwapMember}
        />
      ))}
    </ul>
  )
}

export default TeamList;