// Global state management
let currentUser = null;
let currentRole = null;
let currentLanguage = 'en';
let currentRegion = 'north';
let moodStreak = 7;
let selectedMood = null;
let selectedSleepHours = null;
let selectedStudent = null;
let selectedSessionType = null;
let selectedRiskLevel = null;
let selectedCounselor = null;
let currentWeekOffset = 0;
let chatMessages = [];
let moodHistory = [
    {date: '2025-09-16', mood: '😊', value: 5, streak: 7},
    {date: '2025-09-15', mood: '😐', value: 3, streak: 6},
    {date: '2025-09-14', mood: '😊', value: 5, streak: 5},
    {date: '2025-09-13', mood: '😢', value: 2, streak: 4},
    {date: '2025-09-12', mood: '😰', value: 1, streak: 3},
    {date: '2025-09-11', mood: '😊', value: 5, streak: 2},
    {date: '2025-09-10', mood: '😐', value: 3, streak: 1}
];

// Enhanced data structures with cultural context
const regions = {
    north: {
        name: 'North India',
        states: ['Delhi', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan'],
        practices: [
            {
                name: 'Meditation & Mindfulness',
                description: 'Traditional Dhyana practices adapted for student life',
                duration: '10-20 minutes',
                benefits: ['Stress reduction', 'Focus improvement', 'Emotional regulation']
            },
            {
                name: 'Pranayama Breathing',
                description: 'Ancient breathing techniques for anxiety management',
                duration: '5-15 minutes',
                benefits: ['Anxiety relief', 'Better sleep', 'Mental clarity']
            }
        ],
        stressors: ['Family expectations and marriage pressure', 'Intense career competition', 'Balancing traditional values with modern life'],
        remedies: ['Ayurvedic herbs and lifestyle changes', 'Prayer and satsang community support', 'Family integration with boundary setting']
    },
    south: {
        name: 'South India',
        states: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Kerala', 'Telangana'],
        practices: [
            {
                name: 'Classical Music Therapy',
                description: 'Ragas and rhythms for emotional healing',
                duration: '15-30 minutes',
                benefits: ['Mood elevation', 'Stress relief', 'Cultural connection']
            },
            {
                name: 'Temple Visit Mindfulness',
                description: 'Spiritual practices for mental peace',
                duration: '30-60 minutes',
                benefits: ['Spiritual grounding', 'Community connection', 'Inner peace']
            }
        ],
        stressors: ['Academic excellence pressure and competition', 'Cultural transition challenges', 'Language barriers in new environments'],
        remedies: ['Siddha medicine and music therapy', 'Classical arts and spiritual practices', 'Community elder guidance']
    },
    west: {
        name: 'West India',
        states: ['Maharashtra', 'Gujarat', 'Goa', 'Rajasthan'],
        practices: [
            {
                name: 'Community Meditation',
                description: 'Group practices for urban stress relief',
                duration: '15-25 minutes',
                benefits: ['Social connection', 'Stress reduction', 'Urban balance']
            },
            {
                name: 'Business Mindfulness',
                description: 'Practices adapted for entrepreneurial families',
                duration: '10-20 minutes',
                benefits: ['Decision clarity', 'Financial stress relief', 'Work-life balance']
            }
        ],
        stressors: ['Urban isolation and loneliness', 'Business family pressure', 'Financial and career stress'],
        remedies: ['Community support networks', 'Business mentorship programs', 'Cultural festival participation']
    },
    east: {
        name: 'East India',
        states: ['West Bengal', 'Bihar', 'Jharkhand', 'Odisha'],
        practices: [
            {
                name: 'Literature Therapy',
                description: 'Poetry and reading for emotional processing',
                duration: '20-40 minutes',
                benefits: ['Emotional expression', 'Cultural connection', 'Mental clarity']
            },
            {
                name: 'Artistic Expression',
                description: 'Creative arts for mental wellness',
                duration: '30-60 minutes',
                benefits: ['Stress relief', 'Self-expression', 'Community building']
            }
        ],
        stressors: ['Economic challenges and migration', 'Educational opportunities seeking', 'Cultural preservation concerns'],
        remedies: ['Poetry and literature therapy', 'Community elder wisdom', 'Cultural arts participation']
    }
};

const languages = {
    en: { name: 'English', native: 'English', flag: '🇺🇸' },
    hi: { name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    ta: { name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    bn: { name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
    mr: { name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    te: { name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    gu: { name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
    pa: { name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    ur: { name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
    kn: { name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' }
};

// AI Assistant responses with cultural context
const aiResponses = {
    exam_stress: {
        north: "I understand exam pressure can be overwhelming, especially in North India where family expectations are high. Many students in your region find success combining traditional Pranayama breathing with modern study techniques. Would you like me to guide you through a 5-minute breathing exercise that's particularly effective for academic stress?",
        south: "Academic excellence is deeply valued in South Indian culture, and I know the pressure can feel intense. Students from your region often benefit from integrating classical music therapy with study breaks. Would you like some personalized study strategies that honor your cultural background while managing stress?",
        west: "Urban academic pressure in West India can be particularly challenging with the fast-paced lifestyle. Many students here find relief through community study groups and business-minded goal setting. Shall we explore some time management techniques that work well for students from your region?",
        east: "The pursuit of educational opportunities is a common source of stress in East India. Students from your region often find solace in literature and creative expression alongside their studies. Would you like to try some poetry-based reflection techniques for exam stress?"
    },
    family_pressure: {
        north: "Family expectations can feel overwhelming, especially in joint family systems common in North India. You're not alone - this is something many students navigate. In your cultural context, there are respectful ways to communicate boundaries while honoring family relationships. Would you like guidance on having these conversations?",
        south: "I understand how South Indian family dynamics can create pressure around academic and career choices. The expectation for excellence is deeply rooted in your culture. Many students find success in gradual family education about mental health. Shall we discuss some culturally respectful approaches?",
        west: "Business family expectations in West India can be intense, especially around career and financial success. I know how the entrepreneurial culture can add pressure. Would you like to explore some strategies that successful students from your region use to balance family expectations with personal well-being?",
        east: "Economic challenges and family hopes for better opportunities through education create unique pressures in East India. The responsibility can feel heavy. Many students from your region find strength through community support and elder wisdom. Would you like to connect with some culturally-relevant coping strategies?"
    },
    loneliness: {
        north: "Feeling isolated is difficult, especially when community and family connections are so central to North Indian culture. Being away from familiar festivals, foods, and language can deepen loneliness. Shall we explore ways to build meaningful cultural connections while maintaining your individual growth?",
        south: "I understand how homesickness affects South Indian students, especially missing temple visits, regional cuisine, and familiar cultural rhythms. The transition to new environments while maintaining cultural identity is challenging. Would you like to explore some peer support options with others who share your background?",
        west: "Urban loneliness is common in West India's fast-paced cities. Even in crowded places, the lack of authentic connections can feel isolating. Many students from your region find community through cultural societies and business networking groups. Shall we look at some options?",
        east: "The cultural richness of East India - literature, arts, community discussions - can feel distant when you're in a new environment. Missing adda sessions and cultural gatherings is natural. Would you like to connect with cultural groups or discussion circles that might feel like home?"
    },
    cultural_practices: {
        north: "Traditional practices from North India can be wonderful for mental wellness. Meditation, yoga, and pranayama have helped students for generations. Many also find comfort in satsang (spiritual gatherings) and Ayurvedic lifestyle practices. Which traditional approach interests you most?",
        south: "South Indian traditions offer beautiful healing practices - from classical music therapy using specific ragas to temple meditation and traditional dance. Many students find that Siddha medicine principles and spiritual practices help with modern stress. What resonates most with you?",
        west: "West Indian traditions emphasize community wellness and practical spirituality. Business families often benefit from karma yoga principles and community-focused meditation practices. Festival participation and community support systems are also healing. Which traditional element would you like to explore?",
        east: "East Indian culture has rich traditions of emotional expression through literature, arts, and community dialogue. Poetry therapy, artistic expression, and elder consultation are deeply rooted healing practices. Would you like to explore how these traditional approaches can support your current situation?"
    }
};

// Counselors with enhanced cultural expertise
const counselorsData = {
    C001: {
        name: 'Dr. Priya Sharma',
        region: 'north',
        languages: ['Hindi', 'English', 'Punjabi'],
        specializations: ['Family therapy', 'Cultural counseling', 'Academic stress'],
        culturalExpertise: 'Joint family dynamics, Marriage counseling, Religious integration',
        rating: 4.8,
        experience: '8 years',
        availability: {
            monday: ['09:00', '10:00', '14:00', '15:00', '16:00'],
            tuesday: ['09:00', '11:00', '14:00', '15:00'],
            wednesday: ['10:00', '11:00', '14:00', '16:00'],
            thursday: ['09:00', '10:00', '15:00', '16:00'],
            friday: ['09:00', '14:00', '15:00', '16:00']
        }
    },
    C002: {
        name: 'Dr. Ravi Kumar',
        region: 'south',
        languages: ['Tamil', 'English', 'Telugu'],
        specializations: ['Academic pressure', 'Career counseling', 'Anxiety'],
        culturalExpertise: 'South Indian family systems, Academic excellence culture, Traditional healing',
        rating: 4.9,
        experience: '12 years',
        availability: {
            monday: ['10:00', '11:00', '15:00', '16:00'],
            tuesday: ['09:00', '10:00', '14:00', '16:00'],
            wednesday: ['09:00', '11:00', '15:00', '16:00'],
            thursday: ['10:00', '14:00', '15:00'],
            friday: ['09:00', '10:00', '11:00', '16:00']
        }
    },
    C003: {
        name: 'Dr. Anjali Patel',
        region: 'west',
        languages: ['Gujarati', 'Hindi', 'English'],
        specializations: ['Urban stress', 'Relationship counseling', 'Depression'],
        culturalExpertise: 'Business family pressure, Urban-rural transition, Community therapy',
        rating: 4.7,
        experience: '10 years',
        availability: {
            monday: ['09:00', '10:00', '11:00', '14:00'],
            tuesday: ['10:00', '14:00', '15:00', '16:00'],
            wednesday: ['09:00', '10:00', '15:00', '16:00'],
            thursday: ['09:00', '11:00', '14:00', '15:00'],
            friday: ['10:00', '11:00', '14:00', '16:00']
        }
    }
};

// Peer volunteers data
const volunteersData = {
    PV001: {
        name: 'Volunteer Rohit',
        region: 'north',
        languages: ['Hindi', 'English'],
        specializations: ['Study stress', 'Time management', 'Exam anxiety'],
        certification: 'Level 3 Certified',
        status: 'online',
        rating: 4.6,
        sessions: 45,
        bio: 'Engineering student who overcame severe exam anxiety, now helps others'
    },
    PV002: {
        name: 'Volunteer Deepika',
        region: 'south',
        languages: ['Tamil', 'English'],
        specializations: ['Academic pressure', 'Family expectations', 'Cultural adjustment'],
        certification: 'Level 2 Certified',
        status: 'online',
        rating: 4.8,
        sessions: 32,
        bio: 'Medical student who navigated family pressure, specializes in academic stress'
    },
    PV003: {
        name: 'Volunteer Arjun',
        region: 'west',
        languages: ['Marathi', 'Hindi', 'English'],
        specializations: ['Urban stress', 'Social anxiety', 'Career confusion'],
        certification: 'Level 3 Certified',
        status: 'busy',
        rating: 4.7,
        sessions: 58,
        bio: 'MBA student from rural background, helps with urban adjustment challenges'
    }
};

const translations = {
    en: {
        greeting: 'Welcome back! 🌟',
        moodQuestion: 'How are you feeling today?',
        supportMessage: 'We are here for you'
    },
    hi: {
        greeting: 'नमस्ते, आपका स्वागत है! 🌟',
        moodQuestion: 'आज आपका मूड कैसा है?',
        supportMessage: 'हम आपके साथ हैं'
    },
    ta: {
        greeting: 'வணக்கம், உங்களை வரவேற்கிறோம்! 🌟',
        moodQuestion: 'இன்று உங்கள் மனநிலை எப்படி உள்ளது?',
        supportMessage: 'நாங்கள் உங்களுடன் இருக்கிறோம்'
    }
};

// Chart instances
let moodChart = null;
let studentChart1 = null;
let moodTrendsChart = null;
let languageChart = null;

// Admin analytics data
const adminData = {
    moodTrends: {
        current: [3.2, 3.8, 2.9, 4.1, 3.7, 4.2, 3.5],
        previous: [3.5, 3.1, 3.3, 3.8, 3.2, 3.9, 3.4]
    },
    regionalDistribution: {
        'North India': 35,
        'South India': 28,
        'West India': 22,
        'East India': 15
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Enhanced Mitra app...');
    initializeApp();
});

function initializeApp() {
    console.log('Starting enhanced app on landing page...');
    showScreen('landing-page');
    setupEventListeners();
    setupSliders();
    setupLanguageSwitchers();
    setupResourceFilters();
    updateLanguageDisplay();
    initializeChatMessages();
}

function setupEventListeners() {
    console.log('Setting up enhanced event listeners...');
    
    // Role selection with immediate event binding
    bindRoleSelectionEvents();
    
    // Region selection
    bindRegionSelectionEvents();

    setupLoginForms();
    setupInteractionListeners();
    setupNewFeatureListeners();
}

function bindRoleSelectionEvents() {
    const roleCards = document.querySelectorAll('.role-card');
    console.log('Found role cards:', roleCards.length);
    
    roleCards.forEach((card, index) => {
        console.log(`Binding events to role card ${index}:`, card.dataset.role);
        
        // Remove any existing listeners to prevent duplicates
        card.removeEventListener('click', handleRoleClick);
        card.removeEventListener('keydown', handleRoleKeydown);
        
        // Add new listeners
        card.addEventListener('click', handleRoleClick);
        card.addEventListener('keydown', handleRoleKeydown);
        
        // Make focusable for keyboard navigation
        card.setAttribute('tabindex', '0');
    });
}

function bindRegionSelectionEvents() {
    // Use setTimeout to ensure elements exist when login screen is shown
    setTimeout(() => {
        const regionBtns = document.querySelectorAll('.region-btn');
        regionBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                selectRegion(this);
            });
        });
    }, 100);
}

function handleRoleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const role = this.dataset.role;
    console.log('Role card clicked:', role);
    
    if (!role) {
        console.error('No role data found on card');
        return;
    }
    
    selectRole(role);
}

function handleRoleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const role = this.dataset.role;
        console.log('Role card keyboard activated:', role);
        selectRole(role);
    }
}

function selectRole(role) {
    console.log('Selecting role:', role);
    currentRole = role;
    
    // Add visual feedback
    document.querySelectorAll('.role-card').forEach(card => {
        card.style.borderColor = 'var(--color-card-border)';
    });
    
    // Highlight selected card
    const selectedCard = document.querySelector(`[data-role="${role}"]`);
    if (selectedCard) {
        selectedCard.style.borderColor = 'var(--color-primary)';
    }
    
    // Navigate to appropriate login screen
    setTimeout(() => {
        if (role === 'student') {
            showScreen('student-login');
        } else if (role === 'counselor') {
            showScreen('counselor-login');
        } else if (role === 'admin') {
            showScreen('admin-login');
        } else {
            console.error('Unknown role:', role);
        }
    }, 300); // Small delay for visual feedback
}

function selectRegion(button) {
    console.log('Region selected:', button.dataset.region);
    
    // Remove previous selections
    document.querySelectorAll('.region-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select current region
    button.classList.add('selected');
    currentRegion = button.dataset.region;
}

function setupNewFeatureListeners() {
    // AI Assistant listeners
    setupChatListeners();
    
    // Enhanced booking listeners
    setupBookingListeners();
    
    // Peer support listeners
    setupPeerSupportListeners();
    
    // Cultural wellness listeners
    setupCulturalWellnessListeners();
}

function setupChatListeners() {
    // Chat input handling - use setTimeout to ensure elements exist
    setTimeout(() => {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    }, 100);
}

function setupBookingListeners() {
    // Use setTimeout to ensure elements exist
    setTimeout(() => {
        // Counselor region filters
        document.querySelectorAll('.region-filter-buttons .filter-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleCounselorRegionFilter(this);
            });
        });

        // Session type filters
        document.querySelectorAll('.session-type-filter-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleSessionTypeFilter(this);
            });
        });
    }, 100);
}

