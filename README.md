# Ecommercify

A modern, open-source e-commerce platform with a beautiful user interface and comprehensive admin dashboard.

## Features

### Customer Facing
- Product browsing with search and filtering
- Clean, modern UI with glass morphism effects
- Shopping cart and checkout flow
- Secure payment processing (Stripe/PayPal)
- Order tracking

### Admin Dashboard
- Product management (CRUD operations)
- Order management
- Analytics dashboard
- User management

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js (Express) API
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payment**: Stripe/PayPal integration

## Project Structure

```
/ecommercify
  /apps
    /web      # Next.js (user-facing)
    /admin    # Next.js (admin dashboard)
    /api      # Node.js Express API
  /prisma     # Prisma schema, migrations
  /packages
    /ui       # Shared React UI components
  /config     # Shared config, types
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v10+)
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommercify.git
cd ecommercify
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Copy the example env files in each app directory and update them with your settings.

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Start development servers
```bash
# Run everything
npm run dev

# Or run specific apps
npm run web    # Customer site
npm run admin  # Admin dashboard
npm run api    # API server
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 