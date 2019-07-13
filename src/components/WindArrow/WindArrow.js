import React from 'react';

import {FaLocationArrow} from 'react-icons/fa';

export default function WindArrow({deg, className}) {
    return(
        <div className={`wind-arrow ${className}`.trim()} style={{transform: `rotate(${deg - 45}deg)`}}>
            <FaLocationArrow/>
        </div>
    )
}