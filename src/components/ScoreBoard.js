import axios from "axios"
import { useEffect, useState } from "react"

const ScoreBoard = ({ score, reset, scoreReset }) => {
    const [gameStates, setGameStates] = useState(null)
    const [userName, setUserName] = useState("")
    const [gameUser, setGameUser] = useState("")

    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_URL}`)
      const data = Object.keys(response.data.data).map(item => response.data.data[item])
      setGameStates(data)
    }

    const saveData = () => {

      const data = {
        username: userName,
        score: score
      }
      axios.post(`${process.env.REACT_APP_URL_ADD}`, data)
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
      scoreReset();
      reset()
    }

  return (
    <div className="mb-2 text-center">
      <div className="d-flex justify-content-center mb-2">
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
      <div className="d-flex d-lg-block justify-content-evenly mb-4">
        <div className="mb-lg-4">
          <div className="bg-primary rounded-top">
            <h3 className="text-light mx-sm-4 mx-2 my-0">Your Score</h3>
          </div>
          <div className="border border-top-0 border-primary">
            <h2 className="m-0">{userName}</h2>
            <h2 className="mb-2 mt-0">{score}</h2>
            <button className="btn btn-primary text-light mb-2" onClick={saveData} disabled={userName.length === 0}>Save Score</button>
          </div>
        </div>
        <div className="">
          <div className="bg-primary rounded-top">
            <h3 className="text-light mx-sm-4 mx-2 mb-0">HighScores</h3>
          </div>
          <div className="border border-top-0 border-primary rounded-bottom highscores">
            <div classname="">
              {descendingGameStates?.map((gameStates, index) => (
                <div key={index}>
                  <h4>{gameStates.username}: {gameStates.score}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard