# 🐝 HackHive - Real-Time Collaborative Code Editor

<div align="center">

![HackHive Banner](https://img.shields.io/badge/HackHive-Collaborate%20in%20Real--Time-blueviolet?style=for-the-badge)

**A modern, real-time collaborative coding platform built with the MERN stack**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square)](https://your-deployed-url.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## ✨ Features

### 🚀 Core Functionality
- **Real-Time Collaboration** - Multiple users can code together in the same room simultaneously
- **Language Support** - Syntax highlighting for 50+ programming languages including Python, JavaScript, Java, C++, Go, Rust, and more
- **Synced Language Switching** - When one user changes the language, all collaborators see the update instantly
- **Live Code Execution** - Run code directly in the browser and see output in real-time
- **Member Presence** - See who's currently in the room with live avatars

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Beautiful frosted glass effects with smooth gradients
- **Dark Theme** - Easy on the eyes with purple/blue gradients
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Polished interactions with hover effects and transitions
- **Custom Logo** - CSS-based animated logo with gradient effects

### 🔧 Technical Features
- **Socket.IO Integration** - Low-latency real-time communication
- **CodeMirror Editor** - Professional code editing experience with features like:
  - Line numbers
  - Auto-closing brackets and tags
  - Syntax highlighting
  - Multiple themes
- **Toast Notifications** - User-friendly feedback for all actions
- **Room-Based System** - Create or join rooms with unique IDs
- **Code Persistence** - Code syncs across all connected clients instantly

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Socket.IO Client** - Real-time communication
- **CodeMirror** - Code editor
- **React Hot Toast** - Notifications
- **Bootstrap** - Base styling
- **Custom CSS** - Modern glassmorphism design

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - WebSocket server
- **Axios** - HTTP client
- **Piston API** - Code execution engine (supports 50+ languages)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/HackHive.git
cd HackHive
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Configure environment variables**

Create `server/.env`:
```env
PORT=5001
```

5. **Start the application**

**Terminal 1 - Start Server:**
```bash
cd server
npm start
```

**Terminal 2 - Start Client:**
```bash
cd client
npm start
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 📖 Usage

### Creating a Room
1. Open HackHive in your browser
2. Click **"New Room"** to generate a unique Room ID
3. Enter your username
4. Click **"JOIN"**

### Joining an Existing Room
1. Get the Room ID from your collaborator
2. Enter the Room ID and your username
3. Click **"JOIN"**
4. Start coding together in real-time!

### Changing Language
1. Click the **language dropdown** in the editor
2. Select your desired programming language
3. All room members will see the language change
4. Syntax highlighting updates automatically

### Running Code
1. Write your code in the editor
2. Click **"Run Code"** button
3. View the output in the console panel below
4. Supports 50+ languages via Piston API

---

## 🎨 Screenshots

### Home Page
<div align="center">
<img src="screenshots/home.png" alt="Home Page" width="600"/>
<p><i>Modern login screen with glassmorphism design</i></p>
</div>

### Editor Interface
<div align="center">
<img src="screenshots/editor.png" alt="Editor" width="600"/>
<p><i>Real-time collaborative editor with syntax highlighting</i></p>
</div>

---

## 🌟 Key Highlights

- **Zero Configuration** - No API keys required for core functionality
- **Free to Use** - Completely free with no usage limits
- **Modern Design** - Follows current web design trends
- **Production Ready** - Optimized and tested for deployment
- **Open Source** - MIT licensed, feel free to customize

---

## 🔮 Future Enhancements

- [ ] Chat functionality within rooms
- [ ] Code history and version control
- [ ] File upload and import
- [ ] Multiple file tabs
- [ ] Themes customization
- [ ] Private rooms with password protection
- [ ] Screen sharing
- [ ] Voice chat integration

---

## 📂 Project Structure

```
HackHive/
├── client/                 # React frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── EditorPage.js
│   │   │   ├── EditorPage.css
│   │   │   ├── Editor.js
│   │   │   ├── Client.js
│   │   │   ├── Client.css
│   │   │   ├── Logo.js
│   │   │   └── Logo.css
│   │   ├── Actions.js
│   │   ├── Socket.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── Actions.js
│   ├── index.js
│   ├── .env
│   └── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ujjay Manety**
- GitHub: [@YOUR_USERNAME](https://github.com/ujjay2808)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/ujjay-manety-a70589331/)


---

## 🙏 Acknowledgments

- [Piston API](https://github.com/engineer-man/piston) for free code execution
- [CodeMirror](https://codemirror.net/) for the amazing code editor
- [Socket.IO](https://socket.io/) for real-time capabilities
- The React and Node.js communities

---

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

- Email: ujjaymanety2808@gmail.com

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and ☕

</div>