// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

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
    if (!terminalOutput) return;
    
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
    if (!terminalOutput) return;
    
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

// Process command input
function processCommand(command) {
    if (!command) return;
    
    // Add command to terminal
    addTerminalLine(command, 'command');
    
    // Get response
    const response = commandResponses[command] || `Command '${command}' not found. Type 'help' for available commands.`;
    
    // Add response
    addTerminalLine(response, 'output');
    
    // Clear input
    if (commandInput) {
        commandInput.value = '';
    }
}

// Try command from help buttons
function tryCommand(cmd) {
    if (commandInput) {
        commandInput.value = cmd;
        processCommand(cmd);
    }
}

// Handle command input
if (commandInput) {
    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            processCommand(command);
        }
    });
}

// Initialize terminal on page load
document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
    
    // Initialize course navigation if on tutorial page
    if (window.location.pathname.includes('tutorial.html')) {
        initializeCourseNavigation();
    }
});

// Course Navigation Functions
function initializeCourseNavigation() {
    const lessonItems = document.querySelectorAll('.lesson-item');
    
    lessonItems.forEach(item => {
        item.addEventListener('click', () => {
            const lessonId = item.getAttribute('data-lesson');
            loadLessonContent(lessonId);
            
            // Update active state
            lessonItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');
            
            // Update progress
            updateProgress();
        });
    });
}

function updateContentHeader(title) {
    const titleElement = document.getElementById('current-section-title');
    const descriptionElement = document.getElementById('current-section-description');
    
    if (titleElement) {
        titleElement.textContent = title;
    }
    
    if (descriptionElement) {
        const section = getSectionFromTitle(title);
        const description = getSectionDescription(section);
        descriptionElement.textContent = description;
    }
}

function getSectionFromTitle(title) {
    const sectionMap = {
        'pwd': 'navigation',
        'cd': 'navigation',
        'ls': 'navigation',
        'tree': 'navigation',
        'file': 'navigation',
        'stat': 'navigation',
        'mkdir': 'file-operations',
        'touch': 'file-operations',
        'rm': 'file-operations',
        'mv': 'file-operations',
        'cp': 'file-operations',
        'find': 'file-operations',
        'cat': 'text-processing',
        'grep': 'text-processing',
        'sed': 'text-processing',
        'awk': 'text-processing',
        'ps': 'system-info',
        'top': 'system-info',
        'df': 'system-info',
        'free': 'system-info',
        'whoami': 'user-management',
        'who': 'user-management',
        'sudo': 'user-management',
        'chmod': 'user-management',
        'ping': 'network',
        'netstat': 'network',
        'ssh': 'network',
        'wget': 'network',
        'cron': 'advanced',
        'systemctl': 'advanced',
        'journalctl': 'advanced',
        'bash-scripting': 'advanced',
        'linux-history': 'introduction',
        'distributions': 'introduction',
        'package-managers-intro': 'introduction'
    };
    
    return sectionMap[title] || 'general';
}

function getSectionDescription(section) {
    const descriptions = {
        'introduction': 'Learn about Linux history, distributions, and package management systems.',
        'navigation': 'Master fundamental navigation commands to move around the file system efficiently.',
        'file-operations': 'Create, copy, move, and delete files and directories with powerful commands.',
        'text-processing': 'Use powerful text processing tools for searching and manipulating text.',
        'system-info': 'Monitor system resources and get information about your Linux system.',
        'user-management': 'Manage users, permissions, and system access controls.',
        'network': 'Connect to networks, troubleshoot connectivity, and transfer files.',
        'advanced': 'Explore advanced system administration and automation techniques.',
        'general': 'Learn essential Linux commands and improve your terminal skills.'
    };
    
    return descriptions[section] || descriptions['general'];
}

