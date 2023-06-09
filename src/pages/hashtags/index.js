import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router";
import styled from "styled-components";
import HeaderWithSearch from "../../components/HeaderWithSearch.js";
import LoadingSkeleton from "../../components/LoadingSkeleton.js";
import TooltipLikes from "../../components/TooltipLikes.js";
import Trending from "../../components/Trending.js";
import UserPost from "../../components/UserPost.js";
import useGetPostsData from "../../hooks/useGetPostsData.js";
import useKickOut from "../../hooks/useKickOut.js";
import api from "../../services/api.js";

export default function Hashtags() {
  const { hashtag } = useParams();
  useKickOut();

  const {
    getUserAndPostsData,
    postsData,
    page,
    loadMore,
    setPostsData,
  } = useGetPostsData(api.getHashtagPosts, hashtag);

  return (
    <PageContainer>
      <HeaderWithSearch />
      <main>
        <Title data-test="hashtag-title"># {hashtag}</Title>
        <MainContainer>
          <Container>
            {!postsData && <LoadingSkeleton />}

            {postsData && postsData.length === 0 ? (
              <Message>There are no posts yet</Message>
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
  @media (max-width: 950px) {
    padding-left: 17px;
  }
  @media (max-width: 611px) {
    margin-top: 90px;
    font-size: 33px;
    margin-top: 7;
  }
`;

const Message = styled.div`
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
`;