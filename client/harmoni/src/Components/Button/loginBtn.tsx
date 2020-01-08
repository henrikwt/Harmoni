import React, { useState } from 'react';
import Login from '../login';
import Button from './button';

const LoginBtn = () => {
    const [display, setDisplay] = useState(false);
    
    const toggleDisplay = () => {
        setDisplay(!display);
    }

    return (
        <>
            <Button onClick={toggleDisplay} solid={true}>Logg inn</Button>

            {/* Only display login popup if display(state) is true */}
            {display && <Login toggle={toggleDisplay} />}
        </>
    );
}

export default LoginBtn;