import axios from "axios"
import { useEffect, useState } from "react"

const randomUserNames = [
  'Joao',
  'Maria',
  'Paula',
  'Thiago',
  'Enzo',
  'Valentina',
  'Taina',
  'Celso',
  'Vitoria',
  'Camila',
  'Rafael',
  'Lucas',
]

const ScoreBoard = ({ score }) => {
    const [gameStates, setGameStates] = useState(null)
    const [userName, setUserName] = useState(null)

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
      setUserName(randomUserNames[Math.floor(Math.random() * randomUserNames.length)])
    }, [])

    const descendingGameStates = gameStates?.sort((a,b) => b.score - a.score)

  return (
    <div className="">
      <div className="border border-primary">
        <h2>{userName}</h2>
        <h2 className="my-2">{score}</h2>
        <button className="btn btn-primary text-light mb-2" onClick={saveData}>Save Score</button>
      </div>
      <div className="border border-primary rounded-bottom highscores">
        <h2>HighScores</h2>
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