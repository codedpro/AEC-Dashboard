import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from '../services/user.service';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }
    if (!user) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <a onClick={logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}