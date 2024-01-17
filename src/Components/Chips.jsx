import React, { useState, useRef, useEffect } from "react";
import "./Chips.css";

const Chips= () => {
  const [inputValue, setInputValue] = useState("");
  const [inputClick, setInputClick] = useState(false);
  const [chips, setChips] = useState([]);
  const [items, setItems] = useState([ 
      { name: "Piyush Chavhan", email: "piyushchauhan@gmail.com" },
      { name: "Vijay pal", email: "vijaypal104@gmail.com" },
      { name: "Ankit Singh", email: "ankitsingh04@gmail.com" },
      { name: "Shubham Agraval", email: "shubhamaagawane05@gmail.com" },
  ]);
  const inputRef = useRef(null);
  const [backspaceCount, setBackspaceCount] = useState(0);
  // Adding input value in inputValue state
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, { name: item.name, email: item.email }]); 
    setItems(items.filter((i) => i !== item));
    setInputValue("");
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter((c) => c !== chip));

    setItems([...items, { name: chip.name, email: chip.email }]);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Backspace" && inputValue === "") {
      // Increase the Backspace count on Backspace press when input is empty
      setBackspaceCount((prevCount) => prevCount + 1);
      if (chips.length === 0) {
        setBackspaceCount(0);
        return;
      }
      if (backspaceCount === 1) {
        // On the second Backspace press, remove the last chip
        const lastChip = chips[chips.length - 1];
        handleChipRemove(lastChip);
        // Reset the Backspace count
        setBackspaceCount(0);
      }
    } else {
      setBackspaceCount(0);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="box-container">
      <div className="box">
        <div className="chips">
          {chips.map((chip, index) => (
            <div
              key={index}
              className={`chip ${
                backspaceCount === 1 && chips.length - 1 === index
                  ? "chipHigth"
                  : ""
              }`}
            >
              <span id="nameIcon0">{chip.name[0]}</span>{" "}
              <span>{chip.name}</span>
              <span
                className="chip-remove"
                onClick={() => handleChipRemove(chip)}
              >
                X
              </span>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onClick={(e) => {
              setInputClick(true);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search"
            className="input"
          />
        </div>
      </div>
      {(inputValue || inputClick) && (
        <div className="item-list">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item, index) => (
              <div
                key={index}
                className="item"
                onClick={() => {
                  handleItemClick(item);
                  setInputClick(false);
                  setBackspaceCount(0);
                }}
              >
                <p>
                  <span id="nameIcon">{item.name[0]}</span>{" "}
                  <span id="listName">{item.name}</span>
                  <span id="listEmail">{item.email}</span>
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Chips;