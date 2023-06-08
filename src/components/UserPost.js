import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HASHTAG_FORMATTER } from "../utils/hashtagFormatter.js";
import { FaPencilAlt } from "react-icons/fa"
import DeletePostModal from "./DeletePostModal.js";
import AuthContext from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import EditPost from "./EditPost.js";
import getTooltipUsers from "../utils/getTooltipUsers.js";

export default function UserPost({ postInfo, updatePostData, postsData, setPostsData  }) {
    const [metadata, setMetadata] = useState({
        title:postInfo.post.url,
        description:postInfo.post.url,
        url:postInfo.post.url
    });
    const [postData, setPostData] = useState(postInfo);
    const [editMode, setEditMode] = useState(false);
    const { token, userAuthData } = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
        console.log('a');
        setPostData(postInfo);
        api
        .getMetadata(postData.post.url)
        .then(response => {
            if(
                !response.data.title ||
                !response.data.description ||
                !response.data.images
            )
                   return;
            const metadata = (response.data);
            setMetadata(metadata);
        })
       .catch(error => {
            console.error('Erro ao obter os metadados da URL:', error);
        });
    }, [postInfo]);

    const handleLike = async () => {
        try {
            if (postData.post.liked) {
                await api.dislikePost(token, postData.post.id)
                    .then(res => {
                        setPostData({
                            ...postData,
                            post: {
                              ...postData.post,
                              likes: postData.post.likes - 1,
                              liked: false,
                            },
                          });
                    }).catch(error => {
                        console.log(error);
                    });
            } else {
                await api.likePost(token, postData.post.id)
                    .then(res => {
                        setPostData({
                            ...postData,
                            post: {
                              ...postData.post,
                              likes: postData.post.likes + 1,
                              liked: true,
                            },
                          });
                    }).catch(error => {
                        console.log(error);
                    });
            }
        } catch (error) {
            console.error("Erro ao curtir ou descurtir o post:", error);
        }
    };

    function userPage(id) {
        navigate(`/user/${id}`)
    }
        
    return (
        <>
            {metadata.title &&
                <PostContainer data-test="post">
                    <div>
                        <img src={postData.image} alt={postData.username} />
                        <LikeContainer data-test="tooltip"
                            data-tooltip-id="my-tooltip" 
                            data-tooltip-content={getTooltipUsers(postData.post.liked, postData.post.likes, postData.post.diffUser)} 
                            data-tooltip-place="bottom"
                            onClick={handleLike}
                        >
                            {postData.post.liked ? <LikeIcon data-test="like-btn" /> : <NoLikeIcon data-test="like-btn"/>}
                            <p data-test="counter">{postData.post.likes} likes</p>
                        </LikeContainer>
                    </div>
                    <Main>
                        <PostHeader>
                            <h1 onClick={() => userPage(postData.id)}>{postData.username}</h1>
                            {userAuthData.username === postData.username ?
                                <span>
                                    <FaPencilAlt style={{cursor:"pointer"}} data-test="edit-btn" onClick={()=>setEditMode(!editMode)}/>
                                    <DeletePostModal postId={postData.post.id} updatePostData={updatePostData} postsData={postsData} setPostsData={setPostsData} />
                                </span>
                                : ""}

                        </PostHeader>
                        {!editMode ? 
                            <p>{HASHTAG_FORMATTER(postData.post.description)}</p>
                            : 
                            <EditPost postData={postData} setEditMode={setEditMode} setPostData={setPostData}/>
                        }                        
                        <MetadataUrl>
                            <div onClick={()=>(window.open(`${metadata.url}`))}>
                                <h1>{metadata.title}</h1>
                                <p>{metadata.description}</p>
                                <h2>{metadata.url}</h2>
                            </div>
                            <div>
                                {metadata.images && metadata.images.length > 0 && (
                                    <IMAGE src={metadata.images[0]} alt={metadata.title} />
                                )}
                            </div>
                        </MetadataUrl>
                    </Main>
                </PostContainer>
            }
        </>
    )
}



const IMAGE = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 0px 12px 13px 0px;
    object-fit: cover;
`

const MetadataUrl = styled.div`
    width: 100%;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    div:first-child{
        display: flex;
        flex-direction: column;
        width: 66%;
        padding: 15px;
        h1{
            font-size: 16px;
            line-height: 19px;
            color: #CECECE;
        }
        p{
            font-size: 11px;
            line-height: 13px;
            color: #9B9595;
        }
        h2{
            font-size: 11px;
            line-height: 13px;
            color: #CECECE;
        }
    }
    div:last-child{
        width: 33%;
        padding: 0;
        margin: 0;
    }
    @media (max-width:611px){
        div:first-child{
            h1{
                font-size: 11px;
            }
            p{
                font-size: 9px;
            }
            h2{
                font-size: 9px;
            }
        }
        div:last-child{
        max-width:300px;
    }
    
  }
`

export const LikeIcon = styled(AiFillHeart)`
    color: red;    
`;

export const NoLikeIcon = styled(AiOutlineHeart)`
    color: white;    
`;

const PostContainer = styled.div`
    display: flex;
    position: relative;
    padding: 20px;
    background: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 15px;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 19px;
    color: #FFFFFF;
    div:first-child{
        img{
            width: 53px;
            height: 53px;
            border-radius: 53px;
            object-fit: cover;
        }
    }
    div{
        margin-right: 15px;
    }
    h1{
        margin-bottom: 10px;
        cursor: pointer;
    }
    p{
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        margin-bottom: 10px;
    }
    @media (max-width:611px){
    border-radius:0;
    h1{
        font-size: 17px;
    }
    p{
        font-size: 15px;
    }
    div:first-child{
        img{
            width: 40px;
            height: 40px;
        }
    }
  }
`

const LikeContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
    p{
        font-size: 11px;
    }
    img{
        width: 53px;
        height: 53px;
        border-radius: 53px;
        object-fit: cover;
    }
    @media (max-width:611px){
    border-radius:0;    
    p{
        font-size: 9px;
    }
  }
`

const Main = styled.div`
    width: 90%;
`

const PostHeader = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    span{
        display:flex;
        gap: 10px;
        font-size: 20px;
    }
`;