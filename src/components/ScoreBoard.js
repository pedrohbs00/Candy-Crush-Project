import axios from "axios"
import { useEffect, useState } from "react"


const ScoreBoard = ({ score }) => {
    const [gameStates, setGameStates] = useState(null)
    const [userName, setUserName] = useState("")
    const [gameUser, setGameUser] = useState("")

    const fetchData = async () => {
      const response = await axios.get('http://localhost:8000/scores')
      const data = Object.keys(response.data.data).map(item => response.data.data[item])
      setGameStates(data)
    }

    const saveData = () => {

      const data = {
        username: userName,
        score: score
      }
      axios.post('http://localhost:8000/addscore', data)
      .then(response => {console.log(response)})
      .catch(err => console.log(err))
      .then(fetchData)
    }

    useEffect(()=>{
      fetchData()
    }, [])

    const descendingGameStates = gameStates?.sort((a,b) => b.score - a.score)

    const gameUserChange = (event) => {
      setGameUser(event.target.value);
    }

    const playGame = () => {
      setUserName(gameUser);
      setGameUser("");
    }

  return (
    <div className="mb-2 text-center">
      <div className="d-flex mb-2">
        <div className="form-control-sm">
          <input 
          type="text" 
          placeholder="Username" 
          value={gameUser} 
          onChange={gameUserChange}/>
        </div>
        <button 
        className="btn btn-primary text-center text-light"
        onClick={playGame}
        >Play</button>
      </div>
      <div className="mb-4">
        <div className="bg-primary rounded-top">
          <h2 className="text-light mx-4 my-0">Your Score</h2>
        </div>
        <div className="border border-top-0 border-primary">
          <h2 className="m-0">{userName}</h2>
          <h2 className="mb-2 mt-0">{score}</h2>
          <button className="btn btn-primary text-light mb-2" onClick={saveData}>Save Score</button>
        </div>
      </div>
      <div className="bg-primary rounded-top">
        <h2 className="text-light mb-0">HighScores</h2>
      </div>
      <div className="border border-top-0 border-primary rounded-bottom highscores">
        <div classname="">
          {descendingGameStates?.map((gameStates, index) => (
            <div key={index}>
              <h3>{gameStates.username}: {gameStates.score}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard