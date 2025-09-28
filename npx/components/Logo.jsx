import React from 'react';

function Logo(props) {
    return (
        <div className={`w-fit text-white`}>
            <div className="playfair text-[48px] font-medium tracking-[0.6em] leading-none">
                ABC
            </div>

            <div className={`font-medium playfair text-[10px] tracking-[1.43em]`}>
                VENTURES
            </div>
        </div>
    );
}

export default Logo;