import React, { useState, useEffect } from "react";

const COLORS = {
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  border: "#EBEBEB",
  text: "#1A1A1A",
  muted: "#888",
  accent: "#E8520A",
  accentLight: "#FFF3EE",
  accentHover: "#C94508",
  success: "#2D8A4E",
  successLight: "#EDF7F1",
  tag: "#F5F5F3",
};

const FONT = "'DM Sans', sans-serif";
const DISPLAY_FONT = "'DM Serif Display', serif";

const INITIAL_MENU = [
  { id: 1, name: "Jollof Rice", category: "Rice", price: 2500, description: "Smoky party jollof with fried chicken and plantain", image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&h=280&fit=crop", popular: true },
  { id: 2, name: "Egusi Soup + Eba", category: "Soups", price: 2800, description: "Rich egusi with assorted meat, served with fresh eba", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=280&fit=crop", popular: true },
  { id: 3, name: "Grilled Tilapia", category: "Seafood", price: 4500, description: "Whole tilapia grilled with peppered sauce and chips", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=280&fit=crop", popular: false },
  { id: 4, name: "Pepper Soup", category: "Soups", price: 3200, description: "Goat meat pepper soup with utazi and scent leaf", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=280&fit=crop", popular: false },
  { id: 5, name: "Fried Rice + Chicken", category: "Rice", price: 3000, description: "Nigerian-style fried rice with coleslaw and whole chicken", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=280&fit=crop", popular: true },
  { id: 6, name: "Pounded Yam + Ofe Onugbu", category: "Soups", price: 3500, description: "Silky pounded yam with bitter leaf soup and stockfish", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=280&fit=crop", popular: false },
  { id: 7, name: "Suya Platter", category: "Grills", price: 3800, description: "Sliced beef suya with onions, tomatoes and pepper sauce", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=280&fit=crop", popular: true },
  { id: 8, name: "Chapman", category: "Drinks", price: 800, description: "Classic Nigerian Chapman with fresh fruit garnish", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=280&fit=crop", popular: false },
  { id: 9, name: "Fresh Zobo", category: "Drinks", price: 600, description: "Chilled hibiscus drink with ginger and pineapple", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=280&fit=crop", popular: false },
  { id: 10, name: "Moi Moi", category: "Sides", price: 700, description: "Steamed bean pudding with egg and fish", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=280&fit=crop", popular: false },
  { id: 11, name: "Plantain + Beans", category: "Sides", price: 1500, description: "Fried sweet plantain with Nigerian honey beans", image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=400&h=280&fit=crop", popular: true },
  { id: 12, name: "Catfish Stew", category: "Seafood", price: 5000, description: "Fresh point-and-kill catfish in thick tomato stew", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=280&fit=crop", popular: false },
];

const CATEGORIES = ["All", "Rice", "Soups", "Grills", "Seafood", "Sides", "Drinks"];

const ORDER_STAGES = [
  { label: "Order Placed", icon: "📋" },
  { label: "Confirmed", icon: "✅" },
  { label: "Preparing", icon: "👨‍🍳" },
  { label: "On the Way", icon: "🛵" },
  { label: "Delivered", icon: "🎉" },
];

function genOrderId() {
  return "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  app: {
    fontFamily: FONT,
    background: COLORS.bg,
    minHeight: "100vh",
    color: COLORS.text,
  },
  nav: {
    background: COLORS.surface,
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: DISPLAY_FONT,
    fontSize: 24,
    color: COLORS.text,
    letterSpacing: "-0.5px",
  },
  logoAccent: { color: COLORS.accent },
  navLinks: { display: "flex", gap: 8, alignItems: "center" },
  navBtn: (active) => ({
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    background: active ? COLORS.accentLight : "transparent",
    color: active ? COLORS.accent : COLORS.muted,
    transition: "all 0.15s",
  }),
  cartBtn: (count) => ({
    padding: "8px 18px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 600,
    background: count > 0 ? COLORS.accent : COLORS.border,
    color: count > 0 ? "#fff" : COLORS.muted,
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: 8,
  }),
  main: { maxWidth: 1200, margin: "0 auto", padding: "32px 24px" },
  hero: {
    marginBottom: 40,
  },
  heroTitle: {
    fontFamily: DISPLAY_FONT,
    fontSize: 42,
    lineHeight: 1.15,
    letterSpacing: "-1px",
    marginBottom: 10,
  },
  heroSub: { color: COLORS.muted, fontSize: 16, marginBottom: 0 },
  catRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 32,
  },
  catChip: (active) => ({
    padding: "8px 18px",
    borderRadius: 100,
    border: `1.5px solid ${active ? COLORS.accent : COLORS.border}`,
    background: active ? COLORS.accentLight : COLORS.surface,
    color: active ? COLORS.accent : COLORS.text,
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
  card: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    transition: "box-shadow 0.2s, transform 0.2s",
    cursor: "default",
  },
  cardImage: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 10,
    marginBottom: 4,
    background: COLORS.border,
  },
  cardImageFallback: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 4,
    background: COLORS.tag,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 48,
  },
  cardName: {
    fontFamily: DISPLAY_FONT,
    fontSize: 18,
    letterSpacing: "-0.3px",
    margin: 0,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 1.5,
    margin: 0,
    flexGrow: 1,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  price: {
    fontWeight: 700,
    fontSize: 16,
    color: COLORS.text,
  },
  addBtn: (inCart) => ({
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    background: inCart ? COLORS.success : COLORS.accent,
    color: "#fff",
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.15s",
  }),
  popularBadge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 100,
    background: COLORS.accentLight,
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.3px",
    marginBottom: 2,
  },
  // Modal
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    zIndex: 200,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 0,
  },
  modal: {
    background: COLORS.surface,
    borderRadius: "24px 24px 0 0",
    width: "100%",
    maxWidth: 520,
    maxHeight: "85vh",
    overflowY: "auto",
    padding: 28,
    boxSizing: "border-box",
  },
  modalTitle: {
    fontFamily: DISPLAY_FONT,
    fontSize: 24,
    letterSpacing: "-0.5px",
    marginBottom: 20,
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 0",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  cartImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
    objectFit: "cover",
    background: COLORS.border,
    flexShrink: 0,
  },
  cartItemInfo: { flexGrow: 1 },
  cartItemName: { fontWeight: 600, fontSize: 14 },
  cartItemPrice: { color: COLORS.muted, fontSize: 13, marginTop: 2 },
  qtyRow: { display: "flex", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 28, height: 28,
    borderRadius: 8,
    border: `1px solid ${COLORS.border}`,
    background: COLORS.tag,
    fontFamily: FONT,
    fontSize: 16,
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  qtyNum: { fontWeight: 600, fontSize: 15, minWidth: 20, textAlign: "center" },
  cartTotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    fontWeight: 700,
    fontSize: 18,
  },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "none",
    background: COLORS.accent,
    color: "#fff",
    fontFamily: FONT,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 8,
    transition: "background 0.15s",
  },
  secondaryBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: 12,
    border: `1.5px solid ${COLORS.border}`,
    background: "transparent",
    color: COLORS.text,
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 8,
  },
  // Checkout
  formGroup: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: COLORS.text },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: `1.5px solid ${COLORS.border}`,
    fontFamily: FONT,
    fontSize: 14,
    background: COLORS.bg,
    boxSizing: "border-box",
    outline: "none",
    color: COLORS.text,
  },
  select: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: `1.5px solid ${COLORS.border}`,
    fontFamily: FONT,
    fontSize: 14,
    background: COLORS.bg,
    boxSizing: "border-box",
    outline: "none",
    color: COLORS.text,
    appearance: "none",
  },
  // Tracking
  trackBox: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: 28,
    maxWidth: 560,
    margin: "0 auto",
  },
  stageRow: { display: "flex", gap: 0, marginTop: 24, marginBottom: 16, position: "relative" },
  stageDot: (done) => ({
    width: 36, height: 36,
    borderRadius: "50%",
    background: done ? COLORS.accent : COLORS.border,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16,
    flexShrink: 0,
    transition: "background 0.3s",
    zIndex: 1,
  }),
  stageLine: (done) => ({
    flexGrow: 1,
    height: 3,
    background: done ? COLORS.accent : COLORS.border,
    alignSelf: "center",
    transition: "background 0.3s",
  }),
  stageLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: 500,
  },
  // Admin
  adminGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 16,
  },
  adminCard: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: 18,
  },
  adminForm: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: 24,
    marginBottom: 28,
  },
  adminRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 },
  dangerBtn: {
    padding: "6px 12px",
    borderRadius: 7,
    border: "none",
    background: "#FEE2E2",
    color: "#B91C1C",
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  editBtn: {
    padding: "6px 12px",
    borderRadius: 7,
    border: "none",
    background: COLORS.accentLight,
    color: COLORS.accent,
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 28,
  },
  statCard: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: 20,
    textAlign: "center",
  },
  statNum: { fontFamily: DISPLAY_FONT, fontSize: 32, color: COLORS.accent },
  statLabel: { fontSize: 12, color: COLORS.muted, marginTop: 4 },
};

