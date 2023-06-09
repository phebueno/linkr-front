import styled from "styled-components";
import AddPost from "../../components/AddPost";
import HeaderWithSearch from "../../components/HeaderWithSearch";
import TooltipLikes from "../../components/TooltipLikes.js";
import UserPost from "../../components/UserPost";
import Trending from "../../components/Trending";
import api from "../../services/api";
import LoadingSkeleton from "../../components/LoadingSkeleton.js";
import { TfiReload } from "react-icons/tfi";
import InfiniteScroll from "react-infinite-scroller";
import useGetPostsData from "../../hooks/useGetPostsData.js";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext.js";
import { useState } from "react";


export default function Timeline() {
  const { token } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  
  const {
    newPostNumber,
    getUserAndPostsData,
    postsData,
    page,
    loadMore,
    setPostsData,
  } = useGetPostsData(api.getPosts);
  
  useEffect(() => {

    api
      .followers(token)
      .then(res => {
        setFollowers(res.data)
      })
      .catch(() => console.log("Deu errado"))

    getUserAndPostsData();
    // eslint-disable-next-line
  }, []);

  return (
    <PageContainer>
      <HeaderWithSearch />
      <main>
        <Title>timeline</Title>
        <MainContainer>
          <Container>
            <AddPost></AddPost>
            {newPostNumber !== 0 && (
              <LoadPostsBtn onClick={() => getUserAndPostsData()}>
                {newPostNumber} new posts, load more!{" "}
                <TfiReload style={{ fontSize: "25px" }} />
              </LoadPostsBtn>
            )}
            {!postsData && <LoadingSkeleton />}

            {followers.length === 0 && postsData && postsData.length === 0 ? (
              <Message data-test="message">You don't follow anyone yet. Search for new friends!</Message>

            ) : (
              postsData && (
                <InfiniteScroll
                  pageStart={page}
                  loadMore={() =>
                    getUserAndPostsData(postsData[0].post.id, page)
                  }
                  hasMore={loadMore}
                  loader={<LoadingSkeleton />}
                >
                  {postsData.map((postData, index) => (
                    <UserPost
                      postInfo={postData}
                      key={index}
                      updatePostData={getUserAndPostsData}
                      postsData={postsData}
                      setPostsData={setPostsData}
                    />
                  ))}
                </InfiniteScroll>
              )
            )}
            {postsData && postsData.length === 0 && followers.length > 0 ? <Message>No posts found from your friends</Message> : ""}
            <TooltipLikes />
          </Container>
          <Trending />
        </MainContainer>
      </main>
    </PageContainer>
  );
}

const LoadPostsBtn = styled.button`
  cursor: pointer;
  width: 100%;
  height: 61px;
  margin-bottom: 17px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  font-family: "Lato";
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  @media (max-width: 611px) {
    border-radius: 0;
  }
`;

const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 25px;
  @media (max-width: 950px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 50vw;
  max-width: 611px;
  margin: 0px auto;
  @media (max-width: 950px) {
    width: 100%;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 950px) {
    main {
      width: 100%;
    }
  }
`;

const Title = styled.div`
  display: flex;
  margin-top: 135px;
  margin-bottom: 41px;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
  img {
    margin-left: 20px;
    margin-right: 20px;
    width: 53px;
    height: 53px;
    border-radius: 53px;
    object-fit: cover;
  }
  @media (max-width: 950px) {
    padding-left: 17px;
  }
  @media (max-width: 611px) {
    margin-top: 90px;
    font-size: 33px;
  }
`;

const Message = styled.div`
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
`;
