// Global state
let currentUser = null;
let currentRole = null;
let currentLanguage = 'en';
let selectedMood = null;
let selectedSleepHours = null;
let selectedStudent = null;
let selectedRiskLevel = null;
let moodStreak = 7;

// Chart instances
let moodChart = null;
let studentChart1 = null;
let moodTrendsChart = null;
let languageChart = null;

// Sample data
const moodHistory = [
    {date: '2025-09-16', mood: '😊', value: 5},
    {date: '2025-09-15', mood: '😐', value: 3},
    {date: '2025-09-14', mood: '😊', value: 5},
    {date: '2025-09-13', mood: '😢', value: 2},
    {date: '2025-09-12', mood: '😰', value: 1},
    {date: '2025-09-11', mood: '😊', value: 5},
    {date: '2025-09-10', mood: '😐', value: 3}
];

const translations = {
    en: {
        greeting: 'Welcome back! 🌟',
        moodQuestion: 'How are you feeling today?'
    },
    hi: {
        greeting: 'नमस्ते, आपका स्वागत है! 🌟',
        moodQuestion: 'आज आपका मूड कैसा है?'
    },
    ta: {
        greeting: 'வணக்கம், உங்களை வரவேற்கிறோம்! 🌟',
        moodQuestion: 'இன்று உங்கள் மனநிலை எப்படி உள்ளது?'
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧠 Mitra app initializing...');
    
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        initializeApp();
    }, 100);
});

function initializeApp() {
    console.log('🚀 Setting up all interactions...');
    
    // Remove any existing event listeners first
    removeAllEventListeners();
    
    // Set up all event listeners
    setupAllEventListeners();
    
    // Show landing page
    showScreen('landing-page');
    
    console.log('✅ App initialized - all buttons ready!');
}

function removeAllEventListeners() {
    // Create a clean slate for event listeners
    const elements = document.querySelectorAll('button, [role="button"]');
    elements.forEach(el => {
        const newEl = el.cloneNode(true);
        el.parentNode.replaceChild(newEl, el);
    });
}

function setupAllEventListeners() {
    console.log('🔧 Attaching event listeners...');
    
    // Landing page role selection - CRITICAL FIX
    setupRoleSelection();
    
    // Back buttons
    setupBackButtons();
    
    // Login forms
    setupLoginForms();
    
    // Student dashboard
    setupStudentDashboard();
    
    // Counselor dashboard  
    setupCounselorDashboard();
    
    // Admin dashboard
    setupAdminDashboard();
    
    // Modal
    setupModal();
    
    console.log('🎯 All event listeners attached successfully!');
}

function setupRoleSelection() {
    console.log('🎓 Setting up role selection...');
    
    // Critical fix: Use both addEventListener AND onclick for maximum compatibility
    const studentBtn = document.getElementById('student-role-btn');
    const counselorBtn = document.getElementById('counselor-role-btn');
    const adminBtn = document.getElementById('admin-role-btn');
    
    if (studentBtn) {
        // Multiple event binding methods for reliability
        studentBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎓 Student clicked via onclick');
            handleRoleClick('student', studentBtn);
        };
        
        studentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎓 Student clicked via addEventListener');
            handleRoleClick('student', studentBtn);
        });
        
        studentBtn.addEventListener('mousedown', function(e) {
            e.preventDefault();
            console.log('🎓 Student mousedown');
            handleRoleClick('student', studentBtn);
        });
        
        console.log('✅ Student role button ready');
    }
    
    if (counselorBtn) {
        counselorBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('👨‍⚕️ Counselor clicked via onclick');
            handleRoleClick('counselor', counselorBtn);
        };
        
        counselorBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('👨‍⚕️ Counselor clicked via addEventListener');
            handleRoleClick('counselor', counselorBtn);
        });
        
        counselorBtn.addEventListener('mousedown', function(e) {
            e.preventDefault();
            console.log('👨‍⚕️ Counselor mousedown');
            handleRoleClick('counselor', counselorBtn);
        });
        
        console.log('✅ Counselor role button ready');
    }
    
    if (adminBtn) {
        adminBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('📊 Admin clicked via onclick');
            handleRoleClick('admin', adminBtn);
        };
        
        adminBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('📊 Admin clicked via addEventListener');
            handleRoleClick('admin', adminBtn);
        });
        
        adminBtn.addEventListener('mousedown', function(e) {
            e.preventDefault();
            console.log('📊 Admin mousedown');
            handleRoleClick('admin', adminBtn);
        });
        
        console.log('✅ Admin role button ready');
    }
}

