import { useState, useEffect } from 'react';
import './members.css';
import Header from './Header';
import SearchMember from './SearchMembers';
import AddMember from './AddMember';
import Content from './Content';
import Footer from './Footer';
import EditMember from './EditMember';
import apiRequest from '../util/apiRequest';

function App() {
  const API_URL_MEMBERS = 'http://localhost:3500/members';

  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(API_URL_MEMBERS);
        if (!response.ok) throw Error('Did not receive expected data');
        const result = await response.json();
        setMembers(result);
        setFetchError(null);
        console.log('Members:', members);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMembers();
  }, [])

  const addMember = async (member) => {
    const id = members.length
      ? JSON.stringify(Number(members[members.length - 1].id) + 1)
      : "1";

    const myNewMember = { id, name: member };
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
    const listMembers = members.filter((member) => member.id !== id);
    setMembers(listMembers);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL_MEMBERS}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  const handleEdit = (member) => {
    setEditingMember(member);
  }

  const handleSaveEdit = async (updatedMember) => {
    const listMembers = members.map((member) =>
      member.id === updatedMember.id ? updatedMember : member
    );
    setMembers(listMembers);
    setEditingMember(null);

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

      <SearchMember
        search={search}
        setSearch={setSearch}
      />

      <main>
        {isLoading && <p>Loading Members...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          members={members.filter(member => ((member.name).toLowerCase()).includes(search.toLowerCase()))}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />}
      </main>

      <Footer length={members.length} />

      {editingMember && (
        <EditMember
          member={editingMember}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default App;