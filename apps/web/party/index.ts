import type * as Party from 'partykit/server'

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected:
  id: ${conn.id}
  room: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    )

    // let's send a message to the connection
    conn.send('hello from server')
  }

  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`)
    // as well as broadcast it to all the other connections in the room...
    this.room.broadcast(
      `${sender.id}: ${message}`,
      // ...except for the connection it came from
      [sender.id]
    )
  }

  async onRequest(req: Party.Request): Promise<Response> {
    // console.log('sup', req.method, req.url)
    const body = await req.json() as any
    this.room.broadcast(`room_update_${body.id}`)
    return new Response(`Hello from server at ${req.url}`)
  }
}

Server satisfies Party.Worker