function setupPeerSupportListeners() {
    // Use setTimeout to ensure elements exist
    setTimeout(() => {
        // Peer support tabs
        document.querySelectorAll('.peer-tab').forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                showPeerTab(this.dataset.tab);
            });
        });

        // Matching form listeners
        document.querySelectorAll('.concern-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                selectConcern(this);
            });
        });

        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                selectStyle(this);
            });
        });
    }, 100);
}

function setupCulturalWellnessListeners() {
    // Cultural practice listeners are handled by onclick in HTML
    console.log('Cultural wellness listeners ready');
}

function setupInteractionListeners() {
    // Use setTimeout to ensure elements exist when dashboards are loaded
    setTimeout(() => {
        // Mood selection
        document.querySelectorAll('.mood-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                selectMoodOption(this);
            });
        });

        // Sleep buttons
        document.querySelectorAll('.sleep-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                selectSleepHours(this);
            });
        });

        // Student selection buttons
        document.querySelectorAll('.student-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                selectStudent(this);
            });
        });

        // Session type buttons
        document.querySelectorAll('.session-type-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                selectSessionType(this);
            });
        });

        // Risk assessment buttons
        document.querySelectorAll('.risk-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                selectRiskLevel(this);
            });
        });

        // Resource filter buttons
        document.querySelectorAll('.language-filter-buttons .filter-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleResourceLanguageFilter(this);
            });
        });

        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleResourceTypeFilter(this);
            });
        });

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleResourceCategoryFilter(this);
            });
        });

        // Support tabs
        document.querySelectorAll('.support-tab').forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                showSupportTab(this.dataset.tab);
            });
        });

        // Analytics filter buttons
        document.querySelectorAll('.analytics-filter-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleAnalyticsFilter(this);
            });
        });
    }, 100);
}

