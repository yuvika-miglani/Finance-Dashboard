# Finance-Dashboard
A clean, interactive, and responsive finance management interface designed to help users track their financial activity. This project focuses on modern frontend architecture, state management, and role-based UI behavior.

Live Demo: https://financedashboard-pink.vercel.app/

Key Feautures:

📊 Advanced Analytics
- Cash Flow Trend: An interactive Area Chart visualizing Income vs. Expenses over time with smooth gradients.

- Budget vs. Actual: A comparison bar chart that evaluates real spending against predefined limits for categories like Food, Shopping, and Transit.

- Goal Tracking: Visual progress bars for specific savings goals (e.g., Summer Vacation Fund).

- Liability Tracking: Dedicated monitoring for fixed EMIs (Home & Car loans) with status indicators.

⚪️ Simulated RBAC
- Admin Mode: Grants permission to add, edit, or delete transactions.

- Viewer Mode: A read-only state that restricts data modification while maintaining full access to analytics.

🛠️ Transaction Management
- Full list of transactions with detailed categorization.

- Dynamic filtering by type (Income/Expense) and category.

- Real-time balance updates across all dashboard widgets.

Tech Stack
* Core: React.js (Vite)

* Styling: Tailwind CSS 

* Charts: Recharts

* Icons: Lucide React

* Animations: Framer Motion



⚙️ Installation & Setup

- Clone the repository:

Bash
git clone https://github.com/yuvika-miglani/finance-dashboard.git

- Install dependencies:

Bash
npm install

- Start the development server:

Bash
npm run dev
