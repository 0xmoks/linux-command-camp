// Admin Panel JavaScript
let currentLesson = null;
let lessonData = {};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadLessonList();
    initializeEventListeners();
});

// Load the list of lessons
function loadLessonList() {
    const lessonList = document.getElementById('lessonList');
    const lessons = [
        // Introduction Section
        { id: 'linux-history', name: 'Linux History & Philosophy', section: 'Introduction' },
        { id: 'distributions', name: 'Linux Distributions', section: 'Introduction' },
        { id: 'package-managers-intro', name: 'Package Managers Overview', section: 'Introduction' },
        
        // Navigation Section
        { id: 'pwd', name: 'pwd - Print Working Directory', section: 'Navigation' },
        { id: 'cd', name: 'cd - Change Directory', section: 'Navigation' },
        { id: 'ls', name: 'ls - List Directory Contents', section: 'Navigation' },
        { id: 'tree', name: 'tree - Display Directory Tree', section: 'Navigation' },
        { id: 'file', name: 'file - Determine File Type', section: 'Navigation' },
        { id: 'stat', name: 'stat - File Status', section: 'Navigation' },
        
        // File Operations Section
        { id: 'mkdir', name: 'mkdir - Make Directory', section: 'File Operations' },
        { id: 'touch', name: 'touch - Create/Update Files', section: 'File Operations' },
        { id: 'rm', name: 'rm - Remove Files', section: 'File Operations' },
        { id: 'mv', name: 'mv - Move/Rename Files', section: 'File Operations' },
        { id: 'cp', name: 'cp - Copy Files', section: 'File Operations' },
        { id: 'find', name: 'find - Search Files', section: 'File Operations' },
        
        // Text Processing Section
        { id: 'cat', name: 'cat - Display File Contents', section: 'Text Processing' },
        { id: 'grep', name: 'grep - Search Text Patterns', section: 'Text Processing' },
        { id: 'sed', name: 'sed - Stream Editor', section: 'Text Processing' },
        { id: 'awk', name: 'awk - Text Processing', section: 'Text Processing' },
        
        // System Information Section
        { id: 'ps', name: 'ps - Process Status', section: 'System Information' },
        { id: 'top', name: 'top - System Monitor', section: 'System Information' },
        { id: 'df', name: 'df - Disk Space', section: 'System Information' },
        { id: 'free', name: 'free - Memory Usage', section: 'System Information' },
        
        // User Management Section
        { id: 'whoami', name: 'whoami - Current User', section: 'User Management' },
        { id: 'who', name: 'who - Logged In Users', section: 'User Management' },
        { id: 'sudo', name: 'sudo - Superuser Access', section: 'User Management' },
        { id: 'chmod', name: 'chmod - Change Permissions', section: 'User Management' },
        
        // Network Commands Section
        { id: 'ping', name: 'ping - Network Connectivity', section: 'Network Commands' },
        { id: 'netstat', name: 'netstat - Network Statistics', section: 'Network Commands' },
        { id: 'ssh', name: 'ssh - Secure Shell', section: 'Network Commands' },
        { id: 'wget', name: 'wget - Download Files', section: 'Network Commands' },
        
        // Advanced Topics Section
        { id: 'cron', name: 'cron - Scheduled Tasks', section: 'Advanced Topics' },
        { id: 'systemctl', name: 'systemctl - Service Management', section: 'Advanced Topics' },
        { id: 'journalctl', name: 'journalctl - System Logs', section: 'Advanced Topics' },
        { id: 'bash-scripting', name: 'Bash Scripting Basics', section: 'Advanced Topics' }
    ];

    // Group lessons by section
    const sections = {};
    lessons.forEach(lesson => {
        if (!sections[lesson.section]) {
            sections[lesson.section] = [];
        }
        sections[lesson.section].push(lesson);
    });

    // Build the lesson list HTML
    let html = '';
    Object.keys(sections).forEach(sectionName => {
        html += `<div class="section-group">
            <div class="section-title">${sectionName}</div>
            <ul class="lesson-list">`;
        
        sections[sectionName].forEach(lesson => {
            html += `<li class="lesson-item" data-lesson="${lesson.id}">
                <i class="fas fa-edit"></i> ${lesson.name}
            </li>`;
        });
        
        html += `</ul></div>`;
    });

    lessonList.innerHTML = html;
}

// Initialize event listeners
function initializeEventListeners() {
    // Lesson selection
    document.addEventListener('click', function(e) {
        if (e.target.closest('.lesson-item')) {
            const lessonItem = e.target.closest('.lesson-item');
            const lessonId = lessonItem.getAttribute('data-lesson');
            selectLesson(lessonId);
        }
    });

    // Save button
    document.getElementById('saveBtn').addEventListener('click', saveLesson);
}

