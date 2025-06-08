import { useEffect, useState } from 'react';
import SubRedditCard from './SubRedditCard.jsx';
import './InputSubReddit.css';

const InputSubReddit = () => {
  const [inputValue, setInputValue] = useState('');
  const [subreddit, setSubReddit] = useState('');
  const [listOfFetchedSubs, setListOfFetchedSubs] = useState([]);

  const handleAddReddit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setSubReddit(inputValue.trim());
    setInputValue('');
  };

  useEffect(() => {
    if (!subreddit) return;

    async function fetchReddit() {
      try {
        const url = `https://www.reddit.com/r/${subreddit}.json`;
        const response = await fetch(url);
        const result = await response.json();

        setListOfFetchedSubs((prev) => [
          ...prev,
          {
            subreddit,
            posts: result.data.children,
          },
        ]);
      } catch (error) {
        console.log('Failed to fetch Reddit API', error);
      }
    }

    fetchReddit();
  }, [subreddit]);

  return (
    <div className='container'>
      <form className='subreddit-form' onSubmit={handleAddReddit}>
        <h1 className='form-title'>📬 Subreddit Explorer</h1>
        <div className='input-group'>
          <input
            type='text'
            placeholder='e.g. reactjs'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type='submit'>Fetch</button>
        </div>
      </form>

      <div className='columns-wrapper'>
        {listOfFetchedSubs.map((sub, index) => (
          <div className='column' key={index}>
            <h2 className='subreddit-title'>r/{sub.subreddit}</h2>
            <div className='cards'>
              {sub.posts.map((post) => (
                <SubRedditCard
                  key={post.data.id}
                  valueProp={post.data.title}
                  idProp={post.data.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputSubReddit;
