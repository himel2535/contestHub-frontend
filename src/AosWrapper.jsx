// src/AosWrapper.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const AosWrapper = ({ children }) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false,
        });
    }, []);

    return <>{children}</>;
};

export default AosWrapper;