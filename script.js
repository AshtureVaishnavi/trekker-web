// Sample Indian trek data
const trekData = [
    {
        title: "Valley of Flowers Trek",
        price: "₹25,000",
        duration: "6 days",
        difficulty: "Moderate",
        location: "Uttarakhand",
        agent: "Himalayan Trails India",
        rating: "4.8",
        maxAltitude: "3,658m",
        groupSize: "10-15 people"
    },
    {
        title: "Hampta Pass Trek",
        price: "₹18,500",
        duration: "5 days",
        difficulty: "Moderate",
        location: "Himachal Pradesh",
        agent: "Adventure India Tours",
        rating: "4.7",
        maxAltitude: "4,270m",
        groupSize: "8-12 people"
    },
    {
        title: "Kedarkantha Trek",
        price: "₹22,000",
        duration: "6 days",
        difficulty: "Easy",
        location: "Uttarakhand",
        agent: "Trek India Adventures",
        rating: "4.9",
        maxAltitude: "3,800m",
        groupSize: "10-15 people"
    },
    {
        title: "Triund Trek",
        price: "₹12,500",
        duration: "3 days",
        difficulty: "Easy",
        location: "Himachal Pradesh",
        agent: "Himalayan Trails India",
        rating: "4.6",
        maxAltitude: "2,850m",
        groupSize: "6-10 people"
    },
    {
        title: "Sandakphu Trek",
        price: "₹28,000",
        duration: "7 days",
        difficulty: "Challenging",
        location: "West Bengal",
        agent: "Adventure India Tours",
        rating: "4.8",
        maxAltitude: "3,636m",
        groupSize: "8-12 people"
    },
    {
        title: "Chadar Trek (Frozen Zanskar River)",
        price: "₹35,000",
        duration: "9 days",
        difficulty: "Expert",
        location: "Ladakh",
        agent: "Trek India Adventures",
        rating: "4.9",
        maxAltitude: "3,500m",
        groupSize: "6-10 people"
    }
];

let filteredTreks = [...trekData];

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');

    if (sectionId === 'browse') displayTreks(filteredTreks);
}

function displayTreks(treks) {
    const trekGrid = document.getElementById('trekGrid');
    if (treks.length === 0) {
        trekGrid.innerHTML = '<div style="text-align:center;color:#666;grid-column:1/-1;padding:40px;">No treks found. Try adjusting your filters!</div>';
        return;
    }

    trekGrid.innerHTML = treks.map(trek => `
        <div class="trek-card">
            <div class="trek-header">
                <div class="trek-title">${trek.title}</div>
                <div class="trek-price">${trek.price}</div>
            </div>
            <div class="trek-details">
                <div class="trek-detail"><span>📍 Location:</span><span>${trek.location}</span></div>
                <div class="trek-detail"><span>⏱️ Duration:</span><span>${trek.duration}</span></div>
                <div class="trek-detail"><span>🏔️ Difficulty:</span><span>${trek.difficulty}</span></div>
                <div class="trek-detail"><span>⛰️ Max Altitude:</span><span>${trek.maxAltitude}</span></div>
                <div class="trek-detail"><span>👥 Group Size:</span><span>${trek.groupSize}</span></div>
            </div>
            <div class="agent-info"><strong>Agent:</strong> ${trek.agent} | ⭐ ${trek.rating}</div>
            <button class="book-btn" onclick="bookTrek('${trek.title}', '${trek.agent}', '${trek.price}')">Book This Trek</button>
        </div>
    `).join('');
}

// Search and filter functions
function searchTreks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredTreks = trekData.filter(trek =>
        trek.title.toLowerCase().includes(searchTerm) ||
        trek.location.toLowerCase().includes(searchTerm) ||
        trek.agent.toLowerCase().includes(searchTerm)
    );
    applyFilters();
}

function filterTreks() { applyFilters(); }

