import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from './firestore';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [record, setRecord] = useState(localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []);

  useEffect(() => {
    let loginUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (loginUser) {
      navigate('/add');
    }
  }, [navigate]);

  const handleclick = async () => {
    try {
        let user = await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
        console.log(err);
        return false;
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill all the fields');
      return;
    }

    let registeredUser = record.filter(
      (val) => val.email === email && val.password === password
    );

    if (registeredUser.length === 0) {
      alert('Email & Password are not valid..!');
    } else {
      localStorage.setItem('registeredUser', JSON.stringify(registeredUser[0]));
      alert('Login successfully completed..!');
      navigate('/add');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Login
          </button>
          
        </div>
        <a class="dropdown-item"    onClick={() => handleclick()}    style={{cursor:"pointer" , padding:"10px" , backgroundColor:"#f2f2f2" , color:"black" , paddingBottom:"14px"}} href="#"><FcGoogle  style={{marginRight:"8px" , fontSize:"20px" , transform:"translateY(5px)"}} />Login with Google</a>
      </form>
      <Link to="/" className="register-link">
        <button className="btn-register">Register</button>
      </Link>
    </div>
  );
};

export default Login;