function setupLoginForms() {
    console.log('Setting up enhanced login forms...');
    setupStudentLogin();
    setupCounselorLogin();
    setupAdminLogin();
    setupReportForm();
}

function setupStudentLogin() {
    // Use setTimeout to ensure form exists when login screen is shown
    setTimeout(() => {
        const form = document.getElementById('student-login-form');
        const button = form?.querySelector('button[type="submit"]');
        
        if (form && button) {
            form.removeEventListener('submit', loginAsStudentHandler);
            button.removeEventListener('click', loginAsStudentHandler);
            
            form.addEventListener('submit', loginAsStudentHandler);
            button.addEventListener('click', loginAsStudentHandler);
            
            console.log('Student login form setup complete');
        }
    }, 100);
}

function loginAsStudentHandler(e) {
    e.preventDefault();
    console.log('Student login triggered');
    loginAsStudent();
}

function setupCounselorLogin() {
    setTimeout(() => {
        const form = document.getElementById('counselor-login-form');
        const button = form?.querySelector('button[type="submit"]');
        
        if (form && button) {
            form.removeEventListener('submit', loginAsCounselorHandler);
            button.removeEventListener('click', loginAsCounselorHandler);
            
            form.addEventListener('submit', loginAsCounselorHandler);
            button.addEventListener('click', loginAsCounselorHandler);
            
            console.log('Counselor login form setup complete');
        }
    }, 100);
}

function loginAsCounselorHandler(e) {
    e.preventDefault();
    console.log('Counselor login triggered');
    loginAsCounselor();
}

function setupAdminLogin() {
    setTimeout(() => {
        const form = document.getElementById('admin-login-form');
        const button = form?.querySelector('button[type="submit"]');
        
        if (form && button) {
            form.removeEventListener('submit', loginAsAdminHandler);
            button.removeEventListener('click', loginAsAdminHandler);
            
            form.addEventListener('submit', loginAsAdminHandler);
            button.addEventListener('click', loginAsAdminHandler);
            
            console.log('Admin login form setup complete');
        }
    }, 100);
}

function loginAsAdminHandler(e) {
    e.preventDefault();
    console.log('Admin login triggered');
    loginAsAdmin();
}

function setupReportForm() {
    setTimeout(() => {
        const reportForm = document.getElementById('session-report-form');
        if (reportForm) {
            reportForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitSessionReport();
            });
        }
    }, 100);
}

function setupSliders() {
    setTimeout(() => {
        document.querySelectorAll('.mood-slider').forEach(slider => {
            slider.addEventListener('input', function() {
                const valueDisplay = this.parentNode.querySelector('.slider-value');
                if (valueDisplay) {
                    valueDisplay.textContent = this.value;
                }
            });
        });

        document.querySelectorAll('.rating-slider').forEach(slider => {
            slider.addEventListener('input', function() {
                const valueDisplay = this.parentNode.querySelector('.rating-value');
                if (valueDisplay) {
                    valueDisplay.textContent = this.value;
                }
            });
        });
    }, 100);
}

function setupLanguageSwitchers() {
    setTimeout(() => {
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                switchLanguage(this.dataset.lang);
            });
        });
    }, 100);
}

function setupResourceFilters() {
    setTimeout(() => {
        updateResourceDisplay();
    }, 100);
}

// Core navigation functions
function showScreen(screenId) {
    console.log('Showing screen:', screenId);
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        console.log('Screen shown successfully:', screenId);
        
        // Re-setup event listeners after screen change
        setTimeout(() => {
            if (screenId.includes('login')) {
                setupLoginForms();
                bindRegionSelectionEvents();
            } else if (screenId.includes('dashboard')) {
                setupInteractionListeners();
                setupNewFeatureListeners();
            }
        }, 100);
    } else {
        console.error('Screen not found:', screenId);
    }
}

