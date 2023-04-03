import http from 'node:http'
import { createTerminus } from '@godaddy/terminus'

function healthCheck () {
  return Promise.resolve(true)
}

const server = http.createServer((_request, response) => {
  response.end()
})

const options = {
  healthChecks: {
    '/health': healthCheck,
    verbatim: true,
  },
}

createTerminus(server, options)

server.listen(process.env.PORT || 3002)
