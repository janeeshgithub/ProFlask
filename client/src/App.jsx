import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("/api/items");
    setItems(response.data);
  };

  const handleAdd = async () => {
    if (name && description) {
      const response = await axios.post("/api/items", { name, description });
      setItems([...items, response.data]);
      resetForm();
    }
  };

  const handleEdit = (item) => {
    setEditing(item.id);
    setName(item.name);
    setDescription(item.description);
  };

  const handleUpdate = async () => {
    const response = await axios.put(`/api/items/${editing}`, {
      name,
      description,
    });
    setItems(items.map((item) => (item.id === editing ? response.data : item)));
    setEditing(null);
    resetForm();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/items/${id}`);
    setItems(items.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 Fancy CRUD App
        </h1>
        <div className="mb-6">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              className="flex-1 p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="flex-1 p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            onClick={editing ? handleUpdate : handleAdd}
            className={`w-full p-3 text-white font-bold rounded ${
              editing
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {editing ? "Update Item" : "Add Item"}
          </button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
