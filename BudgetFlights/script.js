// script.js
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const flightResults = document.getElementById('flightResults');

    // Mock flight data with dates
    const mockFlights = [
        {
            id: 1,
            type: 'Departure',
            airline: 'Delta Airlines',
            origin: 'JFK',
            destination: 'LAX',
            date: '2024-11-05',
            departureTime: '10:00 AM',
            arrivalTime: '1:30 PM',
            price: 299,
            duration: '3h 30m'
        },
        {
            id: 2,
            type: 'Return',
            airline: 'Delta Airlines',
            origin: 'LAX',
            destination: 'JFK',
            date: '2024-11-12',
            departureTime: '2:00 PM',
            arrivalTime: '5:45 PM',
            price: 285,
            duration: '3h 45m'
        },
        {
            id: 3,
            type: 'Departure',
            airline: 'United Airlines',
            origin: 'JFK',
            destination: 'LAX',
            date: '2024-11-05',
            departureTime: '8:30 AM',
            arrivalTime: '11:45 AM',
            price: 315,
            duration: '3h 15m'
        },
        {
            id: 4,
            type: 'Return',
            airline: 'United Airlines',
            origin: 'LAX',
            destination: 'JFK',
            date: '2024-11-12',
            departureTime: '4:30 PM',
            arrivalTime: '8:15 PM',
            price: 295,
            duration: '3h 45m'
        }
    ];

    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const origin = document.getElementById('origin').value;
        const departDate = document.getElementById('departDate').value;
        const returnDate = document.getElementById('returnDate').value;
        const maxBudget = document.getElementById('maxBudget').value;

        // Show loading spinner
        loadingSpinner.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        flightResults.innerHTML = '';

        try {
            // Simulate API call with setTimeout
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Filter departure flights
            const departureFlights = mockFlights.filter(flight => 
                flight.type === 'Departure' &&
                flight.origin.toLowerCase() === origin.toLowerCase() &&
                flight.date === departDate &&
                flight.price <= parseInt(maxBudget)
            );

            // Filter return flights if return date is provided
            const returnFlights = returnDate ? mockFlights.filter(flight => 
                flight.type === 'Return' &&
                flight.destination.toLowerCase() === origin.toLowerCase() &&
                flight.date === returnDate &&
                flight.price <= parseInt(maxBudget)
            ) : [];

            displayFlights(departureFlights, returnFlights);
        } catch (error) {
            showError('An error occurred while searching for flights. Please try again.');
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    });

    function displayFlights(departureFlights, returnFlights) {
        if (departureFlights.length === 0) {
            showError('No departure flights found matching your criteria.');
            return;
        }

        // Create departure flights section
        const departureSection = document.createElement('div');
        departureSection.className = 'flight-section';
        departureSection.innerHTML = `
            <h2 class="section-title">Departure Flights</h2>
            <div class="flight-cards"></div>
        `;
        
        departureFlights.forEach(flight => {
            const flightCard = createFlightCard(flight);
            departureSection.querySelector('.flight-cards').appendChild(flightCard);
        });
        
        flightResults.appendChild(departureSection);

        // Create return flights section if return flights exist
        if (returnFlights.length > 0) {
            const returnSection = document.createElement('div');
            returnSection.className = 'flight-section';
            returnSection.innerHTML = `
                <h2 class="section-title">Return Flights</h2>
                <div class="flight-cards"></div>
            `;
            
            returnFlights.forEach(flight => {
                const flightCard = createFlightCard(flight);
                returnSection.querySelector('.flight-cards').appendChild(flightCard);
            });
            
            flightResults.appendChild(returnSection);
        } else if (document.getElementById('returnDate').value) {
            showError('No return flights found matching your criteria.');
        }
    }

    function createFlightCard(flight) {
        const flightCard = document.createElement('div');
        flightCard.className = 'flight-card';
        flightCard.innerHTML = `
            <h3>${flight.airline}</h3>
            <div class="flight-info">
                <p><strong>Date:</strong> ${formatDate(flight.date)}</p>
                <p><strong>From:</strong> ${flight.origin}</p>
                <p><strong>To:</strong> ${flight.destination}</p>
                <p><strong>Departure:</strong> ${flight.departureTime}</p>
                <p><strong>Arrival:</strong> ${flight.arrivalTime}</p>
                <p><strong>Duration:</strong> ${flight.duration}</p>
            </div>
            <div class="flight-price">$${flight.price}</div>
        `;
        return flightCard;
    }

    function formatDate(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    // Set minimum date for date inputs to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departDate').min = today;
    document.getElementById('returnDate').min = today;

    // Update return date min value when departure date changes
    document.getElementById('departDate').addEventListener('change', function(e) {
        document.getElementById('returnDate').min = e.target.value;
    });
});