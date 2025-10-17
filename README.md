# NextCode - Student Coding Club Platform

A modern, full-stack web application for managing a student coding club community. Built with Next.js, TypeORM, PostgreSQL, and Tailwind CSS.

## 🌟 Features

### Public Pages

- **Landing Page**: Beautiful homepage with banner, about section, stats, activities, committee showcase, and testimonials
- **Events Page**: Display of upcoming and past events with simplified registration (email-only for existing students)
- **Our Talent Page**: Showcase of approved club members with filtering and search
- **Join Page**: Student registration form with skill selection
- **Leaderboard**: Community rankings based on participation and contributions

### Admin Dashboard

- **Student Management**: Approve/reject student applications, view member details
- **Event Management**: Create, edit, and delete events (upcoming/past)
- **Event Registrations**: Manage event registrations, approve/reject applications
- **Committee Management**: Add, edit, and remove committee members
- **Testimonials Management**: Add, edit, and manage student testimonials
- **Real-time Stats**: Overview of total students, events, registrations, committee members, and testimonials

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **UI Components**: ShadCN UI with Lucide React icons
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with TypeORM
- **Styling**: Tailwind CSS with custom gradients and animations
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nextcode
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/nextcode
   ```

4. **Set up the database**
   The application will automatically create tables using TypeORM's synchronize feature (development only).

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nextcode/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── students/      # Student CRUD operations
│   │   │   ├── events/        # Event CRUD operations
│   │   │   ├── committee/     # Committee CRUD operations
│   │   │   ├── testimonials/  # Testimonial CRUD operations
│   │   │   └── event-registrations/ # Event registration CRUD operations
│   │   ├── admin/             # Admin dashboard
│   │   ├── events/            # Events page
│   │   ├── join/              # Club membership registration page
│   │   ├── register/          # Event registration pages
│   │   ├── leaderboard/       # Leaderboard page
│   │   ├── talent/            # Our talent page
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Landing page
│   ├── components/            # Reusable components
│   │   ├── ui/                # ShadCN UI components
│   │   ├── Banner.jsx         # Hero banner
│   │   ├── About.jsx          # About section
│   │   ├── Committee.jsx      # Committee showcase
│   │   ├── EventRegistrationForm.jsx # Smart event registration form with auto-fill, gender and roll number
│   │   ├── Footer.jsx         # Site footer
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Testimonials.jsx   # Student testimonials
│   │   └── WhatWeDo.jsx       # Activities section
│   └── lib/                   # Utility functions
│       ├── entities/          # TypeORM entities
│       │   ├── Student.js     # Student model
│       │   ├── Event.js       # Event model
│       │   ├── Committee.js   # Committee model
│       │   ├── Testimonial.js # Testimonial model
│       │   └── EventRegistration.js # Event registration model
│       ├── database.js        # Database connection
│       └── utils.js           # Utility functions
├── public/                    # Static assets
├── components.json            # ShadCN UI configuration
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
```

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional design with ShadCN UI components
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, Open Graph, and structured data

## 🔧 API Endpoints

### Students

- `GET /api/students` - Get all students
- `GET /api/students?approved=true` - Get approved students only
- `POST /api/students` - Create new student
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

### Events

- `GET /api/events` - Get all events
- `GET /api/events?upcoming=true` - Get upcoming events
- `POST /api/events` - Create new event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Committee

- `GET /api/committee` - Get all committee members
- `POST /api/committee` - Add committee member
- `PUT /api/committee/[id]` - Update committee member
- `DELETE /api/committee/[id]` - Remove committee member

### Testimonials

- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials?active=true` - Get active testimonials only
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials/[id]` - Update testimonial
- `DELETE /api/testimonials/[id]` - Delete testimonial

### Event Registrations

- `GET /api/event-registrations` - Get all event registrations
- `GET /api/event-registrations?eventId=1` - Get registrations for specific event
- `GET /api/event-registrations?studentId=1` - Get registrations for specific student
- `GET /api/event-registrations?status=pending` - Get registrations by status
- `POST /api/event-registrations` - Create new event registration
- `PUT /api/event-registrations/[id]` - Update registration status
- `DELETE /api/event-registrations/[id]` - Delete registration

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `DATABASE_URL` environment variable
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you have any questions or need help, please:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Email notifications for event updates
- [ ] File upload for profile pictures
- [ ] Advanced search and filtering
- [ ] Mobile app (React Native)
- [ ] Integration with external calendar systems
- [ ] Analytics dashboard
- [ ] Multi-language support

---

Built with ❤️ by the NextCode team
