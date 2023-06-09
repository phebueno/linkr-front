import api from "../services/api";
import { useState } from "react";
import styled from "styled-components";

export default function Comment({ data }) {

    return (
        <CommentContainer>
            <img src={data.image}></img>
            <Description>
                <p>{data.username}</p>
                <span>{data.comment}</span>
            </Description>
        </CommentContainer>
    )
}

const CommentContainer = styled.div`
    display: flex;
    align-items: center;
    width: 92%;
    height: auto;
    border-top:1px solid #353535;
    border-bottom: 1px solid #353535;
    margin-left: 25px;
    margin-right: 18px;
    padding-bottom: 18px;
    padding-top: 22px;
    img{
        width: 39px;
        height: 39px;
        border-radius: 39px;
        object-fit: cover;
        margin-right: 18px;
    }
`

const Description = styled.div`
    font-family: 'Lato',sans-serif;
    font-style: normal;
    font-size:14px;
    line-height: 17px;
    span{
        color: #ACACAC;
        font-weight: 400;
    }
    p{
        color: #F3F3F3;
        font-weight: 700;
        margin-bottom: 3px;
    }
`