// Enhanced login functions
function loginAsStudent() {
    console.log('Logging in as student...');
    
    // Get selected region
    const selectedRegionBtn = document.querySelector('.region-btn.selected');
    if (selectedRegionBtn) {
        currentRegion = selectedRegionBtn.dataset.region;
        console.log('Selected region:', currentRegion);
    } else {
        console.log('No region selected, using default:', currentRegion);
    }
    
    currentUser = 'ANON-ST7832';
    showScreen('student-dashboard');
    setTimeout(() => {
        initializeStudentDashboard();
        updateRegionalContent();
    }, 200);
}

function loginAsCounselor() {
    console.log('Logging in as counselor...');
    currentUser = 'DR-C4821';
    showScreen('counselor-dashboard');
    setTimeout(() => {
        initializeCounselorDashboard();
    }, 200);
}

function loginAsAdmin() {
    console.log('Logging in as admin...');
    currentUser = 'ADMIN-001';
    showScreen('admin-dashboard');
    setTimeout(() => {
        initializeAdminDashboard();
    }, 200);
}

function logout() {
    console.log('Logout function called');
    currentUser = null;
    currentRole = null;
    currentRegion = 'north';
    chatMessages = [];
    selectedCounselor = null;
    currentWeekOffset = 0;
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
        if (moodTrendsChart) {
            moodTrendsChart.destroy();
            moodTrendsChart = null;
        }
        if (languageChart) {
            languageChart.destroy();
            languageChart = null;
        }
    } catch (e) {
        console.log('Charts cleaned up');
    }
    
    // Re-bind role selection events
    setTimeout(() => {
        bindRoleSelectionEvents();
    }, 100);
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    
    // Find the clicked navigation item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
        const navOnClick = nav.getAttribute('onclick');
        if (navOnClick && navOnClick.includes(sectionId)) {
            nav.classList.add('active');
        }
    });

    // Show section
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section shown:', sectionId);

        // Initialize section-specific content
        setTimeout(() => {
            if (sectionId === 'ai-assistant-section') {
                updateAIAssistantRegion();
                setupChatListeners();
            } else if (sectionId === 'cultural-wellness-section') {
                updateCulturalContent();
            } else if (sectionId === 'enhanced-booking-section') {
                updateCounselorList();
                setupBookingListeners();
            } else if (sectionId === 'peer-support-section') {
                updateVolunteerList();
                setupPeerSupportListeners();
            }
        }, 100);
    }
}

// Enhanced Student Dashboard Functions
function initializeStudentDashboard() {
    console.log('Initializing enhanced student dashboard...');
    setTimeout(() => {
        createMoodChart();
    }, 300);
    showSection('mood-section');
    updateLanguageDisplay();
    updateRegionalContent();
    initializeChatMessages();
}

function updateRegionalContent() {
    // Update region badge in header
    const regionBadge = document.getElementById('user-region');
    if (regionBadge && regions[currentRegion]) {
        regionBadge.textContent = regions[currentRegion].name;
    }
}

// AI Assistant Functions
function initializeChatMessages() {
    const region = regions[currentRegion] || regions.north;
    const welcomeMessage = {
        type: 'ai',
        content: `Hi! I'm your AI wellness assistant. I understand your cultural background from ${region.name} and I'm here to support you today. How can I help you?`,
        timestamp: new Date()
    };
    
    chatMessages = [welcomeMessage];
    // Only update display if we're on the AI section
    if (document.getElementById('ai-assistant-section')?.classList.contains('active')) {
        updateChatDisplay();
    }
}

function updateAIAssistantRegion() {
    const aiRegionSpan = document.getElementById('ai-region');
    if (aiRegionSpan && regions[currentRegion]) {
        aiRegionSpan.textContent = regions[currentRegion].name;
    }
}

function sendQuickMessage(type) {
    console.log('Quick message type:', type);
    
    const userMessage = {
        type: 'user',
        content: getQuickMessageText(type),
        timestamp: new Date()
    };
    
    chatMessages.push(userMessage);
    updateChatDisplay();
    
    // Generate AI response after a delay
    setTimeout(() => {
        const aiResponse = generateAIResponse(type);
        chatMessages.push(aiResponse);
        updateChatDisplay();
    }, 1000);
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput?.value?.trim();
    
    if (!message) return;
    
    const userMessage = {
        type: 'user',
        content: message,
        timestamp: new Date()
    };
    
    chatMessages.push(userMessage);
    chatInput.value = '';
    updateChatDisplay();
    
    // Generate AI response
    setTimeout(() => {
        const aiResponse = generateContextualResponse(message);
        chatMessages.push(aiResponse);
        updateChatDisplay();
        
        // Check for crisis indicators
        checkForCrisis(message);
    }, 1500);
}

function getQuickMessageText(type) {
    const texts = {
        exam_stress: "I'm feeling really stressed about my upcoming exams. The pressure is overwhelming.",
        family_pressure: "My family has very high expectations for me and it's causing a lot of stress.",
        loneliness: "I'm feeling lonely and disconnected from others around me.",
        cultural_practices: "Can you tell me about traditional practices that might help with my mental wellness?"
    };
    return texts[type] || "I need some support.";
}

function generateAIResponse(type) {
    const responses = aiResponses[type];
    let content = responses ? responses[currentRegion] : "I understand you're going through a difficult time. I'm here to support you with culturally-aware guidance.";
    
    // Add mood-based personalization
    if (moodHistory.length > 0) {
        const recentMood = moodHistory[0];
        if (recentMood.value <= 2) {
            content += " I noticed from your recent mood check-ins that you've been having some challenging days. This is completely understandable given what you're experiencing.";
        }
    }
    
    return {
        type: 'ai',
        content: content,
        timestamp: new Date()
    };
}

function generateContextualResponse(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();
    let responseType = 'general';
    
    if (lowercaseMessage.includes('exam') || lowercaseMessage.includes('study') || lowercaseMessage.includes('test')) {
        responseType = 'exam_stress';
    } else if (lowercaseMessage.includes('family') || lowercaseMessage.includes('parent') || lowercaseMessage.includes('pressure')) {
        responseType = 'family_pressure';
    } else if (lowercaseMessage.includes('lonely') || lowercaseMessage.includes('alone') || lowercaseMessage.includes('isolated')) {
        responseType = 'loneliness';
    } else if (lowercaseMessage.includes('traditional') || lowercaseMessage.includes('culture') || lowercaseMessage.includes('meditation')) {
        responseType = 'cultural_practices';
    }
    
    return generateAIResponse(responseType);
}

function checkForCrisis(message) {
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'can\'t go on', 'hopeless', 'worthless'];
    const lowercaseMessage = message.toLowerCase();
    
    if (crisisKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
        setTimeout(() => {
            const crisisResponse = {
                type: 'ai',
                content: `🚨 I'm concerned about you and want to connect you with immediate support. Please know that you matter and help is available. I'm alerting our crisis response team who will reach out within the next few minutes. You can also call our emergency helpline at +91-XXX-XXX-HELP right now.`,
                timestamp: new Date()
            };
            chatMessages.push(crisisResponse);
            updateChatDisplay();
        }, 500);
    }
}