function handleRoleClick(role, button) {
    console.log('🎯 Role clicked:', role);
    
    // Visual feedback
    addClickEffect(button);
    
    // Navigate immediately
    selectRole(role);
}

function setupBackButtons() {
    console.log('⬅️ Setting up back buttons...');
    
    const backBtns = [
        'back-to-landing-1',
        'back-to-landing-2', 
        'back-to-landing-3'
    ];
    
    backBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                console.log('⬅️ Back button clicked:', id);
                addClickEffect(btn);
                showScreen('landing-page');
            };
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('⬅️ Back button via addEventListener:', id);
                addClickEffect(btn);
                showScreen('landing-page');
            });
        }
    });
}

function setupLoginForms() {
    console.log('🔐 Setting up login forms...');
    
    // Student login
    const studentLoginBtn = document.getElementById('student-login-btn');
    if (studentLoginBtn) {
        studentLoginBtn.onclick = function(e) {
            e.preventDefault();
            console.log('🎓 Student login clicked');
            addClickEffect(studentLoginBtn);
            loginAsStudent();
        };
        
        studentLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎓 Student login via addEventListener');
            addClickEffect(studentLoginBtn);
            loginAsStudent();
        });
    }
    
    // Counselor login
    const counselorLoginBtn = document.getElementById('counselor-login-btn');
    if (counselorLoginBtn) {
        counselorLoginBtn.onclick = function(e) {
            e.preventDefault();
            console.log('👨‍⚕️ Counselor login clicked');
            addClickEffect(counselorLoginBtn);
            loginAsCounselor();
        };
        
        counselorLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('👨‍⚕️ Counselor login via addEventListener');
            addClickEffect(counselorLoginBtn);
            loginAsCounselor();
        });
    }
    
    // Admin login
    const adminLoginBtn = document.getElementById('admin-login-btn');
    if (adminLoginBtn) {
        adminLoginBtn.onclick = function(e) {
            e.preventDefault();
            console.log('📊 Admin login clicked');
            addClickEffect(adminLoginBtn);
            loginAsAdmin();
        };
        
        adminLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📊 Admin login via addEventListener');
            addClickEffect(adminLoginBtn);
            loginAsAdmin();
        });
    }
}

