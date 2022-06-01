import React from "react";
import tw from "tailwind-styled-components";

export const Button = ({ _id, children, onClick, disabled }) => {
  return (
    <>
      {!disabled ? (
        <ActiveButton data-testid={_id} onClick={onClick} disabled={disabled}>
          {children}
        </ActiveButton>
      ) : (
        <DisabledButton data-testid={_id} onClick={onClick} disabled={disabled}>
          {children}
        </DisabledButton>
      )}
    </>
  );
};

const ActiveButton = tw.button`
    bg-gradient-to-r from-blue-500 to-sky-400 text-white px-10 py-2 rounded-xl
`;

const DisabledButton = tw.button`
    bg-white text-gray-300 px-10 py-2 rounded-xl shadow-md border cursor-not-allowed
`;