function loadLessonContent(lessonId) {
    const lessonContent = document.getElementById('lesson-content');
    if (!lessonContent) return;
    
    let content = '';
    
    switch (lessonId) {
        case 'pwd':
            content = getPwdContent();
            updateContentHeader('pwd - Print Working Directory');
            break;
        case 'cd':
            content = getCdContent();
            updateContentHeader('cd - Change Directory');
            break;
        case 'ls':
            content = getLsContent();
            updateContentHeader('ls - List Directory Contents');
            break;
        case 'mkdir':
            content = getMkdirContent();
            updateContentHeader('mkdir - Make Directory');
            break;
        case 'tree':
            content = getTreeContent();
            updateContentHeader('tree - Display Directory Tree');
            break;
        case 'file':
            content = getFileContent();
            updateContentHeader('file - Determine File Type');
            break;
        case 'stat':
            content = getStatContent();
            updateContentHeader('stat - File Status');
            break;
        case 'touch':
            content = getTouchContent();
            updateContentHeader('touch - Create/Update Files');
            break;
        case 'rm':
            content = getRmContent();
            updateContentHeader('rm - Remove Files');
            break;
        case 'mv':
            content = getMvContent();
            updateContentHeader('mv - Move/Rename Files');
            break;
        case 'cp':
            content = getCpContent();
            updateContentHeader('cp - Copy Files');
            break;
        case 'find':
            content = getFindContent();
            updateContentHeader('find - Search Files');
            break;
        case 'linux-history':
            content = getLinuxHistoryContent();
            updateContentHeader('Linux History & Philosophy');
            break;
        case 'distributions':
            content = getDistributionsContent();
            updateContentHeader('Linux Distributions');
            break;
        case 'package-managers-intro':
            content = getPackageManagersIntroContent();
            updateContentHeader('Package Managers Overview');
            break;
        default:
            content = getDefaultContent(lessonId);
            updateContentHeader('Command Tutorial');
    }
    
    lessonContent.innerHTML = content;
    
    // Mark lesson as completed
    markLessonCompleted(lessonId);
}

function markLessonCompleted(lessonId) {
    const lessonItem = document.querySelector(`[data-lesson="${lessonId}"]`);
    if (lessonItem) {
        lessonItem.classList.add('completed');
        const statusElement = lessonItem.querySelector('.lesson-status');
        if (statusElement) {
            statusElement.textContent = '✓';
        }
    }
}

function updateProgress() {
    const completedLessons = document.querySelectorAll('.lesson-item.completed').length;
    const totalLessons = document.querySelectorAll('.lesson-item').length;
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
    
    const progressText = document.querySelector('.progress-text');
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressText) {
        progressText.textContent = `${progressPercentage}% Complete`;
    }
    
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
    }
}

function getWelcomeContent() {
    return `
        <div class="welcome-message">
            <h3>Welcome to Command Camp Tutorials!</h3>
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
        <div class="video-section">
            <h4>Video Tutorial</h4>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            </div>
        </div>
        
        <div class="content-section">
            <h4>What is pwd?</h4>
            <p>The <code>pwd</code> command stands for "Print Working Directory". It displays the full path of your current directory in the file system.</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Simple pwd command</h5>
                <div class="code-block">
                    <code>$ pwd</code>
                    <div class="output">/home/user/documents</div>
                </div>
                <p>This command shows your current working directory.</p>
            </div>
        </div>
        
        <div class="examples-section">
            <h4>Examples</h4>
            
            <div class="example-card">
                <h5>Basic pwd usage</h5>
                <div class="code-block">
                    <code>$ pwd</code>
                    <div class="output">/home/user</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>pwd with symbolic links</h5>
                <div class="code-block">
                    <code>$ pwd -P</code>
                    <div class="output">/home/user/actual/path</div>
                </div>
                <p>The <code>-P</code> flag resolves symbolic links and shows the physical path.</p>
            </div>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Open your terminal and type <code>pwd</code> to see your current directory</li>
                <li>Navigate to different directories using <code>cd</code> and then use <code>pwd</code> to see the changes</li>
                <li>Try using <code>pwd -P</code> in a directory with symbolic links</li>
            </ol>
        </div>
    `;
}

function getCdContent() {
    return `
        <div class="video-section">
            <h4>Video Tutorial</h4>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            </div>
        </div>
        
        <div class="content-section">
            <h4>What is cd?</h4>
            <p>The <code>cd</code> command stands for "Change Directory". It allows you to navigate between directories in the file system.</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Change to a specific directory</h5>
                <div class="code-block">
                    <code>$ cd /home/user/documents</code>
                </div>
                <p>This command changes your current directory to the specified path.</p>
            </div>
        </div>
        
        <div class="examples-section">
            <h4>Examples</h4>
            
            <div class="example-card">
                <h5>Navigate to home directory</h5>
                <div class="code-block">
                    <code>$ cd ~</code>
                    <div class="output">Changes to your home directory</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Go to parent directory</h5>
                <div class="code-block">
                    <code>$ cd ..</code>
                    <div class="output">Moves up one directory level</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Go to previous directory</h5>
                <div class="code-block">
                    <code>$ cd -</code>
                    <div class="output">Returns to the previous directory</div>
                </div>
            </div>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Use <code>cd ~</code> to go to your home directory</li>
                <li>Navigate to a subdirectory using <code>cd directory_name</code></li>
                <li>Use <code>cd ..</code> to go back to the parent directory</li>
                <li>Try <code>cd -</code> to return to your previous location</li>
            </ol>
        </div>
    `;
}

