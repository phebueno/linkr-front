import styled from "styled-components";
import AddPost from "../../components/AddPost";
import HeaderWithSearch from "../../components/HeaderWithSearch";
import TooltipLikes from "../../components/TooltipLikes.js";
import UserPost from "../../components/UserPost";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import Trending from "../../components/Trending";
import api from "../../services/api";
import LoadingSkeleton from "../../components/LoadingSkeleton.js";
import { useInterval } from "../../hooks/useInterval.js";
import { TfiReload } from "react-icons/tfi";
import InfiniteScroll from "react-infinite-scroller";

export default function Timeline() {
  const { token } = useContext(AuthContext);

  const [postsData, setPostsData] = useState(undefined);
  const [seconds, setSeconds] = useState(0);
  const [newPostNumber, setNewPostNumber] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  useInterval(() => {
    setSeconds(seconds + 1);
    if (seconds === 15) {
      if (postsData) {
        api
          .getNewPostsCount(token, {
            lastCreatedAt: postsData[0].post.createdAt,
          })
          .then((res) => setNewPostNumber(Number(res.data.count)))
          .catch((err) => console.log(err));
      }
      setSeconds(0);
    }
  });

  function getUserAndPostsData(firstPost, pageRef, partialUpdate) {
    const query = {firstPost, page:pageRef+1};
    setLoadMore(false);
    api
      .getPosts(token, query)
      .then((res) => {
        //se não tiver post de referência, foi requisição de atualização
        let newPosts = '';
        if(firstPost){
            newPosts = postsData.concat(res.data);
            setPage(page+1)
        }
        else{
            newPosts = res.data;
            setNewPostNumber(0);
            setPage(1);
        }
        setPostsData(newPosts);
        //se receber a última requisição vazia, não carrega mais posts
        res.data.length!==0 ? setLoadMore(true) : setLoadMore(false);        
      })
      .catch((err) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        setLoadMore(false);
      });
  }

  useEffect(() => {
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
              <LoadPostsBtn onClick={()=>getUserAndPostsData()}>
                {newPostNumber} new posts, load more!{" "}
                <TfiReload style={{ fontSize: "25px" }} />
              </LoadPostsBtn>
            )}
            {!postsData && <LoadingSkeleton />}

            {postsData && postsData.length === 0 ? (
              <Message>There are no posts yet</Message>
            ) : (
              postsData && (
                <InfiniteScroll
                  pageStart={page}
                  loadMore={()=>getUserAndPostsData(postsData[0].post.id, page)}
                  hasMore={loadMore}
                >
                  {postsData.map((postData, index) => (
                    <UserPost
                      postData={postData}
                      key={index}
                      updatePostData={getUserAndPostsData}
                      page={page}
                      firstPost={postsData[0].post.id}
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
