import  { useEffect, useState } from 'react'
import SubRedditCard from './SubRedditCard.jsx'

const InputSubReddit = () => {
    const [subreddit, setSubReddit] = useState('')
    const url = `https://www.reddit.com/r/${subreddit}.json`;

    const [dataFetched, setFetchedData]= useState()
    const [inputValue, setInputValue] = useState();

    const handleAddReddit = (e) => {
        e.preventDefault();
        setSubReddit(inputValue);
        console.log("The value of searched sub reddit is:", subreddit)
        console.log(url)
    }

    useEffect(() => {
        async function fetchReddit(){
            const dataApi = await fetch(url);
            const resp = await dataApi.json();
            setFetchedData(resp)
        }
        fetchReddit()
    }, [subreddit])


    if(dataFetched){
        console.log("Fetched data =>", dataFetched.data.children);
        // console.log("Fetched data =>", dataFetched.data.children[0].data.selftext);
        var ele = dataFetched.data.children.map(function(item){
            return (
                <SubRedditCard 
                    valueProp = {item.data.title}
                    idProp ={item.data.id}
                    />
            )
        })
    }

    // const ele = dataFetched.map(function(item){
    //     return (
    //         <div>
    //             <p>{item.data.children.data.selftext}</p>
    //         </div>
    //     )
    // })



  return (
    <div>
        <h1>Enter the name of the subreddit</h1>
        <input type='text' placeholder='enter' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={handleAddReddit}>Add Subreddit</button>
        {ele}
    </div>
  )
}

export default InputSubReddit