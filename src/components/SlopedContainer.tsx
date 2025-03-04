import React from 'react';

interface SlopedContainerProps {
    children: React.ReactNode;
    bottomSlope?: boolean;
}

const SlopedContainer: React.FC<SlopedContainerProps> = ({ children, bottomSlope }) => {
    return (
        <div
        className="bg-background relative py-16 flex justify-center items-center"
      >
        {/* Slanted border */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-background">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,0 100,100" fill="#1AE0BD" />
          </svg>
        </div>
  
        <div className="container px-8">
          {children}
        </div>
  
        {bottomSlope && (
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-background">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,100 100,0 100,100" fill="#1AE0BD" />
            </svg>
          </div>
        )}
      </div>
    );
};

export default SlopedContainer;