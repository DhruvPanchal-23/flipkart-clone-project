# 🛒 Flipkart Clone - E-Commerce Website

A fully functional e-commerce website clone inspired by Flipkart, built with vanilla HTML, CSS, and JavaScript. This project demonstrates modern web development practices with responsive design, user authentication, shopping cart functionality, and complete checkout flow.

![Flipkart Clone](assets/images/logoname.png)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Core Functionality](#core-functionality)
- [Authentication System](#authentication-system)
- [Shopping Cart](#shopping-cart)
- [Checkout Process](#checkout-process)
- [Product Management](#product-management)
- [Responsive Design](#responsive-design)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🛍️ **E-Commerce Features**
- **Product Catalog**: Browse products across 10+ categories
- **Advanced Search**: Smart search with keyword matching
- **Product Sorting**: Sort by price (low-high, high-low) and name (A-Z, Z-A)
- **Product Details**: Individual product pages with specifications
- **Category Navigation**: Dedicated pages for each product category

### 👤 **User Management**
- **User Registration**: Secure signup with email validation
- **User Authentication**: Login/logout functionality
- **Session Management**: Persistent login across browser sessions
- **User Profile**: Display logged-in user information

### 🛒 **Shopping Cart**
- **Add to Cart**: Add products with quantity management
- **Cart Persistence**: Cart items saved in browser localStorage
- **Cart Updates**: Real-time quantity updates and price calculations
- **Cart Display**: Visual cart count in header
- **Empty Cart Handling**: Proper messaging for empty carts

### 📍 **Address Management**
- **Address Storage**: Save delivery addresses
- **Address Validation**: Form validation for address fields
- **Address Display**: Show saved addresses in checkout

### 💳 **Checkout & Payment**
- **Order Summary**: Complete order review before payment
- **Price Calculations**: Subtotal, discounts, and final totals
- **Order Confirmation**: Payment success/failure handling
- **Order History**: Basic order tracking (localStorage-based)

### 🎨 **UI/UX Features**
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Modern UI**: Clean, intuitive interface with Material Icons
- **Image Carousel**: Banner slideshow on homepage
- **Hamburger Menu**: Mobile navigation menu
- **Loading States**: Visual feedback for user actions

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No frameworks, pure JavaScript implementation
- **Material Icons**: Google's Material Design icon library

### Storage & Data
- **localStorage**: Client-side data persistence
- **JSON**: Data structure for products and user information

### Development Tools
- **Git**: Version control
- **VS Code**: Development environment
- **Python HTTP Server**: Local development server

## 📁 Project Structure

```
flipkart-clone-project/
├── index.html                 # Homepage with product grid and categories
├── cart.html                  # Shopping cart page
├── checkout.html              # Order review and checkout
├── login.html                 # User authentication page
├── address.html               # Delivery address management
├── payment.html               # Payment processing page
├── product.html               # Individual product details (template)
├── assets/
│   └── images/                # Product images and banners
├── css/
│   ├── styles.css             # Main stylesheet
│   ├── cart.css               # Cart page styles
│   ├── checkout.css           # Checkout page styles
│   ├── login.css              # Login page styles
│   ├── address.css            # Address page styles
│   └── mobile.css             # Mobile-specific styles
├── js/
│   ├── data.js                # Product database and search keywords
│   ├── home.js                # Homepage functionality
│   ├── cart.js                # Cart management
│   ├── checkout.js            # Checkout process
│   ├── login.js               # User authentication
│   ├── user.js                # Cross-page user state management
│   ├── address.js             # Address form handling
│   ├── payment.js             # Payment processing
│   ├── product.js             # Product page functionality
│   ├── hamburger.js           # Mobile menu toggle
│   └── showslide.js           # Banner carousel
└── html/
    ├── mobileAndTablet.html   # Mobile & Tablet category
    ├── fashion.html           # Fashion category
    ├── tvAppliances.html      # TV & Appliances category
    ├── homeAndFurniture.html  # Home & Furniture category
    ├── beautyProduct.html     # Beauty products category
    ├── grocery.html           # Grocery category
    ├── sports.html            # Sports category
    ├── electronic.html        # Electronics category
    ├── toys.html              # Toys category
    └── laptops.html           # Laptops category
```

## 🚀 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local server) or any HTTP server

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flipkart-clone-project
   ```

2. **Start local server**
   ```bash
   # Using Python (recommended)
   python -m http.server 8000

   # Or using Node.js (if available)
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📖 Usage

### 🏠 **Homepage**
- Browse featured categories and products
- Use search bar for product discovery
- Navigate through banner carousel
- Access cart and user account

### 🔍 **Product Discovery**
- **Search**: Type product names or keywords
- **Categories**: Click category images or use side menu
- **Sorting**: Use dropdown to sort by price or name
- **Product Cards**: Click "Add to Cart" or product image

### 👤 **User Account**
1. **Registration**: Click "Login" → "Sign Up" tab
2. **Login**: Enter credentials on login form
3. **Session**: Stay logged in across page visits
4. **Logout**: Click user name → "Logout"

### 🛒 **Shopping Flow**
1. **Browse** → Add items to cart
2. **Cart** → Review and modify quantities
3. **Address** → Add/select delivery address
4. **Checkout** → Review order summary
5. **Payment** → Complete purchase

## 🔧 Core Functionality

### Product Management
```javascript
// Sample product structure
{
  id: 1,
  name: "ASUS Vivobook S16",
  category: "laptops",
  price: 79999,
  rating: 4.4,
  image: "assets/images/laptop.jpg"
}
```

### Cart Operations
- **Add Item**: `addToCart(productId)`
- **Update Quantity**: `updateQuantity(productId, newQty)`
- **Remove Item**: `removeFromCart(productId)`
- **Clear Cart**: `clearCart()`

### Search & Filter
- **Text Search**: Matches product names and keywords
- **Category Filter**: Filter by product categories
- **Price Sorting**: Ascending/descending price sort
- **Name Sorting**: Alphabetical sorting

## 🔐 Authentication System

### User Registration
```javascript
// User data structure
{
  id: "unique-timestamp",
  name: "John Doe",
  email: "john@example.com",
  password: "hashed-password"
}
```

### Security Features
- **Password Hashing**: Simple client-side hashing
- **Email Validation**: Duplicate email prevention
- **Session Management**: localStorage-based sessions
- **Auto-logout**: Manual logout functionality

### Cross-Page Integration
- User state maintained across all pages
- Dynamic header updates based on login status
- Protected routes (checkout requires login)

## 🛒 Shopping Cart

### Cart Features
- **Persistent Storage**: Cart survives browser refresh
- **Quantity Management**: Increment/decrement items
- **Price Calculation**: Real-time total updates
- **Visual Indicators**: Cart count in header
- **Empty State**: Proper messaging for empty carts

### Cart Data Structure
```javascript
[
  {
    id: 1,
    name: "ASUS Vivobook S16",
    price: 79999,
    quantity: 2,
    image: "assets/images/laptop.jpg"
  }
]
```

## 💳 Checkout Process

### Checkout Flow
1. **Cart Review**: Display all cart items
2. **Address Selection**: Choose delivery address
3. **Order Summary**: Show pricing breakdown
4. **Payment Processing**: Mock payment gateway
5. **Order Confirmation**: Success/failure feedback

### Pricing Logic
- **Subtotal**: Sum of all item prices × quantities
- **Discount**: Applied based on cart total
- **Delivery**: Free delivery on orders above ₹500
- **Final Total**: Subtotal - discount + delivery

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Hamburger menu for navigation
- Touch-friendly buttons and links
- Optimized product grid layout
- Swipe-friendly banner carousel

### Desktop Features
- Multi-column product grid
- Hover effects and animations
- Expanded navigation menu
- Side panel for categories

## 🌐 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

### Development Guidelines
- Follow existing code style and structure
- Test on multiple browsers and devices
- Ensure responsive design works properly
- Add comments for complex logic
- Update README for new features

## 📄 License

This project is for educational purposes. Feel free to use and modify the code for learning and development.

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real payment gateway
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking system
- [ ] Admin panel
- [ ] Product inventory management
- [ ] Email notifications
- [ ] Social login options

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check browser console for JavaScript errors
- Ensure local server is running on correct port

---

**Built with ❤️ using vanilla JavaScript**

*Last updated: December 2025*</content>
<parameter name="filePath">c:\flipkart-clone-project\README.md