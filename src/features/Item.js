import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, addUser, updateUsername, deleteUser } from '../redux/userSlice';

function Item() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!Array.isArray(userList)) {
    return <div>Loading...</div>;
  }

  const ClickHandler = (e)=>{
    e.preventDefault();
    dispatch(
      addUser({
        id: userList[userList.length - 1].id + 1,
        name,
        username,
      })
    );
    setName("");
    setUsername("")
  }
  return (
    <div  >
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'5px'}}  >
        <input  value={name}
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }} style={{marginLeft:'5px',marginRight:'5px'}}
        />
        <input
          value={username}
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button type='submit' class="btn btn-primary"
          onClick={(e) => {ClickHandler(e)}} style={{marginLeft:'2px'}}
        >
          Add User
        </button>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',margin:'10px'}} >
      {userList.map((user) => (
          <div class="card" key={user.id} style={{margin:'2px'}}>
          <div class="card-body">

            <h1>{user.name}</h1>
            <h1>{user.username}</h1>
            <div >
            <input
              type="text"
              placeholder="New Username..."
              onChange={(event) => {
                setNewUsername(event.target.value);
              }} style={{marginRight:'1px'}}
            />
            <button
              onClick={() => {
                dispatch(updateUsername({ id: user.id, username: newUsername }));
              }} class="btn btn-success" style={{marginRight:'1px'}}
            >
              Update Username
            </button>
            <button
              onClick={() => {
                dispatch(deleteUser({ id: user.id }));
              }} class="btn btn-danger"
            >
              Delete User
            </button>
            </div>
          </div>
        </div>

        ))}
      </div>
    </div>
  );
}

export default Item;
