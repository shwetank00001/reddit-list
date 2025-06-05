import "./SubRedditCard.css";

const SubRedditCard = (prop) => {
  return (
    <div>
      <div className="sidebar">
        <a target="_blank" href={`https://www.reddit.com/r/learnprogramming/comments/${prop.idProp}/${prop.valueProp}/`}>{prop.valueProp}</a>
        {/* <p>{prop.idProp}</p> */}
      </div>
      
    </div>
  );
};

export default SubRedditCard;
