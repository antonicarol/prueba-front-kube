import "./App.css";
import tw from "tailwind-styled-components";
import { useState } from "react";
import logo from "./assets/react-logo.png";
import { useApi } from "./hooks/useApi";
import { Button } from "./components/Button";
import { UserCard } from "./components/UserCard";

function App() {
  const { getUserData } = useApi();
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [userResults, setUserResults] = useState([]);

  const createNewUser = async () => {
    console.log(name);
    if (name !== "") {
      const reqUserData = await getUserData();
      const newUser = {
        ...reqUserData,
        name: name,
      };
      setUserResults([...userResults, newUser]);
    }
  };

  const activateSendButton = () => {
    setDisabled(false);
  };

  const deactivateSendButton = () => {
    setDisabled(true);
  };
  return (
    <AppContainer>
      <ButtonsContainer>
        <Button disabled={!disabled} onClick={activateSendButton}>
          Active
        </Button>
        <Separator></Separator>
        <Button disabled={disabled} onClick={deactivateSendButton}>
          Incative
        </Button>
      </ButtonsContainer>
      <ActionContainer>
        <img src={logo} width={250} alt="React Logo" />
        <FormContainer>
          <NameInput value={name} onChange={(e) => setName(e.target.value)} />
          <Button disabled={disabled} onClick={() => createNewUser()}>
            <b>ENVIAR</b>
          </Button>
        </FormContainer>
      </ActionContainer>
    </AppContainer>
  );
}

export default App;

const AppContainer = tw.div`
flex flex-col gap-10 items-center  w-screen h-screen
`;

const ButtonsContainer = tw.div`
  flex items-center justify-center w-full gap-5 mt-10
`;

const Separator = tw.div`
  w-[1px] border h-full
`;
const ActionContainer = tw.div`
  flex flex-col items-center gap-10 justify-evenly sm:flex-row-reverse w-[75vw] border-2 rounded-xl p-10 shadow-md
`;

const FormContainer = tw.div`
  flex flex-col items-center gap-10 
`;

const NameInput = tw.input`
border-2 rounded-md w-[225px] h-[33px]`;
