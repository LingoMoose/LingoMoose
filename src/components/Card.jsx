const Card = (props) => {
    return ( 
        <div>
            <img src={props.url} alt="" />
            <h2>{props.title}</h2>
            <p>{props.des}</p>
        </div>
     );
}
 
export default Card;