// ─── Components ───────────────────────────────────────────────────────────────

function NavBar({ page, setPage, cartCount }) {
  return (
    <nav style={S.nav}>
      <div style={S.logo}>
        Chop<span style={S.logoAccent}>Fast</span>
      </div>
      <div style={S.navLinks}>
        {["menu", "track", "admin"].map((p) => (
          <button key={p} style={S.navBtn(page === p)} onClick={() => setPage(p)}>
            {p === "menu" ? "🍽 Menu" : p === "track" ? "📍 Track Order" : "⚙️ Admin"}
          </button>
        ))}
        <button style={S.cartBtn(cartCount)} onClick={() => setPage("menu")}>
          🛒 {cartCount > 0 ? `Cart (${cartCount})` : "Cart"}
        </button>
      </div>
    </nav>
  );
}

function MenuPage({ menu, cart, setCart, setCartOpen }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? menu : menu.filter(i => i.category === activeCategory);

  const cartQty = (id) => {
    const item = cart.find(c => c.id === id);
    return item ? item.qty : 0;
  };

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  return (
    <div style={S.main}>
      <div style={S.hero}>
        <h1 style={S.heroTitle}>
          Fresh. Fast.<br />
          <span style={{ color: COLORS.accent }}>Delivered hot.</span>
        </h1>
        <p style={S.heroSub}>Order your favourite Nigerian dishes, delivered to your door.</p>
      </div>

      <div style={S.catRow}>
        {CATEGORIES.map(cat => (
          <button key={cat} style={S.catChip(activeCategory === cat)} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div style={S.grid}>
        {filtered.map(item => (
          <div key={item.id} style={S.card}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
          >
            <div>
              <img
                src={item.image}
                alt={item.name}
                style={S.cardImage}
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              />
              <div style={{ ...S.cardImageFallback, display: "none" }}>🍽</div>
              {item.popular && <span style={S.popularBadge}>⭐ Popular</span>}
            </div>
            <h3 style={S.cardName}>{item.name}</h3>
            <p style={S.cardDesc}>{item.description}</p>
            <div style={S.cardFooter}>
              <span style={S.price}>₦{item.price.toLocaleString()}</span>
              {cartQty(item.id) === 0 ? (
                <button style={S.addBtn(false)} onClick={() => addToCart(item)}>+ Add</button>
              ) : (
                <button style={S.addBtn(true)} onClick={() => setCartOpen(true)}>✓ In Cart ({cartQty(item.id)})</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: COLORS.accent, color: "#fff", borderRadius: 14, padding: "14px 28px",
          fontFamily: FONT, fontWeight: 700, fontSize: 15, cursor: "pointer",
          boxShadow: "0 8px 24px rgba(232,82,10,0.35)", zIndex: 50,
          display: "flex", gap: 12, alignItems: "center",
        }} onClick={() => setCartOpen(true)}>
          🛒 View Cart — {cart.reduce((a, c) => a + c.qty, 0)} items &nbsp;·&nbsp; ₦{cart.reduce((a, c) => a + c.price * c.qty, 0).toLocaleString()}
        </div>
      )}
    </div>
  );
}

function CartModal({ cart, setCart, onClose, onCheckout }) {
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const changeQty = (id, delta) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  };

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>
        <h2 style={S.modalTitle}>Your Cart</h2>
        {cart.length === 0 ? (
          <p style={{ color: COLORS.muted, textAlign: "center", padding: "32px 0" }}>Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={S.cartItem}>
                <img src={item.image} alt={item.name} style={S.cartImage} />
                <div style={S.cartItemInfo}>
                  <div style={S.cartItemName}>{item.name}</div>
                  <div style={S.cartItemPrice}>₦{(item.price * item.qty).toLocaleString()}</div>
                </div>
                <div style={S.qtyRow}>
                  <button style={S.qtyBtn} onClick={() => changeQty(item.id, -1)}>−</button>
                  <span style={S.qtyNum}>{item.qty}</span>
                  <button style={S.qtyBtn} onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
              </div>
            ))}
            <div style={S.cartTotal}>
              <span>Total</span>
              <span style={{ color: COLORS.accent }}>₦{total.toLocaleString()}</span>
            </div>
            <button style={S.primaryBtn} onClick={onCheckout}>Proceed to Checkout →</button>
          </>
        )}
        <button style={S.secondaryBtn} onClick={onClose}>Continue Shopping</button>
      </div>
    </div>
  );
}

