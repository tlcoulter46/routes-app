import React from 'react'
import './index.css';
// Example: Display each array value with a border in React

function LineItems({ title, values }) {
return (
<div className='line-items'>
  <div className='line-label'>
    {title}
  </div>
  {values.map((value, idx) => (
  <div className='line-item' key={idx}>
    {value}
  </div>
  ))}
</div>
);
}

export default LineItems;