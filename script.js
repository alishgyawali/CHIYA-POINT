// Global Variables
let currentCategory = "breakfast"
let cart = []
const orders = []
let currentOrderId = 1
let currentItemForCustomization = null
const menuItems = {
  breakfast: [
    {
      id: 1,
      name: "Sel Roti Set",
      price: 150,
      description: "Traditional Nepali rice doughnut with yogurt and achar",
      image: "",
      customizations: {
        "Side": ["Yogurt", "Aloo Tarkari", "Chutney"],
        Drink: ["Chiya (Milk Tea)", "Black Tea", "Coffee"],
      },
    },
    {
      id: 2,
      name: "Aloo Paratha",
      price: 70,
      description: "Stuffed potato flatbread served with curd and pickle",
      image: null,
      customizations: {
        "Spice Level": ["Mild", "Medium", "Spicy"],
        Side: ["Curd", "Achar", "Butter"],
        Drink: ["Chiya", "Black Tea", "Lassi"],
      },
    },
    {
      id: 3,
      name: "Puwa & Kheer",
      price: 200,
      description: "Sweet fried flour with Nepali rice pudding",
      image: null,
      customizations: {
        Toppings: ["Raisins", "Cashew", "Almonds", "None"],
        Sweetness: ["Less", "Normal", "Extra"],
      },
    },
  ],
  lunch: [
    {
      id: 4,
      name: "Dal Bhat Tarkari",
      price: 300,
      description: "Steamed rice, lentil soup, seasonal vegetables, and pickle",
      image: null,
      customizations: {
        Rice: ["White Rice", "Brown Rice", "Jeera Rice"],
        Protein: ["Chicken Curry", "Mutton Curry", "Paneer Curry", "None"],
        Extras: ["Papad", "Ghee", "Extra Pickle"],
      },
    },
    {
      id: 5,
      name: "Momo Platter",
      price: 170,
      description: "Steamed Nepali dumplings with achar",
      image: null,
      customizations: {
        Filling: ["Chicken", "Buff", "Veg", "Paneer"],
        Style: ["Steamed", "Fried", "C Kothey"],
        Sauce: ["Tomato Achar", "Sesame Achar", "Spicy"],
      },
    },
    {
      id: 6,
      name: "Thukpa",
      price: 150,
      description: "Himalayan noodle soup with vegetables and your choice of protein",
      image: null,
      customizations: {
        Protein: ["Chicken", "Buff", "Veg", "Egg"],
        Spice: ["Mild", "Medium", "Spicy"],
        Extras: ["Extra Noodles", "Extra Soup", "Achar"],
      },
    },
  ],
  dinner: [
    {
      id: 7,
      name: "Newari Khaja Set",
      price: 350,
      description: "Assorted Newari snacks with beaten rice, chhoila, and more",
      image: null,
      customizations: {
        Meat: ["Chicken Chhoila", "Buff Chhoila", "Veg Chhoila"],
        Side: ["Egg", "Aloo", "Bhatmas Sadeko"],
        Drink: ["Aila", "Chyang", "Soft Drink"],
      },
    },
    {
      id: 8,
      name: "Gundruk Ko Jhol",
      price: 200,
      description: "Fermented leafy greens soup with rice and sides",
      image: null,
      customizations: {
        Spice: ["Mild", "Medium", "Spicy"],
        Sides: ["Rice", "Dhido", "Roti"],
        Extras: ["Aloo Tama", "Fried Soybean", "Pickle"],
      },
    },
    {
      id: 9,
      name: "Chicken Sekuwa",
      price: 100,
      description: "Chargrilled spiced chicken skewers with salad and achar",
      image: null,
      customizations: {
        Spice: ["Mild", "Medium", "Spicy"],
        Sides: ["Beaten Rice", "Salad", "Roti"],
        Extras: ["Extra Achar", "Fried Egg"],
      },
    },
  ],
  drinks: [
    {
      id: 10,
      name: "Chiya (Milk Tea)",
      price: 50,
      description: "Traditional Nepali milk tea with spices",
      image: null,
      customizations: {
        Size: ["Small", "Medium", "Large"],
        Sweetness: ["Less Sugar", "Normal", "Extra Sugar"],
      },
    },
    {
      id: 11,
      name: "Lassi",
      price: 80,
      description: "Sweet or salty yogurt drink",
      image: "",
      customizations: {
        Type: ["Sweet", "Salty", "Mango"],
        Size: ["Small", "Medium", "Large"],
        Toppings: ["Nuts", "Saffron", "None"],
      },
    },
    {
      id: 12,
      name: "Aila",
      price: 150,
      description: "Traditional Newari distilled liquor (served responsibly)",
      image: null,
      customizations: {
        Size: ["Shot", "Double", "Small Glass"],
        Mix: ["Neat", "With Water", "With Soda"],
      },
    },
  ],
  desserts: [
    {
      id: 13,
      name: "Yomari",
      price: 70,
      description: "Steamed rice flour dumpling with jaggery and sesame filling",
      image: null,
      customizations: {
        Filling: ["Chaku (Jaggery)", "Khuwa", "Chocolate"],
        Size: ["Regular", "Large"],
      },
    },
    {
      id: 14,
      name: "Kheer",
      price: Math.ceil(250 * 0.25),
      description: "Nepali rice pudding with cardamom and nuts",
      image: null,
      customizations: {
        Toppings: ["Raisins", "Cashew", "Almonds", "None"],
      },
    },
    {
      id: 15,
      name: "Juju Dhau",
      price: 150,
      description: "Famous Bhaktapur king curd (sweet yogurt)",
      image: null,
      customizations: {
        Size: ["Small", "Medium", "Large"],
        Toppings: ["Honey", "Nuts", "None"],
      },
    },
  ],
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  showCustomerInterface()
  displayMenuItems()
  updateCartDisplay()
  loadCartFromStorage()
  initializeSampleOrders()
})

