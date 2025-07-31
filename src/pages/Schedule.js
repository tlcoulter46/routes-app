import React, { useState } from 'react';

const Schedule = () => {
  function ListItem({ itemContent }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleMouseDown = () => {
      setIsHovered(true);
      console.log(`itemContent is: ${itemContent}`)
    };

    return (
      <li
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        style={{ backgroundColor: isHovered ? 'lightgray' : 'white', cursor: "pointer" }}
      >
        {itemContent}
      </li>
    );
  }

  function MyList() {
    const items = ['Item 1', 'Item 2', 'Item 3'];

    return (
      <ul>
        {items.map((item, index) => (
          <ListItem key={index} itemContent={item} />
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h1>Schedule</h1>
      <MyList />
    </div>
  );
};


export default Schedule;
