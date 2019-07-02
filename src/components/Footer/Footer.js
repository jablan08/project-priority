import React from 'react';
import styled from "styled-components";

const FootContainer = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid #efefef;
    padding: 1.5rem 0;

`


const Footer = () => 
    <FootContainer>
        <div>
            This site was inspired by <a href="https://canny.io/">Canny.io</a> and was built purely for educational purposes.
        </div>
    </FootContainer>


export default Footer