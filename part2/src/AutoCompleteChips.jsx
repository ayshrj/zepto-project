import React, { useState, useRef, useEffect } from "react";
import "./AutoComplete.css";
import items from "./Items";

const AutoComplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [availableItems, setAvailableItems] = useState(items);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [chipWidths, setChipWidths] = useState([]);
  const chipRefs = useRef([]);
  const inputRef = useRef();
  const inputBoxRef = useRef();

  const updateChipRefs = () => {
    chipRefs.current = chipRefs.current.slice(0, selectedItems.length);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [inputValue]);

  useEffect(() => {
    updateChipRefs();
    const widths = chipRefs.current.map((chipRef) => chipRef.offsetWidth);
    setChipWidths(widths);
  }, [selectedItems]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setHighlightedIndex(-1);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(availableItems.filter((i) => i !== item));
    setInputValue("");
  };

  const handleChipRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setAvailableItems([...availableItems, item]);
  };

  const handleKeyDown = (e) => {
    const lastIndex = filteredItems().length - 1;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : lastIndex));
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < lastIndex ? prev + 1 : 0));
        break;
      case "Enter":
        if (highlightedIndex !== -1) {
          handleItemClick(filteredItems()[highlightedIndex]);
        }
        break;
      case "Backspace":
        if (inputValue === "" && selectedItems.length > 0) {
          handleChipRemove(selectedItems[selectedItems.length - 1]);
        }
        break;
      default:
        break;
    }
  };

  const filteredItems = () => {
    return availableItems
      .filter(
        (item) => item && item.toLowerCase().includes(inputValue.toLowerCase())
      )
      .sort();
  };

  const inputAreaLeft = () => {
    if (chipWidths.length === 0) return 270;
    let curr = 0;

    for (let i = 0; i < chipWidths.length; ++i) {
      if (curr + chipWidths[i] < 270) {
        curr = curr + chipWidths[i];
      } else {
        curr = chipWidths[i];
      }
    }
    return 270 - curr;
  };

  const offsetForDropDown = () => {
    if (chipWidths.length === 0) return 0;
    let curr = 270;

    for (let i = 0; i < chipWidths.length; ++i) {
      if (curr + chipWidths[i] < 270) {
        curr = curr + chipWidths[i];
      } else {
        curr = chipWidths[i];
      }
    }

    console.log(curr);

    return curr;
  };

  return (
    <div className="auto-complete">
      <div className="chips" ref={inputBoxRef}>
        {selectedItems.map((item, index) => (
          <div
            key={item}
            className="chip"
            ref={(el) => (chipRefs.current[index] = el)}
          >
            {item}
            <span onClick={() => handleChipRemove(item)}>&times;</span>
          </div>
        ))}
        <input
          style={{
            width: `${inputAreaLeft()}px`,
            padding: "8px",
            fontSize: "16px",
            border: "none",
            outline: "none",
          }}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </div>
      {inputValue.length > 0 && (
        <ul
          className="item-list"
          style={{ marginLeft: `${offsetForDropDown()}px` }}
        >
          {filteredItems().map((item, index) => (
            <li
              key={item}
              onClick={() => handleItemClick(item)}
              className={index === highlightedIndex ? "highlighted" : ""}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
