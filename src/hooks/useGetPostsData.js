import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext.js";
import api from "../services/api.js";
import { useInterval } from "./useInterval.js";

export default function useGetPostsData(getDataFunction, args) {
  const [postsData, setPostsData] = useState(undefined);
  const [seconds, setSeconds] = useState(0);
  const [newPostNumber, setNewPostNumber] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const { token } = useContext(AuthContext);
  //Função que checa por novos posts
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
    const query = { firstPost, page: pageRef + 1 };
    console.log(query);
    setLoadMore(false);
    getDataFunction(token, query, args)
      .then((res) => {
        //se não tiver post de referência, foi requisição de atualização
        console.log('a');
        let newPosts = "";
        if (firstPost) {
          newPosts = postsData.concat(res.data);
          setPage(page + 1);
        } else {
          newPosts = res.data;
          setNewPostNumber(0);
          setPage(1);
        }
        setPostsData(newPosts);
        //se receber a última requisição vazia, não carrega mais posts
        res.data.length !== 0 ? setLoadMore(true) : setLoadMore(false);
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

  return {
    newPostNumber,
    getUserAndPostsData,
    postsData,
    page,
    loadMore,
    setPostsData,
  };
}
