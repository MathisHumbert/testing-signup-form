import { useState } from 'react';
import './App.css';

function App() {
  const [signupInput, setSignInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setSignInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    e.preventDefault();
  };

  return (
    <div className='container my-5'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirm-password' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirm-password'
            name='confirmPassword'
            className='form-control'
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn btn-primary' onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