function applyFilters() {
    const difficulty = document.getElementById('difficultyFilter').value;
    const duration = document.getElementById('durationFilter').value;
    const price = document.getElementById('priceFilter').value;

    let filtered = [...filteredTreks];

    if (difficulty) filtered = filtered.filter(trek => trek.difficulty === difficulty);

    if (duration) {
        filtered = filtered.filter(trek => {
            const days = parseInt(trek.duration);
            switch(duration) {
                case '1-3': return days >= 1 && days <= 3;
                case '4-7': return days >= 4 && days <= 7;
                case '8-14': return days >= 8 && days <= 14;
                case '15+': return days >= 15;
                default: return true;
            }
        });
    }

    if (price) {
        filtered = filtered.filter(trek => {
            const trekPrice = parseInt(trek.price.replace(/₹|,/g, ''));
            switch(price) {
                case '0-15000': return trekPrice < 15000;
                case '15000-25000': return trekPrice >= 15000 && trekPrice <= 25000;
                case '25000-35000': return trekPrice >= 25000 && trekPrice <= 35000;
                case '35000+': return trekPrice >= 35000;
                default: return true;
            }
        });
    }

    displayTreks(filtered);
}

// Booking and agents
function bookTrek(trekTitle, agent, price) {
    alert(`🎉 Great choice! You've selected "${trekTitle}" with ${agent} at ${price}.\nNext steps:\n• We'll connect you with ${agent}\n• Review detailed itinerary\n• Complete booking process\n• Receive confirmation & preparation guide`);
}

function viewAgentDetails(agentName) {
    alert(`📋 ${agentName} Details:\n• Viewing all available packages\n• Customer reviews & ratings\n• Detailed agent profile\n• Contact information\n• Booking policies`);
}

// Custom trek
function generateCustomTrek(event) {
    event.preventDefault();
    const destination = document.getElementById('customDestination').value;
    const duration = document.getElementById('customDuration').value;
    const groupSize = document.getElementById('customGroupSize').value;
    const difficulty = document.getElementById('customDifficulty').value;
    const budget = document.getElementById('customBudget').value;
    const season = document.getElementById('customSeason').value;
    const requirements = document.getElementById('customRequirements').value;

    let basePrice = 10000;
    const durationMultiplier = parseInt(duration) * 3000;
    const difficultyMultiplier = { 'Easy':1, 'Moderate':1.3, 'Challenging':1.6, 'Expert':2 };
    const budgetMultiplier = { 'budget':1, 'mid':1.8, 'premium':3, 'luxury':5 };

    const estimatedPrice = Math.round((basePrice + durationMultiplier) * 
        difficultyMultiplier[difficulty] * budgetMultiplier[budget]);

    const preview = document.getElementById('customPreview');
    preview.innerHTML = `
        <div class="preview-title">🎯 Your Custom Trek Plan</div>
        <div class="preview-details">
            <div class="preview-item"><div class="preview-label">Destination</div><div class="preview-value">${destination}</div></div>
            <div class="preview-item"><div class="preview-label">Duration</div><div class="preview-value">${duration} days</div></div>
            <div class="preview-item"><div class="preview-label">Group Size</div><div class="preview-value">${groupSize} people</div></div>
            <div class="preview-item"><div class="preview-label">Difficulty</div><div class="preview-value">${difficulty}</div></div>
            <div class="preview-item"><div class="preview-label">Budget Category</div><div class="preview-value">${budget.charAt(0).toUpperCase() + budget.slice(1)}</div></div>
            <div class="preview-item"><div class="preview-label">Best Season</div><div class="preview-value">${season}</div></div>
        </div>
        ${requirements ? `<div class="preview-item" style="margin-top:20px;"><div class="preview-label">Special Requirements</div><div class="preview-value">${requirements}</div></div>` : ''}
        <div class="estimate-box">
            <div>Estimated Price Per Person</div>
            <div class="estimate-price">₹${estimatedPrice}</div>
            <div style="font-size:0.9rem;margin-top:10px;">*Final price may vary based on specific requirements and agent selection</div>
        </div>
        <button class="search-btn" style="width:100%;margin-top:20px;padding:15px;" onclick="alert('Matching Indian agents will be suggested soon!')">Find Matching Travel Agents</button>
    `;
    preview.style.display = 'block';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => displayTreks(trekData));
