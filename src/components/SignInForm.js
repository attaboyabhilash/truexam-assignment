import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FirebaseContext } from '../contexts/FirebaseContext';

function SignInForm() {
    const history = useHistory()
    const { app } = useContext(FirebaseContext)
    const [error, setError] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    
    const isInvalid = password === '' || emailAddress === ''

    const handleSignin = (event) => {
        event.preventDefault();
        
        app.auth()
            .signInWithEmailAndPassword(emailAddress, password)
            .then(() => {
                history.push('/dashboard');
            })
            .catch((error) => {
                setEmailAddress('');
                setPassword('');
                setError(error.message)
            });
    }
    return (
        <div className="signin">
            <h2>SignIn</h2>
            {error && <small>{error}</small>}
            <form onSubmit={handleSignin} className="signin-form">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={emailAddress} placeholder="someone@example.com" onChange={e => setEmailAddress(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} placeholder="*********" onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="SignIn" disabled={isInvalid} />
                <p>New to TruExam? <Link to="/signup">Signup now.</Link></p>
            </form>
        </div>
    )
}

export default SignInForm
