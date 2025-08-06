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
    
    // Load admin content if available
    loadAdminContent();
    
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

function getTreeContent() {
    return `
        <div class="content-section">
            <h4>What is tree?</h4>
            <p>The <code>tree</code> command displays a directory structure as a tree diagram, making it easy to see the hierarchy of files and folders.</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Show directory tree</h5>
                <div class="code-block">
                    <code>$ tree</code>
                    <div class="output">.
├── documents/
│   ├── work/
│   │   ├── report.txt
│   │   └── presentation.pdf
│   └── personal/
│       └── photos/
└── downloads/
    └── software.zip</div>
                </div>
            </div>
            
            <h5>Useful Options</h5>
            <div class="example-card">
                <h5>Limit depth</h5>
                <div class="code-block">
                    <code>$ tree -L 2</code>
                    <div class="output">Shows only 2 levels deep</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Show only directories</h5>
                <div class="code-block">
                    <code>$ tree -d</code>
                    <div class="output">Shows only folders, not files</div>
                </div>
            </div>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Navigate to your home directory and run <code>tree</code></li>
                <li>Try <code>tree -L 1</code> to see only the first level</li>
                <li>Use <code>tree -d</code> to see only directories</li>
            </ol>
        </div>
    `;
}

function getFileContent() {
    return `
        <div class="content-section">
            <h4>What is file?</h4>
            <p>The <code>file</code> command determines the type of a file by examining its content, not just its extension. It's like a detective that can tell what kind of file something is!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Check file type</h5>
                <div class="code-block">
                    <code>$ file document.txt</code>
                    <div class="output">document.txt: ASCII text</div>
                </div>
            </div>
            
            <h5>Examples</h5>
            <div class="example-card">
                <h5>Different file types</h5>
                <div class="code-block">
                    <code>$ file image.jpg</code>
                    <div class="output">image.jpg: JPEG image data</div>
                </div>
                <div class="code-block">
                    <code>$ file script.sh</code>
                    <div class="output">script.sh: Bourne-Again shell script</div>
                </div>
                <div class="code-block">
                    <code>$ file archive.zip</code>
                    <div class="output">archive.zip: Zip archive data</div>
                </div>
            </div>
            
            <h5>Why Use file?</h5>
            <ul>
                <li><strong>Security:</strong> Check if a file is what it claims to be</li>
                <li><strong>Debugging:</strong> Understand what type of file you're working with</li>
                <li><strong>Scripting:</strong> Automate file processing based on type</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create different types of files and use <code>file</code> on them</li>
                <li>Try <code>file *</code> to check all files in current directory</li>
                <li>Download a file and use <code>file</code> to verify its type</li>
            </ol>
        </div>
    `;
}

function getStatContent() {
    return `
        <div class="content-section">
            <h4>What is stat?</h4>
            <p>The <code>stat</code> command shows detailed information about files and directories, including size, permissions, creation date, and more.</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Get file statistics</h5>
                <div class="code-block">
                    <code>$ stat document.txt</code>
                    <div class="output">File: document.txt
Size: 1024 bytes
Access: 2024-01-15 10:30:00
Modify: 2024-01-15 10:30:00
Change: 2024-01-15 10:30:00</div>
                </div>
            </div>
            
            <h5>Useful Information</h5>
            <ul>
                <li><strong>Size:</strong> How many bytes the file contains</li>
                <li><strong>Access:</strong> When the file was last read</li>
                <li><strong>Modify:</strong> When the file content was last changed</li>
                <li><strong>Change:</strong> When file permissions were last changed</li>
            </ul>
            
            <h5>Common Options</h5>
            <div class="example-card">
                <h5>Simple format</h5>
                <div class="code-block">
                    <code>$ stat -t document.txt</code>
                    <div class="output">Shows info in a single line</div>
                </div>
            </div>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Use <code>stat</code> on different files and directories</li>
                <li>Compare the output of <code>stat</code> and <code>ls -l</code></li>
                <li>Try <code>stat -t</code> for a more compact view</li>
            </ol>
        </div>
    `;
}

function getTouchContent() {
    return `
        <div class="content-section">
            <h4>What is touch?</h4>
            <p>The <code>touch</code> command creates new files or updates the timestamp of existing files. It's like a magic wand that can make files appear!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Create a new file</h5>
                <div class="code-block">
                    <code>$ touch newfile.txt</code>
                    <div class="output">Creates an empty file called newfile.txt</div>
                </div>
            </div>
            
            <h5>Multiple Files</h5>
            <div class="example-card">
                <h5>Create several files at once</h5>
                <div class="code-block">
                    <code>$ touch file1.txt file2.txt file3.txt</code>
                    <div class="output">Creates three empty files</div>
                </div>
            </div>
            
            <h5>Update Timestamp</h5>
            <div class="example-card">
                <h5>Update existing file</h5>
                <div class="code-block">
                    <code>$ touch existing.txt</code>
                    <div class="output">Updates the timestamp without changing content</div>
                </div>
            </div>
            
            <h5>Why Use touch?</h5>
            <ul>
                <li><strong>Quick Creation:</strong> Make empty files for testing</li>
                <li><strong>Scripts:</strong> Create placeholder files</li>
                <li><strong>Timestamps:</strong> Update file access times</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create a new file with <code>touch myfile.txt</code></li>
                <li>Create multiple files: <code>touch a.txt b.txt c.txt</code></li>
                <li>Use <code>ls -l</code> before and after <code>touch</code> to see timestamp changes</li>
            </ol>
        </div>
    `;
}

