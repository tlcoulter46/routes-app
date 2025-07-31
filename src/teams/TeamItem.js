import React, { useState } from 'react';
import "./teams.css";

const TeamItem = ({ member, handleSwapMember }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseDown = () => {
    setIsHovered(false);
    handleSwapMember(member);
  };

  return (
    <li className='member'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      {member.name}
    </li >
  );
}

export default TeamItem;