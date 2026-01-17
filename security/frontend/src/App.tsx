import { useState, useEffect } from 'react'
import './App.css'

interface Ticket {
  id: number;
  artist: string;
  venue: string;
  date: string;
  price: number;
  description: string;
  image_url: string;
}

function TicketDetails({ ticket, onBack }: { ticket: Ticket, onBack: () => void }) {
  const addToCart = async () => {
    try {
      const response = await fetch(`http://localhost:4200/cart/${ticket.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      
      // You could add some visual feedback here
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  return (
    <div>
      <div className="ticket-details">
        <div className="image-container">
          <img src={`/images/${ticket.imageUrl}`} alt={ticket.artist} />
        </div>
        <div className="content">
          <h1>{ticket.artist}</h1>
          <div className="date">{new Date(ticket.date).toLocaleDateString()}</div>
          <h2 className="venue">{ticket.venue}</h2>
          <div className="price">${ticket.price}</div>
          <div className="description">{ticket.description}</div>
        </div>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={onBack}>
          ← Back to Tickets
        </button>
        <button className="add-to-cart" onClick={addToCart}>
          + Add To Cart
        </button>
      </div>
    </div>
  );
}

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    fetch('http://localhost:4200/tickets')
      .then(response => response.json())
      .then(data => setTickets(data.tickets))
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  if (selectedTicket) {
    return <TicketDetails ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />;
  }

  console.log(tickets)

  return (
    <div>
      <h1>Available Tickets</h1>
      <div className="tickets-grid">
        {tickets.map(ticket => (
          <div 
            key={ticket.id} 
            className="ticket-card"
            onClick={() => setSelectedTicket(ticket)}
          >
            <img src={`/images/${ticket.imageUrl}`} alt={ticket.artist} />
            <div className="content">
              <h2>{ticket.artist}</h2>
              <p>{ticket.venue}</p>
              <p>{new Date(ticket.date).toLocaleDateString()}</p>
              <p>${ticket.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App