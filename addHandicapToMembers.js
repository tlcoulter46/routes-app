const fs = require('fs');
const path = 'data/members.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.members = data.members.map(member => {
  if (!('handicap' in member)) {
    member.handicap = 0;
  }
  return member;
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('All members now have a handicap field.');
