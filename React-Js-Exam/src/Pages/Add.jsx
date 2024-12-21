import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Add.css'; 

const Add = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let userLogin = JSON.parse(localStorage.getItem('registeredUser'));
    if (!userLogin) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !username || !email) {
      alert('Please fill all the fields!');
      return;
    }

    let newUser = {
      id: Math.floor(Math.random() * 10000),
      name: name,
      phone: phone,
      username: username,
      email: email,
    };

    let users = localStorage.getItem('addedUsers')
      ? JSON.parse(localStorage.getItem('addedUsers'))
      : [];

    users.push(newUser);

    localStorage.setItem('addedUsers', JSON.stringify(users));

    alert('Record added successfully!');
    navigate('/view');
    setName('');
    setPhone('');
    setUsername('');
    setEmail('');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('registeredUser');
    alert('User completely logged out!');
    navigate('/');
  };

  return (
    <div className="add-container">
      <h1 className="add-title">Add User</h1>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="form-input"
          />
        </div>
        <div className="form-actions">
          <input type="submit" value="Add User" className="submit-btn"  style={{width: '100% !important' , justifyContent: 'center', textAlign: 'center' , marginLeft: '22px'}}/> 
          <button onClick={handleLogout} className="logout-btn  mt-3">
            Logout
          </button>
        </div>
      </form>
      <Link to="/view" className="view-link">
        View Users
      </Link>
    </div>
  );
};

export default Add;