function CheckoutModal({ cart, onClose, onConfirm }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "cash" });
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const delivery = 500;

  const valid = form.name && form.phone && form.address;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...S.modal, maxHeight: "90vh" }}>
        <h2 style={S.modalTitle}>Checkout</h2>

        <div style={S.formGroup}>
          <label style={S.label}>Full Name</label>
          <input style={S.input} placeholder="e.g. Emeka Okafor" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div style={S.formGroup}>
          <label style={S.label}>Phone Number</label>
          <input style={S.input} placeholder="e.g. 08012345678" value={form.phone} onChange={e => set("phone", e.target.value)} />
        </div>
        <div style={S.formGroup}>
          <label style={S.label}>Delivery Address</label>
          <input style={S.input} placeholder="Street, Area, City" value={form.address} onChange={e => set("address", e.target.value)} />
        </div>
        <div style={S.formGroup}>
          <label style={S.label}>Payment Method</label>
          <select style={S.select} value={form.payment} onChange={e => set("payment", e.target.value)}>
            <option value="cash">Cash on Delivery</option>
            <option value="transfer">Bank Transfer</option>
            <option value="card">Card Payment</option>
          </select>
        </div>

        <div style={{ background: COLORS.bg, borderRadius: 12, padding: 16, marginBottom: 8 }}>
          {cart.map(c => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span>{c.name} × {c.qty}</span>
              <span>₦{(c.price * c.qty).toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.muted, marginTop: 8 }}>
            <span>Delivery fee</span><span>₦{delivery.toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.border}` }}>
            <span>Total</span><span style={{ color: COLORS.accent }}>₦{(total + delivery).toLocaleString()}</span>
          </div>
        </div>

        <button style={{ ...S.primaryBtn, opacity: valid ? 1 : 0.5 }} onClick={() => valid && onConfirm(form)} disabled={!valid}>
          Place Order
        </button>
        <button style={S.secondaryBtn} onClick={onClose}>← Back to Cart</button>
      </div>
    </div>
  );
}

function SuccessModal({ orderId, onClose, onTrack }) {
  return (
    <div style={S.overlay}>
      <div style={{ ...S.modal, textAlign: "center", paddingTop: 40, paddingBottom: 40 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ ...S.modalTitle, marginBottom: 8 }}>Order Placed!</h2>
        <p style={{ color: COLORS.muted, marginBottom: 6 }}>Your food is being prepared.</p>
        <div style={{
          display: "inline-block",
          background: COLORS.accentLight,
          color: COLORS.accent,
          fontWeight: 700,
          fontSize: 18,
          borderRadius: 10,
          padding: "8px 20px",
          marginBottom: 24,
          letterSpacing: "1px",
        }}>{orderId}</div>
        <button style={S.primaryBtn} onClick={onTrack}>Track My Order</button>
        <button style={S.secondaryBtn} onClick={onClose}>Back to Menu</button>
      </div>
    </div>
  );
}

function TrackPage({ orders }) {
  const [inputId, setInputId] = useState("");
  const [found, setFound] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const search = () => {
    const order = orders.find(o => o.id.toLowerCase() === inputId.trim().toLowerCase());
    if (order) { setFound(order); setNotFound(false); }
    else { setFound(null); setNotFound(true); }
  };

  const stage = found ? found.stage : 0;

  return (
    <div style={S.main}>
      <h1 style={{ ...S.heroTitle, fontSize: 32, marginBottom: 8 }}>Track Your Order</h1>
      <p style={{ ...S.heroSub, marginBottom: 28 }}>Enter your order ID to see the live status.</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 32, maxWidth: 480 }}>
        <input
          style={{ ...S.input, flexGrow: 1 }}
          placeholder="e.g. ORD-AB12CD"
          value={inputId}
          onChange={e => setInputId(e.target.value)}
          onKeyDown={e => e.key === "Enter" && search()}
        />
        <button style={{ ...S.primaryBtn, width: "auto", padding: "11px 22px", marginTop: 0 }} onClick={search}>
          Search
        </button>
      </div>

      {notFound && <p style={{ color: "#B91C1C", marginBottom: 24 }}>Order not found. Check the ID and try again.</p>}

      {found && (
        <div style={S.trackBox}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{found.id}</div>
              <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 2 }}>Placed by {found.customerName}</div>
            </div>
            <div style={{
              background: stage === 4 ? COLORS.successLight : COLORS.accentLight,
              color: stage === 4 ? COLORS.success : COLORS.accent,
              fontWeight: 700, fontSize: 13, borderRadius: 8, padding: "6px 14px",
            }}>
              {ORDER_STAGES[stage].label}
            </div>
          </div>

          <div style={S.stageRow}>
            {ORDER_STAGES.map((s, i) => (
              <React.Fragment key={s.label}>
                <div style={S.stageDot(i <= stage)} title={s.label}>
                  {i <= stage ? s.icon : "○"}
                </div>
                {i < ORDER_STAGES.length - 1 && (
                  <div style={S.stageLine(i < stage)} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={S.stageLabels}>
            {ORDER_STAGES.map(s => <span key={s.label}>{s.label}</span>)}
          </div>

          <div style={{ marginTop: 24, background: COLORS.bg, borderRadius: 10, padding: 14 }}>
            {found.items.map(c => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                <span>{c.name} × {c.qty}</span>
                <span>₦{(c.price * c.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between" }}>
              <span>Total paid</span>
              <span style={{ color: COLORS.accent }}>₦{(found.total + 500).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {orders.length > 0 && !found && !notFound && (
        <div style={{ marginTop: 16 }}>
          <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 10 }}>Recent orders:</p>
          {orders.slice(-3).reverse().map(o => (
            <div key={o.id} style={{ ...S.adminCard, marginBottom: 10, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onClick={() => { setInputId(o.id); setFound(o); }}>
              <div>
                <div style={{ fontWeight: 600 }}>{o.id}</div>
                <div style={{ color: COLORS.muted, fontSize: 12 }}>{o.customerName}</div>
              </div>
              <span style={{ color: COLORS.accent, fontWeight: 600, fontSize: 13 }}>{ORDER_STAGES[o.stage].label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminPage({ menu, setMenu, orders, setOrders }) {
  const [tab, setTab] = useState("orders");
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: "", category: "Rice", price: "", description: "", image: "", popular: false });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const saveItem = () => {
    if (!form.name || !form.price) return;
    if (editItem) {
      setMenu(prev => prev.map(i => i.id === editItem.id ? { ...editItem, ...form, price: Number(form.price) } : i));
    } else {
      setMenu(prev => [...prev, { id: Date.now(), ...form, price: Number(form.price) }]);
    }
    setForm({ name: "", category: "Rice", price: "", description: "", emoji: "🍽", popular: false });
    setEditItem(null);
  };

  const deleteItem = (id) => setMenu(prev => prev.filter(i => i.id !== id));

  const startEdit = (item) => {
    setEditItem(item);
    setForm({ name: item.name, category: item.category, price: item.price, description: item.description, image: item.image, popular: item.popular });
    setTab("menu");
  };

  const advanceOrder = (id) => {
    setOrders(prev => prev.map(o => o.id === id && o.stage < 4 ? { ...o, stage: o.stage + 1 } : o));
  };

  const totalRevenue = orders.reduce((a, o) => a + o.total + 500, 0);

  return (
    <div style={S.main}>
      <h1 style={{ ...S.heroTitle, fontSize: 32, marginBottom: 6 }}>Admin Dashboard</h1>
      <p style={{ ...S.heroSub, marginBottom: 24 }}>Manage your menu and orders.</p>

      <div style={S.statsRow}>
        <div style={S.statCard}>
          <div style={S.statNum}>{orders.length}</div>
          <div style={S.statLabel}>Total Orders</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statNum}>{menu.length}</div>
          <div style={S.statLabel}>Menu Items</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statNum}>₦{(totalRevenue / 1000).toFixed(1)}k</div>
          <div style={S.statLabel}>Revenue</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["orders", "menu"].map(t => (
          <button key={t} style={S.navBtn(tab === t)} onClick={() => setTab(t)}>
            {t === "orders" ? "📋 Orders" : "🍽 Menu Items"}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <>
          {orders.length === 0 ? (
            <p style={{ color: COLORS.muted }}>No orders yet. Place an order from the menu!</p>
          ) : (
            <div style={S.adminGrid}>
              {[...orders].reverse().map(order => (
                <div key={order.id} style={S.adminCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontWeight: 700 }}>{order.id}</span>
                    <span style={{
                      background: order.stage === 4 ? COLORS.successLight : COLORS.accentLight,
                      color: order.stage === 4 ? COLORS.success : COLORS.accent,
                      fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "4px 10px",
                    }}>{ORDER_STAGES[order.stage].label}</span>
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>👤 {order.customerName}</div>
                  <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>📍 {order.address}</div>
                  <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 10 }}>💳 {order.payment}</div>
                  <div style={{ fontSize: 13, marginBottom: 10 }}>
                    {order.items.map(i => <span key={i.id} style={{ marginRight: 8 }}>{i.name} ×{i.qty}</span>)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: COLORS.accent }}>₦{(order.total + 500).toLocaleString()}</span>
                    {order.stage < 4 && (
                      <button style={S.editBtn} onClick={() => advanceOrder(order.id)}>
                        Advance → {ORDER_STAGES[order.stage + 1]?.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "menu" && (
        <>
          <div style={S.adminForm}>
            <h3 style={{ fontFamily: DISPLAY_FONT, fontSize: 18, marginBottom: 16 }}>
              {editItem ? "Edit Item" : "Add New Item"}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={S.label}>Name</label>
                <input style={S.input} placeholder="Item name" value={form.name} onChange={e => set("name", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Category</label>
                <select style={S.select} value={form.category} onChange={e => set("category", e.target.value)}>
                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>Price (₦)</label>
                <input style={S.input} type="number" placeholder="e.g. 2500" value={form.price} onChange={e => set("price", e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={S.label}>Image URL</label>
              <input style={S.input} placeholder="https://images.unsplash.com/..." value={form.image} onChange={e => set("image", e.target.value)} />
              {form.image && (
                <img src={form.image} alt="preview" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginTop: 8 }}
                  onError={e => e.target.style.display = "none"} />
              )}
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={S.label}>Description</label>
              <input style={S.input} placeholder="Short description" value={form.description} onChange={e => set("description", e.target.value)} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <input type="checkbox" id="popular" checked={form.popular} onChange={e => set("popular", e.target.checked)} />
              <label htmlFor="popular" style={{ fontSize: 13, fontWeight: 500 }}>Mark as Popular</label>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ ...S.primaryBtn, width: "auto", padding: "11px 28px", marginTop: 0 }} onClick={saveItem}>
                {editItem ? "Save Changes" : "Add Item"}
              </button>
              {editItem && (
                <button style={{ ...S.secondaryBtn, width: "auto", padding: "10px 20px", marginTop: 0 }}
                  onClick={() => { setEditItem(null); setForm({ name: "", category: "Rice", price: "", description: "", image: "", popular: false }); }}>
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div style={S.adminGrid}>
            {menu.map(item => (
              <div key={item.id} style={S.adminCard}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: 130, objectFit: "cover", borderRadius: 8, marginBottom: 10, background: COLORS.border }}
                  onError={e => { e.target.style.display = "none"; }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</span>
                  <span style={{ background: COLORS.tag, borderRadius: 6, padding: "3px 10px", fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{item.description}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                  <span style={{ fontWeight: 700, color: COLORS.accent }}>₦{item.price.toLocaleString()}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={S.editBtn} onClick={() => startEdit(item)}>Edit</button>
                    <button style={S.dangerBtn} onClick={() => deleteItem(item.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("menu");
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap";
    document.head.appendChild(link);
  }, []);

  const placeOrder = (form) => {
    const id = genOrderId();
    const order = {
      id,
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      payment: form.payment,
      items: cart,
      total: cart.reduce((a, c) => a + c.price * c.qty, 0),
      stage: 0,
    };
    setOrders(prev => [...prev, order]);
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    setSuccessOrderId(id);
  };

  return (
    <div style={S.app}>
      <NavBar page={page} setPage={setPage} cartCount={cart.reduce((a, c) => a + c.qty, 0)} />

      {page === "menu" && (
        <MenuPage menu={menu} cart={cart} setCart={setCart} setCartOpen={setCartOpen} />
      )}
      {page === "track" && <TrackPage orders={orders} />}
      {page === "admin" && <AdminPage menu={menu} setMenu={setMenu} orders={orders} setOrders={setOrders} />}

      {cartOpen && !checkoutOpen && (
        <CartModal
          cart={cart}
          setCart={setCart}
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => { setCheckoutOpen(false); setCartOpen(true); }}
          onConfirm={placeOrder}
        />
      )}

      {successOrderId && (
        <SuccessModal
          orderId={successOrderId}
          onClose={() => { setSuccessOrderId(null); setPage("menu"); }}
          onTrack={() => { setSuccessOrderId(null); setPage("track"); }}
        />
      )}
    </div>
  );
}
