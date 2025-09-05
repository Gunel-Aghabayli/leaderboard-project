import React, { useState } from "react";

const Admin = ({ teams, setTeams }) => {
  const [newTeam, setNewTeam] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTeam, setEditTeam] = useState("");

  const handleAddTeam = () => {
    if (newTeam.trim() !== "" && !teams.includes(newTeam)) {
      setTeams([...teams, newTeam]);
      setNewTeam("");
    }
  };

  const handleDelete = (index) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    setTeams(updatedTeams);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTeam(teams[index]);
  };

  const handleSave = () => {
    if (editTeam.trim() !== "") {
      const updatedTeams = [...teams];
      updatedTeams[editIndex] = editTeam;
      setTeams(updatedTeams);
      setEditIndex(null);
      setEditTeam("");
    }
  };

  return (
    <div className="admin">
      <h2>Admin Panel</h2>

      <input
        type="text"
        placeholder="Yeni komanda əlavə et"
        value={newTeam}
        onChange={(e) => setNewTeam(e.target.value)}
      />
      <button onClick={handleAddTeam}>Add new team</button>

      <h3>Existings group:</h3>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editTeam}
                  onChange={(e) => setEditTeam(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {team}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
