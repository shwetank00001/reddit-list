import {useContext, useEffect} from 'react'
import './Column.css'
import { globalContext } from './globalContext'
import SubRedditCard from './SubRedditCard'

const Columns = (props) => {

    const {subreddit, dataFetched, setFetchedData, url} = useContext(globalContext);
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
        console.log(url);
    }, [subreddit]);
    
    if(dataFetched){
        console.log("Fetched data =>", dataFetched.data.children);
        // console.log("Fetched data =>", dataFetched.data.children[0].data.selftext);
        var ele = dataFetched.data.children.map(function(item){
            return (
                <SubRedditCard 
                    key = {item.data.id}
                    valueProp = {item.data.title}
                    idProp ={item.data.id}
                    />
            )
        })
    }

  return (
    <div className='columnHeight'>
        <h3>{props.headingProp}</h3>
        {ele}
    </div>
  )
}

export default Columns