import React, { useState } from "react";
import "./App.css"; // You can add your own CSS for styling

const AutoCompleteChips = () => {
  const initialItems = ["Apple", "Banana", "Orange", "Mango", "Grapes"];
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setItems(items.filter((i) => i !== item));
    setInputValue("");
  };

  const handleChipRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setItems([...items, item]);
  };

  return (
    <div>
      <div>
        {selectedItems.map((item) => (
          <div key={item} className="chip">
            {item}
            <span className="remove" onClick={() => handleChipRemove(item)}>
              X
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      <ul>
        {items
          .filter((item) =>
            item.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((item) => (
            <li key={item} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AutoCompleteChips;
