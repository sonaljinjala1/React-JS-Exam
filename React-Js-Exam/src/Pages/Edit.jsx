import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Edit.css';

const Edit = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setName(location?.state?.name || "");
    setUsername(location?.state?.username || "");
    setEmail(location?.state?.email || "");
    setPhone(location?.state?.phone || "");
  }, [location?.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !username || !email || !phone) {
      alert("Please fill all the fields!");
      return;
    }

    let updatedUser = {
      id: location?.state?.id,
      name: name,
      username: username,
      email: email,
      phone: phone,
    };

    let users = localStorage.getItem("addedUsers")
      ? JSON.parse(localStorage.getItem("addedUsers"))
      : [];

    let updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    localStorage.setItem("addedUsers", JSON.stringify(updatedUsers));

    alert("Record updated successfully!");
    navigate("/view");
  };

  return (
    <div className="edit-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Update
          </button>
        </div>
      </form>
      <Link to={"/view"} className="view-link">
        <button className="btn-back">View Users</button>
      </Link>
    </div>
  );
};

export default Edit;   

