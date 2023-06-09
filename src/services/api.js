import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function createConfig(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

function createQuery(query){
    if(query.firstPost && query.page){
        return `?firstPost=${query.firstPost}&page=${query.page}`;
    };
    return '';
}

//Criar as requisições HTTP para o nosso back
function getPosts(token, query) {
    const querySearch = createQuery(query);
    const config = createConfig(token);
    const promise = axios.get(`${BASE_URL}/posts${querySearch}`, config);
    return promise;
}

function addPost(token, body) {
    const config = createConfig(token);
    const promise = axios.post(`${BASE_URL}/new-post`, body, config);
    return promise;
}

function getMetadata(url) {
    const promise = axios.get(`https://jsonlink.io/api/extract?url=${url}`);
    return promise;
}

function likePost(token, postId) {
    const config = createConfig(token);
    const promise = axios.post(`${BASE_URL}/like/${postId}`, null, config);
    return promise;
}

function dislikePost(token, postId) {
    const config = createConfig(token);
    const promise = axios.delete(`${BASE_URL}/dislike/${postId}`, config);
    return promise;
}

function getTrending() {
    const promise = axios.get(`${BASE_URL}/trendingtags`)
    return promise;
}

function getHashtagPosts(token, query, hashtagName) {
    const config = createConfig(token);
    const querySearch = createQuery(query);
    const promise = axios.get(`${BASE_URL}/hashtag/${hashtagName}${querySearch}`, config)
    return promise;
}

function getUserBySearchBar(token, body) {
    const config = createConfig(token);
    const promise = axios.post(`${BASE_URL}/search`, body, config)
    return promise;
}

function getPostsByUserId(token, query, userId) {
    const config = createConfig(token);
    const querySearch = createQuery(query);
    const promise = axios.get(`${BASE_URL}/user/${userId}${querySearch}`, config)
    return promise
}

function deletePostById(token, postId) {
    const config = createConfig(token);
    const promise = axios.delete(`${BASE_URL}/delete/${postId}`, config)
    return promise
}

function editPostById(token, body, postId) {
    const config = createConfig(token);
    const promise = axios.patch(`${BASE_URL}/update/${postId}`, body, config)
    return promise
}


function followUser(token, body) {
    const config = createConfig(token)
    const promise = axios.post(`${BASE_URL}/follow`, body, config)
    return promise
}

function unfollowUser(token, body) {
    const config = createConfig(token)
    const promise = axios.post(`${BASE_URL}/unfollow`, body, config)
    return promise
}

function followers(token) {
    const config = createConfig(token)
    const promise = axios.get(`${BASE_URL}/followers`, config)
    return promise
}

function getNewPostsCount(token, body) {
    const config = createConfig(token);
    const promise = axios.post(`${BASE_URL}/check/new-posts`, body, config)
    return promise
}

const api = {
    getPosts,
    addPost,
    getMetadata,
    likePost,
    dislikePost,
    getTrending,
    getHashtagPosts,
    getUserBySearchBar,
    getPostsByUserId,
    deletePostById,
    editPostById,
    followUser,
    unfollowUser,
    followers,
    getNewPostsCount
}

export default api;