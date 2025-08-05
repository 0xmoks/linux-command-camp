// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Interactive Terminal Functionality
const terminalOutput = document.getElementById('terminal-output');
const commandInput = document.getElementById('command-input');
const currentCommand = document.getElementById('current-command');

// Command responses
const commandResponses = {
    'ls': [
        'Documents/',
        'Downloads/',
        'Pictures/',
        'file.txt',
        'script.sh'
    ],
    'pwd': '/home/user',
    'whoami': 'user',
    'date': new Date().toLocaleString(),
    'clear': 'clear',
    'help': [
        'Available commands:',
        'ls - list directory contents',
        'pwd - print working directory',
        'whoami - show current user',
        'date - show current date/time',
        'clear - clear terminal',
        'help - show this help'
    ],
    'echo': 'echo: missing argument',
    'cat': 'cat: missing file operand',
    'grep': 'grep: missing pattern',
    'find': 'find: missing path',
    'ps': [
        'PID TTY          TIME CMD',
        '1234 pts/0    00:00:01 bash',
        '5678 pts/0    00:00:00 ps'
    ],
    'top': 'top: command not found (simulated)',
    'df': [
        'Filesystem     1K-blocks   Used Available Use% Mounted on',
        '/dev/sda1      1048576  512000    537576  49% /',
        '/dev/sdb1      2097152 1048576   1048576  50% /home'
    ],
    'free': [
        '              total        used        free      shared  buff/cache   available',
        'Mem:        16384000     8192000     4096000     1024000     4096000     7168000',
        'Swap:        8388608     4194304     4194304'
    ]
};

// Initialize terminal
function initTerminal() {
    const welcomeMessage = [
        'Welcome to Linux Commands Tutorial Terminal',
        'Type "help" for available commands',
        ''
    ];
    
    welcomeMessage.forEach(line => {
        addTerminalLine(line, 'output');
    });
}

// Add line to terminal
function addTerminalLine(content, type = 'command') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    if (type === 'command') {
        line.innerHTML = `
            <span class="prompt">user@linux:~$</span>
            <span class="command">${content}</span>
        `;
    } else if (type === 'output') {
        if (Array.isArray(content)) {
            content.forEach(item => {
                const outputLine = document.createElement('div');
                outputLine.textContent = item;
                outputLine.style.color = 'var(--text-secondary)';
                outputLine.style.paddingLeft = '20px';
                line.appendChild(outputLine);
            });
        } else {
            line.textContent = content;
            line.style.color = 'var(--text-secondary)';
            line.style.paddingLeft = '20px';
        }
    }
    
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Process command
function processCommand(command) {
    const cmd = command.trim().toLowerCase();
    const args = cmd.split(' ');
    const baseCmd = args[0];
    
    addTerminalLine(cmd, 'command');
    
    // Handle special commands
    if (baseCmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
    }
    
    // Get response
    let response = commandResponses[baseCmd];
    
    if (!response) {
        response = `${baseCmd}: command not found`;
    }
    
    // Handle echo command
    if (baseCmd === 'echo') {
        if (args.length > 1) {
            response = args.slice(1).join(' ');
        }
    }
    
    addTerminalLine(response, 'output');
}

// Try command from help buttons
function tryCommand(cmd) {
    commandInput.value = cmd;
    processCommand(cmd);
    commandInput.value = '';
}

// Handle command input
commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value;
        if (command.trim()) {
            processCommand(command);
            commandInput.value = '';
        }
    }
});

// Focus on input when clicking terminal
document.querySelector('.terminal-simulator').addEventListener('click', () => {
    commandInput.focus();
});

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.tutorial-card, .command-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add hover effects to command items
document.addEventListener('DOMContentLoaded', () => {
    const commandItems = document.querySelectorAll('.command-item');
    commandItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'var(--bg-secondary)';
            item.style.borderRadius = '6px';
            item.style.padding = '8px';
            item.style.margin = '0 -8px';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
            item.style.borderRadius = '0';
            item.style.padding = '0.5rem 0';
            item.style.margin = '0';
        });
    });
});

// Add copy functionality to command codes
document.addEventListener('DOMContentLoaded', () => {
    const commandCodes = document.querySelectorAll('.command-item code');
    commandCodes.forEach(code => {
        code.style.cursor = 'pointer';
        code.title = 'Click to copy';
        
        code.addEventListener('click', () => {
            navigator.clipboard.writeText(code.textContent).then(() => {
                // Show feedback
                const originalText = code.textContent;
                code.textContent = 'Copied!';
                code.style.color = 'var(--success-color)';
                
                setTimeout(() => {
                    code.textContent = originalText;
                    code.style.color = 'var(--primary-color)';
                }, 1000);
            });
        });
    });
});

