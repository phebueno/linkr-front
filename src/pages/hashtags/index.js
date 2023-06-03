import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import HeaderWithSearch from "../../components/HeaderWithSearch.js";
import Trending from "../../components/Trending.js";
import UserPost from "../../components/UserPost.js";
import AuthContext from "../../contexts/AuthContext.js";
import useKickOut from "../../hooks/useKickOut.js";
import api from "../../services/api.js";

export default function Hashtags() {
  const { hashtag } = useParams();
  const [postsData, setPostsData] = useState(undefined);
  const { token } = useContext(AuthContext);
  useKickOut();
  function getPostData() {
    api
      .getHashtagPosts(token, hashtag)
      .then((res) => {
        setPostsData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getPostData();
    // eslint-disable-next-line
  }, [hashtag]);

  return (
    <PageContainer>
      <HeaderWithSearch />
      <main>
        <Title># {hashtag}</Title>
        <MainContainer>
          <Container>
            {postsData &&
              postsData.map((postData) => (
                <UserPost
                  postData={postData}
                  key={postData.post.id}
                  updatePostData={getPostData}
                />
              ))}
              <TooltipStyle id="my-tooltip" /> 
          </Container>
          <Trending />
        </MainContainer>
      </main>
    </PageContainer>
  );
}

const TooltipStyle = styled(Tooltip)`
  font-family: 'Lato';
  background-color:#FFFFFF;
  color: #505050;
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 25px;
`;

const Container = styled.div`
  width: 50vw;
  max-width: 611px;
  margin: 0px auto;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  margin-top: 135px;
  margin-bottom: 41px;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
`;
