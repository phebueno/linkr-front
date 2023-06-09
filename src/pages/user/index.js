import styled from "styled-components";
import HeaderWithSearch from "../../components/HeaderWithSearch";
import { useParams } from "react-router-dom";
import UserPost from "../../components/UserPost";
import api from "../../services/api";
import Trending from "../../components/Trending";
import TooltipLikes from "../../components/TooltipLikes.js";
import InfiniteScroll from "react-infinite-scroller";
import LoadingSkeleton from "../../components/LoadingSkeleton.js";
import useGetPostsData from "../../hooks/useGetPostsData.js";

export default function UserPage() {
  const { id } = useParams();

  const {
    newPostNumber,
    getUserAndPostsData,
    postsData,
    page,
    loadMore,
    setPostsData,
  } = useGetPostsData(api.getPostsByUserId, id);

  return (
    <PageContainer>
      <HeaderWithSearch />
      <main>
        <Title>
          <img src={postsData && postsData.user.image}></img>
          {postsData && postsData.user.username}'s posts
        </Title>
        <MainContainer>
          <Container>
            {!postsData && <LoadingSkeleton />}
            {
              postsData && (
                <InfiniteScroll
                  pageStart={page}
                  loadMore={() =>
                    getUserAndPostsData(postsData.posts[0].post.id, page)
                  }
                  hasMore={loadMore}
                  loader={<LoadingSkeleton />}
                >
                  {postsData.posts.map((postData, index) => (
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
            }
            <TooltipLikes />
          </Container>
          <Trending />
        </MainContainer>
      </main>
    </PageContainer>
  );
}

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
