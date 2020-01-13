import React from 'react';
import styled from "styled-components";

const Input = styled.input`
  display: block;
  margin: 40px auto;
  margin-top: 0px;
  width: 400px;
  height: 55px;
  border: none;
  background: #efefef;
  font-size: 18px;
  text-indent: 15px;

  :hover {
    filter: brightness(98%);
  }
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  bottom-margin: 10px;
`;

const TicketForm = () => {

    return (
        <>
            <Title>Billetter</Title>
            <h5>Pris</h5>
            <Input
                placeholder='Pris'
            />

            <h5>Billett-type</h5>
            <Input
                placeholder='Type'
            />
        </>
    );
};

export default TicketForm;
