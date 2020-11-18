import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../contexts/FirebaseContext';

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { app } = useContext(FirebaseContext);
    
    useEffect(() => {
        const listener = app.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });
        
        return () => listener();
        // eslint-disable-next-line
    }, []);
    
    return { user };
}