function getRmContent() {
    return `
        <div class="content-section">
            <h4>What is rm?</h4>
            <p>The <code>rm</code> command removes (deletes) files and directories. <strong>Be careful!</strong> Deleted files cannot be easily recovered.</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Delete a file</h5>
                <div class="code-block">
                    <code>$ rm file.txt</code>
                    <div class="output">Deletes file.txt permanently</div>
                </div>
            </div>
            
            <h5>Important Options</h5>
            <div class="example-card">
                <h5>Interactive deletion</h5>
                <div class="code-block">
                    <code>$ rm -i file.txt</code>
                    <div class="output">Asks for confirmation before deleting</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Delete directory and contents</h5>
                <div class="code-block">
                    <code>$ rm -r directory/</code>
                    <div class="output">Deletes directory and all its contents</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Force deletion</h5>
                <div class="code-block">
                    <code>$ rm -f file.txt</code>
                    <div class="output">Deletes without asking, even if file doesn't exist</div>
                </div>
            </div>
            
            <h5>Safety Tips</h5>
            <ul>
                <li><strong>Always use -i</strong> when learning: <code>rm -i file.txt</code></li>
                <li><strong>Double-check</strong> the filename before deleting</li>
                <li><strong>Use wildcards carefully:</strong> <code>rm *.txt</code> deletes ALL .txt files</li>
                <li><strong>Never use rm -rf /</strong> - this can destroy your system!</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create a test file with <code>touch test.txt</code></li>
                <li>Delete it safely with <code>rm -i test.txt</code></li>
                <li>Try <code>rm -i nonexistent.txt</code> to see the error message</li>
            </ol>
        </div>
    `;
}

function getMvContent() {
    return `
        <div class="content-section">
            <h4>What is mv?</h4>
            <p>The <code>mv</code> command moves files and directories from one location to another, or renames them. Think of it as picking up a file and putting it somewhere else!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Move a file</h5>
                <div class="code-block">
                    <code>$ mv oldname.txt newname.txt</code>
                    <div class="output">Renames oldname.txt to newname.txt</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Move to different directory</h5>
                <div class="code-block">
                    <code>$ mv file.txt /home/user/documents/</code>
                    <div class="output">Moves file.txt to the documents folder</div>
                </div>
            </div>
            
            <h5>Multiple Files</h5>
            <div class="example-card">
                <h5>Move several files</h5>
                <div class="code-block">
                    <code>$ mv file1.txt file2.txt file3.txt destination/</code>
                    <div class="output">Moves all three files to destination folder</div>
                </div>
            </div>
            
            <h5>Useful Options</h5>
            <div class="example-card">
                <h5>Interactive move</h5>
                <div class="code-block">
                    <code>$ mv -i file.txt newname.txt</code>
                    <div class="output">Asks before overwriting existing files</div>
                </div>
            </div>
            
            <h5>Common Use Cases</h5>
            <ul>
                <li><strong>Renaming:</strong> <code>mv oldname.txt newname.txt</code></li>
                <li><strong>Organizing:</strong> <code>mv *.jpg photos/</code></li>
                <li><strong>Backing up:</strong> <code>mv important.txt important.txt.backup</code></li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create a file and rename it: <code>touch test.txt && mv test.txt renamed.txt</code></li>
                <li>Create a folder and move a file into it</li>
                <li>Try moving a file to a non-existent directory to see the error</li>
            </ol>
        </div>
    `;
}

