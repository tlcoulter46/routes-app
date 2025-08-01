import { useState, useEffect } from 'react';
import './members.css';
import SearchMembers from './SearchMembers';
import AddMember from './AddMember';
import ListMembers from './ListMembers';
import EditMember from './EditMember';
import apiRequest from '../util/apiRequest';
import Header from './Header';
import Footer from './Footer'; 

function App() {
  const API_URL_MEMBERS = 'http://localhost:3500/members';

  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL_MEMBERS);
        if (!response.ok) throw Error('Failed to fetch members data');
        const result = await response.json();
        setMembers(result);
        setFetchError(null);
        console.log('Members:', members);
      } catch (err) {
        setFetchError(err.message);
        console.log('err.message:', err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [])

  const generateMemberId = () => {
    return Math.random().toString(16).substring(2, 6);
  }

  const addMember = async (member) => {
    const id = generateMemberId();
    const myNewMember = { id, name: member, phone: "", email: "", handicap: 0, team: false };
    const listMembers = [...members, myNewMember];
    setMembers(listMembers);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewMember)
    }
    const result = await apiRequest(API_URL_MEMBERS, postOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL_MEMBERS}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    
    if (result) {
      setFetchError(result);
    } else {
      // Only update local state if API request succeeded
      const listMembers = members.filter((member) => member.id !== id);
      setMembers(listMembers);
      setFetchError(null);
    }
  }

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsEditing(true);
  }

  const handleSaveEdit = async (updatedMember) => {
    const listMembers = members.map((member) =>
      member.id === updatedMember.id ? updatedMember : member
    );

    setMembers(listMembers);
    setEditingMember(null);
    setIsEditing(false);

    const updateOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedMember)
    };
    const reqUrl = `${API_URL_MEMBERS}/${updatedMember.id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  const handleCancelEdit = () => {
    setEditingMember(null);
    setIsEditing(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMember) return;
    addMember(newMember);
    setNewMember('');
  }

  return (
    <div className="App">
      <Header title="Members" />

      <AddMember
        newMember={newMember}
        setNewMember={setNewMember}
        handleSubmit={handleSubmit}
      />

      <SearchMembers
        search={search}
        setSearch={setSearch}
      />

      <main>
        {isLoading && <p>Loading Members...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading &&
          <ListMembers
            members={members.filter(member => ((member.name).toLowerCase()).includes(search.toLowerCase()))}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />}
      </main>

      {isEditing && (
        <EditMember
          member={editingMember}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}

      <Footer length={members.length} /> 
    </div>
  );
}

export default App;