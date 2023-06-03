import styled from "styled-components";
import HeaderWithSearch from "../../components/HeaderWithSearch";
import { useParams } from "react-router-dom"
import UserPost from "../../components/UserPost";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import Trending from "../../components/Trending";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function UserPage() {

    const { id } = useParams()
    const { token } = useContext(AuthContext);

    const [postsData, setPostsData] = useState([])
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const promise = api.getPostsByUserId(token,id)

        promise.then((res) => {
            setPostsData(res.data.posts)
            setUserData(res.data.user)
            console.log(res.data.posts)
        })

        promise.catch((err) => {
            alert(err.message)
        })

    }, [])

    return (
        <PageContainer>
            <HeaderWithSearch />
            <main>
                <Title><img src={userData.image}></img>{userData.username}'s posts</Title>
                <MainContainer>
                    <Container>
                        {postsData &&
                            postsData.map((postData) => (
                                <UserPost postData={postData} key={postData.post.id} />
                            ))}
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