// Add search functionality to commands
function filterCommands(searchTerm) {
    const commandItems = document.querySelectorAll('.command-item');
    const searchLower = searchTerm.toLowerCase();
    
    commandItems.forEach(item => {
        const commandText = item.querySelector('code').textContent.toLowerCase();
        const descriptionText = item.querySelector('span').textContent.toLowerCase();
        
        if (commandText.includes(searchLower) || descriptionText.includes(searchLower)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add search input to commands section
document.addEventListener('DOMContentLoaded', () => {
    const commandsSection = document.querySelector('.commands .container');
    const sectionTitle = commandsSection.querySelector('.section-title');
    
    const searchContainer = document.createElement('div');
    searchContainer.style.marginBottom = '2rem';
    searchContainer.style.textAlign = 'center';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search commands...';
    searchInput.style.padding = '12px 20px';
    searchInput.style.borderRadius = '8px';
    searchInput.style.border = '1px solid var(--border-color)';
    searchInput.style.background = 'var(--bg-tertiary)';
    searchInput.style.color = 'var(--text-primary)';
    searchInput.style.width = '300px';
    searchInput.style.maxWidth = '100%';
    searchInput.style.fontSize = '1rem';
    
    searchInput.addEventListener('input', (e) => {
        filterCommands(e.target.value);
    });
    
    searchContainer.appendChild(searchInput);
    commandsSection.insertBefore(searchContainer, sectionTitle.nextSibling);
});

// Add loading animation for video containers
document.addEventListener('DOMContentLoaded', () => {
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
        const iframe = container.querySelector('iframe');
        if (iframe) {
            iframe.addEventListener('load', () => {
                container.style.opacity = '1';
            });
            container.style.opacity = '0.7';
            container.style.transition = 'opacity 0.3s ease';
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.commands input[type="text"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('.commands input[type="text"]');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            filterCommands('');
        }
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'var(--primary-color)';
    progressBar.style.zIndex = '1001';
    progressBar.style.transition = 'width 0.1s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Introduction Section functionality
function openIntroSection(sectionName) {
    const sectionTitles = {
        'history': '📚 Linux History & Philosophy',
        'distributions': '🔄 Linux Distributions',
        'package-managers': '📦 Package Managers'
    };
    
    const title = sectionTitles[sectionName] || 'Introduction Section';
    
    // Create a modal for detailed content
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--bg-tertiary);
        border-radius: 12px;
        padding: 2rem;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-hover);
    `;
    
    // Content based on section
    let content = '';
    switch(sectionName) {
        case 'history':
            content = `
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">📚 Linux History & Philosophy</h2>
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">🎬 Video Introduction</h3>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 1rem;">
                        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;"
                                frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
                <div style="color: var(--text-secondary); line-height: 1.8;">
                    <h3 style="color: var(--text-primary); margin-bottom: 1rem;">📖 The Birth of Linux</h3>
                    <p>In 1991, a 21-year-old Finnish student named Linus Torvalds created a small operating system kernel as a hobby project. What started as a simple terminal emulator grew into the Linux kernel we know today.</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">🏛️ Unix Heritage</h3>
                    <p>Linux was inspired by Unix, created at Bell Labs in 1969. Unix's philosophy of "do one thing and do it well" became the foundation of Linux's design principles.</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">🌍 The Open Source Movement</h3>
                    <p>Linux became the poster child for open-source software, demonstrating how collaborative development could create powerful, reliable software that rivals proprietary alternatives.</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">🤝 Community Development</h3>
                    <p>Today, Linux is developed by thousands of contributors worldwide, from individual developers to major corporations, all working together to improve the kernel.</p>
                </div>
            `;
            break;
        case 'distributions':
            content = `
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">🔄 Linux Distributions</h2>
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">🎬 Video Introduction</h3>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 1rem;">
                        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;"
                                frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
                <div style="color: var(--text-secondary); line-height: 1.8;">
                    <h3 style="color: var(--text-primary); margin-bottom: 1rem;">📦 What is a Distribution?</h3>
                    <p>A Linux distribution (distro) is a complete operating system built around the Linux kernel, including system libraries, applications, and package management tools.</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">🐧 Debian Family</h3>
                    <p><strong>Ubuntu:</strong> User-friendly, great for beginners. Based on Debian but with more frequent updates.<br>
                    <strong>Debian:</strong> Stable and reliable, the foundation for many other distros.<br>
                    <strong>Linux Mint:</strong> Ubuntu-based with a focus on simplicity and elegance.</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">🔴 Red Hat Family</h3>
                    <p><strong>Fedora:</strong> Cutting-edge features, sponsored by Red Hat.<br>
                    <strong>CentOS/RHEL:</strong> Enterprise-focused, very stable.<br>
                    <strong>Rocky Linux:</strong> RHEL-compatible, community-driven.</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">🏗️ Arch Family</h3>
                    <p><strong>Arch Linux:</strong> Rolling release, minimal by default, highly customizable.<br>
                    <strong>Manjaro:</strong> Arch-based but more user-friendly.<br>
                    <strong>EndeavourOS:</strong> Arch-based with a simple installer.</p>
                </div>
            `;
            break;
        case 'package-managers':
            content = `
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">📦 Package Managers</h2>
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">🎬 Video Introduction</h3>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 1rem;">
                        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;"
                                frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
                <div style="color: var(--text-secondary); line-height: 1.8;">
                    <h3 style="color: var(--text-primary); margin-bottom: 1rem;">🔧 What are Package Managers?</h3>
                    <p>Package managers automate the process of installing, updating, and removing software. They handle dependencies and ensure software compatibility.</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">📦 apt (Debian/Ubuntu)</h3>
                    <p><strong>Usage:</strong> <code>sudo apt install package-name</code><br>
                    <strong>Features:</strong> Extensive repository, excellent dependency resolution<br>
                    <strong>Best for:</strong> Debian-based distributions</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">🔄 dnf (Fedora/RHEL)</h3>
                    <p><strong>Usage:</strong> <code>sudo dnf install package-name</code><br>
                    <strong>Features:</strong> Fast, modern, good dependency resolution<br>
                    <strong>Best for:</strong> Red Hat-based distributions</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">⚡ pacman (Arch)</h3>
                    <p><strong>Usage:</strong> <code>sudo pacman -S package-name</code><br>
                    <strong>Features:</strong> Very fast, minimal, rolling updates<br>
                    <strong>Best for:</strong> Arch-based distributions</p>
                    
                    <h3 style="color: var(--text-primary); margin: 2rem 0 1rem;">🌐 Universal Package Managers</h3>
                    <p><strong>Flatpak:</strong> Cross-distribution, sandboxed applications<br>
                    <strong>Snap:</strong> Canonical's universal package format<br>
                    <strong>AppImage:</strong> Self-contained applications</p>
                </div>
            `;
            break;
    }
    
    modalContent.innerHTML = content + `
        <div style="text-align: center; margin-top: 2rem;">
            <button onclick="this.closest('.modal-overlay').remove()" 
                    style="background: var(--primary-color); color: var(--bg-primary); border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                Close
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Course Navigation and Content Management
let currentLesson = null;
let completedLessons = new Set();
let totalLessons = 0;

// Initialize course navigation
document.addEventListener('DOMContentLoaded', () => {
    initializeCourseNavigation();
    loadLessonContent('welcome');
});

function initializeCourseNavigation() {
    const lessonItems = document.querySelectorAll('.lesson-item');
    totalLessons = lessonItems.length;
    
    lessonItems.forEach(item => {
        item.addEventListener('click', () => {
            const lessonId = item.getAttribute('data-lesson');
            loadLessonContent(lessonId);
            
            // Update active state
            lessonItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');
            
            // Update header
            updateContentHeader(item.querySelector('span').textContent);
        });
    });
}

function updateContentHeader(title) {
    const headerTitle = document.getElementById('current-section-title');
    const headerDesc = document.getElementById('current-section-description');
    
    // Extract section from title
    const section = getSectionFromTitle(title);
    headerTitle.textContent = section;
    headerDesc.textContent = getSectionDescription(section);
}

function getSectionFromTitle(title) {
    if (title.includes('pwd') || title.includes('cd') || title.includes('ls') || 
        title.includes('tree') || title.includes('file') || title.includes('stat')) {
        return '🧭 Navigation Basics';
    } else if (title.includes('mkdir') || title.includes('touch') || title.includes('rm') || 
               title.includes('mv') || title.includes('cp') || title.includes('find')) {
        return '📁 File & Directory Operations';
    } else if (title.includes('History') || title.includes('Distributions') || title.includes('Package Managers')) {
        return '📚 Introduction';
    }
    return 'Command Camp';
}

function getSectionDescription(section) {
    const descriptions = {
        '🧭 Navigation Basics': 'Master fundamental navigation commands to move around the file system efficiently.',
        '📁 File & Directory Operations': 'Learn to create, manage, and manipulate files and directories with precision.',
        '📚 Introduction': 'Understand Linux history, distributions, and package management systems.'
    };
    return descriptions[section] || 'Learn Linux commands step by step.';
}

function loadLessonContent(lessonId) {
    const contentArea = document.getElementById('lesson-content');
    currentLesson = lessonId;
    
    let content = '';
    
    switch(lessonId) {
        case 'welcome':
            content = getWelcomeContent();
            break;
        case 'pwd':
            content = getPwdContent();
            break;
        case 'cd':
            content = getCdContent();
            break;
        case 'ls':
            content = getLsContent();
            break;
        case 'tree':
            content = getTreeContent();
            break;
        case 'file':
            content = getFileContent();
            break;
        case 'stat':
            content = getStatContent();
            break;
        case 'mkdir':
            content = getMkdirContent();
            break;
        case 'touch':
            content = getTouchContent();
            break;
        case 'rm':
            content = getRmContent();
            break;
        case 'mv':
            content = getMvContent();
            break;
        case 'cp':
            content = getCpContent();
            break;
        case 'find':
            content = getFindContent();
            break;
        case 'linux-history':
            content = getLinuxHistoryContent();
            break;
        case 'distributions':
            content = getDistributionsContent();
            break;
        case 'package-managers-intro':
            content = getPackageManagersIntroContent();
            break;
        default:
            content = getDefaultContent(lessonId);
    }
    
    contentArea.innerHTML = content;
    
    // Mark lesson as completed
    if (lessonId !== 'welcome') {
        markLessonCompleted(lessonId);
        updateProgress();
    }
}

function markLessonCompleted(lessonId) {
    completedLessons.add(lessonId);
    const lessonItem = document.querySelector(`[data-lesson="${lessonId}"]`);
    if (lessonItem) {
        lessonItem.classList.add('completed');
        const status = lessonItem.querySelector('.lesson-status');
        if (status) {
            status.textContent = '✅';
        }
    }
}

function updateProgress() {
    const progress = Math.round((completedLessons.size / totalLessons) * 100);
    const progressText = document.querySelector('.progress-text');
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressText) progressText.textContent = `${progress}% Complete`;
    if (progressFill) progressFill.style.width = `${progress}%`;
}

// Content Functions
function getWelcomeContent() {
    return `
        <div class="welcome-message">
            <h3>Welcome to Command Camp!</h3>
            <p>Select a lesson from the navigation panel to start learning Linux commands.</p>
            <div class="course-overview">
                <h4>Course Overview:</h4>
                <ul>
                    <li>9 comprehensive sections</li>
                    <li>Video tutorials for each command</li>
                    <li>Real-world examples and use cases</li>
                    <li>Interactive exams to test your knowledge</li>
                    <li>Hands-on practice with our terminal simulator</li>
                </ul>
            </div>
        </div>
    `;
}

function getPwdContent() {
    return `
        <div class="lesson-content">
            <h3>📍 pwd - Print Working Directory</h3>
            
            <div class="video-section">
                <h4>🎬 Video Tutorial</h4>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                </div>
            </div>
            
            <div class="content-section">
                <h4>📖 How to Use</h4>
                <p><strong>Syntax:</strong> <code>pwd [options]</code></p>
                <p>The <code>pwd</code> command displays the full pathname of the current working directory.</p>
                
                <h5>Options:</h5>
                <ul>
                    <li><code>-L</code> - Follow symbolic links (default behavior)</li>
                    <li><code>-P</code> - Show physical path, not symbolic links</li>
                </ul>
            </div>
            
            <div class="examples-section">
                <h4>🌍 Real-World Examples</h4>
                
                <div class="example-card">
                    <h5>Basic Usage</h5>
                    <div class="code-block">
                        <code>$ pwd</code>
                        <div class="output">/home/user/documents</div>
                    </div>
                    <p>Simply displays your current location in the file system.</p>
                </div>
                
                <div class="example-card">
                    <h5>In Scripts and Automation</h5>
                    <div class="code-block">
                        <code>$ echo "Current directory: $(pwd)"</code>
                        <div class="output">Current directory: /home/user/documents</div>
                    </div>
                    <p>Useful for logging, debugging, and automation scripts.</p>
                </div>
                
                <div class="example-card">
                    <h5>With Symbolic Links</h5>
                    <div class="code-block">
                        <code>$ ln -s /home/user/documents /home/user/docs</code>
                        <code>$ cd /home/user/docs</code>
                        <code>$ pwd</code>
                        <div class="output">/home/user/docs</div>
                        <code>$ pwd -P</code>
                        <div class="output">/home/user/documents</div>
                    </div>
                    <p>The <code>-P</code> option shows the actual physical path, not the linked path.</p>
                </div>
                
                <div class="example-card">
                    <h5>In Backup Scripts</h5>
                    <div class="code-block">
                        <code>#!/bin/bash</code>
                        <code>BACKUP_DIR="/backups/$(date +%Y%m%d)"</code>
                        <code>SOURCE_DIR="$(pwd)"</code>
                        <code>echo "Backing up from: $SOURCE_DIR"</code>
                        <code>rsync -av "$SOURCE_DIR" "$BACKUP_DIR"</code>
                    </div>
                    <p>Common in backup scripts to capture the current directory for logging.</p>
                </div>
                
                <div class="example-card">
                    <h5>System Administration</h5>
                    <div class="code-block">
                        <code>$ sudo find / -name "*.log" -exec dirname {} \\; | sort | uniq</code>
                        <code>$ cd /var/log</code>
                        <code>$ pwd</code>
                        <div class="output">/var/log</div>
                    </div>
                    <p>System administrators use pwd to verify their location before making changes.</p>
                </div>
            </div>
            
            <div class="practice-section">
                <h4>💡 Practice Exercise</h4>
                <p>Try these commands in your terminal:</p>
                <ol>
                    <li>Navigate to different directories and use <code>pwd</code> to see your location</li>
                    <li>Create a symbolic link and compare <code>pwd</code> vs <code>pwd -P</code></li>
                    <li>Write a simple script that uses <code>pwd</code> for logging</li>
                </ol>
            </div>
        </div>
    `;
}

function getCdContent() {
    return `
        <div class="lesson-content">
            <h3>📁 cd - Change Directory</h3>
            
            <div class="video-section">
                <h4>🎬 Video Tutorial</h4>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                </div>
            </div>
            
            <div class="content-section">
                <h4>📖 How to Use</h4>
                <p><strong>Syntax:</strong> <code>cd [directory]</code></p>
                <p>The <code>cd</code> command changes your current working directory.</p>
                
                <h5>Common Usage:</h5>
                <ul>
                    <li><code>cd</code> - Go to home directory</li>
                    <li><code>cd ~</code> - Go to home directory</li>
                    <li><code>cd ..</code> - Go up one directory</li>
                    <li><code>cd -</code> - Go to previous directory</li>
                    <li><code>cd /path/to/directory</code> - Go to specific directory</li>
                </ul>
            </div>
            
            <div class="examples-section">
                <h4>🌍 Real-World Examples</h4>
                
                <div class="example-card">
                    <h5>Basic Navigation</h5>
                    <div class="code-block">
                        <code>$ cd /home/user</code>
                        <code>$ pwd</code>
                        <div class="output">/home/user</div>
                        <code>$ cd documents</code>
                        <code>$ pwd</code>
                        <div class="output">/home/user/documents</div>
                    </div>
                    <p>Navigate to absolute and relative paths.</p>
                </div>
                
                <div class="example-card">
                    <h5>Quick Navigation Shortcuts</h5>
                    <div class="code-block">
                        <code>$ cd ~</code>
                        <div class="output">Go to home directory</div>
                        <code>$ cd ..</code>
                        <div class="output">Go up one level</div>
                        <code>$ cd -</code>
                        <div class="output">Go to previous directory</div>
                    </div>
                    <p>Essential shortcuts for efficient navigation.</p>
                </div>
                
                <div class="example-card">
                    <h5>In Development Workflows</h5>
                    <div class="code-block">
                        <code>$ cd /var/www/html</code>
                        <code>$ git status</code>
                        <code>$ cd ~/projects/backend</code>
                        <code>$ npm install</code>
                        <code>$ cd ~/projects/frontend</code>
                        <code>$ npm start</code>
                    </div>
                    <p>Developers frequently switch between project directories.</p>
                </div>
                
                <div class="example-card">
                    <h5>System Administration</h5>
                    <div class="code-block">
                        <code>$ cd /etc</code>
                        <code>$ ls -la</code>
                        <code>$ cd /var/log</code>
                        <code>$ tail -f system.log</code>
                        <code>$ cd /tmp</code>
                        <code>$ ls -la | grep "\.tmp"</code>
                    </div>
                    <p>System administrators navigate between system directories for maintenance.</p>
                </div>
                
                <div class="example-card">
                    <h5>Automation Scripts</h5>
                    <div class="code-block">
                        <code>#!/bin/bash</code>
                        <code>cd /opt/application</code>
                        <code>if [ -f "config.ini" ]; then</code>
                        <code>    echo "Configuration found"</code>
                        <code>    cd backup</code>
                        <code>    tar -czf config_backup_$(date +%Y%m%d).tar.gz ../config.ini</code>
                        <code>fi</code>
                    </div>
                    <p>Scripts often change directories to perform operations in specific locations.</p>
                </div>
            </div>
            
            <div class="practice-section">
                <h4>💡 Practice Exercise</h4>
                <p>Try these navigation exercises:</p>
                <ol>
                    <li>Navigate to your home directory using different methods</li>
                    <li>Create a directory structure and practice relative vs absolute paths</li>
                    <li>Use <code>cd -</code> to toggle between two directories</li>
                    <li>Navigate to system directories like <code>/etc</code>, <code>/var/log</code></li>
                </ol>
            </div>
        </div>
    `;
}

function getLsContent() {
    return `
        <div class="lesson-content">
            <h3>📋 ls - List Directory Contents</h3>
            
            <div class="video-section">
                <h4>🎬 Video Tutorial</h4>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                </div>
            </div>
            
            <div class="content-section">
                <h4>📖 How to Use</h4>
                <p><strong>Syntax:</strong> <code>ls [options] [file/directory]</code></p>
                <p>The <code>ls</code> command lists directory contents with various formatting options.</p>
                
                <h5>Common Options:</h5>
                <ul>
                    <li><code>-l</code> - Long format (detailed listing)</li>
                    <li><code>-a</code> - Show hidden files (starting with .)</li>
                    <li><code>-h</code> - Human-readable file sizes</li>
                    <li><code>-t</code> - Sort by modification time</li>
                    <li><code>-r</code> - Reverse sort order</li>
                    <li><code>-R</code> - Recursive listing</li>
                </ul>
            </div>
            
            <div class="examples-section">
                <h4>🌍 Real-World Examples</h4>
                
                <div class="example-card">
                    <h5>Basic Listing</h5>
                    <div class="code-block">
                        <code>$ ls</code>
                        <div class="output">Documents  Downloads  Pictures  file.txt</div>
                        <code>$ ls -la</code>
                        <div class="output">total 8</div>
                        <div class="output">drwxr-xr-x 2 user user 4096 Jan 15 10:30 .</div>
                        <div class="output">drwxr-xr-x 3 user user 4096 Jan 15 10:30 ..</div>
                        <div class="output">-rw-r--r-- 1 user user 0 Jan 15 10:30 file.txt</div>
                    </div>
                    <p>Basic listing vs detailed listing with permissions and metadata.</p>
                </div>
                
                <div class="example-card">
                    <h5>File Management</h5>
                    <div class="code-block">
                        <code>$ ls -lh</code>
                        <div class="output">-rw-r--r-- 1 user user 1.2M Jan 15 10:30 large_file.zip</div>
                        <code>$ ls -lt</code>
                        <div class="output">Most recently modified files first</div>
                        <code>$ ls -la | grep "^\."</code>
                        <div class="output">Show only hidden files</div>
                    </div>
                    <p>Useful for file management and organization.</p>
                </div>
                
                <div class="example-card">
                    <h5>System Administration</h5>
                    <div class="code-block">
                        <code>$ ls -la /etc/</code>
                        <div class="output">System configuration files</div>
                        <code>$ ls -lh /var/log/</code>
                        <div class="output">Log files with sizes</div>
                        <code>$ ls -lt /tmp/ | head -10</code>
                        <div class="output">Recent temporary files</div>
                    </div>
                    <p>System administrators use ls to inspect system directories.</p>
                </div>
                
                <div class="example-card">
                    <h5>Development Workflows</h5>
                    <div class="code-block">
                        <code>$ ls -la ~/.ssh/</code>
                        <div class="output">SSH keys and configuration</div>
                        <code>$ ls -la node_modules/ | wc -l</code>
                        <div class="output">Count files in node_modules</div>
                        <code>$ ls -la | grep "\.js$"</code>
                        <div class="output">Show only JavaScript files</div>
                    </div>
                    <p>Developers use ls to explore project structures and find files.</p>
                </div>
                
                <div class="example-card">
                    <h5>Automation and Scripting</h5>
                    <div class="code-block">
                        <code>#!/bin/bash</code>
                        <code>for file in $(ls *.txt); do</code>
                        <code>    echo "Processing: $file"</code>
                        <code>    # Process each text file</code>
                        <code>done</code>
                    </div>
                    <p>Common in scripts to iterate over files in a directory.</p>
                </div>
            </div>
            
            <div class="practice-section">
                <h4>💡 Practice Exercise</h4>
                <p>Try these ls exercises:</p>
                <ol>
                    <li>Use different ls options to explore your home directory</li>
                    <li>Find the largest files in a directory using ls and sort</li>
                    <li>List only files (not directories) in a directory</li>
                    <li>Create a script that uses ls to process files</li>
                </ol>
            </div>
        </div>
    `;
}

function getMkdirContent() {
    return `
        <div class="lesson-content">
            <h3>📁 mkdir - Make Directory</h3>
            
            <div class="video-section">
                <h4>🎬 Video Tutorial</h4>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                </div>
            </div>
            
            <div class="content-section">
                <h4>📖 How to Use</h4>
                <p><strong>Syntax:</strong> <code>mkdir [options] directory_name</code></p>
                <p>The <code>mkdir</code> command creates new directories.</p>
                
                <h5>Common Options:</h5>
                <ul>
                    <li><code>-p</code> - Create parent directories if they don't exist</li>
                    <li><code>-m</code> - Set file permissions</li>
                    <li><code>-v</code> - Verbose output</li>
                </ul>
            </div>
            
            <div class="examples-section">
                <h4>🌍 Real-World Examples</h4>
                
                <div class="example-card">
                    <h5>Basic Directory Creation</h5>
                    <div class="code-block">
                        <code>$ mkdir projects</code>
                        <code>$ ls -la</code>
                        <div class="output">drwxr-xr-x 2 user user 4096 Jan 15 10:30 projects</div>
                        <code>$ mkdir -v backup</code>
                        <div class="output">mkdir: created directory 'backup'</div>
                    </div>
                    <p>Create single directories with optional verbose output.</p>
                </div>
                
                <div class="example-card">
                    <h5>Creating Directory Trees</h5>
                    <div class="code-block">
                        <code>$ mkdir -p /home/user/projects/webapp/{src,docs,tests}</code>
                        <code>$ tree /home/user/projects/webapp/</code>
                        <div class="output">webapp/</div>
                        <div class="output">├── docs/</div>
                        <div class="output">├── src/</div>
                        <div class="output">└── tests/</div>
                    </div>
                    <p>The <code>-p</code> option creates the entire directory structure at once.</p>
                </div>
                
                <div class="example-card">
                    <h5>Project Organization</h5>
                    <div class="code-block">
                        <code>$ mkdir -p ~/projects/{frontend,backend,database}</code>
                        <code>$ mkdir -p ~/projects/frontend/{src,public,assets}</code>
                        <code>$ mkdir -p ~/projects/backend/{api,models,config}</code>
                    </div>
                    <p>Organize development projects with structured directories.</p>
                </div>
                
                <div class="example-card">
                    <h5>System Administration</h5>
                    <div class="code-block">
                        <code>$ sudo mkdir -p /opt/myapp/{bin,etc,var/log}</code>
                        <code>$ sudo mkdir -m 755 /opt/myapp/bin</code>
                        <code>$ sudo mkdir -m 750 /opt/myapp/etc</code>
                    </div>
                    <p>Create application directories with proper permissions.</p>
                </div>
                
                <div class="example-card">
                    <h5>Automation Scripts</h5>
                    <div class="code-block">
                        <code>#!/bin/bash</code>
                        <code>DATE=$(date +%Y%m%d)</code>
                        <code>BACKUP_DIR="/backups/$DATE"</code>
                        <code>mkdir -p "$BACKUP_DIR"</code>
                        <code>echo "Backup directory created: $BACKUP_DIR"</code>
                    </div>
                    <p>Create backup directories with date-based naming.</p>
                </div>
            </div>
            
            <div class="practice-section">
                <h4>💡 Practice Exercise</h4>
                <p>Try these mkdir exercises:</p>
                <ol>
                    <li>Create a project directory structure for a web application</li>
                    <li>Use mkdir -p to create nested directories</li>
                    <li>Create directories with specific permissions using -m</li>
                    <li>Write a script that creates backup directories with timestamps</li>
                </ol>
            </div>
        </div>
    `;
}

// Placeholder functions for other commands
function getTreeContent() { return getDefaultContent('tree'); }
function getFileContent() { return getDefaultContent('file'); }
function getStatContent() { return getDefaultContent('stat'); }
function getTouchContent() { return getDefaultContent('touch'); }
function getRmContent() { return getDefaultContent('rm'); }
function getMvContent() { return getDefaultContent('mv'); }
function getCpContent() { return getDefaultContent('cp'); }
function getFindContent() { return getDefaultContent('find'); }
function getLinuxHistoryContent() { return getDefaultContent('linux-history'); }
function getDistributionsContent() { return getDefaultContent('distributions'); }
function getPackageManagersIntroContent() { return getDefaultContent('package-managers-intro'); }

function getDefaultContent(lessonId) {
    return `
        <div class="lesson-content">
            <h3>📚 ${lessonId.charAt(0).toUpperCase() + lessonId.slice(1)}</h3>
            <p>This lesson is coming soon! Detailed content will be added here.</p>
            <div class="video-section">
                <h4>🎬 Video Tutorial</h4>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                </div>
            </div>
        </div>
    `;
}

// Detailed Navigation Section
function openNavigationSection() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--bg-tertiary);
        border-radius: 12px;
        padding: 2rem;
        max-width: 900px;
        max-height: 85vh;
        overflow-y: auto;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-hover);
    `;
    
    modalContent.innerHTML = `
        <h2 style="color: var(--primary-color); margin-bottom: 1rem;">🧭 Navigation Basics</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Master fundamental navigation commands to move around the file system efficiently.</p>
        
        <!-- pwd Command -->
        <div style="margin-bottom: 3rem; border-bottom: 1px solid var(--border-color); padding-bottom: 2rem;">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">📍 pwd - Print Working Directory</h3>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">🎬 Video Tutorial</h4>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 1rem;">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;"
                            frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
            
            <div style="color: var(--text-secondary); line-height: 1.8;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">📖 How to Use</h4>
                <p><strong>Syntax:</strong> <code>pwd [options]</code></p>
                <p><strong>Options:</strong></p>
                <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li><code>-L</code> - Follow symbolic links (default)</li>
                    <li><code>-P</code> - Show physical path, not symbolic links</li>
                </ul>
                
                <h4 style="color: var(--text-primary); margin: 1.5rem 0 1rem;">🌍 Real-World Examples</h4>
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <p style="margin: 0 0 0.5rem 0;"><strong>Basic Usage:</strong></p>
                    <code style="color: var(--primary-color);">$ pwd</code><br>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">Output: /home/user/documents</span>
                </div>
                
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <p style="margin: 0 0 0.5rem 0;"><strong>In Scripts:</strong></p>
                    <code style="color: var(--primary-color);">$ echo "Current directory: $(pwd)"</code><br>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">Output: Current directory: /home/user/documents</span>
                </div>
                
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">
                    <p style="margin: 0 0 0.5rem 0;"><strong>With Symbolic Links:</strong></p>
                    <code style="color: var(--primary-color);">$ pwd -P</code><br>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">Shows the actual physical path, not the linked path</span>
                </div>
            </div>
        </div>
        
        <!-- cd Command -->
        <div style="margin-bottom: 3rem; border-bottom: 1px solid var(--border-color); padding-bottom: 2rem;">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">📁 cd - Change Directory</h3>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">🎬 Video Tutorial</h4>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 1rem;">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;"
                            frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
            
            <div style="color: var(--text-secondary); line-height: 1.8;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">📖 How to Use</h4>
                <p><strong>Syntax:</strong> <code>cd [directory]</code></p>
                
                <h4 style="color: var(--text-primary); margin: 1.5rem 0 1rem;">🌍 Real-World Examples</h4>
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <p style="margin: 0 0 0.5rem 0;"><strong>Navigate to home:</strong></p>
                    <code style="color: var(--primary-color);">$ cd ~</code> or <code style="color: var(--primary-color);">$ cd</code>
                </div>
                
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <p style="margin: 0 0 0.5rem 0;"><strong>Go back one level:</strong></p>
                    <code style="color: var(--primary-color);">$ cd ..</code>
                </div>
                
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">
                    <p style="margin: 0 0 0.5rem 0;"><strong>Go to previous directory:</strong></p>
                    <code style="color: var(--primary-color);">$ cd -</code>
                </div>
            </div>
        </div>
        
        <!-- Section Exam -->
        <div style="margin-top: 3rem; background: var(--bg-secondary); padding: 2rem; border-radius: 12px; border: 2px solid var(--primary-color);">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">📝 Navigation Basics Exam</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Test your knowledge of navigation commands!</p>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Question 1:</h4>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">What command would you use to find out your current directory?</p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="exam-btn" onclick="checkAnswer(this, 'pwd', true)">pwd</button>
                    <button class="exam-btn" onclick="checkAnswer(this, 'pwd', false)">cd</button>
                    <button class="exam-btn" onclick="checkAnswer(this, 'pwd', false)">ls</button>
                    <button class="exam-btn" onclick="checkAnswer(this, 'pwd', false)">where</button>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Question 2:</h4>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">How do you navigate to your home directory?</p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="exam-btn" onclick="checkAnswer(this, 'cd ~', false)">cd home</button>
                    <button class="exam-btn" onclick="checkAnswer(this, 'cd ~', true)">cd ~</button>
                    <button class="exam-btn" onclick="checkAnswer(this, 'cd ~', false)">cd /home</button>
                    <button class="exam-btn" onclick="checkAnswer(this, 'cd ~', false)">go home</button>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Question 3:</h4>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">What does the command <code>cd ..</code> do?</p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="exam-btn" onclick="checkAnswer(this, 'Goes up one directory', false)">Goes down one directory</button>
                    <button class="exam-btn" onclick="checkAnswer(this, 'Goes up one directory', true)">Goes up one directory</button>
                    <button class="exam-btn" onclick="checkAnswer(this, 'Goes up one directory', false)">Lists files</button>
                    <button class="exam-btn" onclick="checkAnswer(this, 'Goes up one directory', false)">Shows current path</button>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="showExamResults()" 
                        style="background: var(--accent-color); color: var(--bg-primary); border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Submit Exam
                </button>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
            <button onclick="this.closest('.modal-overlay').remove()" 
                    style="background: var(--primary-color); color: var(--bg-primary); border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                Close Section
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Exam functionality
let examScore = 0;
let totalQuestions = 0;

function checkAnswer(button, correctAnswer, isCorrect) {
    // Reset all buttons in this question
    const questionDiv = button.parentElement.parentElement;
    const buttons = questionDiv.querySelectorAll('.exam-btn');
    buttons.forEach(btn => {
        btn.style.background = 'var(--bg-tertiary)';
        btn.style.color = 'var(--text-primary)';
        btn.disabled = true;
    });
    
    // Highlight correct/incorrect
    if (isCorrect) {
        button.style.background = 'var(--success-color)';
        button.style.color = 'var(--bg-primary)';
        examScore++;
    } else {
        button.style.background = 'var(--error-color)';
        button.style.color = 'var(--bg-primary)';
        // Find and highlight the correct answer
        buttons.forEach(btn => {
            if (btn.onclick.toString().includes('true')) {
                btn.style.background = 'var(--success-color)';
                btn.style.color = 'var(--bg-primary)';
            }
        });
    }
    
    totalQuestions++;
}

function showExamResults() {
    const percentage = Math.round((examScore / totalQuestions) * 100);
    const message = percentage >= 80 ? 
        `🎉 Congratulations! You scored ${percentage}% - Excellent work!` :
        percentage >= 60 ? 
        `👍 Good job! You scored ${percentage}% - Keep practicing!` :
        `📚 You scored ${percentage}% - Review the material and try again!`;
    
    alert(message);
    examScore = 0;
    totalQuestions = 0;
}

// Camp Section functionality
function openSection(sectionName) {

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress); 