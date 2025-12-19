import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const DailyAnec = ({anecdote, votes, onVote, onNext}) => {
return(<div>
      <h1>Anecdote of the day</h1>

      {anecdote}<br/>
      has {votes} votes<br/>

      <Button onClick={onVote} text="vote" />
      <Button onClick={onNext} text="next anecdote" />
    </div>)
}

const MostVotedAnec = ({anecdote, votes}) =>{
  return(
    <div>
    <h1>Anecdote with most votes</h1>
    {anecdote}<br/>
    has {votes} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const arr = new Array(8).fill(0);

  const [selected, setSelected] = useState(() => Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(arr)

  const handleNxtAnecdote = () => {
    let newAnecdote = selected
    
    while (newAnecdote === selected){
      newAnecdote = Math.floor(Math.random() * anecdotes.length)
    }
    
    setSelected(newAnecdote)
  }

  const handleVote = (selected) => {
    console.log("selected: ",selected)
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    console.log("before", votes)
    console.log("after", newVotes)
  }

  const maxVotes = votes.reduce((maxIndex, currentCount, currentIndex)=>{
    return currentCount > votes[maxIndex] ? currentIndex : maxIndex
  }, 0)

  return (
    <>
    <DailyAnec
    anecdote={anecdotes[selected]} 
      votes={votes[selected]} 
      onVote={()=> handleVote(selected)}
      onNext={handleNxtAnecdote}
      />
    
    <MostVotedAnec 
    anecdote={anecdotes[maxVotes]}
    votes={votes[maxVotes]}
    />
    </>
)}

export default App