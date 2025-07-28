const generateMemberId = () => {
  return Math.random().toString(16).substring(2, 6);
}

const addMember = async (member) => {
  const id = generateMemberId();
  const myNewMember = { id, name: member, phone: "", email: "" };
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