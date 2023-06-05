import styled from "styled-components";
import { Link } from "react-router-dom";

export const HASHTAG_FORMATTER = string => {
    return string.split(/((?:^|\s)(?:#[a-záàâãéèêíïóôõöúçñ\d-]+))/gi).filter(Boolean).map((v,i)=>{
      if(v.includes('#')){
        return <StyledHashtag key={i} to={`/hashtag/${v.trim().replace("#",'')}`}>{v}</StyledHashtag>
      }   else{
        return v
      }
    })
  };

  const StyledHashtag = styled(Link)`
  text-decoration:none;
  font-weight:700;
  color: #FFFFFF;
`;