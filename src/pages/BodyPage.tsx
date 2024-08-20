import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ChoiceButtons from "../components/ChoiceButtons";
import { ObjectQuestions } from "../Data/ObjectQuestions";

interface BodyPageProps {}

interface Answer {
  questionId: number;
  answer: string;
  value: number;
}

const BodyPage: React.FC<BodyPageProps> = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<{ [key: string]: number | null }>({
    E: null,
    A: null,
    C: null,
    N: null,
    O: null,
  });
  const [solution, setSolution] = useState<{ [key: string]: string | null }>({
    E: null,
    A: null,
    C: null,
    N: null,
    O: null,
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);

  const questionGroups = {
    E: [1, 6, 11, 16, 21, 26, 31, 36, 41, 46],
    A: [2, 7, 12, 17, 22, 27, 32, 37, 42, 47],
    C: [3, 8, 13, 18, 23, 28, 33, 38, 43, 48],
    N: [4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
    O: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  };

  const handleAnswerSelect = (
    questionId: number,
    choice: string,
    value: number
  ) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );
      if (existingAnswerIndex > -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          questionId,
          answer: choice,
          value,
        };
        return updatedAnswers;
      } else {
        return [...prevAnswers, { questionId, answer: choice, value }];
      }
    });
  };

  useEffect(() => {
    if (answers.length > 0) {
      calculateResults();
    }
  }, [answers]);

  const calculateResults = () => {
    const newResults: { [key: string]: number | null } = {};
    const newSolution: { [key: string]: string | null } = {};

    Object.keys(questionGroups).forEach((key) => {
      const groupIds = questionGroups[key as keyof typeof questionGroups];
      let score =
        key === "E"
          ? 20
          : key === "A"
          ? 14
          : key === "C"
          ? 14
          : key === "N"
          ? 38
          : 8;
      let solutionStr = `= ${
        key === "E"
          ? 20
          : key === "A"
          ? 14
          : key === "C"
          ? 14
          : key === "N"
          ? 38
          : 8
      }`;

      groupIds.forEach((id, index) => {
        const answer = answers.find((ans) => ans.questionId === id);
        if (answer) {
          const operator = index % 2 === 0 ? "+" : "-";
          score += index % 2 === 0 ? answer.value : -answer.value;
          solutionStr += ` ${operator} (${id}) ${
            index % 2 === 0 ? answer.value : -answer.value
          }`;
        }
      });

      newResults[key] = score;
      newSolution[key] = solutionStr + ` = ${score}`;
    });

    setResults(newResults);
    setSolution(newSolution);
  };

  const handleSubmit = () => {
    if (answers.length < ObjectQuestions.length) {
      setWarning("Please answer all the questions before submitting.");
      return;
    } else {
      setShowThankYou(true);
    }

    // Reset warning
    setWarning(null);
  };

  const saveResult = () => {
    // Define the correct password
    const correctPassword = "beeseeglobal2024"; // Replace with your desired password

    // Prompt the user to enter the password
    const enteredPassword = prompt(
      "Please enter the password to download the result:"
    );

    // Check if the entered password matches the correct password
    if (enteredPassword === correctPassword) {
      // Construct the content for the notepad file
      const content = `
        Answers:\n${answers
          .map((answer) => `Question ${answer.questionId}: ${answer.answer}`)
          .join("\n")}

        Results:\n${Object.keys(results)
          .map((key) => `${key}: ${results[key]}`)
          .join("\n")}

        Solutions:\n${Object.keys(solution)
          .map((key) => `${key}: ${solution[key]}`)
          .join("\n")}
      `;

      // Create a Blob with the content and save it as a .txt file
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "test_results.txt";
      link.click();
      URL.revokeObjectURL(url);

      // Show results and solutions
      setShowResults(true);
      setShowButton(true);
    } else {
      // Notify the user of an incorrect password
      alert("Incorrect password. Download not allowed.");
    }
  };

  if (showThankYou) {
    return (
      <div className="d-flex flex-column align-items-center py-5 vh-100 ">
        <h1 className="text-success">Thank You!</h1>
        <p>Your responses have been submitted successfully.</p>

        {showResults && (
          <div className="text-center mt-4">
            <h3>Results:</h3>
            <pre className="">
              {Object.keys(results)
                .map((key) => `${key}: ${results[key]}`)
                .join("\n")}
            </pre>

            {/* <h3>Solutions:</h3>
            <pre>
              {Object.keys(solution)
                .map((key) => `${key}: ${solution[key]}`)
                .join("\n")}
            </pre> */}
          </div>
        )}
        {showButton ? (
          ""
        ) : (
          <button className="btn btn-primary mt-4" onClick={saveResult}>
            Admin use
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className="">
        <div
          className="border border-primary rounded d-flex flex-column align-items-center py-3"
          style={{ backgroundColor: "white" }}
        >
          <h1 className="fs-1 mb-3">Anger Management Test</h1>
          <div className="d-flex gap-3">
            <div
              className="border border-danger rounded py-2 px-3"
              style={{ backgroundColor: "#E31915", color: "white" }}
            >
              20 QUESTIONS
            </div>
            <div
              className="border border-danger rounded py-2 px-3"
              style={{ backgroundColor: "#FF6928", color: "white" }}
            >
              3 MINUTES
            </div>
          </div>
          <div className="my-3" style={{ backgroundColor: "#E31915" }}>
            <div
              className="fs-5 d-flex flex-column align-items-center justify-content-center gap-2 text-center w-75 mx-auto"
              style={{
                minHeight: "200px",
                color: "white",
              }}
            >
              <h4>Do anger issues get the best of me?</h4>
              <p>
                Everyone experiences occasional bouts of frustration, anger, and
                even rage. The ability to recognize and control anger issues
                when they emerge is a key skill for healthy functioning in
                relationships, work, and life. Take this test to learn if you
                manage anger effectively.
              </p>
            </div>
          </div>
          <div className="fs-5 d-flex flex-column align-items-center justify-content-center gap-2 text-center w-50 mb-3 mx-auto">
            Using the key below, answer the questions based on how <br />{" "}
            strongly you agree or disagree with the statement.
          </div>

          <div className="w-50 d-flex flex-column">
            <div
              className="d-flex justify-content-between rounded py-2 px-3 fs-5 mb-2"
              style={{ backgroundColor: "#FF6928", color: "white" }}
            >
              <div>DISAGREE</div>
              <div>NEUTRAL</div>
              <div>AGREE</div>
            </div>

            {ObjectQuestions.map((item) => (
              <Container
                key={item.index}
                className="border-bottom"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <p className="fs-5 mb-4">
                  <strong className="text-center mx-auto d-flex flex-column align-items-center justify-content-center">
                    {item.index}. {item.question}
                  </strong>
                </p>
                <ChoiceButtons
                  onAnswerSelect={(choice: any, value: number) =>
                    handleAnswerSelect(item.index, choice, value)
                  }
                />
                <div className="d-flex justify-content-between w-75 mt-2 fs-6">
                  <strong>DISAGREE</strong>
                  <strong>AGREE</strong>
                </div>
              </Container>
            ))}
            {/* Warning message */}
            {warning && (
              <div className="alert alert-danger mt-3" role="alert">
                {warning}
              </div>
            )}
            <button className="btn btn-primary mt-4" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default BodyPage;
