// Global state management
let currentUser = null;
let currentRole = null;
let moodStreak = 7;
let selectedMood = null;
let moodHistory = [
    {date: '2025-09-16', mood: '😊', value: 5, streak: 7},
    {date: '2025-09-15', mood: '😐', value: 3, streak: 6},
    {date: '2025-09-14', mood: '😊', value: 5, streak: 5},
    {date: '2025-09-13', mood: '😢', value: 2, streak: 4},
    {date: '2025-09-12', mood: '😰', value: 1, streak: 3},
    {date: '2025-09-11', mood: '😊', value: 5, streak: 2},
    {date: '2025-09-10', mood: '😐', value: 3, streak: 1}
];

// Chart instances
let moodChart = null;
let studentChart1 = null;
let studentChart2 = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    showScreen('landing-page');
    setupSliders();
}

function setupEventListeners() {
    // Role selection
    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('click', function() {
            const role = this.dataset.role;
            selectRole(role);
        });
    });

    // Login forms
    document.getElementById('student-login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        loginAsStudent();
    });

    document.getElementById('counselor-login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        loginAsCounselor();
    });

    // Mood selection
    document.querySelectorAll('.mood-option').forEach(option => {
        option.addEventListener('click', function() {
            selectMoodOption(this);
        });
    });

    // Chat input
    const chatInput = document.getElementById('chat-message-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Session report form
    const reportForm = document.getElementById('session-report-form');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitSessionReport();
        });
    }
}

function setupSliders() {
    document.querySelectorAll('.mood-slider').forEach(slider => {
        slider.addEventListener('input', function() {
            const valueDisplay = this.nextElementSibling;
            if (valueDisplay) {
                valueDisplay.textContent = this.value;
            }
        });
    });
}

function selectRole(role) {
    currentRole = role;
    if (role === 'student') {
        showScreen('student-login');
    } else if (role === 'counselor') {
        showScreen('counselor-login');
    }
}

function loginAsStudent() {
    currentUser = 'ANON-ST7832';
    showScreen('student-dashboard');
    setTimeout(() => {
        initializeStudentDashboard();
    }, 100);
}

function loginAsCounselor() {
    currentUser = 'DR-C4821';
    showScreen('counselor-dashboard');
    setTimeout(() => {
        initializeCounselorDashboard();
    }, 100);
}

function logout() {
    currentUser = null;
    currentRole = null;
    showScreen('landing-page');
    
    // Clean up charts safely
    try {
        if (moodChart) {
            moodChart.destroy();
            moodChart = null;
        }
        if (studentChart1) {
            studentChart1.destroy();
            studentChart1 = null;
        }
        if (studentChart2) {
            studentChart2.destroy();
            studentChart2 = null;
        }
    } catch (e) {
        console.log('Charts cleaned up');
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

function showSection(sectionId) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    
    const clickedNav = event.target.closest('.nav-item');
    if (clickedNav) {
        clickedNav.classList.add('active');
    }

    // Show section
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Student Dashboard Functions
function initializeStudentDashboard() {
    setTimeout(() => {
        createMoodChart();
    }, 200);
    showSection('mood-section');
}

function selectMoodOption(option) {
    // Remove previous selections
    document.querySelectorAll('.mood-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select current option
    option.classList.add('selected');
    selectedMood = {
        mood: option.dataset.mood,
        value: parseInt(option.dataset.value),
        emoji: option.querySelector('.mood-emoji').textContent
    };
    
    // Show questions with animation
    const questionsDiv = document.getElementById('mood-questions');
    if (questionsDiv) {
        questionsDiv.classList.remove('hidden');
        questionsDiv.style.opacity = '0';
        setTimeout(() => {
            questionsDiv.style.opacity = '1';
            questionsDiv.style.transition = 'opacity 0.3s ease';
        }, 100);
    }
}

function submitMoodCheck() {
    if (!selectedMood) {
        showModal('Error', 'Please select your mood first!');
        return;
    }

    // Collect additional data
    const stressSlider = document.getElementById('stress-slider');
    const connectionSlider = document.getElementById('connection-slider');
    const sleepInput = document.getElementById('sleep-input');
    const concernsInput = document.getElementById('concerns-input');
    
    const stressLevel = stressSlider ? stressSlider.value : 5;
    const connectionLevel = connectionSlider ? connectionSlider.value : 5;
    const sleepHours = sleepInput ? sleepInput.value : '';
    const concerns = concernsInput ? concernsInput.value : '';

    // Update streak
    moodStreak++;
    
    // Add to mood history
    const today = new Date().toISOString().split('T')[0];
    moodHistory.unshift({
        date: today,
        mood: selectedMood.emoji,
        value: selectedMood.value,
        streak: moodStreak,
        stress: stressLevel,
        connection: connectionLevel,
        sleep: sleepHours,
        concerns: concerns
    });

    // Update UI
    const streakCounter = document.querySelector('.streak-counter');
    if (streakCounter) {
        streakCounter.textContent = `🔥 ${moodStreak} Day Streak!`;
    }
    
    // Reset form
    document.querySelectorAll('.mood-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    const questionsDiv = document.getElementById('mood-questions');
    if (questionsDiv) {
        questionsDiv.classList.add('hidden');
    }
    
    // Reset form values
    if (stressSlider) stressSlider.value = 5;
    if (connectionSlider) connectionSlider.value = 5;
    if (sleepInput) sleepInput.value = '';
    if (concernsInput) concernsInput.value = '';
    
    // Update slider displays
    document.querySelectorAll('.slider-value').forEach(display => {
        display.textContent = '5';
    });

    selectedMood = null;
    
    // Update chart
    setTimeout(() => {
        createMoodChart();
    }, 100);
    
    // Show success modal
    showModal('Mood Check-in Complete! 🎉', `Great job on maintaining your ${moodStreak}-day streak! Your mental health journey matters.`);
}

function createMoodChart() {
    const ctx = document.getElementById('moodChart');
    if (!ctx) return;
    
    try {
        if (moodChart) {
            moodChart.destroy();
        }

        const chartData = moodHistory.slice(0, 7).reverse();
        
        moodChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.map(entry => {
                    const date = new Date(entry.date);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }),
                datasets: [{
                    label: 'Mood Level',
                    data: chartData.map(entry => entry.value),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                const moods = ['😰', '😢', '😠', '😐', '😊'];
                                return moods[value - 1] || '';
                            }
                        }
                    }
                }
            }
        });
    } catch (e) {
        console.log('Chart creation skipped - will retry');
    }
}

