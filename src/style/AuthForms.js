import styled from 'styled-components';

const Card = styled.div`
  box-sizing: border-box;
  max-width: 25rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background: #6371c7;
  border-color: #3f4eae;
  border-radius: 3px;
  padding: 0.1rem;
  color: white;
  font-weight: 700;
  width: 10rem;
  margin: 1rem auto;
  font-size: 0.8rem;
  right: 0;
  cursor: pointer;
  
  &.logoutAll {
    margin-left: 15px;
  }
`;

const Error = styled.div`
  background-color: red;
`;

export { Form, Input, Button, Card, Error };