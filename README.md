# Command Camp - Linux Commands Tutorial Website

A modern, interactive website for learning Linux commands through a structured 9-section training program. Built for GitHub Pages hosting with video tutorials and an interactive terminal simulator.

## 🌟 Features

- **9 Training Sections** - Structured learning path covering all essential Linux command categories
- **Interactive Terminal Simulator** - Practice Linux commands in a realistic terminal environment
- **Video Tutorials** - YouTube integration for step-by-step learning
- **Command Reference** - Comprehensive list of essential Linux commands
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Theme** - Modern dark theme with beautiful gradients
- **Search Functionality** - Quick search through commands
- **Copy to Clipboard** - One-click command copying
- **Smooth Animations** - Beautiful scroll animations and transitions

## 🚀 Live Demo

Visit the website: [Your GitHub Pages URL]

## 🏕️ Camp Training Sections

Command Camp is organized into 9 comprehensive training sections:

1. **🧭 Navigation Basics** - `pwd`, `cd`, `ls`, `tree`, `file`, `stat`
2. **📁 File & Directory Operations** - `mkdir`, `touch`, `rm`, `mv`, `cp`, `rmdir`, `find`
3. **🔎 Searching & Filtering** - `grep`, `awk`, `cut`, `sed`, `head`, `tail`, `less`, `more`
4. **🧪 Piping & Redirection** - `|`, `>`, `>>`, `<`, `tee`, `xargs`
5. **🧰 Package Managers** - `apt`, `dnf`, `pacman`, `yay`, `flatpak`, `snap`
6. **🧑‍💻 User & Permissions** - `chmod`, `chown`, `id`, `groups`, `su`, `sudo`
7. **📊 Monitoring Tools** - `top`, `htop`, `ps`, `df`, `du`, `free`, `uptime`
8. **📦 Archives & Compression** - `tar`, `gzip`, `bzip2`, `xz`, `zip`, `unzip`
9. **🔐 Networking & Security** - `ping`, `netstat`, `ss`, `curl`, `wget`, `nmap`

## 📁 Project Structure

```
command-camp/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── .github/workflows/  # GitHub Pages deployment
│   └── deploy.yml
└── README.md          # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Inter font family
- **YouTube Embed** - Video tutorials

## 🎨 Design Features

- **Dark Theme** - Easy on the eyes with a modern aesthetic
- **Terminal Aesthetic** - Realistic terminal styling
- **Gradient Accents** - Beautiful color gradients
- **Hover Effects** - Interactive elements with smooth transitions
- **Mobile-First** - Responsive design that works on all devices

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Interactive Features

### Terminal Simulator
- Realistic command-line interface
- Predefined command responses
- Support for common Linux commands
- Clear terminal functionality
- Help system

### Command Reference
- Categorized commands (File Management, Search & Text, System Info, User Management)
- Click-to-copy functionality
- Search and filter commands
- Hover effects

### Video Tutorials
- YouTube video integration
- Difficulty levels (Beginner, Intermediate, Advanced)
- Duration indicators
- Responsive video containers

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- GitHub account (for hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/command-camp.git
   cd command-camp
   ```

2. **Open in browser**
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Or simply open index.html in your browser
   ```

3. **Deploy to GitHub Pages**
   - Push to GitHub repository
   - Go to Settings > Pages
   - Select source branch (usually `main`)
   - Your site will be available at `https://yourusername.github.io/command-camp`

## 📝 Customization

### Adding New Commands
Edit the `commandResponses` object in `script.js`:

```javascript
const commandResponses = {
    'yourcommand': 'Your command response',
    // ... existing commands
};
```

### Adding Video Tutorials
Update the tutorial cards in `index.html`:

```html
<div class="tutorial-card">
    <div class="video-container">
        <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"></iframe>
    </div>
    <div class="tutorial-content">
        <h3>Your Tutorial Title</h3>
        <p>Description of the tutorial</p>
        <div class="tutorial-meta">
            <span class="duration"><i class="fas fa-clock"></i> 15:30</span>
            <span class="difficulty beginner">Beginner</span>
        </div>
    </div>
</div>
```

### Changing Colors
Update CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00d4aa;    /* Main accent color */
    --secondary-color: #1a1a1a;  /* Secondary background */
    --accent-color: #ff6b35;     /* Accent color */
    /* ... other variables */
}
```

## 🎮 Interactive Terminal Commands

The terminal simulator supports these commands:

| Command | Description | Response |
|---------|-------------|----------|
| `ls` | List directory contents | Shows sample files and folders |
| `pwd` | Print working directory | `/home/user` |
| `whoami` | Show current user | `user` |
| `date` | Show current date/time | Current date and time |
| `clear` | Clear terminal | Clears the terminal |
| `help` | Show help | Lists available commands |
| `ps` | Process status | Shows sample processes |
| `df` | Disk space usage | Shows sample disk usage |
| `free` | Memory usage | Shows sample memory info |

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Contact: [Your Email]

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [YouTube](https://www.youtube.com/) for video hosting
- The Linux community for inspiration

## 📈 Future Enhancements

- [ ] Add more interactive tutorials
- [ ] Implement command history in terminal
- [ ] Add syntax highlighting for commands
- [ ] Create downloadable command cheat sheets
- [ ] Add user progress tracking
- [ ] Implement dark/light theme toggle
- [ ] Add command categories and filtering
- [ ] Create mobile app version

---

**Built with ❤️ for the Linux community at Command Camp** 