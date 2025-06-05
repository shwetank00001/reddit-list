import  { useEffect, useState } from 'react'

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
            const data = await fetch(url);
            const resp = await data.json();
            setFetchedData(resp);
        }
        fetchReddit()
    }, [subreddit])


    if(dataFetched){
        console.log("Fetched data", dataFetched);
    }

    const fetchedDataDisplay = dataFetched.map(function(item){
        return(
            <div>
                <h3>{item.data}</h3>
            </div>
        )
    })

  return (
    <div>
        <h1>Enter the name of the subreddit</h1>
        <input type='text' placeholder='enter' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={handleAddReddit}>Add Subreddit</button>
        {fetchedDataDisplay}
    </div>
  )
}

export default InputSubReddit