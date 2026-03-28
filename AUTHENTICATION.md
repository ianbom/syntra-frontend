# Authentication System Documentation

Sistem autentikasi lengkap dengan login dummy, cookie management, dan protected routes berdasarkan role.

## 📁 Struktur File

```
src/
├── lib/
│   └── auth/
│       ├── types.ts           # TypeScript interfaces
│       ├── authService.ts     # Authentication service
│       └── index.ts           # Exports
├── components/
│   └── auth/
│       ├── ProtectedRoute.tsx # Protected route wrapper
│       └── AdminRoute.tsx     # Admin-only route wrapper
├── pages/
│   ├── auth/
│   │   └── login.tsx         # Login page
│   └── unauthorized.tsx       # Unauthorized access page
└── App.tsx                    # Main app with protected routes
```

## 👥 Demo Accounts

### Admin Account
- **Email**: `admin@syntra.com`
- **Password**: `admin123`
- **Role**: `admin`
- **Access**: Semua halaman termasuk admin routes

### User Account
- **Email**: `user@syntra.com`
- **Password**: `user123`
- **Role**: `user`
- **Access**: Hanya halaman publik dan protected routes (tidak bisa akses admin routes)

## 🔐 Authentication Flow

### 1. Login Process
```typescript
// User memasukkan email & password
authService.login({ email, password })

// Service memvalidasi credentials
// Jika valid, create token dan simpan ke cookie
Cookies.set("auth_token", JSON.stringify(token), { expires: 7 })

// Redirect berdasarkan role:
// - Admin → /admin/dashboard
// - User → /
```

### 2. Cookie Structure
```typescript
interface AuthToken {
  name: string      // Nama user
  email: string     // Email user
  role: "admin" | "user"  // Role user
}

// Cookie name: "auth_token"
// Expires: 7 days
// Format: JSON string
```

### 3. Route Protection

#### Protected Route (Any authenticated user)
```typescript
<ProtectedRoute>
  <Welcome />
</ProtectedRoute>

// Checks: isAuthenticated()
// If not → Redirect to /login
```

#### Admin Route (Admin only)
```typescript
<AdminRoute>
  <Dashboard />
</AdminRoute>

// Checks: isAuthenticated() && isAdmin()
// If not authenticated → Redirect to /login
// If authenticated but not admin → Redirect to /unauthorized
```

## 🛠️ Auth Service API

### authService.login()
```typescript
await authService.login({ email, password })

// Returns:
{
  success: boolean
  message?: string
  user?: {
    name: string
    email: string
    role: "admin" | "user"
  }
}
```

### authService.logout()
```typescript
authService.logout()
// Removes auth_token cookie
```

### authService.getCurrentUser()
```typescript
const user = authService.getCurrentUser()
// Returns: User | null
// {
//   name: string
//   email: string
//   role: "admin" | "user"
// }
```

### authService.isAuthenticated()
```typescript
const isAuth = authService.isAuthenticated()
// Returns: boolean
```

### authService.isAdmin()
```typescript
const isAdmin = authService.isAdmin()
// Returns: boolean
```

### authService.isUser()
```typescript
const isUser = authService.isUser()
// Returns: boolean
```

## 🗺️ Route Configuration

### Public Routes
- `/login` - Login page
- `/register` - Register page
- `/unauthorized` - Unauthorized access page

### Protected Routes (Authenticated users)
- `/` - Welcome page

### Admin Routes (Admin only)
- `/admin/dashboard` - Admin dashboard
- `/admin/document` - Document list
- `/admin/document/create` - Create document
- `/admin/document/process` - Process document
- `/admin/user` - User list

## 📝 Usage Examples

### Check Authentication in Component
```typescript
import { authService } from "@/lib/auth"

function MyComponent() {
  const user = authService.getCurrentUser()
  
  if (!user) {
    return <div>Not logged in</div>
  }
  
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}
```

### Logout Function
```typescript
import { useNavigate } from "react-router-dom"
import { authService } from "@/lib/auth"

function LogoutButton() {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    authService.logout()
    navigate("/login")
  }
  
  return <button onClick={handleLogout}>Logout</button>
}
```