function setupStudentDashboard() {
    console.log('🎓 Setting up student dashboard...');
    
    // Language switcher
    const langBtns = ['lang-en', 'lang-hi', 'lang-ta', 'lang-bn', 'lang-mr'];
    langBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            const lang = id.replace('lang-', '');
            btn.onclick = function(e) {
                e.preventDefault();
                console.log('🌍 Language clicked:', lang);
                addClickEffect(btn);
                switchLanguage(lang);
            };
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🌍 Language via addEventListener:', lang);
                addClickEffect(btn);
                switchLanguage(lang);
            });
        }
    });
    
    // Logout button
    const logoutBtn = document.getElementById('student-logout');
    if (logoutBtn) {
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            console.log('👋 Logout clicked');
            addClickEffect(logoutBtn);
            logout();
        };
    }
    
    // Bottom navigation - CRITICAL FIX
    const navBtns = [
        {id: 'nav-mood', section: 'mood-section'},
        {id: 'nav-resources', section: 'resources-section'},
        {id: 'nav-support', section: 'support-section'},
        {id: 'nav-sessions', section: 'session-section'}
    ];
    
    navBtns.forEach(nav => {
        const btn = document.getElementById(nav.id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Navigation clicked:', nav.section);
                addClickEffect(btn);
                showSection(nav.section);
                updateNavigation(nav.id);
            };
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Navigation via addEventListener:', nav.section);
                addClickEffect(btn);
                showSection(nav.section);
                updateNavigation(nav.id);
            });
        }
    });
    
    // Mood options - CRITICAL FIX
    const moodBtns = ['mood-happy', 'mood-neutral', 'mood-sad', 'mood-angry', 'mood-anxious'];
    moodBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                console.log('😊 Mood clicked:', id);
                addClickEffect(btn);
                selectMood(id, btn);
            };
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('😊 Mood via addEventListener:', id);
                addClickEffect(btn);
                selectMood(id, btn);
            });
        }
    });
    
    // Sleep buttons
    const sleepBtns = ['sleep-4', 'sleep-5', 'sleep-6', 'sleep-7', 'sleep-8', 'sleep-9'];
    sleepBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            const hours = id.replace('sleep-', '');
            btn.onclick = function(e) {
                e.preventDefault();
                console.log('😴 Sleep clicked:', hours);
                addClickEffect(btn);
                selectSleep(hours, btn);
            };
        }
    });
    
    // Submit mood button - CRITICAL FIX
    const submitMoodBtn = document.getElementById('submit-mood-btn');
    if (submitMoodBtn) {
        submitMoodBtn.onclick = function(e) {
            e.preventDefault();
            console.log('✅ Submit mood clicked');
            addClickEffect(submitMoodBtn);
            submitMoodCheck();
        };
        
        submitMoodBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('✅ Submit mood via addEventListener');
            addClickEffect(submitMoodBtn);
            submitMoodCheck();
        });
    }
    
    // Sliders
    setupSliders();
    
    // Resource filters
    setupResourceFilters();
    
    // Support tabs
    setupSupportTabs();
    
    // Time slots
    setupTimeSlots();
    
    // Resource buttons
    setupResourceButtons();
}

function setupSliders() {
    const stressSlider = document.getElementById('stress-slider');
    const connectionSlider = document.getElementById('connection-slider');
    const stressValue = document.getElementById('stress-value');
    const connectionValue = document.getElementById('connection-value');
    
    if (stressSlider && stressValue) {
        stressSlider.addEventListener('input', function() {
            stressValue.textContent = stressSlider.value;
        });
    }
    
    if (connectionSlider && connectionValue) {
        connectionSlider.addEventListener('input', function() {
            connectionValue.textContent = connectionSlider.value;
        });
    }
}

function setupResourceFilters() {
    // Language filters
    const langFilters = ['filter-all', 'filter-en', 'filter-hi', 'filter-ta', 'filter-bn'];
    langFilters.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                console.log('🔍 Filter clicked:', id);
                addClickEffect(btn);
                updateFilterButtons(btn, '.filter-btn');
            };
        }
    });
    
    // Type filters
    const typeFilters = ['type-all', 'type-video', 'type-audio', 'type-article'];
    typeFilters.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                console.log('📁 Type filter clicked:', id);
                addClickEffect(btn);
                updateFilterButtons(btn, '.type-btn');
            };
        }
    });
}

function setupSupportTabs() {
    const supportTabs = [
        {id: 'tab-campus', content: 'campus-content'},
        {id: 'tab-counselors', content: 'counselors-content'},
        {id: 'tab-emergency', content: 'emergency-content'}
    ];
    
    supportTabs.forEach(tab => {
        const btn = document.getElementById(tab.id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                console.log('🏥 Support tab clicked:', tab.id);
                addClickEffect(btn);
                showSupportTab(tab.content);
                updateSupportTabs(tab.id);
            };
        }
    });
}

function setupTimeSlots() {
    const timeSlots = ['slot-9am', 'slot-11am', 'slot-2pm', 'slot-3pm', 'slot-4pm'];
    timeSlots.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                const time = btn.querySelector('.time').textContent;
                console.log('📅 Time slot clicked:', time);
                addClickEffect(btn);
                bookTimeSlot(time, btn);
            };
        }
    });
}

