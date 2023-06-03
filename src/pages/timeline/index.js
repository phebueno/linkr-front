import styled from "styled-components";
import AddPost from "../../components/AddPost";
import HeaderWithSearch from "../../components/HeaderWithSearch";
import TooltipLikes from "../../components/TooltipLikes.js";
import UserPost from "../../components/UserPost";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import Trending from "../../components/Trending";
import api from "../../services/api";

export default function Timeline() {

    const { token } = useContext(AuthContext);

    const [postsData, setPostsData] = useState([])

    function getUserAndPostsData() {
        api
            .getPosts(token)
            .then((res) => {
                setPostsData(res.data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    useEffect(() => {
        getUserAndPostsData();
        // eslint-disable-next-line
    }, [])

    //teste
    //Fazer a requisição e armazenar em postsData

    return (
        <PageContainer>
            <HeaderWithSearch />
            <main>
                <Title>timeline</Title>
                <MainContainer>
                    <Container>
                        <AddPost></AddPost>
                        {postsData &&
                            postsData.map((postData) => (
                                <UserPost postData={postData} key={postData.post.id} updatePostData={getUserAndPostsData} />
                            ))}
                        <TooltipLikes />
                    </Container>
                    <Trending />
                </MainContainer>
            </main>
        </PageContainer>
    )
}
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
  img{
    margin-left: 20px;
    margin-right: 20px;
    width: 53px;
    height: 53px;
    border-radius: 53px;
    object-fit: cover;
  }
`;
