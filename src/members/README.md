# Members Management System

A React-based member management application that allows you to add, edit, delete, and search golf club members with handicap tracking.

## Features

### Core Functionality
- **Add Members**: Create new members with name, phone, email, and handicap information
- **Edit Members**: Update existing member details through a modal interface
- **Delete Members**: Remove members with confirmation
- **Search Members**: Filter members by name in real-time
- **Handicap Management**: Track golf handicaps with validation (-10 to 54 range)

### Validation & UX
- **Form Validation**: 
  - Name is required
  - Phone number format validation (minimum 10 digits)
  - Email format validation
  - Handicap range validation (-10 to 54)
- **Error Handling**: Clear error messages for invalid inputs
- **Spinner Controls**: Number input with mouse wheel support for handicap
- **Responsive Design**: Clean, mobile-friendly interface

## File Structure

```
src/members/
├── App.js              # Main application component
├── LineMember.js       # Individual member display component
├── EditMember.js       # Member editing modal component
├── members.css         # Main styling
├── editMember.css      # Modal-specific styling
└── data/
    └── members.json    # JSON server data store
```

## Components

### App.js
Main application component that handles:
- State management for members list
- API calls to JSON server
- Search functionality
- Member CRUD operations

### LineMember.js
Displays individual member information:
- Name, phone, email display
- Edit and delete action buttons
- Accessible button controls

### EditMember.js
Modal component for editing members:
- Form validation
- Error display
- Handicap spinner controls
- Save/Cancel actions

## API Endpoints

The application uses a JSON server running on `http://localhost:3500`

- `GET /members` - Fetch all members
- `POST /members` - Add new member
- `PUT /members/:id` - Update existing member
- `DELETE /members/:id` - Delete member

## Data Structure

```javascript
{
  "id": "a1b2",
  "name": "John Doe",
  "phone": "555-123-4567",
  "email": "john@example.com",
  "handicap": 12,
  "team": false
}
```

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start JSON server:**
   ```bash
   npx json-server --watch src/members/data/members.json --port 3500
   ```

3. **Start React application:**
   ```bash
   npm start
   ```

## Usage

### Adding a Member
1. Enter member name in the input field
2. Click the green "+" button
3. Member is added with default values (empty phone/email, handicap 0)
4. Use edit function to add additional details

### Editing a Member
1. Click the edit icon (pencil) next to any member
2. Modal opens with current member data
3. Update any fields as needed
4. Form validates inputs in real-time
5. Click "Save" to confirm or "Cancel" to discard changes

### Deleting a Member
1. Click the delete icon (trash) next to any member
2. Member is removed from both UI and server

### Searching Members
1. Type in the search box at the top
2. Member list filters in real-time based on name matching

## Validation Rules

- **Name**: Required field
- **Phone**: Optional, but if provided must be valid format with minimum 10 digits
- **Email**: Optional, but if provided must be valid email format
- **Handicap**: Must be a number between -10 and 54

## Styling

The application uses CSS modules with:
- Responsive grid layout
- Modal overlays for editing
- Consistent color scheme (steelblue/green theme)
- Accessible button states and focus indicators
- Mobile-friendly touch targets

## Browser Support

- Modern browsers with ES6+ support
- Tested on Chrome, Firefox, Safari, Edge
- Mobile responsive design for tablet/phone usage

## Contributing

When making changes:
1. Create a feature branch
2. Make your changes
3. Test all functionality
4. Update documentation if needed
5. Merge to master branch
