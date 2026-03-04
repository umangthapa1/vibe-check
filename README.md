# Vibe Check

A stylish portfolio timeline built with Next.js 15, React 19, Tailwind CSS, and Framer Motion. Display your career journey, projects, and achievements in a visually engaging timeline format.

![Vibe Check Preview](https://via.placeholder.com/800x400?text=Vibe+Check+Preview)

## Features

- 📅 **Timeline Display** - Showcase your career journey chronologically
- 🎨 **Beautiful Animations** - Smooth transitions using Framer Motion
- 📱 **Responsive Design** - Works great on mobile and desktop
- 🔗 **One-Click Copy** - Copy your vibe.json profile with a single click
- 🏷️ **Category Badges** - Organize entries with color-coded categories
- 💡 **Live Status** - Show your availability for collaborations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/umangthapa1/vibe-check.git
cd vibe-check

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Configuration

Edit [`public/vibe.json`](public/vibe.json) to customize your profile:

```json
{
  "name": "Your Name",
  "role": "Your Role",
  "bio": "Your bio here",
  "status": "open for collaborations",
  "timeline": [
    {
      "id": "1",
      "title": "Your Achievement",
      "date": "2024-01",
      "description": "What you did",
      "category": "work"
    }
  ]
}
```

### Available Categories

- `work` - Work experience
- `project` - Personal projects
- `education` - Education background
- `community` - Open source/communities

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

```
vibe-check/
├── public/
│   └── vibe.json          # Your profile data
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   └── vibe-timeline/ # Timeline components
│   └── types/
│       └── vibe.ts        # TypeScript types
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## License

MIT

---

Built with ❤️ using Next.js
