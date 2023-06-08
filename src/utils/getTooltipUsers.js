export default function getTooltipUsers(liked, likes, diffUser){
    let likeText = '' ;
    if(!likes) return likeText;
    if(liked) likeText+='Você';
    if(!diffUser) return likeText;
    if(!liked && likes>0) likeText=diffUser;
    if(liked && likes>1) likeText+=`, ${diffUser}`;
    const remainingLikes = liked ? likes-2 : likes-1;
    if(remainingLikes) {
        likeText += remainingLikes===1 ?  ` e outra 1 pessoa` : ` e outras ${remainingLikes} pessoas`;
    }
    return likeText; 
}