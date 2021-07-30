import { useEffect, useState } from 'react'
import axios from 'redaxios'

const http = axios.create({
  baseURL: 'http://api.matheuscastiglioni.com.br'
})

function App() {
  const [tasks, updateTasks] = useState([])
  const [task, updateTask] = useState('')
  const [isLoading, updateIsLoading] = useState(false)

  useEffect(() => {
    updateIsLoading(true)
    http.get('/api/tasks')
      .then(response => {
        updateTasks(response.data.tasks)
        updateIsLoading(false)
      })
  }, [])

  const handleAddTask = event => {
    event.preventDefault()
    if (task.trim()) {
      updateIsLoading(true)
      http.post('/api/tasks', { task })
        .then(response => {
          updateTasks(oldTasks => [...oldTasks, response.data.task])
          updateTask('')
          updateIsLoading(false)
        })
    }
  }

  if (isLoading) return <h1>Está carregando...</h1>

  return (
    <div>
      <h1>Video mockando API</h1>
      <form onSubmit={handleAddTask}>
        <input onChange={event => updateTask(event.target.value)} value={task} />
        <button>Add</button>
      </form>
      <ul>
        {tasks.map(t => <li key={t.id}>{t.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