function updateChatDisplay() {
    const chatMessagesContainer = document.getElementById('chat-messages');
    if (!chatMessagesContainer) return;
    
    chatMessagesContainer.innerHTML = '';
    
    chatMessages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = message.type === 'ai' ? 'ai-message' : 'user-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = message.type === 'ai' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const text = document.createElement('p');
        text.textContent = message.content;
        
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = formatMessageTime(message.timestamp);
        
        content.appendChild(text);
        content.appendChild(time);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessagesContainer.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

function formatMessageTime(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

// Enhanced Booking System Functions
function handleCounselorRegionFilter(button) {
    console.log('Counselor region filter:', button.dataset.region);
    document.querySelectorAll('.region-filter-buttons .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    updateCounselorList();
}

function handleSessionTypeFilter(button) {
    console.log('Session type filter:', button.dataset.type);
    document.querySelectorAll('.session-type-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    updateCounselorList();
}

function updateCounselorList() {
    const selectedRegion = document.querySelector('.region-filter-buttons .filter-btn.active')?.dataset.region || 'all';
    const selectedType = document.querySelector('.session-type-filter-btn.active')?.dataset.type || 'individual';
    
    const counselorCards = document.getElementById('counselor-cards');
    if (!counselorCards) return;
    
    // Filter and show relevant counselors
    document.querySelectorAll('.enhanced-counselor-card').forEach(card => {
        const cardRegion = card.dataset.region;
        let showCard = selectedRegion === 'all' || cardRegion === selectedRegion;
        card.style.display = showCard ? 'block' : 'none';
    });
}

function selectCounselorForBooking(counselorId) {
    console.log('Counselor selected for booking:', counselorId);
    selectedCounselor = counselorId;
    
    // Show booking calendar
    const calendar = document.getElementById('booking-calendar');
    const counselorList = document.querySelector('.enhanced-counselor-list');
    
    if (calendar && counselorList) {
        counselorList.style.display = 'none';
        calendar.classList.remove('hidden');
        generateCalendar();
    }
}

function hideBookingCalendar() {
    const calendar = document.getElementById('booking-calendar');
    const counselorList = document.querySelector('.enhanced-counselor-list');
    
    if (calendar && counselorList) {
        counselorList.style.display = 'block';
        calendar.classList.add('hidden');
    }
}

function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const weekSpan = document.getElementById('calendar-week');
    
    if (!calendarGrid || !weekSpan) return;
    
    // Calculate current week with offset
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + (currentWeekOffset * 7));
    
    // Update week display
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    
    const formatOptions = { month: 'long', day: 'numeric' };
    weekSpan.textContent = `${startDate.toLocaleDateString('en-US', formatOptions)} - ${endDate.toLocaleDateString('en-US', formatOptions)}, ${startDate.getFullYear()}`;
    
    // Clear and populate calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = 'var(--space-8)';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Add calendar days
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day available';
        dayElement.innerHTML = `
            <div>${currentDate.getDate()}</div>
            <div style="font-size: 10px;">Available</div>
        `;
        
        dayElement.addEventListener('click', () => selectCalendarDay(dayElement, currentDate));
        calendarGrid.appendChild(dayElement);
    }
}

function selectCalendarDay(dayElement, date) {
    // Remove previous selections
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Select current day
    dayElement.classList.add('selected');
    
    // Show available time slots
    showTimeSlots(date);
}

function showTimeSlots(date) {
    if (!selectedCounselor || !counselorsData[selectedCounselor]) return;
    
    const counselor = counselorsData[selectedCounselor];
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const availableSlots = counselor.availability[dayName] || [];
    
    // Create time slots display
    let timeSlotsHTML = '<h4>Available Time Slots</h4><div class="time-slots">';
    
    availableSlots.forEach(time => {
        timeSlotsHTML += `
            <div class="time-slot available" onclick="bookTimeSlot('${time}', '${date.toDateString()}')">
                ${time}
            </div>
        `;
    });
    
    timeSlotsHTML += '</div>';
    
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        // Add time slots below calendar
        let timeSlotsContainer = document.getElementById('time-slots-container');
        if (!timeSlotsContainer) {
            timeSlotsContainer = document.createElement('div');
            timeSlotsContainer.id = 'time-slots-container';
            calendarGrid.parentNode.appendChild(timeSlotsContainer);
        }
        timeSlotsContainer.innerHTML = timeSlotsHTML;
    }
}

function previousWeek() {
    currentWeekOffset--;
    generateCalendar();
}

function nextWeek() {
    if (currentWeekOffset < 3) { // Limit to 3 weeks in advance
        currentWeekOffset++;
        generateCalendar();
    }
}

function bookTimeSlot(time, date) {
    const counselor = counselorsData[selectedCounselor];
    const sessionId = 'BOOK-' + Date.now();
    
    showModal('Session Booked Successfully! 📅', 
        `Your session with ${counselor.name} is confirmed for ${time} on ${date}. 
        <br><br><strong>Session Details:</strong>
        <br>• Counselor: ${counselor.name}
        <br>• Specializations: ${counselor.specializations.join(', ')}
        <br>• Languages: ${counselor.languages.join(', ')}
        <br>• Session ID: ${sessionId}
        <br><br>You will receive a secure meeting link 30 minutes before your session.`);
    
    hideBookingCalendar();
}