// Peer Support Functions
function startChat(volunteerId) {
    const chatInterface = document.getElementById('chat-interface');
    const partnerName = document.getElementById('chat-partner');
    
    if (partnerName) {
        partnerName.textContent = `Peer Volunteer #${volunteerId.slice(-1)}`;
    }
    
    if (chatInterface) {
        chatInterface.classList.remove('hidden');
        // Scroll to chat
        chatInterface.scrollIntoView({ behavior: 'smooth' });
    }
}

function endChat() {
    const chatInterface = document.getElementById('chat-interface');
    if (chatInterface) {
        chatInterface.classList.add('hidden');
    }
}

function sendMessage() {
    const input = document.getElementById('chat-message-input');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    });
    
    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message student';
    userMessageDiv.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="message-time">${currentTime}</div>
    `;
    messagesContainer.appendChild(userMessageDiv);
    
    // Clear input
    input.value = '';
    
    // Simulate volunteer response
    setTimeout(() => {
        const responses = [
            "Thank you for sharing that with me. How does that make you feel?",
            "That sounds really challenging. You're brave for reaching out.",
            "I understand. Many students go through similar experiences.",
            "Would you like to talk more about what's causing you stress?",
            "Remember, it's okay to feel this way. You're not alone.",
            "Have you tried any coping strategies that have helped before?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseTime = new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
        
        const volunteerMessageDiv = document.createElement('div');
        volunteerMessageDiv.className = 'message volunteer';
        volunteerMessageDiv.innerHTML = `
            <div class="message-content">${randomResponse}</div>
            <div class="message-time">${responseTime}</div>
        `;
        messagesContainer.appendChild(volunteerMessageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000 + Math.random() * 2000);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Session Booking Functions
function bookSession(time) {
    const sessionId = 'ANON-ST7832-' + Date.now();
    showModal('Session Booked Successfully! 📅', `Your anonymous session is confirmed for ${time} today. Session ID: ${sessionId}. You will receive a secure link shortly.`);
    
    // Update the time slot to show it's booked
    if (event && event.target) {
        const target = event.target;
        target.classList.remove('available');
        target.classList.add('booked');
        target.innerHTML = `
            <span class="time">${time}</span>
            <span class="duration">Your Session</span>
        `;
        target.onclick = null;
    }
}

// Counselor Dashboard Functions
function initializeCounselorDashboard() {
    setTimeout(() => {
        createStudentCharts();
    }, 200);
    showSection('students-section');
}

function createStudentCharts() {
    // Student 1 Chart
    const ctx1 = document.getElementById('studentChart1');
    if (ctx1) {
        try {
            if (studentChart1) {
                studentChart1.destroy();
            }
            
            studentChart1 = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                    datasets: [{
                        label: 'Mood Trend',
                        data: [3, 2, 4, 5, 3, 4, 5],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true, max: 5 }
                    }
                }
            });
        } catch (e) {
            console.log('Student chart 1 creation skipped');
        }
    }
    
    // Student 2 Chart
    const ctx2 = document.getElementById('studentChart2');
    if (ctx2) {
        try {
            if (studentChart2) {
                studentChart2.destroy();
            }
            
            studentChart2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                    datasets: [{
                        label: 'Mood Trend',
                        data: [1, 2, 1, 3, 2, 3, 4],
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true, max: 5 }
                    }
                }
            });
        } catch (e) {
            console.log('Student chart 2 creation skipped');
        }
    }
}

function viewStudentDetails(studentId) {
    showModal(`Student Details: ${studentId}`, `
        <div style="text-align: left; margin: 16px 0;">
            <p><strong>Current Risk Level:</strong> ${studentId === 'ANON-ST001' ? 'Low' : 'Medium'}</p>
            <p><strong>Session History:</strong> ${studentId === 'ANON-ST001' ? '3' : '5'} sessions</p>
            <p><strong>Last Mood Check-in:</strong> ${studentId === 'ANON-ST001' ? 'Today' : 'Yesterday'}</p>
            <p><strong>Recent Concerns:</strong> Academic stress, sleep issues</p>
            <p><strong>Recommended Actions:</strong> Continue regular sessions, monitor stress levels</p>
        </div>
    `);
}

function submitSessionReport() {
    const form = document.getElementById('session-report-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const selectElement = form.querySelector('select');
    const studentId = selectElement ? selectElement.value : '';
    
    if (!studentId) {
        showModal('Error', 'Please select a student ID.');
        return;
    }
    
    // Simulate report submission
    setTimeout(() => {
        showModal('Report Submitted Successfully! 📋', `Session report for ${studentId} has been securely transmitted to the central authority. Report ID: RPT-${Date.now()}`);
        
        // Reset form
        form.reset();
        
        // Add to submitted reports list (simulate)
        const reportsList = document.querySelector('.report-list');
        if (reportsList) {
            const newReport = document.createElement('div');
            newReport.className = 'report-item';
            newReport.innerHTML = `
                <div class="report-info">
                    <h4>${studentId} - ${new Date().toLocaleDateString()}</h4>
                    <p>Session Report - Just Submitted</p>
                    <span class="status-badge">Submitted</span>
                </div>
            `;
            reportsList.insertBefore(newReport, reportsList.firstChild);
        }
    }, 1000);
}

// Modal Functions
function showModal(title, message) {
    const modal = document.getElementById('successModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    if (modal && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.innerHTML = message;
        modal.classList.remove('hidden');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

function generateAnonymousId() {
    return 'ANON-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Emergency support function
function showEmergencySupport() {
    showModal('Emergency Support 🚨', `
        <div style="text-align: left;">
            <p><strong>Immediate Help:</strong></p>
            <p>📞 Crisis Helpline: 1-800-XXX-XXXX</p>
            <p>📞 Emergency Services: 911</p>
            <p>💬 Crisis Text Line: Text HOME to 741741</p>
            <br>
            <p><strong>Campus Resources:</strong></p>
            <p>🏥 Campus Health Center: Available 24/7</p>
            <p>👨‍⚕️ Counseling Services: Walk-ins welcome</p>
        </div>
    `);
}

// Animation and interaction enhancements
function addButtonClickEffect(button) {
    if (button && button.style) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
}

// Add click effects to all buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.classList.contains('mood-option') || e.target.classList.contains('time-slot')) {
        addButtonClickEffect(e.target);
    }
});

// Handle browser back button
window.addEventListener('popstate', function(e) {
    if (!currentUser) {
        showScreen('landing-page');
    }
});

// Auto-save functionality simulation
setInterval(() => {
    if (currentUser && moodHistory.length > 0) {
        // Simulate auto-save to secure server
        console.log('Auto-saving user data securely...');
    }
}, 30000); // Every 30 seconds

// Initialize dark mode support
function toggleDarkMode() {
    const currentScheme = document.documentElement.getAttribute('data-color-scheme');
    document.documentElement.setAttribute('data-color-scheme', 
        currentScheme === 'dark' ? 'light' : 'dark'
    );
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeModal();
        endChat();
    }
    
    // Enter to submit forms when focused
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'text') {
        const form = e.target.closest('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Mitra app loaded successfully');
    console.log('Security: All data transmission encrypted');
    console.log('Privacy: Anonymous user tracking enabled');
});

// Controlled error handling - only for critical errors
window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise rejection:', event.reason);
    // Only show modal for actual critical errors
    if (event.reason && event.reason.message && event.reason.message.includes('critical')) {
        showModal('Connection Issue', 'Please check your internet connection and try again.');
    }
});

// Simulate real-time updates for counselors
let counselorInterval = null;

function startCounselorUpdates() {
    if (currentRole === 'counselor' && !counselorInterval) {
        counselorInterval = setInterval(() => {
            // Simulate receiving new student mood updates
            const notifications = [
                'ANON-ST003 completed mood check-in',
                'ANON-ST001 scheduled new session',
                'ANON-ST002 updated risk assessment'
            ];
            
            // This would show real notifications in a full implementation
            console.log('Counselor notification:', notifications[Math.floor(Math.random() * notifications.length)]);
        }, 60000); // Every minute
    }
}

function stopCounselorUpdates() {
    if (counselorInterval) {
        clearInterval(counselorInterval);
        counselorInterval = null;
    }
}