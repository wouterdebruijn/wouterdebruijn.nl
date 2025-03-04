import React from 'react';

interface GenericContainerProps {
    children: React.ReactNode;
    className?: string;
}

const GenericContainer: React.FC<GenericContainerProps> = ({ children, className }) => {
    return (
        <div className={`py-16 flex justify-center items-center ${className}`}>
            <div className="container px-8">
            {children}
            </div>
        </div>
    );
};

export default GenericContainer;