function getCpContent() {
    return `
        <div class="content-section">
            <h4>What is cp?</h4>
            <p>The <code>cp</code> command copies files and directories. Unlike <code>mv</code>, the original file stays where it is and a copy is created in the new location.</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Copy a file</h5>
                <div class="code-block">
                    <code>$ cp original.txt backup.txt</code>
                    <div class="output">Creates a copy called backup.txt</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Copy to directory</h5>
                <div class="code-block">
                    <code>$ cp file.txt /home/user/documents/</code>
                    <div class="output">Copies file.txt to documents folder</div>
                </div>
            </div>
            
            <h5>Copying Directories</h5>
            <div class="example-card">
                <h5>Copy entire directory</h5>
                <div class="code-block">
                    <code>$ cp -r source_folder/ destination_folder/</code>
                    <div class="output">Copies folder and all its contents</div>
                </div>
            </div>
            
            <h5>Useful Options</h5>
            <div class="example-card">
                <h5>Preserve attributes</h5>
                <div class="code-block">
                    <code>$ cp -p file.txt backup.txt</code>
                    <div class="output">Keeps original permissions and timestamps</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Interactive copy</h5>
                <div class="code-block">
                    <code>$ cp -i file.txt destination/</code>
                    <div class="output">Asks before overwriting existing files</div>
                </div>
            </div>
            
            <h5>Common Use Cases</h5>
            <ul>
                <li><strong>Backups:</strong> <code>cp important.txt important.txt.backup</code></li>
                <li><strong>Templates:</strong> <code>cp template.txt new_project.txt</code></li>
                <li><strong>Archiving:</strong> <code>cp -r project/ backup/project/</code></li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create a file and make a backup: <code>touch test.txt && cp test.txt test_backup.txt</code></li>
                <li>Create a folder and copy a file into it</li>
                <li>Try <code>cp -i</code> to see the interactive mode</li>
            </ol>
        </div>
    `;
}

function getFindContent() {
    return `
        <div class="content-section">
            <h4>What is find?</h4>
            <p>The <code>find</code> command searches for files and directories based on various criteria like name, size, date, and more. It's like a powerful search engine for your files!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Find by name</h5>
                <div class="code-block">
                    <code>$ find . -name "*.txt"</code>
                    <div class="output">Finds all .txt files in current directory and subdirectories</div>
                </div>
            </div>
            
            <h5>Common Searches</h5>
            <div class="example-card">
                <h5>Find files by type</h5>
                <div class="code-block">
                    <code>$ find . -type f</code>
                    <div class="output">Finds all files (not directories)</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Find by size</h5>
                <div class="code-block">
                    <code>$ find . -size +10M</code>
                    <div class="output">Finds files larger than 10 megabytes</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Find by date</h5>
                <div class="code-block">
                    <code>$ find . -mtime -7</code>
                    <div class="output">Finds files modified in the last 7 days</div>
                </div>
            </div>
            
            <h5>Advanced Examples</h5>
            <div class="example-card">
                <h5>Find and execute</h5>
                <div class="code-block">
                    <code>$ find . -name "*.log" -exec rm {} \\;</code>
                    <div class="output">Finds and deletes all .log files</div>
                </div>
            </div>
            
            <h5>Search Criteria</h5>
            <ul>
                <li><strong>Name:</strong> <code>-name "pattern"</code></li>
                <li><strong>Type:</strong> <code>-type f</code> (files), <code>-type d</code> (directories)</li>
                <li><strong>Size:</strong> <code>-size +100k</code> (larger than 100KB)</li>
                <li><strong>Date:</strong> <code>-mtime -1</code> (modified today)</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Find all files in your home directory: <code>find ~ -type f</code></li>
                <li>Search for files with a specific name: <code>find . -name "test*"</code></li>
                <li>Find large files: <code>find . -size +1M</code></li>
            </ol>
        </div>
    `;
}
function getLinuxHistoryContent() {
    return `
        <div class="content-section">
            <h4>What is Linux?</h4>
            <p>Linux is a free, open-source operating system that powers most of the internet, smartphones, and even your smart TV! It was created by Linus Torvalds in 1991 as a hobby project.</p>
            
            <h5>Why Linux Matters</h5>
            <ul>
                <li><strong>Free:</strong> You can use, modify, and share Linux without paying</li>
                <li><strong>Secure:</strong> Built with security in mind from the ground up</li>
                <li><strong>Reliable:</strong> Powers servers that run for years without restarting</li>
                <li><strong>Flexible:</strong> Works on everything from tiny devices to supercomputers</li>
            </ul>
            
            <h5>Linux Philosophy</h5>
            <div class="example-card">
                <h5>Everything is a file</h5>
                <p>In Linux, even hardware devices are treated as files. This makes everything consistent and easy to work with.</p>
            </div>
            
            <div class="example-card">
                <h5>Small programs that do one thing well</h5>
                <p>Linux commands are like LEGO blocks - each does one specific job, but you can combine them to do amazing things.</p>
            </div>
        </div>
        
        <div class="practice-section">
            <h4>Key Takeaways</h4>
            <ol>
                <li>Linux is free and open-source</li>
                <li>Created by Linus Torvalds in 1991</li>
                <li>Powers most of the internet and devices</li>
                <li>Built on the philosophy of simplicity and modularity</li>
            </ol>
        </div>
    `;
}

