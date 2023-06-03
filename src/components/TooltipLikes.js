import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export default function TooltipLikes(){
    return(<TooltipStyle id="my-tooltip" />)
}

const TooltipStyle = styled(Tooltip)`
  font-family: 'Lato';
  background-color:#FFFFFF;
  color: #505050;
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
`;