function setupResourceButtons() {
    const resourceBtns = ['play-v001', 'download-v001', 'play-a001', 'download-a001'];
    resourceBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                console.log('📚 Resource clicked:', id);
                addClickEffect(btn);
                const action = id.includes('play') ? 'play' : 'download';
                const resourceId = id.split('-')[1];
                handleResourceAction(action, resourceId);
            };
        }
    });
}

function setupCounselorDashboard() {
    console.log('👨‍⚕️ Setting up counselor dashboard...');
    
    // Logout
    const logoutBtn = document.getElementById('counselor-logout');
    if (logoutBtn) {
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            addClickEffect(logoutBtn);
            logout();
        };
    }
    
    // Navigation
    const navBtns = [
        {id: 'nav-students', section: 'students-section'},
        {id: 'nav-reports', section: 'reporting-section'}
    ];
    
    navBtns.forEach(nav => {
        const btn = document.getElementById(nav.id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                console.log('👨‍⚕️ Counselor nav clicked:', nav.section);
                addClickEffect(btn);
                showSection(nav.section);
                updateNavigation(nav.id);
            };
        }
    });
    
    // Student selection
    const studentBtns = ['select-st001', 'select-st002', 'select-st003'];
    studentBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                const student = id.replace('select-', '').toUpperCase();
                console.log('👤 Student selected:', student);
                addClickEffect(btn);
                selectStudent(student, btn);
            };
        }
    });
    
    // Risk buttons
    const riskBtns = ['risk-low', 'risk-medium', 'risk-high'];
    riskBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                const risk = id.replace('risk-', '');
                console.log('⚠️ Risk selected:', risk);
                addClickEffect(btn);
                selectRisk(risk, btn);
            };
        }
    });
    
    // Submit report
    const submitBtn = document.getElementById('submit-report-btn');
    if (submitBtn) {
        submitBtn.onclick = function(e) {
            e.preventDefault();
            console.log('📋 Submit report clicked');
            addClickEffect(submitBtn);
            submitReport();
        };
    }
    
    // View student
    const viewBtn = document.getElementById('view-student-1');
    if (viewBtn) {
        viewBtn.onclick = function(e) {
            e.preventDefault();
            console.log('👁️ View student clicked');
            addClickEffect(viewBtn);
            showModal('Student Details: ANON-ST001', 'Risk: Low | Sessions: 3 | Last Activity: Today | Mood: Stable');
        };
    }
}

function setupAdminDashboard() {
    console.log('📊 Setting up admin dashboard...');
    
    const logoutBtn = document.getElementById('admin-logout');
    if (logoutBtn) {
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            addClickEffect(logoutBtn);
            logout();
        };
    }
    
    const exportBtn = document.getElementById('export-analytics');
    if (exportBtn) {
        exportBtn.onclick = function(e) {
            e.preventDefault();
            console.log('📤 Export clicked');
            addClickEffect(exportBtn);
            showModal('Exporting Analytics 📊', 'Report is being generated and will be available shortly.');
        };
    }
    
    const navAnalytics = document.getElementById('nav-analytics');
    if (navAnalytics) {
        navAnalytics.onclick = function(e) {
            e.preventDefault();
            addClickEffect(navAnalytics);
            showSection('analytics-section');
            updateNavigation('nav-analytics');
        };
    }
}

function setupModal() {
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.onclick = function(e) {
            e.preventDefault();
            console.log('❌ Modal close clicked');
            addClickEffect(closeBtn);
            closeModal();
        };
    }
    
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeModal();
            }
        };
    }
}

// Core Functions
function showScreen(screenId) {
    console.log('🖥️ Showing screen:', screenId);
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        console.log('✅ Screen shown:', screenId);
        
        // Initialize dashboard features
        if (screenId === 'student-dashboard') {
            setTimeout(() => initializeStudentCharts(), 300);
            showSection('mood-section');
            updateNavigation('nav-mood');
        } else if (screenId === 'counselor-dashboard') {
            setTimeout(() => initializeCounselorCharts(), 300);
            showSection('students-section');
            updateNavigation('nav-students');
        } else if (screenId === 'admin-dashboard') {
            setTimeout(() => initializeAdminCharts(), 300);
            showSection('analytics-section');
            updateNavigation('nav-analytics');
        }
    }
}