### Conditional Rendering by Role
```typescript
import { authService } from "@/lib/auth"

function Navigation() {
  const isAdmin = authService.isAdmin()
  
  return (
    <nav>
      <Link to="/">Home</Link>
      {isAdmin && (
        <>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/user">Users</Link>
        </>
      )}
    </nav>
  )
}
```

## 🔒 Security Features

### 1. Cookie-based Authentication
- Secure storage menggunakan js-cookie
- Expires in 7 days
- Automatic cleanup on logout

### 2. Route Protection
- Middleware-based protection
- Automatic redirects
- Role-based access control (RBAC)

### 3. Error Handling
- Invalid credentials detection
- Unauthorized access handling
- User-friendly error messages

## 🎨 UI Components

### Login Page
- Email & password input
- Loading states
- Error messages
- Demo account credentials display
- Responsive design

### Unauthorized Page
- Clear error message
- User information display
- Navigation options
- Logout button

## 📦 Dependencies

```json
{
  "js-cookie": "^3.0.5",
  "@types/js-cookie": "^3.0.6"
}
```

## 🚀 Getting Started

### 1. Login sebagai Admin
```
Email: admin@syntra.com
Password: admin123
```
- Akan redirect ke `/admin/dashboard`
- Bisa akses semua admin routes

### 2. Login sebagai User
```
Email: user@syntra.com
Password: user123
```
- Akan redirect ke `/`
- Tidak bisa akses admin routes
- Akan redirect ke `/unauthorized` jika mencoba akses admin routes

### 3. Logout
```typescript
// Call logout function
authService.logout()

// Or use logout button in UI
<Button onClick={() => {
  authService.logout()
  navigate("/login")
}}>
  Logout
</Button>
```

## ⚡ Testing

### Test Admin Access
1. Login dengan admin account
2. Navigate ke `/admin/dashboard` - ✅ Success
3. Navigate ke `/admin/user` - ✅ Success

### Test User Restrictions
1. Login dengan user account
2. Navigate ke `/` - ✅ Success
3. Navigate ke `/admin/dashboard` - ❌ Redirect to `/unauthorized`

### Test Unauthenticated Access
1. Logout atau clear cookies
2. Navigate ke `/admin/dashboard` - ❌ Redirect to `/login`
3. Navigate ke `/` - ❌ Redirect to `/login`

## 🔄 Migration to Real API

Untuk mengganti dengan real API, update `authService.ts`:

```typescript
export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Replace with actual API call
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Login failed",
      }
    }
    
    // Save JWT token from backend
    Cookies.set(AUTH_TOKEN_KEY, data.token, { expires: 7 })
    
    return {
      success: true,
      user: data.user,
    }
  },
  
  // Update other methods to decode JWT token
  getCurrentUser: (): User | null => {
    const token = Cookies.get(AUTH_TOKEN_KEY)
    if (!token) return null
    
    // Decode JWT token
    const decoded = jwtDecode(token)
    return decoded
  },
}
```

## 📚 Best Practices

1. **Never expose sensitive data** - Token hanya berisi data yang diperlukan
2. **Always validate on backend** - Frontend validation adalah untuk UX, bukan security
3. **Use HTTPS in production** - Protect cookies from MITM attacks
4. **Implement token refresh** - Use refresh tokens untuk long-term sessions
5. **Add CSRF protection** - Implement CSRF tokens untuk form submissions
6. **Rate limiting** - Implement pada backend untuk prevent brute force attacks

## 🐛 Troubleshooting

### Cookie tidak tersimpan
- Check browser cookie settings
- Ensure domain matches
- Check for SameSite issues

### Redirect loop
- Check route configuration
- Ensure login page is public
- Check isAuthenticated logic

### Role tidak terdeteksi
- Check cookie structure
- Verify token parsing
- Check role comparison (case-sensitive)

## 📖 Additional Resources

- [js-cookie Documentation](https://github.com/js-cookie/js-cookie)
- [React Router Protected Routes](https://reactrouter.com/en/main/start/tutorial)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