function getDistributionsContent() {
    return `
        <div class="content-section">
            <h4>What are Linux Distributions?</h4>
            <p>A Linux distribution (or "distro") is a complete operating system built around the Linux kernel. Think of it like different flavors of ice cream - they're all ice cream, but each has its own unique taste!</p>
            
            <h5>Popular Distributions</h5>
            <div class="example-card">
                <h5>Ubuntu</h5>
                <p>Great for beginners. Easy to use, lots of software available, and excellent community support.</p>
            </div>
            
            <div class="example-card">
                <h5>CentOS/RHEL</h5>
                <p>Used in businesses and servers. Very stable and secure, but can be more complex.</p>
            </div>
            
            <div class="example-card">
                <h5>Debian</h5>
                <p>The grandparent of many distributions. Very stable and free software focused.</p>
            </div>
            
            <h5>How to Choose</h5>
            <ul>
                <li><strong>Beginner:</strong> Ubuntu, Linux Mint</li>
                <li><strong>Server:</strong> CentOS, Ubuntu Server</li>
                <li><strong>Security:</strong> Kali Linux, Parrot OS</li>
                <li><strong>Old Computers:</strong> Lubuntu, Xubuntu</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Quick Quiz</h4>
            <p>Which distribution would you choose for:</p>
            <ol>
                <li>Learning Linux for the first time?</li>
                <li>Running a web server?</li>
                <li>Penetration testing?</li>
            </ol>
        </div>
    `;
}

function getPackageManagersIntroContent() {
    return `
        <div class="content-section">
            <h4>What are Package Managers?</h4>
            <p>Package managers are like app stores for Linux. They help you install, update, and remove software easily without worrying about dependencies (other programs your software needs).</p>
            
            <h5>Popular Package Managers</h5>
            <div class="example-card">
                <h5>apt (Debian/Ubuntu)</h5>
                <div class="code-block">
                    <code>$ sudo apt install firefox</code>
                    <div class="output">Installs Firefox browser</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>yum/dnf (Red Hat/CentOS)</h5>
                <div class="code-block">
                    <code>$ sudo dnf install firefox</code>
                    <div class="output">Installs Firefox browser</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>pacman (Arch Linux)</h5>
                <div class="code-block">
                    <code>$ sudo pacman -S firefox</code>
                    <div class="output">Installs Firefox browser</div>
                </div>
            </div>
            
            <h5>Why Use Package Managers?</h5>
            <ul>
                <li><strong>Safety:</strong> Software is tested and verified</li>
                <li><strong>Dependencies:</strong> Automatically installs required software</li>
                <li><strong>Updates:</strong> Easy to keep everything current</li>
                <li><strong>Removal:</strong> Clean uninstallation without leftovers</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Common Commands</h4>
            <div class="code-block">
                <code>$ sudo apt update</code>
                <div class="output">Update package list</div>
            </div>
            <div class="code-block">
                <code>$ sudo apt upgrade</code>
                <div class="output">Upgrade installed packages</div>
            </div>
            <div class="code-block">
                <code>$ sudo apt remove firefox</code>
                <div class="output">Remove a package</div>
            </div>
        </div>
    `;
}

function getCatContent() {
    return `
        <div class="content-section">
            <h4>What is cat?</h4>
            <p>The <code>cat</code> command displays the contents of files. It's like opening a book and reading all the pages at once!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Display file contents</h5>
                <div class="code-block">
                    <code>$ cat file.txt</code>
                    <div class="output">Shows the entire contents of file.txt</div>
                </div>
            </div>
            
            <h5>Multiple Files</h5>
            <div class="example-card">
                <h5>Display multiple files</h5>
                <div class="code-block">
                    <code>$ cat file1.txt file2.txt file3.txt</code>
                    <div class="output">Shows contents of all three files in sequence</div>
                </div>
            </div>
            
            <h5>Creating Files</h5>
            <div class="example-card">
                <h5>Create a new file</h5>
                <div class="code-block">
                    <code>$ cat > newfile.txt</code>
                    <div class="output">Type content, press Ctrl+D to save</div>
                </div>
            </div>
            
            <h5>Useful Options</h5>
            <div class="example-card">
                <h5>Show line numbers</h5>
                <div class="code-block">
                    <code>$ cat -n file.txt</code>
                    <div class="output">Shows file with line numbers</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Show non-printing characters</h5>
                <div class="code-block">
                    <code>$ cat -A file.txt</code>
                    <div class="output">Shows tabs, spaces, and other hidden characters</div>
                </div>
            </div>
            
            <h5>Common Use Cases</h5>
            <ul>
                <li><strong>Quick View:</strong> <code>cat config.txt</code></li>
                <li><strong>Combine Files:</strong> <code>cat part1.txt part2.txt > combined.txt</code></li>
                <li><strong>Create Content:</strong> <code>cat > notes.txt</code></li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create a file with some text and use <code>cat</code> to view it</li>
                <li>Try <code>cat -n</code> to see line numbers</li>
                <li>Create multiple files and combine them with <code>cat</code></li>
            </ol>
        </div>
    `;
}

