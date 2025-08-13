// Animate counters on page load
function animateCounter(elementId, targetValue, duration = 2000) {
    const element = document.getElementById(elementId);
    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 16);
}

// Update last sync time
function updateLastSync() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('last-sync').textContent = timeString;
}

// Simulate pod count changes
function updatePodCount() {
    const podCountElement = document.getElementById('pod-count');
    const counts = [3, 2, 3, 3, 3]; // Simulate occasional pod restarts
    let index = 0;
    
    setInterval(() => {
        podCountElement.textContent = counts[index];
        index = (index + 1) % counts.length;
    }, 5000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Animate counters
    setTimeout(() => animateCounter('deployments', 42), 500);
    setTimeout(() => animateCounter('syncs', 156), 800);
    
    // Update timestamps
    updateLastSync();
    setInterval(updateLastSync, 30000); // Update every 30 seconds
    
    // Start pod count simulation
    updatePodCount();
    
    // Add click interactions to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Terminal typing effect
    const terminalCommands = [
        'kubectl get applications -n argocd',
        'argocd app sync my-web-app',
        'kubectl get pods -l app=my-web-app',
        'argocd app get my-web-app'
    ];
    
    let commandIndex = 0;
    const promptElement = document.querySelector('.terminal-line:last-child .prompt');
    const cursorElement = document.querySelector('.cursor');
    
    function typeCommand() {
        if (promptElement && cursorElement) {
            const command = terminalCommands[commandIndex];
            let charIndex = 0;
            
            const typeInterval = setInterval(() => {
                if (charIndex < command.length) {
                    cursorElement.textContent = command.substring(0, charIndex + 1) + '_';
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        cursorElement.textContent = '_';
                        commandIndex = (commandIndex + 1) % terminalCommands.length;
                        setTimeout(typeCommand, 2000);
                    }, 2000);
                }
            }, 100);
        }
    }
    
    // Start typing animation after 3 seconds
    setTimeout(typeCommand, 3000);
});

// Add some fun Easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 10) {
        const title = document.querySelector('.hero-title');
        title.style.animation = 'none';
        title.offsetHeight; // Trigger reflow
        title.style.animation = 'fadeInUp 0.5s ease-out';
        
        // Show a fun message
        const message = document.createElement('div');
        message.textContent = '🎉 You found the easter egg! ArgoCD rocks!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: fadeInUp 0.5s ease-out;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        clickCount = 0;
    }
});
