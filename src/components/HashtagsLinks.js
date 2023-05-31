import ReactHashtag from "react-hashtag";    
import styled from "styled-components";

export const HashtagLinks = (props) => (
    <ReactHashtag
    renderHashtag={(hashtagValue) => (
        <StyledHashtag
            href={`/hashtag/${hashtagValue.replace('#','')}`}
        >
            {hashtagValue}
        </StyledHashtag>
    )}
    >
        {props.children}
    </ReactHashtag>
);

const StyledHashtag = styled.a`
    text-decoration:none;
    font-weight:700;
    color: #FFFFFF;
`;