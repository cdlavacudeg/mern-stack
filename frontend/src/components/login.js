import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login({login}) {
  const initialUser={
    name:"",
    id:"",
  }
  const [user,setUser]=React.useState(initialUser);
  const navigate=useNavigate();
  const handleInputChange=(event)=>{
    const {name,value}=event.target;
    setUser({...user,[name]:value});
  }
  const loginHandler=()=>{
    login(user);
    navigate('/');
  }
  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user?user.name:""}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user?user.id:""}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={loginHandler} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  )
};
