# Portfolio Website Template

A modern, fast, and customizable portfolio website built with React. **Feel free to fork, customize, and use this for your own portfolio!** 🚀

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://portfolio-atikhasan.netlify.app/)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## Preview: 
![portfolio banner](https://raw.githubusercontent.com/AtikHasan16/GitHub-banner/refs/heads/main/portfolio-atikhasan.netlify.app_.png)

## ✨ Why Use This Template?

- 🎨 **Modern Design** - Clean, professional dark theme
- ⚡ **Lightning Fast** - Optimized for performance (90+ Lighthouse score)
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎭 **Smooth Animations** - Framer Motion page transitions
- 🎯 **Easy to Customize** - Well-organized code, simple to modify
- � **Production Ready** - Deploy to Netlify/Vercel in minutes

## 🎯 Features

- Fixed navbar with blur effect on scroll
- Smooth page transitions
- Active route highlighting
- Project showcase with live links
- Skills categorization
- Professional about page
- Mobile-responsive design

## � Quick Start

```bash
# Clone this repo
git clone https://github.com/AtikHasan16/Portfolio-me.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` and you're ready to go! 🎉

## 🎨 Customize for Your Portfolio

### 1. Update Your Information

**`public/projects.json`** - Add your projects

```json
{
  "id": 1,
  "title": "Your Project Name",
  "image": "project-image.png",
  "techStack": ["React", "Node.js"],
  "liveLink": "https://your-project.com",
  "repoLink": "https://github.com/you/project"
}
```

**`src/Pages/About.jsx`** - Update your bio, education, skills

**`src/Components/Hero.jsx`** - Change name, title, social links

**`src/Components/Skills.jsx`** - Add your skills

### 2. Customize Styling

- **Colors**: Modify `tailwind.config.js` or use DaisyUI themes
- **Fonts**: Update in `src/index.css`
- **Animations**: Adjust in `src/Components/PageTransition.jsx`

### 3. Deploy

```bash
npm run build
```

Deploy the `dist/` folder to:

- **Netlify**: Drag & drop or connect GitHub
- **Vercel**: Import your GitHub repo
- **GitHub Pages**: Push to `gh-pages` branch

## 🛠️ Tech Stack

- **React 19** - UI library
- **React Router 7** - Routing
- **Framer Motion** - Animations
- **Tailwind CSS 4** - Styling
- **DaisyUI** - Components
- **Vite** - Build tool

## 📁 Project Structure

```
src/
├── Components/      # Reusable components
├── Pages/          # Route pages (Home, Works, About, Contacts)
├── Layouts/        # Layout wrapper
└── Router/         # Route configuration
```

## 📜 Available Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

## 💡 Tips for Customization

1. **Replace project images** in `public/` folder
2. **Update social links** in Hero and About components
3. **Modify color scheme** in Tailwind config (primary color is cyan by default)
4. **Add more pages** by creating new components in `Pages/` and adding routes
5. **Change animations** by adjusting Framer Motion settings

## 🤝 Contributing & Using This Template

**This template is free to use!** You can:

- ✅ Fork and customize for your portfolio
- ✅ Use it for personal or commercial projects
- ✅ Modify and redistribute
- ✅ Learn from the code

**Just give credit if you found it helpful!** ⭐

If you make improvements, feel free to submit a PR to help others!

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👤 Original Author

**MD Atik Hasan**

- Portfolio: [portfolio-atikhasan.netlify.app](https://portfolio-atikhasan.netlify.app/)
- GitHub: [@AtikHasan16](https://github.com/AtikHasan16)
- LinkedIn: [MD Atik Hasan](https://www.linkedin.com/in/md-atik-hasan-a4b1b5335/)

## 🙏 Acknowledgments

Built with amazing open-source tools:

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

### 🌟 If this helped you, please star the repo!

**Questions?** Open an issue or reach out!

Made with ❤️ - Free to use for your portfolio
