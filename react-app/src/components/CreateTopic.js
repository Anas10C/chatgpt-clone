import React, { useState } from 'react';
import styled from 'styled-components';
import client from '../Api'
import { useNavigate } from "react-router-dom";

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: #f2f2f2;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SliderLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 10px;
  border-radius: 10px;
  background-color: #f2f2f2;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #2ecc71;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background-color: #2ecc71;
    cursor: pointer;
  }
`;

const SubmitButton = styled.input`
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #2ecc71;
  color: #ffffff;
  cursor: pointer;
`;

const CreateTopic = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(parseFloat(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      temperature: value
    };
    client.post("", data)
      .then(response => {
        console.log(response);
        navigate("/chat");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <InputWrapper>
        <InputLabel>Name:</InputLabel>
        <InputField type="text" value={name} onChange={handleNameChange} />
      </InputWrapper>
      <SliderWrapper>
        <SliderLabel>Temp:</SliderLabel>
        <Slider type="range" min={0} max={0.9} step={0.1} value={value} onChange={handleValueChange} />
        <span>{value}</span>
      </SliderWrapper>
      <SubmitButton type="submit" value="create"/>
    </Wrapper>
  );
};

export default CreateTopic;
