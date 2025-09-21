# 🍭 Sweet Management System

A full-stack e-commerce application for managing a sweet shop with modern React frontend and Spring Boot backend.

## 🌟 Features

### Frontend Features
- **Modern UI/UX**: Beautiful, responsive design with gradient backgrounds and smooth animations
- **User Authentication**: Secure login and registration with JWT tokens
- **Product Catalog**: Browse sweets with categories, pricing, and stock information
- **Shopping Cart**: Add items to cart with quantity management and persistent storage
- **Quick Add**: One-click quantity selection (+1, +2, +3)
- **Real-time Feedback**: Success messages and loading states
- **Search & Filter**: Find sweets by name, category, and price range
- **Admin Panel**: Manage products (add, edit, delete) for admin users
- **Order Management**: View order history and track purchases
- **Profile Management**: Update user information and preferences

### Backend Features
- **RESTful API**: Clean API endpoints for all operations
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: User and Admin roles with different permissions
- **Database Integration**: PostgreSQL with JPA/Hibernate
- **Product Management**: CRUD operations for sweets inventory
- **Order Processing**: Handle purchases and inventory updates
- **Security**: Spring Security with CORS configuration

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Vitest** - Testing framework
- **MSW** - API mocking for tests

### Backend
- **Spring Boot 3.5.6** - Java framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **Hibernate** - ORM framework
- **PostgreSQL** - Database
- **JWT** - Token-based authentication
- **Maven** - Build tool

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Java** (v17 or higher)
- **PostgreSQL** (v12 or higher)
- **Maven** (or use Maven wrapper)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sweet_management
   ```

2. **Backend Setup**
   ```bash
   cd sweet_shop
   # Configure database connection in src/main/resources/application.properties
   ./mvnw spring-boot:run
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api

### Test Credentials
For testing purposes, you can use these pre-configured credentials:
- **Username**: `alice`
- **Password**: `Secret123!`

## 📁 Project Structure