function getGrepContent() {
    return `
        <div class="content-section">
            <h4>What is grep?</h4>
            <p>The <code>grep</code> command searches for text patterns in files. It's like using Ctrl+F but much more powerful!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Search for a word</h5>
                <div class="code-block">
                    <code>$ grep "error" log.txt</code>
                    <div class="output">Shows all lines containing "error"</div>
                </div>
            </div>
            
            <h5>Search Multiple Files</h5>
            <div class="example-card">
                <h5>Search in all files</h5>
                <div class="code-block">
                    <code>$ grep "password" *.txt</code>
                    <div class="output">Searches for "password" in all .txt files</div>
                </div>
            </div>
            
            <h5>Useful Options</h5>
            <div class="example-card">
                <h5>Case insensitive search</h5>
                <div class="code-block">
                    <code>$ grep -i "ERROR" log.txt</code>
                    <div class="output">Finds "error", "ERROR", "Error", etc.</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Show line numbers</h5>
                <div class="code-block">
                    <code>$ grep -n "warning" log.txt</code>
                    <div class="output">Shows line numbers with matches</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Invert search (show lines that DON'T match)</h5>
                <div class="code-block">
                    <code>$ grep -v "debug" log.txt</code>
                    <div class="output">Shows lines that don't contain "debug"</div>
                </div>
            </div>
            
            <h5>Regular Expressions</h5>
            <div class="example-card">
                <h5>Search with patterns</h5>
                <div class="code-block">
                    <code>$ grep "^ERROR" log.txt</code>
                    <div class="output">Finds lines starting with "ERROR"</div>
                </div>
                <div class="code-block">
                    <code>$ grep "error$" log.txt</code>
                    <div class="output">Finds lines ending with "error"</div>
                </div>
            </div>
            
            <h5>Common Use Cases</h5>
            <ul>
                <li><strong>Log Analysis:</strong> <code>grep "ERROR" /var/log/system.log</code></li>
                <li><strong>Code Search:</strong> <code>grep -r "function" src/</code></li>
                <li><strong>Email Search:</strong> <code>grep "@gmail.com" contacts.txt</code></li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create a file with mixed content and search for specific words</li>
                <li>Try <code>grep -i</code> for case-insensitive search</li>
                <li>Use <code>grep -n</code> to see line numbers</li>
                <li>Practice with <code>grep -v</code> to exclude certain lines</li>
            </ol>
        </div>
    `;
}

function getSedContent() {
    return `
        <div class="content-section">
            <h4>What is sed?</h4>
            <p>The <code>sed</code> command is a "stream editor" that can find and replace text in files. Think of it as a powerful find-and-replace tool!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Simple replacement</h5>
                <div class="code-block">
                    <code>$ sed 's/old/new/g' file.txt</code>
                    <div class="output">Replaces all "old" with "new" in file.txt</div>
                </div>
            </div>
            
            <h5>Common Patterns</h5>
            <div class="example-card">
                <h5>Replace first occurrence only</h5>
                <div class="code-block">
                    <code>$ sed 's/old/new/' file.txt</code>
                    <div class="output">Replaces only the first "old" on each line</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Case insensitive replacement</h5>
                <div class="code-block">
                    <code>$ sed 's/old/new/gi' file.txt</code>
                    <div class="output">Replaces "old", "OLD", "Old", etc.</div>
                </div>
            </div>
            
            <h5>Advanced Examples</h5>
            <div class="example-card">
                <h5>Delete lines containing a pattern</h5>
                <div class="code-block">
                    <code>$ sed '/debug/d' file.txt</code>
                    <div class="output">Removes all lines containing "debug"</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Add text to beginning of lines</h5>
                <div class="code-block">
                    <code>$ sed 's/^/INFO: /' file.txt</code>
                    <div class="output">Adds "INFO: " to start of each line</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Save changes to file</h5>
                <div class="code-block">
                    <code>$ sed -i 's/old/new/g' file.txt</code>
                    <div class="output">Modifies the file directly (be careful!)</div>
                </div>
            </div>
            
            <h5>Common Use Cases</h5>
            <ul>
                <li><strong>Text Cleanup:</strong> <code>sed 's/\\s\\+/ /g' file.txt</code> (fix extra spaces)</li>
                <li><strong>Log Formatting:</strong> <code>sed 's/^/$(date): /' log.txt</code></li>
                <li><strong>Data Processing:</strong> <code>sed 's/,/\\t/g' data.csv</code> (comma to tab)</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create a file and practice simple replacements</li>
                <li>Try <code>sed 's/old/new/g'</code> on a test file</li>
                <li>Practice adding text to the beginning of lines</li>
                <li>Use <code>sed -i</code> carefully to modify files</li>
            </ol>
        </div>
    `;
}

