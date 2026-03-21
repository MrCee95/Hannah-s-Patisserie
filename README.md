# 🥐 Hannah's Patisserie | Artisanal Bakery OS (Kasoa)

A high-performance, full-stack e-commerce engine built for a modern artisanal bakery and culinary school in Osu, Accra. This platform manages real-time inventory, secure administrative controls, and interactive baking masterclass bookings.

---

## ✨ Features

- **🛍️ Dynamic Storefront:** Real-time product grid with "Quick View" modals for ingredients and allergens.
- **🛡️ Admin Dashboard:** A secure, password-protected suite at `/admin` to manage orders and cake inquiries.
- **⚡ Inventory Kill-Switch:** One-click "Sold Out" toggles that update the storefront instantly.
- **⏰ Automatic Restock:** A `pg_cron` job that resets daily inventory every morning at 6:00 AM GMT.
- **🛒 Smart Shopping:** "Recently Viewed" logic using local storage to increase customer retention.
- **🖨️ Kitchen Mode:** A CSS-optimized "Print Prep List" for physical order management in the kitchen.
- **📧 Automated CRM:** Instant "Thank You" emails triggered by Stripe Webhooks via Resend.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL + Realtime)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom "Stone & Gold" theme)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Payments:** [Stripe](https://stripe.com/)
- **Email:** [Resend](https://resend.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/mrcee95/hannah's-patisserie.git](https://github.com/mrcee95/hannah's-patisserie.git)
cd hannah's-patisserie
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file and add my keys:
```text
NEXT_PUBLIC_SUPABASE_URL=my_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=my_key
SUPABASE_SERVICE_ROLE_KEY=my_admin_key
STRIPE_SECRET_KEY=my_key
RESEND_API_KEY=my_key
ADMIN_PASSWORD=my_secure_password
```

### 4. Run the development server
```bash
npm run dev
```

---

## 🎨 Design Philosophy
The UI is built on a **"Stone & Gold"** palette, utilizing `Instrument Serif` for a high-end, editorial feel that reflects the craftsmanship of the baking process. 

**Hannah's Patisserie — Handcrafted in Kasoa.**
```