// Interface Management
function showCustomerInterface() {
  document.getElementById("customer-interface").classList.add("active")

  // Update navbar active state
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.style.color = "white"
  })
}




// Menu Category Management
function showCategory(category) {
  currentCategory = category

  // Update active category button
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Find and activate the clicked button
  const clickedBtn = Array.from(document.querySelectorAll(".category-btn")).find((btn) =>
    btn.textContent.toLowerCase().includes(category),
  )
  if (clickedBtn) {
    clickedBtn.classList.add("active")
  }

  displayMenuItems()
}

// Display Menu Items
function displayMenuItems() {
  const container = document.getElementById("menu-container")
  const items = menuItems[currentCategory] || []

  container.innerHTML = ""

  if (items.length === 0) {
    container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #333;">
                <i class="fas fa-utensils" style="font-size: 3rem; margin-bottom: 1rem; color: #ffc300;"></i>
                <h3>No items available in this category</h3>
                <p>Please check other categories or contact room service</p>
            </div>
        `
    return
  }

  items.forEach((item) => {
    const itemElement = createMenuItemElement(item)
    container.appendChild(itemElement)
  })

  // Add fade-in animation
  container.classList.add("fade-in")
  setTimeout(() => container.classList.remove("fade-in"), 500)
}

// Create Menu Item Element
function createMenuItemElement(item) {
  const div = document.createElement("div")
  div.className = "menu-item"

  div.innerHTML = `
        <div class="menu-item-image">
            ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<i class="fas fa-utensils"></i>`}
        </div>
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3>${item.name}</h3>
                <span class="menu-item-price">Rs${item.price.toFixed(2)}</span>
            </div>
            <p>${item.description}</p>
            <div class="menu-item-actions">
                <button class="btn-primary btn-small" onclick="customizeItem(${item.id})">
                    <i class="fas fa-cog"></i> Customize
                </button>
                <button class="btn-secondary btn-small" onclick="quickAddToCart(${item.id})">
                    <i class="fas fa-cart-plus"></i> Quick Add
                </button>
            </div>
        </div>
    `

  return div
}

// Item Customization
function customizeItem(itemId) {
  const item = findItemById(itemId)
  if (!item) return

  currentItemForCustomization = { ...item, quantity: 1, customizations: {}, specialInstructions: "" }

  document.getElementById("modal-item-name").textContent = item.name
  document.getElementById("item-quantity").textContent = "1"
  updateModalPrice()

  // Populate customization options
  const optionsContainer = document.getElementById("customization-options")
  optionsContainer.innerHTML = ""

  if (item.customizations) {
    Object.entries(item.customizations).forEach(([category, options]) => {
      const groupDiv = document.createElement("div")
      groupDiv.className = "customization-group"

      groupDiv.innerHTML = `
                <h4>${category}:</h4>
                <div class="option-group">
                    ${options
                      .map(
                        (option) => `
                        <button class="option-btn" onclick="selectOption('${category}', '${option}', this)">
                            ${option}
                        </button>
                    `,
                      )
                      .join("")}
                </div>
            `

      optionsContainer.appendChild(groupDiv)
    })
  }

  // Clear special instructions
  document.getElementById("special-notes").value = ""

  showModal("customization-modal")
}

function selectOption(category, option, button) {
  // Remove selection from other buttons in the same group
  const group = button.parentElement
  group.querySelectorAll(".option-btn").forEach((btn) => {
    btn.classList.remove("selected")
  })

  // Select current button
  button.classList.add("selected")

  // Update customization
  if (!currentItemForCustomization.customizations) {
    currentItemForCustomization.customizations = {}
  }
  currentItemForCustomization.customizations[category] = option

  updateModalPrice()
}

function changeQuantity(change) {
  const quantityElement = document.getElementById("item-quantity")
  let quantity = Number.parseInt(quantityElement.textContent) + change

  if (quantity < 1) quantity = 1
  if (quantity > 10) quantity = 10

  quantityElement.textContent = quantity
  currentItemForCustomization.quantity = quantity

  updateModalPrice()
}

function updateModalPrice() {
  if (!currentItemForCustomization) return

  const basePrice = currentItemForCustomization.price
  const quantity = currentItemForCustomization.quantity
  const total = basePrice * quantity

  document.getElementById("modal-item-price").textContent = total.toFixed(2)
}

// Cart Management
function quickAddToCart(itemId) {
  const item = findItemById(itemId)
  if (!item) return

  const cartItem = {
    ...item,
    quantity: 1,
    customizations: {},
    specialInstructions: "",
    cartId: Date.now(),
  }

  cart.push(cartItem)
  updateCartDisplay()
  saveCartToStorage()
  showNotification(`${item.name} added to cart!`, "success")
}

function addToCart() {
  if (!currentItemForCustomization) return

  // Get special instructions
  currentItemForCustomization.specialInstructions = document.getElementById("special-notes").value
  currentItemForCustomization.cartId = Date.now()

  cart.push({ ...currentItemForCustomization })
  updateCartDisplay()
  saveCartToStorage()
  closeCustomizationModal()
  showNotification(`${currentItemForCustomization.name} added to cart!`, "success")
}

function removeFromCart(cartId) {
  cart = cart.filter((item) => item.cartId !== cartId)
  updateCartDisplay()
  saveCartToStorage()
  showNotification("Item removed from cart", "info")
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count")
  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems

  // Update cart items
  cartItems.innerHTML = ""
  let total = 0

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #333;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; color: #ffc300;"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items to get started!</p>
            </div>
        `
  } else {
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity
      total += itemTotal

      const cartItemDiv = document.createElement("div")
      cartItemDiv.className = "cart-item"

      const customizationText = Object.entries(item.customizations || {})
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")

      cartItemDiv.innerHTML = `
                <div class="cart-item-image">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<i class="fas fa-utensils"></i>`}
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity}</p>
                    ${customizationText ? `<p style="font-size: 11px;">${customizationText}</p>` : ""}
                    ${item.specialInstructions ? `<p style="font-size: 11px; font-style: italic;">${item.specialInstructions}</p>` : ""}
                </div>
                <div class="cart-item-price">Rs${itemTotal.toFixed(2)}</div>
                <button onclick="removeFromCart(${item.cartId})" class="btn-delete btn-small" style="background: #dc3545; color: white; border: none; padding: 5px 8px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            `

      cartItems.appendChild(cartItemDiv)
    })
  }

  cartTotal.textContent = total.toFixed(2)
}

