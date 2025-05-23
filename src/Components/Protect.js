import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const Protect = (props) => {
    const { ComponentName } = props;  
    const navigate = useNavigate(); 

    useEffect(() => {
        const medicityUserId = secureLocalStorage.getItem("medicityuser");
        if (!medicityUserId) {
            navigate("/");
            window.location.reload(); 
        }
    }, [navigate]);  

    return (
        <div>
            <ComponentName /> 
        </div>
    );
}

export default Protect;