function getAwkContent() {
    return `
        <div class="content-section">
            <h4>What is awk?</h4>
            <p>The <code>awk</code> command is a powerful text processing tool that can analyze and manipulate data. It's like having a mini programming language for text!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Print specific fields</h5>
                <div class="code-block">
                    <code>$ awk '{print $1}' file.txt</code>
                    <div class="output">Prints the first field of each line</div>
                </div>
            </div>
            
            <h5>Working with Columns</h5>
            <div class="example-card">
                <h5>Print multiple fields</h5>
                <div class="code-block">
                    <code>$ awk '{print $1, $3}' file.txt</code>
                    <div class="output">Prints first and third fields</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Custom field separator</h5>
                <div class="code-block">
                    <code>$ awk -F',' '{print $1}' data.csv</code>
                    <div class="output">Uses comma as separator instead of space</div>
                </div>
            </div>
            
            <h5>Conditional Processing</h5>
            <div class="example-card">
                <h5>Filter lines</h5>
                <div class="code-block">
                    <code>$ awk '$3 > 100' data.txt</code>
                    <div class="output">Shows lines where 3rd field is greater than 100</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Pattern matching</h5>
                <div class="code-block">
                    <code>$ awk '/error/' log.txt</code>
                    <div class="output">Shows lines containing "error"</div>
                </div>
            </div>
            
            <h5>Calculations</h5>
            <div class="example-card">
                <h5>Sum a column</h5>
                <div class="code-block">
                    <code>$ awk '{sum += $2} END {print sum}' data.txt</code>
                    <div class="output">Adds up all values in the second column</div>
                </div>
            </div>
            
            <h5>Advanced Examples</h5>
            <div class="example-card">
                <h5>Format output</h5>
                <div class="code-block">
                    <code>$ awk '{printf "Name: %s, Age: %s\\n", $1, $2}' people.txt</code>
                    <div class="output">Formats output nicely</div>
                </div>
            </div>
            
            <h5>Common Use Cases</h5>
            <ul>
                <li><strong>Data Analysis:</strong> <code>awk '{sum+=$2} END {print sum}' sales.txt</code></li>
                <li><strong>Log Processing:</strong> <code>awk '{print $1, $4}' access.log</code></li>
                <li><strong>CSV Processing:</strong> <code>awk -F',' '{print $1, $3}' data.csv</code></li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Create a file with columns and practice printing specific fields</li>
                <li>Try <code>awk '{print $1, $2}'</code> on a test file</li>
                <li>Practice filtering with conditions like <code>awk '$2 > 10'</code></li>
                <li>Work with CSV files using <code>awk -F','</code></li>
            </ol>
        </div>
    `;
}

function getPsContent() {
    return `
        <div class="content-section">
            <h4>What is ps?</h4>
            <p>The <code>ps</code> command shows information about running processes (programs). It's like a snapshot of what's currently happening on your system!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Show all processes</h5>
                <div class="code-block">
                    <code>$ ps aux</code>
                    <div class="output">Shows all running processes with detailed info</div>
                </div>
            </div>
            
            <h5>Common Options</h5>
            <div class="example-card">
                <h5>Show your processes only</h5>
                <div class="code-block">
                    <code>$ ps</code>
                    <div class="output">Shows only processes you started</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Show process tree</h5>
                <div class="code-block">
                    <code>$ ps -ejH</code>
                    <div class="output">Shows processes in a tree structure</div>
                </div>
            </div>
            
            <h5>Understanding Output</h5>
            <div class="example-card">
                <h5>What the columns mean</h5>
                <div class="code-block">
                    <code>USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND</code>
                    <div class="output">
                        <strong>USER:</strong> Who owns the process<br>
                        <strong>PID:</strong> Process ID (unique number)<br>
                        <strong>%CPU:</strong> CPU usage percentage<br>
                        <strong>%MEM:</strong> Memory usage percentage<br>
                        <strong>COMMAND:</strong> What the process is running
                    </div>
                </div>
            </div>
            
            <h5>Useful Examples</h5>
            <div class="example-card">
                <h5>Find specific process</h5>
                <div class="code-block">
                    <code>$ ps aux | grep firefox</code>
                    <div class="output">Shows only Firefox processes</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Show processes by CPU usage</h5>
                <div class="code-block">
                    <code>$ ps aux --sort=-%cpu | head -10</code>
                    <div class="output">Shows top 10 CPU-consuming processes</div>
                </div>
            </div>
            
            <h5>Common Use Cases</h5>
            <ul>
                <li><strong>Troubleshooting:</strong> See what's using resources</li>
                <li><strong>Security:</strong> Check for suspicious processes</li>
                <li><strong>Performance:</strong> Identify resource hogs</li>
                <li><strong>Debugging:</strong> Find crashed programs</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Run <code>ps aux</code> and look at the output</li>
                <li>Try <code>ps aux | grep</code> to find specific processes</li>
                <li>Use <code>ps aux --sort=-%cpu</code> to see CPU usage</li>
                <li>Compare <code>ps</code> vs <code>ps aux</code></li>
            </ol>
        </div>
    `;
}

