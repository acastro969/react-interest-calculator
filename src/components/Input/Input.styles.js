import styled from 'styled-components';

export const Input = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 4px;
`;

export const Field = styled.input`
  border-radius: 2px;
  font-size: 16px;
  border: none;
  padding: 4px;
  margin-bottom: 4px;
`;

export const ErrorMessage = styled.p`
  color: orangered;
  margin-top: 0;
  margin-bottom: 24px;
`;