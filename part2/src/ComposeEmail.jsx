import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

// Dummy data for email suggestions
const emailSuggestions = [
  "john.doe@example.com",
  "jane.smith@example.com",
  "bob.jones@example.com",
  // Add more email suggestions as needed
];

const ComposeEmail = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Function to get suggestions based on user input
  const getSuggestions = (input) => {
    const inputValue = input.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : emailSuggestions.filter(
          (email) => email.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Function to render suggestion
  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  // Autosuggest input properties
  const inputProps = {
    placeholder: "To",
    value,
    onChange: (_, { newValue }) => setValue(newValue),
  };

  // Autosuggest onSuggestionsFetchRequested method
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest onSuggestionsClearRequested method
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest onSuggestionSelected method
  const onSuggestionSelected = (_, { suggestionValue }) => {
    // Handle selected suggestion (e.g., add to recipients list)
    console.log(`Selected email: ${suggestionValue}`);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default ComposeEmail;
