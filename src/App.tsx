import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import { nouns } from "./nouns";

const chooseNoun = () => {
  let used = JSON.parse(localStorage.getItem(NOUN_LIST_KEY) || "[]");
  if (used.length >= nouns.length) {
    localStorage.setItem(NOUN_LIST_KEY, "[]");
    used = [];
  }
  const filteredNouns = nouns.filter((noun) => !used.includes(noun));
  const chosen =
    filteredNouns[Math.floor(Math.random() * filteredNouns.length)];
  localStorage.setItem(NOUN_LIST_KEY, JSON.stringify([...used, chosen]));
  return chosen;
};

const NOUN_LIST_KEY = "NOUN_LIST_KEY";

function App() {
  const [stage, setStage] = useState(1);
  const [nounG, setNounG] = useState("");
  const [nounR, setNounR] = useState("");

  const chooseNouns = () => {
    const first = chooseNoun();
    const second = chooseNoun();
    setNounG(first);
    setNounR(second);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#282c34",
        color: "white",
      }}
    >
      <CssBaseline />
      <Container sx={{ bgcolor: "#282c34", height: "100vh" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "46px",
          }}
        >
          <div />
          {stage === 3 && nounR && nounG && (
            <>
              <Typography variant="h3">R: {nounR}</Typography>
              <Typography variant="h3">G: {nounG}</Typography>
            </>
          )}
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              switch (stage) {
                case 1:
                  chooseNouns();
                  setStage(2);
                  break;
                case 2:
                  setStage(3);
                  break;
                case 3:
                  setNounR("");
                  setNounG("");
                  setStage(1);
              }
            }}
          >
            {stage === 1
              ? "Choose nouns"
              : stage === 2
              ? "Reveal nouns"
              : "Remove nouns"}
          </Button>
        </div>
      </Container>
    </div>
  );
}
// <div
//   style={{
//     height: "100vh",
//     backgroundColor: "#282c34",
//     color: "white",
//   }}
// >
//   hej
// </div>

export default App;
