import { Container } from "react-bootstrap";
import { useState } from "react";

interface ChoiceButtonsProps {
  onAnswerSelect: (choice: string, value: number) => void;
}

type Choice =
  | "Strongly Disagree"
  | "Disagree"
  | "Neutral"
  | "Agree"
  | "Strongly Agree";

const choices: Choice[] = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ onAnswerSelect }) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  const handleClick = (choice: Choice) => {
    setSelectedChoice(choice);
    const choiceValue = getChoiceValue(choice);
    onAnswerSelect(choice, choiceValue);
  };

  const getChoiceValue = (choice: Choice): number => {
    switch (choice) {
      case "Strongly Disagree":
        return 1;
      case "Disagree":
        return 2;
      case "Neutral":
        return 3;
      case "Agree":
        return 4;
      case "Strongly Agree":
        return 5;
      default:
        return 0;
    }
  };

  const getButtonColor = (choice: Choice) => {
    switch (choice) {
      case "Strongly Disagree":
      case "Disagree":
        return "#E31915";
      case "Neutral":
        return "#FFB800";
      case "Agree":
      case "Strongly Agree":
        return "#FF6928";
      default:
        return "#977219";
    }
  };

  const getButtonSize = (choice: Choice) => {
    switch (choice) {
      case "Strongly Agree":
      case "Strongly Disagree":
        return { width: "90px", height: "90px" };
      case "Agree":
      case "Disagree":
        return { width: "70px", height: "70px" };
      case "Neutral":
        return { width: "50px", height: "50px" };
      default:
        return { width: "60px", height: "60px" };
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      {choices.map((choice, index) => {
        const size = getButtonSize(choice);
        const isSelected = selectedChoice === choice;
        const innerCircleSize = 0.6;

        return (
          <button
            key={index}
            onClick={() => handleClick(choice)}
            className="mx-3 position-relative"
            style={{
              width: size.width,
              height: size.height,
              backgroundColor: getButtonColor(choice),
              color: "#fff",
              border: "1px solid white",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: isSelected ? "bold" : "normal",
              borderColor: isSelected ? getButtonColor(choice) : "white",
              position: "relative",
            }}
          >
            {isSelected && (
              <span
                style={{
                  width: `${innerCircleSize * 100}%`,
                  height: `${innerCircleSize * 100}%`,
                  backgroundColor: getButtonColor(choice),
                  borderRadius: "50%",
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                }}
              />
            )}
            <span
              style={{
                width: "100%",
                height: "90%",
                backgroundColor: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              {/* {choice.split(" ")[0]} */}
            </span>
          </button>
        );
      })}
    </Container>
  );
};

export default ChoiceButtons;