function getLsContent() {
    return `
        <div class="video-section">
            <h4>Video Tutorial</h4>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            </div>
        </div>
        
        <div class="content-section">
            <h4>What is ls?</h4>
            <p>The <code>ls</code> command lists directory contents. It shows files and directories in your current location.</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>List directory contents</h5>
                <div class="code-block">
                    <code>$ ls</code>
                    <div class="output">file1.txt  file2.txt  directory1/  directory2/</div>
                </div>
                <p>This command shows all files and directories in the current directory.</p>
            </div>
        </div>
        
        <div class="examples-section">
            <h4>Examples</h4>
            
            <div class="example-card">
                <h5>Detailed listing</h5>
                <div class="code-block">
                    <code>$ ls -la</code>
                    <div class="output">drwxr-xr-x 2 user user 4096 Jan 15 10:30 .</div>
                    <div class="output">drwxr-xr-x 3 user user 4096 Jan 15 10:30 ..</div>
                    <div class="output">-rw-r--r-- 1 user user 0 Jan 15 10:30 file.txt</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Human-readable file sizes</h5>
                <div class="code-block">
                    <code>$ ls -lh</code>
                    <div class="output">-rw-r--r-- 1 user user 1.2K Jan 15 10:30 file.txt</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Sort by modification time</h5>
                <div class="code-block">
                    <code>$ ls -lt</code>
                    <div class="output">Lists files sorted by modification time (newest first)</div>
                </div>
            </div>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Use <code>ls</code> to see files in your current directory</li>
                <li>Try <code>ls -la</code> to see detailed information including hidden files</li>
                <li>Use <code>ls -lh</code> to see file sizes in human-readable format</li>
                <li>Experiment with <code>ls -lt</code> to sort by modification time</li>
            </ol>
        </div>
    `;
}

function getMkdirContent() {
    return `
        <div class="video-section">
            <h4>Video Tutorial</h4>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            </div>
        </div>
        
        <div class="content-section">
            <h4>What is mkdir?</h4>
            <p>The <code>mkdir</code> command creates new directories. It stands for "Make Directory".</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Create a single directory</h5>
                <div class="code-block">
                    <code>$ mkdir new_directory</code>
                </div>
                <p>This command creates a new directory named "new_directory" in the current location.</p>
            </div>
        </div>
        
        <div class="examples-section">
            <h4>Examples</h4>
            
            <div class="example-card">
                <h5>Create multiple directories</h5>
                <div class="code-block">
                    <code>$ mkdir dir1 dir2 dir3</code>
                    <div class="output">Creates three directories at once</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Create nested directories</h5>
                <div class="code-block">
                    <code>$ mkdir -p parent/child/grandchild</code>
                    <div class="output">Creates the full directory structure</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Create directory with specific permissions</h5>
                <div class="code-block">
                    <code>$ mkdir -m 755 my_directory</code>
                    <div class="output">Creates directory with read/write/execute permissions for owner</div>
                </div>
            </div>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create a new directory using <code>mkdir test_dir</code></li>
                <li>Create multiple directories at once: <code>mkdir folder1 folder2 folder3</code></li>
                <li>Create a nested directory structure: <code>mkdir -p projects/website/css</code></li>
                <li>Verify your directories were created using <code>ls</code></li>
            </ol>
        </div>
    `;
}

// Default content for other commands
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
        <div class="content-section">
            <h4>Coming Soon!</h4>
            <p>This lesson content is currently being developed. Check back soon for the complete tutorial on <strong>${lessonId}</strong>.</p>
            
            <div class="course-overview">
                <h4>What you'll learn:</h4>
                <ul>
                    <li>Command syntax and usage</li>
                    <li>Common options and flags</li>
                    <li>Real-world examples</li>
                    <li>Best practices</li>
                    <li>Practice exercises</li>
                </ul>
            </div>
        </div>
    `;
}

// Exam functionality
function checkAnswer(button, correctAnswer, isCorrect) {
    if (isCorrect) {
        button.style.background = 'var(--success-color)';
        button.style.color = 'var(--bg-primary)';
        button.disabled = true;
    } else {
        button.style.background = 'var(--error-color)';
        button.style.color = 'var(--bg-primary)';
        setTimeout(() => {
            button.style.background = '';
            button.style.color = '';
        }, 1000);
    }
}

function showExamResults() {
    const examContainer = document.querySelector('.exam-container');
    if (examContainer) {
        examContainer.innerHTML = '<h3>Exam completed! Check your results above.</h3>';
    }
}

// Open section functionality
function openSection(sectionName) {
    // This function can be used to open specific sections programmatically
    console.log(`Opening section: ${sectionName}`);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal if it exists on the page
    if (terminalOutput) {
        initTerminal();
    }
    
    // Initialize course navigation if on tutorial page
    if (window.location.pathname.includes('tutorial.html')) {
        initializeCourseNavigation();
    }
    
    // Add smooth scrolling for anchor links
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
}); 