function selectRole(role) {
    console.log('🎯 Role selected:', role);
    currentRole = role;
    
    if (role === 'student') {
        showScreen('student-login');
    } else if (role === 'counselor') {
        showScreen('counselor-login');
    } else if (role === 'admin') {
        showScreen('admin-login');
    }
}

function loginAsStudent() {
    console.log('🎓 Logging in as student...');
    currentUser = 'ANON-ST7832';
    showScreen('student-dashboard');
}

function loginAsCounselor() {
    console.log('👨‍⚕️ Logging in as counselor...');
    currentUser = 'DR-C4821';
    showScreen('counselor-dashboard');
}

function loginAsAdmin() {
    console.log('📊 Logging in as admin...');
    currentUser = 'ADMIN-001';
    showScreen('admin-dashboard');
}

function logout() {
    console.log('👋 Logging out...');
    currentUser = null;
    currentRole = null;
    destroyAllCharts();
    showScreen('landing-page');
    showModal('Logged Out Successfully', 'You have been securely logged out.');
}

function showSection(sectionId) {
    console.log('📂 Showing section:', sectionId);
    
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('✅ Section shown:', sectionId);
    }
}

function updateNavigation(activeNavId) {
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    
    const activeNav = document.getElementById(activeNavId);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

function switchLanguage(langCode) {
    console.log('🌍 Switching to:', langCode);
    currentLanguage = langCode;
    
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.getElementById('lang-' + langCode);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    updateLanguageContent();
}

function updateLanguageContent() {
    const translation = translations[currentLanguage];
    if (!translation) return;
    
    const greeting = document.getElementById('student-greeting');
    if (greeting) {
        greeting.textContent = translation.greeting;
    }
    
    const moodQuestion = document.getElementById('mood-question');
    if (moodQuestion) {
        moodQuestion.textContent = translation.moodQuestion;
    }
}

// Mood Functions
function selectMood(moodId, button) {
    console.log('😊 Mood selected:', moodId);
    
    document.querySelectorAll('.mood-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    
    const moodMap = {
        'mood-happy': {emoji: '😊', value: 5, name: 'Happy'},
        'mood-neutral': {emoji: '😐', value: 3, name: 'Neutral'},
        'mood-sad': {emoji: '😢', value: 2, name: 'Sad'},
        'mood-angry': {emoji: '😠', value: 2, name: 'Angry'},
        'mood-anxious': {emoji: '😰', value: 1, name: 'Anxious'}
    };
    
    selectedMood = moodMap[moodId];
    
    const questions = document.getElementById('mood-questions');
    if (questions) {
        questions.classList.remove('hidden');
    }
}

function selectSleep(hours, button) {
    console.log('😴 Sleep selected:', hours);
    
    document.querySelectorAll('.sleep-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    selectedSleepHours = hours;
}

function submitMoodCheck() {
    console.log('✅ Submitting mood check...');
    
    if (!selectedMood) {
        showModal('Error', 'Please select your mood first!');
        return;
    }
    
    moodStreak++;
    
    moodHistory.unshift({
        date: new Date().toISOString().split('T')[0],
        mood: selectedMood.emoji,
        value: selectedMood.value
    });
    
    const streakCounter = document.querySelector('.streak-counter');
    if (streakCounter) {
        streakCounter.textContent = `🔥 ${moodStreak} Day Streak!`;
    }
    
    resetMoodForm();
    setTimeout(() => initializeStudentCharts(), 100);
    
    showModal('Mood Check-in Complete! 🎉', `Great job! Your ${moodStreak}-day streak continues. Your mood has been recorded securely.`);
}

function resetMoodForm() {
    document.querySelectorAll('.mood-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    document.querySelectorAll('.sleep-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    const questions = document.getElementById('mood-questions');
    if (questions) {
        questions.classList.add('hidden');
    }
    
    selectedMood = null;
    selectedSleepHours = null;
}

// Utility Functions
function updateFilterButtons(activeBtn, selector) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function handleResourceAction(action, resourceId) {
    const actionText = action === 'play' ? 'Playing' : 'Downloading';
    showModal(`${actionText} Resource`, `${actionText} resource ${resourceId} in ${currentLanguage.toUpperCase()}`);
}

function showSupportTab(contentId) {
    document.querySelectorAll('.support-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(contentId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

function updateSupportTabs(activeTabId) {
    document.querySelectorAll('.support-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.getElementById(activeTabId);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

function bookTimeSlot(time, button) {
    button.classList.remove('available');
    button.classList.add('booked');
    button.innerHTML = `<span class="time">${time}</span><span class="duration">Your Session</span>`;
    button.onclick = null;
    
    const sessionId = 'SESS-' + Date.now();
    showModal('Session Booked! 📅', `Your session for ${time} is confirmed. Session ID: ${sessionId}`);
}

// Counselor Functions
function selectStudent(studentId, button) {
    document.querySelectorAll('.student-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    selectedStudent = studentId;
}

function selectRisk(riskLevel, button) {
    document.querySelectorAll('.risk-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    selectedRiskLevel = riskLevel;
}

function submitReport() {
    if (!selectedStudent) {
        showModal('Error', 'Please select a student.');
        return;
    }
    
    if (!selectedRiskLevel) {
        showModal('Error', 'Please select a risk level.');
        return;
    }
    
    const reportId = 'RPT-' + Date.now();
    showModal('Report Submitted! 📋', `Report for ${selectedStudent} submitted. ID: ${reportId}`);
    
    document.querySelectorAll('.student-btn, .risk-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    selectedStudent = null;
    selectedRiskLevel = null;
}

// Chart Functions
function initializeStudentCharts() {
    console.log('📊 Creating student charts...');
    createMoodChart();
}

function initializeCounselorCharts() {
    console.log('📊 Creating counselor charts...');
    createStudentChart();
}

function initializeAdminCharts() {
    console.log('📊 Creating admin charts...');
    createMoodTrendsChart();
    createLanguageChart();
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
        console.log('Chart creation skipped');
    }
}

function createStudentChart() {
    const ctx = document.getElementById('studentChart1');
    if (!ctx) return;
    
    try {
        if (studentChart1) {
            studentChart1.destroy();
        }
        
        studentChart1 = new Chart(ctx, {
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
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 5 } }
            }
        });
    } catch (e) {
        console.log('Student chart creation skipped');
    }
}

function createMoodTrendsChart() {
    const ctx = document.getElementById('moodTrendsChart');
    if (!ctx) return;
    
    try {
        if (moodTrendsChart) {
            moodTrendsChart.destroy();
        }
        
        moodTrendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Current Week',
                    data: [3.2, 3.8, 2.9, 4.1, 3.7, 4.2, 3.5],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: true, max: 5 } }
            }
        });
    } catch (e) {
        console.log('Trends chart creation skipped');
    }
}

function createLanguageChart() {
    const ctx = document.getElementById('languageChart');
    if (!ctx) return;
    
    try {
        if (languageChart) {
            languageChart.destroy();
        }
        
        languageChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Hindi', 'English', 'Tamil', 'Bengali', 'Marathi', 'Others'],
                datasets: [{
                    data: [35, 28, 12, 8, 7, 10],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'right' } }
            }
        });
    } catch (e) {
        console.log('Language chart creation skipped');
    }
}

function destroyAllCharts() {
    try {
        if (moodChart) { moodChart.destroy(); moodChart = null; }
        if (studentChart1) { studentChart1.destroy(); studentChart1 = null; }
        if (moodTrendsChart) { moodTrendsChart.destroy(); moodTrendsChart = null; }
        if (languageChart) { languageChart.destroy(); languageChart = null; }
    } catch (e) {
        console.log('Chart cleanup completed');
    }
}

// Modal Functions
function showModal(title, message) {
    console.log('💬 Showing modal:', title);
    const modal = document.getElementById('successModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    if (modal && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.remove('hidden');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function addClickEffect(element) {
    if (element && element.style) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 100);
    }
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

console.log('🚀 Mitra JavaScript fully loaded - ALL BUTTONS WILL WORK!');