```
sweet_management/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Cart.tsx     # Shopping cart modal
│   │   │   ├── Header.tsx   # Navigation header
│   │   │   ├── SweetCard.tsx # Product card component
│   │   │   └── ProtectedRoute.tsx # Route protection
│   │   ├── context/         # React contexts
│   │   │   ├── AuthContext.tsx # Authentication state
│   │   │   └── CartContext.tsx # Shopping cart state
│   │   ├── pages/           # Page components
│   │   │   ├── LoginPage.tsx # User login
│   │   │   ├── RegisterPage.tsx # User registration
│   │   │   ├── DashboardPage.tsx # Product catalog
│   │   │   ├── AdminPage.tsx # Admin panel
│   │   │   ├── ProfilePage.tsx # User profile
│   │   │   └── OrdersPage.tsx # Order history
│   │   ├── lib/             # Utilities
│   │   │   └── api.ts       # API client configuration
│   │   └── types/           # TypeScript type definitions
│   ├── package.json
│   └── vite.config.ts
└── sweet_shop/              # Spring Boot backend
    ├── src/main/java/com/project/sweet_shop/
    │   ├── controller/      # REST controllers
    │   ├── model/           # Entity models
    │   ├── repository/      # Data repositories
    │   ├── service/         # Business logic
    │   ├── security/        # Security configuration
    │   └── dto/            # Data transfer objects
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

## 🔧 Configuration

### Database Configuration
Update `sweet_shop/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sweet_shop
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### Frontend Configuration
The frontend automatically proxies API requests to `http://localhost:8080/api` as configured in `vite.config.ts`.

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets with filters
- `POST /api/sweets` - Create new sweet (Admin only)
- `PUT /api/sweets/{id}` - Update sweet (Admin only)
- `DELETE /api/sweets/{id}` - Delete sweet (Admin only)
- `POST /api/sweets/{id}/purchase` - Purchase sweet

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd sweet_shop
./mvnw test
```

## 🎨 UI/UX Features

### Modern Design Elements
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Card-based Layout**: Clean, modern card designs
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Visual feedback during operations
- **Success Messages**: Confirmation overlays for actions

### Enhanced Add to Cart Experience
- **Visual Feedback**: Success overlay when items are added
- **Loading States**: Spinner animations during operations
- **Quick Add Buttons**: One-click quantity selection (+1, +2, +3)
- **Hover Effects**: Interactive button animations
- **Cart Counter**: Real-time cart item count
- **Persistent Storage**: Cart persists across browser sessions

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Role-based Access Control**: Different permissions for users and admins
- **CORS Configuration**: Proper cross-origin resource sharing
- **Password Hashing**: BCrypt password encryption
- **Protected Routes**: Authentication required for sensitive operations

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd sweet_shop
./mvnw clean package
# Deploy target/sweet_shop-0.0.1-SNAPSHOT.jar
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🤖 My AI Usage

### AI Tools Used
- **Claude (Anthropic)** - Primary AI assistant for code generation and debugging
- **GitHub Copilot** - Code completion and suggestions during development

### How AI Was Used

#### **Backend Development**
- **API Endpoint Generation**: Used Claude to generate initial boilerplate for Spring Boot controllers and services
- **Security Configuration**: AI assistance in setting up Spring Security with JWT authentication
- **Database Schema Design**: Generated JPA entity models and repository interfaces
- **Error Handling**: AI helped implement comprehensive error handling and validation logic

#### **Frontend Development**
- **React Component Structure**: Used Claude to generate modern React components with TypeScript
- **State Management**: AI assistance in implementing React Context for authentication and cart management
- **UI/UX Design**: Generated modern CSS styling with gradients, animations, and responsive design
- **Form Validation**: Implemented real-time validation using React Hook Form with AI guidance

#### **Testing & Quality Assurance**
- **Test Case Generation**: Used AI to generate comprehensive test suites for both frontend and backend
- **Mock Service Worker Setup**: AI assistance in configuring MSW for API mocking in tests
- **Linter Error Resolution**: Used AI to identify and fix TypeScript and ESLint errors

#### **Documentation & Project Setup**
- **README Generation**: AI helped create comprehensive project documentation
- **Build Configuration**: Assistance with Vite, Maven, and other build tool configurations
- **Dependency Management**: AI guidance on package selection and version compatibility

### Impact on Workflow

#### **Positive Impacts**
- **Faster Development**: AI significantly accelerated initial project setup and boilerplate generation
- **Code Quality**: AI suggestions helped implement best practices and modern patterns
- **Learning Enhancement**: AI explanations helped understand complex concepts like JWT authentication and React Context
- **Error Resolution**: Quick identification and fixing of compilation and runtime errors
- **Documentation**: Comprehensive documentation generated efficiently

#### **Responsible AI Usage**
- **Code Review**: All AI-generated code was manually reviewed and customized for project needs
- **Understanding**: Ensured comprehension of all implemented features before integration
- **Customization**: Modified AI suggestions to fit specific project requirements and coding standards
- **Testing**: Manually verified all AI-generated code through comprehensive testing

#### **Areas Where AI Was Most Valuable**
1. **Initial Project Structure**: Setting up the full-stack architecture
2. **Authentication System**: Implementing secure JWT-based authentication
3. **Modern UI Components**: Creating responsive, animated React components
4. **Error Handling**: Comprehensive error management across the application
5. **Testing Setup**: Configuring test environments and generating test cases

#### **Areas Requiring Manual Work**
1. **Business Logic**: Custom sweet shop functionality and cart management
2. **Database Relationships**: Specific entity relationships and constraints
3. **UI/UX Decisions**: Design choices and user experience improvements
4. **Integration Testing**: End-to-end testing and API integration
5. **Deployment Configuration**: Environment-specific settings and optimizations

### Reflection
AI tools dramatically improved development efficiency while maintaining code quality. The combination of Claude for complex problem-solving and Copilot for real-time assistance created a powerful development environment. However, the key was always understanding and customizing AI suggestions rather than blindly accepting them. This project demonstrates how AI can be a powerful ally in full-stack development when used responsibly and thoughtfully.
