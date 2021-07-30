import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Factory, Model, Server } from 'miragejs'

new Server({
  models: {
    task: Model,
  },

  factories: {
    task: Factory.extend({
      name(i) {
        return `Tarefa ${i + 1}`
      },
    })
  },

  seeds(server) {
    server.create('task', { name: 'Minha tarefa' })
    server.createList('task', 12)
  },

  routes() {
    this.namespace = 'api'
    this.urlPrefix = 'http://api.matheuscastiglioni.com.br'

    this.get('/tasks', async (schema) => {
      return {
        tasks: (await schema.tasks.all()).models,
      }
    }, { timing: 3000 })

    this.post('/tasks', async (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return {
        task: (await schema.tasks.create({ name: data.task })).attrs
      }
    }, { timing: 5000 })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
