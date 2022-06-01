import "./App.css";
import tw from "tailwind-styled-components";
import { useState } from "react";
import logo from "./assets/react-logo.png";
import { useApi } from "./hooks/useApi";
import { Button } from "./components/Button";
import { UserCard } from "./components/UserCard";
import { ActivateButton } from "./components/ActivateButton";

function App() {
  const { getUserData } = useApi();
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [userResults, setUserResults] = useState([]);

  const handleInputChange = (value) => {
    setError(false);
    setName(value);
  };

  const createNewUser = async () => {
    if (name !== "") {
      const reqUserData = await getUserData();
      const newUser = {
        ...reqUserData,
        name: name,
      };
      setUserResults([...userResults, newUser]);
    } else {
      setError(true);
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
        <ActivateButton disabled={!disabled} onClick={activateSendButton}>
          Active
        </ActivateButton>
        <Separator></Separator>
        <ActivateButton disabled={disabled} onClick={deactivateSendButton}>
          Inactive
        </ActivateButton>
      </ButtonsContainer>
      <ActionContainer>
        <img src={logo} width={250} alt="React Logo" />
        <FormContainer>
          <div className="flex flex-col gap-2 items-center">
            <NameInput
              aria-label="name-input"
              value={name}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            {error && <ErrorMesssage>Introduce un nombre!</ErrorMesssage>}
          </div>

          <Button
            _id="send-button"
            disabled={disabled}
            onClick={() => createNewUser()}
          >
            <b>ENVIAR</b>
          </Button>
        </FormContainer>
      </ActionContainer>
      <ResultsContainer>
        {userResults.map((user) => {
          return <UserCard key={Math.random(1, 999) * 1000} userData={user} />;
        })}
      </ResultsContainer>
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
  flex flex-col items-center gap-10 justify-evenly md:flex-row-reverse w-[75vw] lg:w-[50vw] border-2 rounded-xl p-10 shadow-md
`;

const FormContainer = tw.div`
  flex flex-col items-center gap-10 
`;

const NameInput = tw.input`
border-2 rounded-md w-[225px] h-[33px] p-2`;

const ErrorMesssage = tw.i`
  text-red-600
`;
const ResultsContainer = tw.div`
  flex flex-wrap w-[75vw] gap-4 justify-center
`;
