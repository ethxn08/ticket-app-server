const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;

    //Instancia de TicketList
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");
      // Escuchar evento: mensaje-to-server
      socket.on("request-ticket", (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      socket.on("next-ticket-works", ({ agent, desktop }, callback) => {
        const yourTicket = this.ticketList.asignTicket(agent, desktop);
        callback(yourTicket);

        this.io.emit("asigned-ticket", this.ticketList.last13);
      });
    });
  }
}

module.exports = Sockets;
