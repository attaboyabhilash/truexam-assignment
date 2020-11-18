import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FirebaseContext } from '../contexts/FirebaseContext';

function SignUpForm() {
    const history = useHistory()
    const { app } = useContext(FirebaseContext)
    const [firstName, setFirstName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const isInvalid = firstName === '' || password === '' || emailAddress === '';
    
    const handleSignup = (event) => {
        event.preventDefault();

        app.auth()
            .createUserWithEmailAndPassword(emailAddress, password)
            .then((result) =>
                result.user
                .updateProfile({
                    displayName: firstName
                })
                .then(() => {
                    history.push('/dashboard');
                })
            ).catch((error) => {
                setEmailAddress('');
                setPassword('');
                setError(error.message)
            });
    }

    return (
        <div className="signup">
            <h2>SignUp</h2>
            {error && <small>{error}</small>}
            <form onSubmit={handleSignup} className="signup-form">
            <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" value={firstName} placeholder="ex. John" onChange={e => setFirstName(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={emailAddress} placeholder="someone@example.com" onChange={e => setEmailAddress(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} placeholder="*********" onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="SignUp" disabled={isInvalid} />
                <p>Already a user? <Link to="/signin">Sign In now.</Link></p>
            </form>
        </div>
    )
}

export default SignUpForm
