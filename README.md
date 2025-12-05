# Portfolio Website - MD Atik Hasan

A modern, responsive portfolio website built with React, featuring smooth animations, dynamic routing, and a professional design aesthetic.

![Portfolio Preview](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Features

- **Smooth Page Transitions** - Fluid animations using Framer Motion
- **Fixed Navbar** - Sticky navigation with blur effect on scroll
- **Active Route Highlighting** - Visual feedback for current page
- **Responsive Design** - Mobile-first approach with breakpoints
- **Dark Theme** - Modern dark mode with cyan accent colors
- **Project Showcase** - Dynamic project cards with live links
- **Skills Display** - Categorized technical skills
- **Professional About Page** - Resume-style layout with contact info
- **Performance Optimized** - Fast load times and smooth scrolling

## 🚀 Live Demo

[View Live Portfolio](https://portfolio-atikhasan.netlify.app/) <!-- Add your deployed URL -->

## 📸 Screenshots

<!-- Add screenshots of your portfolio -->

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0** - UI library
- **React Router 7.10.1** - Client-side routing
- **Framer Motion 12.23.25** - Animation library
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **DaisyUI 5.5.8** - Tailwind CSS component library

### Build Tools

- **Vite 7.2.4** - Fast build tool and dev server
- **ESLint** - Code linting

### Additional Libraries

- **React Icons 5.5.0** - Icon library
- **Fira Code Font** - Monospace font for code aesthetics
- **jsPDF 3.0.4** - PDF generation (for resume download)

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── projects.json          # Project data
│   └── ...                    # Static assets
├── src/
│   ├── Components/            # Reusable components
│   │   ├── Navbar.jsx        # Fixed navigation bar
│   │   ├── Hero.jsx          # Landing section
│   │   ├── Projects.jsx      # Projects section
│   │   ├── ProjectCard.jsx   # Individual project card
│   │   ├── Skills.jsx        # Skills display
│   │   ├── AboutMe.jsx       # About section
│   │   ├── Footer.jsx        # Footer component
│   │   └── PageTransition.jsx # Animation wrapper
│   ├── Pages/                 # Route pages
│   │   ├── Home.jsx          # Landing page
│   │   ├── Works.jsx         # Projects page
│   │   ├── About.jsx         # About page
│   │   └── Contacts.jsx      # Contacts page
│   ├── Layouts/
│   │   └── RootLayout.jsx    # Main layout wrapper
│   ├── Router/
│   │   └── router.jsx        # Route configuration
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/AtikHasan16/Portfolio-me.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🎨 Customization

### Update Personal Information

1. **Projects Data** - Edit `public/projects.json`

   ```json
   {
     "id": 1,
     "title": "Your Project",
     "image": "project-image.png",
     "techStack": ["React", "Node.js"],
     "liveLink": "https://...",
     "repoLink": "https://..."
   }
   ```

2. **About Page** - Edit `src/Pages/About.jsx`

   - Update name, title, contact info
   - Modify education, skills, experience

3. **Skills** - Edit `src/Components/Skills.jsx`

   - Add/remove skill categories
   - Update skill items

4. **Hero Section** - Edit `src/Components/Hero.jsx`
   - Change tagline and description
   - Update social links

### Styling

- **Colors** - Modify Tailwind config or use DaisyUI themes
- **Fonts** - Update in `index.css` or import new fonts
- **Animations** - Adjust in `PageTransition.jsx`

## 🎯 Key Features Explained

### Page Transitions

Smooth fade and slide animations using Framer Motion:

- 0.4s duration for snappy feel
- GPU-accelerated transforms
- Custom easing curve

### Fixed Navbar

- Stays at top during scroll
- Blur effect with dark background on scroll
- Active route highlighting
- Responsive mobile menu

### Performance Optimization

- Code splitting per route
- Lazy loading of pages
- Optimized animations (GPU-accelerated)
- Minimal JavaScript execution
- Tailwind JIT for small CSS bundle

## 🌐 Deployment

### Netlify

```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Vercel

```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

### GitHub Pages

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 📝 Environment Variables

No environment variables required for basic setup. Add `.env` file if integrating external APIs:

```env
VITE_API_URL=your_api_url
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**MD Atik Hasan**

- GitHub: [@AtikHasan16](https://github.com/AtikHasan16)
- LinkedIn: [MD Atik Hasan](https://www.linkedin.com/in/md-atik-hasan-a4b1b5335/)
- Email: mhasan16atik@gmail.com

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## 📊 Performance

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 90+
- **Bundle Size**: Optimized with code splitting

## 🐛 Known Issues

None at the moment. Please report issues on the [GitHub Issues](https://github.com/AtikHasan16/Portfolio-me/issues) page.

## 🔮 Future Enhancements

- [ ] Blog section
- [ ] Contact form with backend
- [ ] Dark/Light theme toggle
- [ ] More project filters
- [ ] Testimonials section
- [ ] Analytics integration

---

⭐ **Star this repo if you found it helpful!**

Made with ❤️ by MD Atik Hasan
