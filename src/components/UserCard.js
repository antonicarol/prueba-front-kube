import React from "react";
import tw from "tailwind-styled-components";
import Flag from "react-world-flags";
import { BsFillTelephoneFill } from "react-icons/bs";

export const UserCard = ({ userData }) => {
  const { name, picture, phone, nat } = userData;
  const { large, medium, thumbnail } = picture;
  return (
    <UserCardContainer>
      <AvatarContainer>
        <img src={large} alt={`${name}-img`} width={150} />
      </AvatarContainer>
      <InfoContainer>
        <NameContainer>
          <b>{name}</b>
          <Flag code={nat} width="38" height="32" />
        </NameContainer>
        <PhoneContainer>
          <BsFillTelephoneFill />
          <i>{phone}</i>
        </PhoneContainer>
      </InfoContainer>
    </UserCardContainer>
  );
};

const UserCardContainer = tw.div`
    flex flex-col border shadow-md 
    rounded-lg p-5 gap-2
`;

const AvatarContainer = tw.div`
    flex
`;

const InfoContainer = tw.div`
    flex flex-col justify-between gap-4
`;

const NameContainer = tw.div`
flex items-center justify-between w-full
`;

const PhoneContainer = tw.div`
flex items-center gap-4 w-full
`;
