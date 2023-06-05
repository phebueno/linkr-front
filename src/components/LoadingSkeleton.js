import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

export default function LoadingSkeleton() {
  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <PostContainer data-test="post">
          <div>
            <Skeleton
              circle={true}
              style={{
                width: "53px",
                height: "53px",
              }}
            />
          </div>
          <Main>
            <h1>
              <Skeleton
                containerClassName="flex-1"
                style={{
                  width: "40%",
                }}
              />
            </h1>

            <p>
              <Skeleton />
            </p>
            <Skeleton
              style={{
                height: "150px",
              }}
            />
          </Main>
        </PostContainer>        
      </SkeletonTheme>
    </>
  );
}

const PostContainer = styled.div`
  display: flex;
  position: relative;
  padding: 20px;
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 15px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  color: #ffffff;
  div:first-child {
    img {
      width: 53px;
      height: 53px;
      border-radius: 53px;
      object-fit: cover;
    }
  }
  div {
    margin-right: 15px;
  }
  h1 {
    margin-bottom: 10px;
    cursor: pointer;
  }
  p {
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
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
`;

const Main = styled.div`
  width: 90%;
`;