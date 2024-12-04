import React, { useState } from 'react'; 
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Dummy admin credentials
    const adminCredentials = {
        username: 'admin',
        password: 'admin123',
    };

    const handleLogin = () => {
        if (username === adminCredentials.username && password === adminCredentials.password) {
            setIsLoggedIn(true);
            setErrorMessage('');
        } else {
            setErrorMessage('Invalid username or password!');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    return (
        <div className="card">
            {!isLoggedIn ? (
                <div className="flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <h2>Admin Login</h2>
                    <div className="flex flex-column gap-2 w-20rem">
                        <label htmlFor="username">Username</label>
                        <InputText 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="flex flex-column gap-2 w-20rem">
                        <label htmlFor="password">Password</label>
                        <InputText 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password"
                        />
                    </div>
                    {errorMessage && <Message severity="error" text={errorMessage} />}
                    <Button 
                        label="Login" 
                        icon="pi pi-sign-in" 
                        className="w-10rem" 
                        onClick={handleLogin}
                    />
                </div>
            ) : (
                <div className="flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <h2>Welcome, Admin!</h2>
                    <p>You now have access to edit the system.</p>
                    <Button 
                        label="Logout" 
                        icon="pi pi-sign-out" 
                        className="w-10rem p-button-danger" 
                        onClick={handleLogout}
                    />
                </div>
            )}
        </div>
    );
}