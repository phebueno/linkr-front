import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import api from "../services/api.js";

export default function Trending() {
  const navigate = useNavigate();
  const [links, setLinks] = useState(undefined);
  useEffect(() => {
    const promise = api.getTrending();
    promise.then((res) => {
      setLinks(res.data);
    });
    promise.catch((err) => {
      console.log(err.message);
      alert(
        "Algo deu errado no carregamento do site. Por favor, recarregue a página."
      );
    });
  });
  return (
    <TrendingContainer data-test="trending" >
      <h2>trending</h2>
      <TrendingContent>
        {links &&
          links.map((link, index) => (
            <li data-test="hashtag" key={index} onClick={() => navigate(`/hashtag/${link.hashtag}`)}>
              # {link.hashtag}
            </li>
          ))}
      </TrendingContent>
    </TrendingContainer>
  );
}

const TrendingContent = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: 0.05em;
  padding: 22px 15px;
  li{
    cursor:pointer;
  }
`;

const TrendingContainer = styled.aside`
  width: 301px;
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  color: #ffffff;
  h2 {
    height: 61px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 27px;
    border-bottom: 1px solid #484848;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }
  @media (max-width: 950px){
        display: none;
    }
`;
