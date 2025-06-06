import  { useEffect, useState } from 'react'
import SubRedditCard from './SubRedditCard.jsx'
import Columns from './Columns.jsx'
import {globalContext} from './globalContext.js'
import './InputSubReddit.css'

const InputSubReddit = () => {
    const [subreddit, setSubReddit] = useState('')
    const url = `https://www.reddit.com/r/${subreddit}.json`;

    const [dataFetched, setFetchedData]= useState()
    const [inputValue, setInputValue] = useState('');


    const [listOfEnteredSubs, setListOfEnteredSubs] = useState([]);

    const handleAddReddit = (e) => {
        e.preventDefault();
        setSubReddit(inputValue);
        setListOfEnteredSubs(function(item){
            return [...item, inputValue]
        })
        console.log("listOfEnteredSubs", listOfEnteredSubs)
    }
            console.log("listOfEnteredSubs", listOfEnteredSubs)


    useEffect(() => {
        async function fetchReddit(){
            try {
                const dataApi = await fetch(url);
                const resp = await dataApi.json();
                setFetchedData(resp);
            } catch (error) {
                console.log("Failed to fetch reddit API")
            }
        }
        fetchReddit();

        console.log("The value of searched sub reddit is:", subreddit)
        console.log(url)
    }, [subreddit])



  return (
    <globalContext.Provider value={{listOfEnteredSubs, dataFetched}}>
        <div className='mainGrid'>
            <Columns />
            <div>
                <h1>Enter the name of the subreddit</h1>
                <input type='text' placeholder='enter' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button onClick={handleAddReddit}>Add Subreddit</button>
            </div>
        </div>
        {/* {ele} */}
    </globalContext.Provider>
  )
}
export default InputSubReddit