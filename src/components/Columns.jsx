import {useContext} from 'react'
import './Column.css'
import { globalContext } from './globalContext'
import SubRedditCard from './SubRedditCard'

const Columns = () => {
    const {listOfEnteredSubs, dataFetched} = useContext(globalContext);
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


    
    const list = listOfEnteredSubs.map(function(item){
        return (
            <>
                <p>/r/{item}</p>
            </>
        )
    })
  return (
    <div className='columnHeight'>
        {list}
        {ele}
    </div>
  )
}

export default Columns