// Peer Support Functions
function showPeerTab(tabName) {
    console.log('Peer tab:', tabName);
    document.querySelectorAll('.peer-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const clickedTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
    
    document.querySelectorAll('.peer-content').forEach(content => {
        content.classList.remove('active');
    });
    const targetContent = document.getElementById(`${tabName}-content`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    if (tabName === 'volunteers') {
        updateVolunteerList();
    }
}

function updateVolunteerList() {
    // Filter volunteers based on current region
    const volunteerList = document.getElementById('volunteer-list');
    if (!volunteerList) return;
    
    document.querySelectorAll('.volunteer-card').forEach(card => {
        const cardRegion = card.dataset.region;
        // Show all volunteers but highlight those from same region
        if (cardRegion === currentRegion) {
            card.style.border = '2px solid var(--color-primary)';
        } else {
            card.style.border = '1px solid var(--color-card-border)';
        }
    });
}

function connectWithVolunteer(volunteerId) {
    const volunteer = volunteersData[volunteerId];
    if (!volunteer) return;
    
    showModal('Connecting with Volunteer 🤝', 
        `Connecting you with ${volunteer.name} for anonymous peer support.
        <br><br><strong>Volunteer Details:</strong>
        <br>• Specializations: ${volunteer.specializations.join(', ')}
        <br>• Experience: ${volunteer.sessions} sessions
        <br>• Rating: ⭐ ${volunteer.rating}
        <br>• Languages: ${volunteer.languages.join(', ')}
        <br><br>A secure chat session will begin shortly. Remember, all conversations are confidential.`);
}

function viewVolunteerProfile(volunteerId) {
    const volunteer = volunteersData[volunteerId];
    if (!volunteer) return;
    
    showModal(`Volunteer Profile: ${volunteer.name}`, 
        `<div style="text-align: left;">
        <p><strong>Certification:</strong> ${volunteer.certification}</p>
        <p><strong>Specializations:</strong> ${volunteer.specializations.join(', ')}</p>
        <p><strong>Languages:</strong> ${volunteer.languages.join(', ')}</p>
        <p><strong>Total Sessions:</strong> ${volunteer.sessions}</p>
        <p><strong>Rating:</strong> ⭐ ${volunteer.rating}</p>
        <p><strong>Region:</strong> ${regions[volunteer.region].name}</p>
        <p><strong>Bio:</strong> ${volunteer.bio}</p>
        </div>`);
}

function joinGroup(groupId) {
    const groupNames = {
        exam_warriors: 'Exam Warriors',
        family_support: 'Family Expectations Support',
        homesick_support: 'Homesick Heroes'
    };
    
    const groupName = groupNames[groupId] || 'Support Group';
    
    showModal(`Joined ${groupName}! 🎉`, 
        `Welcome to ${groupName}! You can now participate in group discussions, get peer support, and access group resources. 
        <br><br>Group guidelines have been sent to your dashboard. Remember to be respectful and supportive of fellow members.`);
}

// Smart Matching Functions
let selectedConcern = null;
let selectedStyle = null;

function selectConcern(button) {
    document.querySelectorAll('.concern-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    selectedConcern = button.dataset.concern;
}

function selectStyle(button) {
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    selectedStyle = button.dataset.style;
}

function findPeerMatch() {
    if (!selectedConcern || !selectedStyle) {
        showModal('Selection Required', 'Please select both your primary concern and preferred support style to find the best match.');
        return;
    }
    
    // Show matching results
    const matchingForm = document.querySelector('.matching-form');
    const matchingResults = document.getElementById('matching-results');
    
    if (matchingForm && matchingResults) {
        matchingForm.style.display = 'none';
        matchingResults.classList.remove('hidden');
    }
    
    console.log('Finding peer match for:', selectedConcern, selectedStyle);
}

function startMatchedChat() {
    showModal('Match Found! 🎯', 
        `Perfect! We've found a peer volunteer who specializes in ${selectedConcern} and has a ${selectedStyle} support style. 
        <br><br>Your matched volunteer:
        <br>• Has experience with your specific concern
        <br>• Shares your regional background (${regions[currentRegion].name})
        <br>• Uses your preferred support approach
        <br><br>Starting anonymous chat session now...`);
    
    // Reset matching form
    setTimeout(() => {
        const matchingForm = document.querySelector('.matching-form');
        const matchingResults = document.getElementById('matching-results');
        
        if (matchingForm && matchingResults) {
            matchingForm.style.display = 'block';
            matchingResults.classList.add('hidden');
        }
        
        selectedConcern = null;
        selectedStyle = null;
        document.querySelectorAll('.concern-btn, .style-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }, 3000);
}

// Cultural Wellness Functions
function updateCulturalContent() {
    const currentRegionSpan = document.getElementById('current-region');
    const practicesGrid = document.getElementById('practices-grid');
    const culturalInsights = document.getElementById('cultural-insights');
    
    if (currentRegionSpan && regions[currentRegion]) {
        currentRegionSpan.textContent = regions[currentRegion].name;
    }
    
    if (practicesGrid && regions[currentRegion]) {
        updatePracticesGrid();
    }
    
    if (culturalInsights && regions[currentRegion]) {
        updateCulturalInsights();
    }
}

function updatePracticesGrid() {
    const practicesGrid = document.getElementById('practices-grid');
    const region = regions[currentRegion];
    
    if (!practicesGrid || !region) return;
    
    practicesGrid.innerHTML = '';
    
    region.practices.forEach((practice, index) => {
        const practiceCard = document.createElement('div');
        practiceCard.className = 'practice-card';
        practiceCard.innerHTML = `
            <div class="practice-icon">${index === 0 ? '🧘‍♀️' : (index === 1 ? '🌬️' : '🎵')}</div>
            <div class="practice-info">
                <h4>${practice.name}</h4>
                <p>${practice.description}</p>
                <div class="practice-meta">
                    <span class="duration">${practice.duration}</span>
                    <span class="benefits">${practice.benefits.join(' • ')}</span>
                </div>
                <button class="btn btn--primary btn--sm" onclick="startPractice('${practice.name.toLowerCase().replace(/\s+/g, '_')}')">Start Practice</button>
            </div>
        `;
        practicesGrid.appendChild(practiceCard);
    });
}

function updateCulturalInsights() {
    const stressorsList = document.getElementById('regional-stressors');
    const copingStrategies = document.getElementById('cultural-coping');
    const region = regions[currentRegion];
    
    if (stressorsList && region) {
        stressorsList.innerHTML = '';
        region.stressors.forEach(stressor => {
            const li = document.createElement('li');
            li.textContent = stressor;
            stressorsList.appendChild(li);
        });
    }
    
    if (copingStrategies && region) {
        copingStrategies.innerHTML = '';
        region.remedies.forEach((remedy, index) => {
            const icons = ['🌿', '🙏', '👨‍👩‍👧‍👦'];
            const titles = ['Ayurvedic Approach', 'Spiritual Practices', 'Family Integration'];
            const strategy = document.createElement('div');
            strategy.className = 'strategy';
            strategy.innerHTML = `
                <h5>${icons[index]} ${titles[index]}</h5>
                <p>${remedy}</p>
            `;
            copingStrategies.appendChild(strategy);
        });
    }
}

function startPractice(practiceType) {
    const practiceNames = {
        meditation_and_mindfulness: 'Meditation & Mindfulness',
        pranayama_breathing: 'Pranayama Breathing',
        classical_music_therapy: 'Classical Music Therapy',
        temple_visit_mindfulness: 'Temple Visit Mindfulness',
        community_meditation: 'Community Meditation',
        business_mindfulness: 'Business Mindfulness',
        literature_therapy: 'Literature Therapy',
        artistic_expression: 'Artistic Expression'
    };
    
    const practiceName = practiceNames[practiceType] || 'Traditional Practice';
    
    showModal(`Starting ${practiceName} 🧘‍♀️`, 
        `Beginning guided ${practiceName} session adapted for your regional background (${regions[currentRegion].name}).
        <br><br>Find a comfortable, quiet space and follow the audio guidance. This practice has been specially selected based on your cultural context and current mental wellness needs.
        <br><br>Session starting in 3... 2... 1...`);
}

// Existing functions enhanced with cultural context
function switchLanguage(langCode) {
    currentLanguage = langCode;
    console.log('Switching to language:', langCode);
    
    // Update all language buttons
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === langCode) {
            btn.classList.add('active');
        }
    });
    
    updateLanguageDisplay();
    
    // Update AI assistant context
    if (currentUser) {
        updateAILanguageContext();
    }
}

function updateAILanguageContext() {
    if (chatMessages.length > 0) {
        const contextMessage = {
            type: 'ai',
            content: `I've switched to support you in ${languages[currentLanguage].name}. I understand both your cultural background from ${regions[currentRegion].name} and can provide guidance in your preferred language context.`,
            timestamp: new Date()
        };
        chatMessages.push(contextMessage);
        if (document.getElementById('ai-assistant-section')?.classList.contains('active')) {
            updateChatDisplay();
        }
    }
}

function updateLanguageDisplay() {
    const currentLang = languages[currentLanguage];
    if (!currentLang) return;
    
    // Update greeting if available
    const greeting = document.getElementById('student-greeting');
    if (greeting && translations[currentLanguage]) {
        greeting.textContent = translations[currentLanguage].greeting;
    }
    
    // Update mood question if available
    const moodQuestion = document.getElementById('mood-question');
    if (moodQuestion && translations[currentLanguage]) {
        moodQuestion.textContent = translations[currentLanguage].moodQuestion;
    }
}

function selectMoodOption(option) {
    console.log('Mood selected:', option.dataset.mood);
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

function selectSleepHours(button) {
    console.log('Sleep hours selected:', button.dataset.hours);
    // Remove previous selections
    document.querySelectorAll('.sleep-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select current button
    button.classList.add('selected');
    selectedSleepHours = button.dataset.hours;
}

function submitMoodCheck() {
    console.log('Submitting enhanced mood check...');
    if (!selectedMood) {
        showModal('Error', 'Please select your mood first!');
        return;
    }

    // Collect additional data
    const stressSlider = document.getElementById('stress-slider');
    const connectionSlider = document.getElementById('connection-slider');
    const concernsInput = document.getElementById('concerns-input');
    
    const stressLevel = stressSlider ? stressSlider.value : 5;
    const connectionLevel = connectionSlider ? connectionSlider.value : 5;
    const concerns = concernsInput ? concernsInput.value : '';

    // Update streak
    moodStreak++;
    
    // Add to mood history with cultural context
    const today = new Date().toISOString().split('T')[0];
    moodHistory.unshift({
        date: today,
        mood: selectedMood.emoji,
        value: selectedMood.value,
        streak: moodStreak,
        stress: stressLevel,
        connection: connectionLevel,
        sleep: selectedSleepHours,
        concerns: concerns,
        region: currentRegion
    });

    // Update UI
    const streakCounter = document.querySelector('.streak-counter');
    if (streakCounter) {
        streakCounter.textContent = `🔥 ${moodStreak} Day Streak!`;
    }
    
    // Reset form
    resetMoodForm();
    
    // Update chart
    setTimeout(() => {
        createMoodChart();
    }, 100);
    
    // Enhanced success message with cultural context
    const supportMsg = translations[currentLanguage] ? translations[currentLanguage].supportMessage : 'We are here for you';
    let culturalNote = '';
    
    if (selectedMood.value <= 2) {
        const region = regions[currentRegion];
        culturalNote = ` Remember, seeking support is valued in ${region.name} culture - you're taking a positive step.`;
    }
    
    showModal('Mood Check-in Complete! 🎉', 
        `Great job on maintaining your ${moodStreak}-day streak! ${supportMsg}.${culturalNote} 
        <br><br>Your AI assistant has been updated with this mood data for more personalized support.`);
}

function resetMoodForm() {
    // Reset mood selection
    document.querySelectorAll('.mood-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Reset sleep selection
    document.querySelectorAll('.sleep-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Hide questions
    const questionsDiv = document.getElementById('mood-questions');
    if (questionsDiv) {
        questionsDiv.classList.add('hidden');
    }
    
    // Reset form values
    const stressSlider = document.getElementById('stress-slider');
    const connectionSlider = document.getElementById('connection-slider');
    const concernsInput = document.getElementById('concerns-input');
    
    if (stressSlider) stressSlider.value = 5;
    if (connectionSlider) connectionSlider.value = 5;
    if (concernsInput) concernsInput.value = '';
    
    // Reset slider displays
    document.querySelectorAll('.slider-value').forEach(display => {
        display.textContent = '5';
    });

    selectedMood = null;
    selectedSleepHours = null;
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

// Resource Management Functions (existing but enhanced)
function handleResourceLanguageFilter(button) {
    console.log('Language filter:', button.dataset.filter);
    document.querySelectorAll('.language-filter-buttons .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    updateResourceDisplay();
}

function handleResourceTypeFilter(button) {
    console.log('Type filter:', button.dataset.type);
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    updateResourceDisplay();
}

function handleResourceCategoryFilter(button) {
    console.log('Category filter:', button.dataset.category);
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    updateResourceDisplay();
}

function updateResourceDisplay() {
    const activeLanguageFilter = document.querySelector('.language-filter-buttons .filter-btn.active');
    const activeTypeFilter = document.querySelector('.type-btn.active');
    const activeCategoryFilter = document.querySelector('.category-btn.active');
    
    const selectedLanguage = activeLanguageFilter ? activeLanguageFilter.dataset.filter : 'all';
    const selectedType = activeTypeFilter ? activeTypeFilter.dataset.type : 'all';
    const selectedCategory = activeCategoryFilter ? activeCategoryFilter.dataset.category : 'all';
    
    // Filter all resource cards
    document.querySelectorAll('.resource-card').forEach(card => {
        let showCard = true;
        
        // Filter by language
        if (selectedLanguage !== 'all') {
            const cardLanguages = card.dataset.languages;
            if (cardLanguages && !cardLanguages.includes(selectedLanguage)) {
                showCard = false;
            }
        }
        
        // Filter by type
        if (selectedType !== 'all') {
            const cardType = card.dataset.type;
            if (cardType !== selectedType) {
                showCard = false;
            }
        }
        
        // Filter by category
        if (selectedCategory !== 'all') {
            const cardCategory = card.dataset.category;
            if (cardCategory !== selectedCategory) {
                showCard = false;
            }
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

function playResource(resourceId) {
    showModal('Playing Resource 🎬', `Starting playback of resource ${resourceId}. Content will be displayed in your preferred language: ${languages[currentLanguage].name}. Culturally-relevant content for ${regions[currentRegion].name} is also available.`);
}

function downloadResource(resourceId) {
    showModal('Download Started 📥', `Resource ${resourceId} is being downloaded for offline access in ${languages[currentLanguage].name}. You can access it anytime from your downloads.`);
}

function readResource(resourceId) {
    showModal('Opening Article 📖', `Opening article ${resourceId} in your preferred language: ${languages[currentLanguage].name}. This content includes cultural context relevant to ${regions[currentRegion].name}.`);
}

// Support section functions (existing)
function showSupportTab(tabName) {
    console.log('Support tab:', tabName);
    document.querySelectorAll('.support-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const clickedTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
    
    document.querySelectorAll('.support-content').forEach(content => {
        content.classList.remove('active');
    });
    const targetContent = document.getElementById(`${tabName}-content`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

function bookWithCounselor(counselorId) {
    const sessionId = 'ANON-ST7832-' + Date.now();
    showModal('Counselor Session Booked! 👨‍⚕️', `Your session with ${counselorId} is confirmed. Language: ${languages[currentLanguage].name}. Cultural context: ${regions[currentRegion].name}. Session ID: ${sessionId}. You will receive a secure link shortly.`);
}

function bookSession(time) {
    const sessionId = 'ANON-ST7832-' + Date.now();
    showModal('Session Booked Successfully! 📅', `Your anonymous session is confirmed for ${time} today. Session ID: ${sessionId}. Counselor will be matched based on your language preference: ${languages[currentLanguage].name} and cultural background: ${regions[currentRegion].name}.`);
    
    // Update the time slot to show it's booked
    if (event && event.target) {
        const target = event.target.closest('.time-slot');
        if (target) {
            target.classList.remove('available');
            target.classList.add('booked');
            target.innerHTML = `
                <span class="time">${time}</span>
                <span class="duration">Your Session</span>
            `;
            target.onclick = null;
        }
    }
}

// Admin and Counselor functions (existing but enhanced)
function initializeAdminDashboard() {
    console.log('Initializing enhanced admin dashboard...');
    setTimeout(() => {
        createAdminCharts();
    }, 300);
    showSection('analytics-section');
}

function createAdminCharts() {
    createMoodTrendsChart();
    createRegionalChart();
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
                    data: adminData.moodTrends.current,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Previous Week',
                    data: adminData.moodTrends.previous,
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        title: {
                            display: true,
                            text: 'Average Mood Score'
                        }
                    }
                }
            }
        });
    } catch (e) {
        console.log('Mood trends chart creation skipped');
    }
}

function createRegionalChart() {
    const ctx = document.getElementById('languageChart');
    if (!ctx) return;
    
    try {
        if (languageChart) {
            languageChart.destroy();
        }
        
        const data = adminData.regionalDistribution;
        
        languageChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: [
                        '#1FB8CD',
                        '#FFC185', 
                        '#B4413C',
                        '#ECEBD5'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }
            }
        });
    } catch (e) {
        console.log('Regional chart creation skipped');
    }
}

function handleAnalyticsFilter(button) {
    console.log('Analytics filter:', button.dataset.period);
    document.querySelectorAll('.analytics-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    const period = button.dataset.period;
    console.log(`Updating analytics for period: ${period}`);
}

function exportAnalytics() {
    showModal('Exporting Enhanced Analytics 📊', 'Anonymous analytics report with cultural insights is being generated. The report includes regional mental health patterns, cultural intervention effectiveness, and compliance with all privacy regulations.');
}

function initializeCounselorDashboard() {
    console.log('Initializing enhanced counselor dashboard...');
    setTimeout(() => {
        createStudentCharts();
    }, 300);
    showSection('students-section');
}

function createStudentCharts() {
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
}

function selectStudent(button) {
    console.log('Student selected:', button.dataset.student);
    document.querySelectorAll('.student-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    selectedStudent = button.dataset.student;
}

function selectSessionType(button) {
    console.log('Session type selected:', button.dataset.type);
    document.querySelectorAll('.session-type-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    selectedSessionType = button.dataset.type;
}

function selectRiskLevel(button) {
    console.log('Risk level selected:', button.dataset.risk);
    document.querySelectorAll('.risk-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    selectedRiskLevel = button.dataset.risk;
}

function viewStudentDetails(studentId) {
    showModal(`Student Details: ${studentId}`, `
        <div style="text-align: left; margin: 16px 0;">
            <p><strong>Current Risk Level:</strong> ${studentId === 'ANON-ST001' ? 'Low' : 'Medium'}</p>
            <p><strong>Session History:</strong> ${studentId === 'ANON-ST001' ? '3' : '5'} sessions</p>
            <p><strong>Preferred Language:</strong> ${languages[currentLanguage].name}</p>
            <p><strong>Cultural Region:</strong> ${regions[currentRegion].name}</p>
            <p><strong>Last Mood Check-in:</strong> ${studentId === 'ANON-ST001' ? 'Today' : 'Yesterday'}</p>
            <p><strong>Recent Concerns:</strong> Academic stress, family pressure</p>
            <p><strong>Cultural Considerations:</strong> Traditional family dynamics, regional stress patterns</p>
            <p><strong>Recommended Actions:</strong> Continue regular sessions with cultural sensitivity, monitor stress levels</p>
        </div>
    `);
}

function recommendResources(studentId) {
    showModal('Culturally-Aware Resources Recommended 📚', `Personalized resources in ${languages[currentLanguage].name} with ${regions[currentRegion].name} cultural context have been recommended to ${studentId}. Student will receive notifications about relevant videos, articles, audio content, and traditional practices.`);
}

function submitSessionReport() {
    console.log('Submitting enhanced session report...');
    if (!selectedStudent) {
        showModal('Error', 'Please select a student ID.');
        return;
    }
    
    if (!selectedSessionType) {
        showModal('Error', 'Please select a session type.');
        return;
    }
    
    if (!selectedRiskLevel) {
        showModal('Error', 'Please select a risk level.');
        return;
    }
    
    setTimeout(() => {
        showModal('Enhanced Report Submitted Successfully! 📋', `Session report for ${selectedStudent} has been securely transmitted with cultural context. Language context: ${languages[currentLanguage].name}. Regional considerations: ${regions[currentRegion].name}. Report ID: RPT-${Date.now()}`);
        resetReportForm();
    }, 1000);
}

function resetReportForm() {
    document.querySelectorAll('.student-btn, .session-type-btn, .risk-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    const ratingSlider = document.getElementById('session-rating');
    if (ratingSlider) {
        ratingSlider.value = 3;
        const valueDisplay = document.querySelector('.rating-value');
        if (valueDisplay) {
            valueDisplay.textContent = '3';
        }
    }
    
    const textarea = document.querySelector('#reporting-section textarea');
    if (textarea) {
        textarea.value = '';
    }
    
    selectedStudent = null;
    selectedSessionType = null;
    selectedRiskLevel = null;
}

// Modal Functions
function showModal(title, message) {
    console.log('Showing modal:', title);
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
    console.log('Closing modal');
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Enhanced interaction effects
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
    if (e.target.classList.contains('btn') || 
        e.target.classList.contains('mood-option') || 
        e.target.classList.contains('time-slot') ||
        e.target.classList.contains('filter-btn') ||
        e.target.classList.contains('category-btn') ||
        e.target.classList.contains('type-btn') ||
        e.target.classList.contains('language-btn') ||
        e.target.classList.contains('sleep-btn') ||
        e.target.classList.contains('student-btn') ||
        e.target.classList.contains('session-type-btn') ||
        e.target.classList.contains('risk-btn') ||
        e.target.classList.contains('role-card') ||
        e.target.classList.contains('region-btn') ||
        e.target.classList.contains('quick-btn') ||
        e.target.classList.contains('concern-btn') ||
        e.target.classList.contains('style-btn') ||
        e.target.classList.contains('session-type-filter-btn')) {
        addButtonClickEffect(e.target);
    }
});

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Global function declarations for HTML onclick attributes
window.showScreen = showScreen;
window.logout = logout;
window.showSection = showSection;
window.submitMoodCheck = submitMoodCheck;
window.sendQuickMessage = sendQuickMessage;
window.sendMessage = sendMessage;
window.selectCounselorForBooking = selectCounselorForBooking;
window.hideBookingCalendar = hideBookingCalendar;
window.previousWeek = previousWeek;
window.nextWeek = nextWeek;
window.connectWithVolunteer = connectWithVolunteer;
window.viewVolunteerProfile = viewVolunteerProfile;
window.joinGroup = joinGroup;
window.findPeerMatch = findPeerMatch;
window.startMatchedChat = startMatchedChat;
window.startPractice = startPractice;
window.playResource = playResource;
window.downloadResource = downloadResource;
window.readResource = readResource;
window.bookWithCounselor = bookWithCounselor;
window.bookSession = bookSession;
window.viewStudentDetails = viewStudentDetails;
window.recommendResources = recommendResources;
window.exportAnalytics = exportAnalytics;
window.closeModal = closeModal;
window.bookTimeSlot = bookTimeSlot;

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Enhanced Mitra app loaded successfully');
    console.log('New Features: AI Assistant, Advanced Booking, Peer Support, Cultural Wellness');
    console.log('Cultural regions supported:', Object.keys(regions));
    console.log('Languages available:', Object.keys(languages));
    
    // Ensure role selection works immediately on load
    setTimeout(() => {
        bindRoleSelectionEvents();
    }, 100);
});

// Auto-save functionality simulation
setInterval(() => {
    if (currentUser && moodHistory.length > 0) {
        console.log('Auto-saving enhanced user data securely with cultural context...');
    }
}, 30000);