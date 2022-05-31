import React from "react";
import tw from "tailwind-styled-components";

export const ActivateButton = ({ children, onClick, disabled }) => {
  return (
    <>
      {!disabled ? (
        <ActiveButton onClick={onClick} disabled={disabled}>
          {children}
        </ActiveButton>
      ) : (
        <DisabledButton onClick={onClick} disabled={disabled}>
          {children}
        </DisabledButton>
      )}
    </>
  );
};

const ActiveButton = tw.button`
bg-white text-black px-10 py-2 rounded-xl shadow-md border

`;

const DisabledButton = tw.button`
bg-gradient-to-r from-blue-500 to-sky-400 text-white px-10 py-2 rounded-xl  cursor-not-allowed
`;
