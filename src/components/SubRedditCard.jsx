import "./SubRedditCard.css";

const SubRedditCard = ({ idProp, valueProp }) => {
  return (
    <div className="subreddit-card">
      <a
        className="subreddit-link"
        target="_blank"
        href={`https://www.reddit.com/comments/${idProp}`}
      >
        {valueProp}
      </a>
    </div>
  );
};

export default SubRedditCard;
