import React from "react";

function HeroSection() {
    return (
        <div className="relative h-[500px] w-full">
            {/* Background image */}
            <div className="absolute inset-0 bg-[url('/bg1.png')] bg-cover bg-center bg-no-repeat"></div>

            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* content*/}
            <div className="relative z-10 flex items-center justify-center h-full text-white">
                <h1 className="text-4xl font-bold">Welcome</h1>
            </div>
        </div>
    );
}

export default HeroSection;