function getTopContent() {
    return `
        <div class="content-section">
            <h4>What is top?</h4>
            <p>The <code>top</code> command shows real-time system information in an interactive display. It's like a live dashboard for your computer!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Start top</h5>
                <div class="code-block">
                    <code>$ top</code>
                    <div class="output">Shows live system information</div>
                </div>
            </div>
            
            <h5>Understanding the Display</h5>
            <div class="example-card">
                <h5>Top section (system info)</h5>
                <div class="code-block">
                    <code>top - 14:30:15 up 2 days, 3:45, 2 users, load average: 1.23, 1.45, 1.67</code>
                    <div class="output">
                        <strong>14:30:15:</strong> Current time<br>
                        <strong>up 2 days:</strong> System uptime<br>
                        <strong>load average:</strong> System load (1.23 = 123% CPU usage)
                    </div>
                </div>
            </div>
            
            <h5>Interactive Commands</h5>
            <div class="example-card">
                <h5>While top is running</h5>
                <ul>
                    <li><strong>q:</strong> Quit top</li>
                    <li><strong>k:</strong> Kill a process (enter PID)</li>
                    <li><strong>r:</strong> Renice a process (change priority)</li>
                    <li><strong>1:</strong> Show individual CPU cores</li>
                    <li><strong>M:</strong> Sort by memory usage</li>
                    <li><strong>P:</strong> Sort by CPU usage</li>
                </ul>
            </div>
            
            <h5>Useful Options</h5>
            <div class="example-card">
                <h5>One-time snapshot</h5>
                <div class="code-block">
                    <code>$ top -n 1</code>
                    <div class="output">Shows one snapshot and exits</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Update every 2 seconds</h5>
                <div class="code-block">
                    <code>$ top -d 2</code>
                    <div class="output">Updates every 2 seconds instead of 3</div>
                </div>
            </div>
            
            <h5>Alternative: htop</h5>
            <div class="example-card">
                <h5>More user-friendly version</h5>
                <div class="code-block">
                    <code>$ htop</code>
                    <div class="output">Colorful, mouse-friendly version of top</div>
                </div>
            </div>
            
            <h5>Common Use Cases</h5>
            <ul>
                <li><strong>Monitoring:</strong> Watch system performance in real-time</li>
                <li><strong>Troubleshooting:</strong> Identify what's slowing down the system</li>
                <li><strong>Process Management:</strong> Kill or prioritize processes</li>
                <li><strong>Performance Analysis:</strong> Understand resource usage patterns</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Run <code>top</code> and observe the display</li>
                <li>Try pressing different keys while top is running</li>
                <li>Use <code>top -n 1</code> for a quick snapshot</li>
                <li>Install and try <code>htop</code> if available</li>
            </ol>
        </div>
    `;
}

function getDfContent() {
    return `
        <div class="content-section">
            <h4>What is df?</h4>
            <p>The <code>df</code> command shows disk space usage for all mounted filesystems. It's like checking how much storage space you have left!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Show disk usage</h5>
                <div class="code-block">
                    <code>$ df</code>
                    <div class="output">Shows disk space for all filesystems</div>
                </div>
            </div>
            
            <h5>Human-readable Output</h5>
            <div class="example-card">
                <h5>Show sizes in GB/MB</h5>
                <div class="code-block">
                    <code>$ df -h</code>
                    <div class="output">Shows sizes in human-readable format (GB, MB, etc.)</div>
                </div>
            </div>
            
            <h5>Understanding Output</h5>
            <div class="example-card">
                <h5>What the columns mean</h5>
                <div class="code-block">
                    <code>Filesystem      Size  Used Avail Use% Mounted on</code>
                    <div class="output">
                        <strong>Filesystem:</strong> Device name<br>
                        <strong>Size:</strong> Total disk space<br>
                        <strong>Used:</strong> Space currently used<br>
                        <strong>Avail:</strong> Available space<br>
                        <strong>Use%:</strong> Percentage used<br>
                        <strong>Mounted on:</strong> Where the disk is mounted
                    </div>
                </div>
            </div>
            
            <h5>Useful Options</h5>
            <div class="example-card">
                <h5>Show specific filesystem</h5>
                <div class="code-block">
                    <code>$ df -h /home</code>
                    <div class="output">Shows disk usage for /home directory only</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Show inodes (file count)</h5>
                <div class="code-block">
                    <code>$ df -i</code>
                    <div class="output">Shows inode usage instead of disk space</div>
                </div>
            </div>
            
            <h5>Common Filesystems</h5>
            <ul>
                <li><strong>/:</strong> Root filesystem (system files)</li>
                <li><strong>/home:</strong> User home directories</li>
                <li><strong>/var:</strong> Variable data (logs, etc.)</li>
                <li><strong>/tmp:</strong> Temporary files</li>
                <li><strong>/boot:</strong> Boot files</li>
            </ul>
            
            <h5>Warning Signs</h5>
            <div class="example-card">
                <h5>When to worry</h5>
                <ul>
                    <li><strong>Use% > 90%:</strong> Running out of space</li>
                    <li><strong>Use% > 95%:</strong> Critical - system may slow down</li>
                    <li><strong>Use% = 100%:</strong> Full - system may crash</li>
                </ul>
            </div>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Run <code>df -h</code> and examine the output</li>
                <li>Check specific directories: <code>df -h /home</code></li>
                <li>Compare <code>df</code> vs <code>df -h</code></li>
                <li>Try <code>df -i</code> to see inode usage</li>
            </ol>
        </div>
    `;
}