// Select a lesson to edit
function selectLesson(lessonId) {
    currentLesson = lessonId;
    
    // Update active state
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-lesson="${lessonId}"]`).classList.add('active');
    
    // Load lesson data
    loadLessonData(lessonId);
}

// Load lesson data for editing
function loadLessonData(lessonId) {
    // Get the current content from the tutorial functions
    let content = '';
    let youtubeUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Default placeholder
    
    // Try to get content from existing functions
    const contentFunction = window[`get${lessonId.charAt(0).toUpperCase() + lessonId.slice(1)}Content`];
    if (contentFunction) {
        content = contentFunction();
    }
    
    // Store lesson data
    lessonData[lessonId] = {
        content: content,
        youtubeUrl: youtubeUrl
    };
    
    // Display editor
    displayEditor(lessonId);
}

// Display the editor for a lesson
function displayEditor(lessonId) {
    const editorTitle = document.getElementById('editorTitle');
    const editorContent = document.getElementById('editorContent');
    const saveBtn = document.getElementById('saveBtn');
    
    // Update title
    const lessonName = document.querySelector(`[data-lesson="${lessonId}"]`).textContent.trim();
    editorTitle.textContent = `Editing: ${lessonName}`;
    
    // Show save button
    saveBtn.style.display = 'block';
    
    // Create editor form
    const data = lessonData[lessonId];
    editorContent.innerHTML = `
        <div class="form-group">
            <label class="form-label" for="youtubeUrl">
                <i class="fab fa-youtube"></i> YouTube Video URL
            </label>
            <input type="text" id="youtubeUrl" class="form-input" 
                   value="${data.youtubeUrl}" 
                   placeholder="https://www.youtube.com/embed/VIDEO_ID">
            <div class="youtube-preview">
                <h4>Video Preview:</h4>
                <iframe class="youtube-embed" 
                        src="${data.youtubeUrl}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label" for="lessonContent">
                <i class="fas fa-file-alt"></i> Lesson Content (HTML)
            </label>
            <textarea id="lessonContent" class="form-input form-textarea" 
                      placeholder="Enter the lesson content in HTML format...">${data.content}</textarea>
        </div>
        
        <div class="form-group">
            <label class="form-label">
                <i class="fas fa-info-circle"></i> Content Preview
            </label>
            <div id="contentPreview" style="background: #333; padding: 1rem; border-radius: 8px; border: 1px solid #555; color: #ffffff;">
                ${data.content}
            </div>
        </div>
    `;
    
    // Add event listeners for live preview
    const youtubeInput = document.getElementById('youtubeUrl');
    const contentInput = document.getElementById('lessonContent');
    const preview = document.getElementById('contentPreview');
    const iframe = document.querySelector('.youtube-embed');
    
    youtubeInput.addEventListener('input', function() {
        iframe.src = this.value;
        data.youtubeUrl = this.value;
    });
    
    contentInput.addEventListener('input', function() {
        preview.innerHTML = this.value;
        data.content = this.value;
    });
}

// Save lesson data
function saveLesson() {
    if (!currentLesson) return;
    
    const youtubeInput = document.getElementById('youtubeUrl');
    const contentInput = document.getElementById('lessonContent');
    
    // Update lesson data
    lessonData[currentLesson] = {
        youtubeUrl: youtubeInput.value,
        content: contentInput.value
    };
    
    // Show success message
    showStatus('Changes saved successfully!', 'success');
    
    // In a real application, you would save this to a database or file
    console.log('Saving lesson data:', lessonData[currentLesson]);
    
    // For now, we'll store in localStorage as a demo
    localStorage.setItem(`lesson_${currentLesson}`, JSON.stringify(lessonData[currentLesson]));
}

// Show status message
function showStatus(message, type) {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.textContent = message;
    statusDiv.className = `status-message status-${type}`;
    statusDiv.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

// Load saved data from localStorage (for demo purposes)
function loadSavedData() {
    Object.keys(lessonData).forEach(lessonId => {
        const saved = localStorage.getItem(`lesson_${lessonId}`);
        if (saved) {
            lessonData[lessonId] = JSON.parse(saved);
        }
    });
}

// Export lesson data (for backup/transfer)
function exportLessonData() {
    const dataStr = JSON.stringify(lessonData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'command-camp-lessons.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Import lesson data
function importLessonData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            Object.assign(lessonData, importedData);
            showStatus('Lesson data imported successfully!', 'success');
        } catch (error) {
            showStatus('Error importing data: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}

// Add export/import buttons to the admin panel
document.addEventListener('DOMContentLoaded', function() {
    const adminHeader = document.querySelector('.admin-header');
    const exportBtn = document.createElement('button');
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Data';
    exportBtn.className = 'save-btn';
    exportBtn.style.marginLeft = '1rem';
    exportBtn.onclick = exportLessonData;
    
    const importBtn = document.createElement('button');
    importBtn.innerHTML = '<i class="fas fa-upload"></i> Import Data';
    importBtn.className = 'save-btn';
    importBtn.style.marginLeft = '1rem';
    importBtn.onclick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => importLessonData(e.target.files[0]);
        input.click();
    };
    
    adminHeader.appendChild(exportBtn);
    adminHeader.appendChild(importBtn);
}); 