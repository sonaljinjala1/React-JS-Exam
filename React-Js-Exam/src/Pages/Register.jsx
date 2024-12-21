import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; 

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [record, setRecord] = useState(localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill all the fields!');
      return;
    }

    let obj = {
      id: Math.floor(Math.random() * 10000),
      name: name,
      email: email,
      password: password,
    };

    let old = [...record, obj];
    localStorage.setItem('users', JSON.stringify(old));
    alert('User successfully registered!');
    setName('');
    setEmail('');
    setPassword('');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register User</h2>
      <form onSubmit={handleSubmit} className="register-form">
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="form-input"
          />
        </div>
        <div className="form-actions">
          <input type="submit" value="Register" className="submit-btn" />
        </div>
      </form>
      <div className="login-link">
        <p>Already have an account?</p>
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </div>
  );
};

export default Register;