function getFreeContent() {
    return `
        <div class="content-section">
            <h4>What is free?</h4>
            <p>The <code>free</code> command shows memory (RAM) usage information. It's like checking how much memory your computer is using!</p>
            
            <h5>Basic Usage</h5>
            <div class="example-card">
                <h5>Show memory usage</h5>
                <div class="code-block">
                    <code>$ free</code>
                    <div class="output">Shows memory usage in bytes</div>
                </div>
            </div>
            
            <h5>Human-readable Output</h5>
            <div class="example-card">
                <h5>Show sizes in GB/MB</h5>
                <div class="code-block">
                    <code>$ free -h</code>
                    <div class="output">Shows memory in human-readable format</div>
                </div>
            </div>
            
            <h5>Understanding Output</h5>
            <div class="example-card">
                <h5>What the columns mean</h5>
                <div class="code-block">
                    <code>              total        used        free      shared  buff/cache   available</code>
                    <div class="output">
                        <strong>total:</strong> Total RAM installed<br>
                        <strong>used:</strong> Memory currently in use<br>
                        <strong>free:</strong> Completely unused memory<br>
                        <strong>shared:</strong> Memory shared between processes<br>
                        <strong>buff/cache:</strong> Memory used for disk caching<br>
                        <strong>available:</strong> Memory available for new processes
                    </div>
                </div>
            </div>
            
            <h5>Memory Types</h5>
            <div class="example-card">
                <h5>Different memory categories</h5>
                <ul>
                    <li><strong>RAM:</strong> Fast memory for running programs</li>
                    <li><strong>Swap:</strong> Slower disk-based memory backup</li>
                    <li><strong>Cache:</strong> Memory used to speed up disk access</li>
                    <li><strong>Buffer:</strong> Memory used for temporary data</li>
                </ul>
            </div>
            
            <h5>Useful Options</h5>
            <div class="example-card">
                <h5>Show in different units</h5>
                <div class="code-block">
                    <code>$ free -m</code>
                    <div class="output">Shows memory in megabytes</div>
                </div>
                <div class="code-block">
                    <code>$ free -g</code>
                    <div class="output">Shows memory in gigabytes</div>
                </div>
            </div>
            
            <div class="example-card">
                <h5>Show swap information</h5>
                <div class="code-block">
                    <code>$ free -h -t</code>
                    <div class="output">Shows total memory including swap</div>
                </div>
            </div>
            
            <h5>Memory Monitoring</h5>
            <div class="example-card">
                <h5>Watch memory usage</h5>
                <div class="code-block">
                    <code>$ watch -n 1 free -h</code>
                    <div class="output">Updates memory info every second</div>
                </div>
            </div>
            
            <h5>Common Use Cases</h5>
            <ul>
                <li><strong>Performance Monitoring:</strong> Check if system has enough RAM</li>
                <li><strong>Troubleshooting:</strong> Identify memory leaks</li>
                <li><strong>System Planning:</strong> Determine if more RAM is needed</li>
                <li><strong>Application Testing:</strong> See how much memory programs use</li>
            </ul>
        </div>
        
        <div class="practice-section">
            <h4>Practice Exercises</h4>
            <ol>
                <li>Run <code>free -h</code> and examine the output</li>
                <li>Compare <code>free</code> vs <code>free -h</code></li>
                <li>Try <code>free -t</code> to see totals</li>
                <li>Use <code>watch -n 1 free -h</code> to monitor memory</li>
            </ol>
        </div>
    `;
}

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

// Load admin-saved content and override tutorial functions
function loadAdminContent() {
    // Check if we're on the tutorial page
    if (!window.location.pathname.includes('tutorial.html')) {
        return;
    }
    
    // List of all lesson IDs
    const lessonIds = [
        'linux-history', 'distributions', 'package-managers-intro',
        'pwd', 'cd', 'ls', 'tree', 'file', 'stat',
        'mkdir', 'touch', 'rm', 'mv', 'cp', 'find',
        'cat', 'grep', 'sed', 'awk',
        'ps', 'top', 'df', 'free',
        'whoami', 'who', 'sudo', 'chmod',
        'ping', 'netstat', 'ssh', 'wget',
        'cron', 'systemctl', 'journalctl', 'bash-scripting'
    ];
    
    // Override each tutorial function with saved content
    lessonIds.forEach(lessonId => {
        const saved = localStorage.getItem(`lesson_${lessonId}`);
        if (saved) {
            const savedData = JSON.parse(saved);
            const functionName = `get${lessonId.charAt(0).toUpperCase() + lessonId.slice(1)}Content`;
            
            // Create a new function that returns the saved content
            if (window[functionName]) {
                window[functionName] = function() {
                    return savedData.content;
                };
            }
        }
    });
} 