function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar")
  const overlay = document.getElementById("overlay")

  cartSidebar.classList.toggle("active")
  overlay.classList.toggle("active")
}



// Modal Management
function showModal(modalId) {
  const modal = document.getElementById(modalId)
  const overlay = document.getElementById("overlay")

  modal.classList.add("active")
  overlay.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeCustomizationModal() {
  const modal = document.getElementById("customization-modal")
  const overlay = document.getElementById("overlay")

  modal.classList.remove("active")
  overlay.classList.remove("active")
  document.body.style.overflow = ""

  currentItemForCustomization = null
}

// Utility Functions
function findItemById(itemId) {
  for (const category of Object.values(menuItems)) {
    const item = category.find((item) => item.id === itemId)
    if (item) return item
  }
  return null
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  document.body.appendChild(notification)

  // Remove notification after 4 seconds
  setTimeout(() => {
    notification.style.animation = "fadeOut 0.3s ease-in"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 4000)
}

// /

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem("hotelCart")
    if (savedCart) {
      cart = JSON.parse(savedCart)
      updateCartDisplay()
    }
  } catch (error) {
    console.error("Error loading cart to storage:", error)
    cart = []
  }
}


// Close modals when clicking overlay
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay")
  if (overlay) {
    overlay.addEventListener("click", () => {
      closeCustomizationModal()
    })
  }
})

// Handle escape key to close modals
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCustomizationModal()
  }
})

// Auto-save cart whenever it changes
function updateCartAndSave() {
  updateCartDisplay()
  saveCartToStorage()
}

// Add CSS animations for notifications
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`
document.head.appendChild(notificationStyles)

// Smooth scrolling for internal links
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling behavior
  document.documentElement.style.scrollBehavior = "smooth"
})

// Prevent form submission on Enter key in room number input
document.addEventListener("DOMContentLoaded", () => {
  const roomInput = document.getElementById("room-number")
  if (roomInput) {
    roomInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        detectRoom()
      }
    })
  }
})

// Add loading states for better UX
function showLoading(elementId) {
  const element = document.getElementById(elementId)
  if (element) {
    element.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #ffc300;"></i>
                <p style="margin-top: 1rem; color: #333;">Loading...</p>
            </div>
        `
  }
}

// Error handling for missing elements
function safeGetElement(id) {
  const element = document.getElementById(id)
  if (!element) {
    console.warn(`Element with id '${id}' not found`)
  }
  return element
}

// Initialize tooltips or help text
function initializeHelpers() {
  // Add helpful tooltips or instructions
  const roomInput = document.getElementById("room-number")
  if (roomInput) {
    roomInput.setAttribute("title", "Enter your room number or click Auto-Detect")
  }
}

