const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pending = [];
    this.asigned = [];
  }

  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  get last13() {
    return this.asigned.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pending.push(newTicket);
    return newTicket;
  }
  asignTicket(agent, desktop) {
    if (this.pending.length === 0) {
      return null;
    }

    const nextTicket = this.pending.shift();

    nextTicket.agent = agent;
    nextTicket.desktop = desktop;

    this.asigned.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;
