import React, { useState, useEffect } from 'react';
import { 
  Users, BarChart3, Briefcase, DollarSign, LayoutDashboard, UserPlus, 
  ChevronRight, Package, FileText, TrendingUp, Clock, CreditCard, 
  Search, Bell, Settings, Plus, ArrowUpRight, ArrowDownRight, 
  Kanban, Wallet, Sun, Moon, Trash2, CheckCircle, Filter, Download, 
  Calendar, ShieldCheck, FileSignature, Target, GraduationCap, 
  AlertTriangle, LogOut, Mail, Phone, MessageSquare, StickyNote, 
  BellRing, UserCheck, FileBadge, Receipt, PieChart, Layers, 
  ClipboardList, Users2, Tag
} from 'lucide-react';

// --- Constants ---

const MODULES = {
  LANDING: 'landing',
  CRM: 'crm',
  SALES: 'sales',
  HR: 'hr',
  FINANCE: 'finance'
};

// --- Branding Components ---

const MantiqLogo = ({ className = "h-8", iconOnly = false, light = false }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    {!iconOnly && (
      <span className={`text-[1.2em] font-black tracking-tighter ${light ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
        MANTI
      </span>
    )}
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-[1.4em] w-auto"
    >
      {/* The stylized Q circle */}
      <path 
        d="M85 50C85 69.33 69.33 85 50 85C30.67 85 15 69.33 15 50C15 30.67 30.67 15 50 15C69.33 15 85 30.67 85 50Z" 
        stroke="#38bdf8" 
        strokeWidth="12"
      />
      {/* The Arrow inside */}
      <path 
        d="M50 65V35M50 35L38 47M50 35L62 47" 
        stroke="#38bdf8" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* The Q tail curve */}
      <path 
        d="M75 80C80 85 85 90 90 90" 
        stroke="#38bdf8" 
        strokeWidth="10" 
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// --- Comprehensive Mock Data ---

const MOCK_DATA = {
  crm: {
    leads: [
      { id: 'L-1001', name: 'Mostafa Mahmoud', company: 'Cairo Tech', status: 'Prospect', value: '45,000 EGP' },
      { id: 'L-1002', name: 'Amira Hassan', company: 'Delta Foods', status: 'Contacted', value: '120,000 EGP' },
      { id: 'L-1003', name: 'Zaid Ibrahim', company: 'Alex Steel', status: 'Qualified', value: '250,000 EGP' },
    ],
    customers: [
      { id: 'C-201', name: 'Fatima Al-Sayed', org: 'Giza Systems', level: 'VIP', activeSince: '2021' },
      { id: 'C-202', name: 'Omar Al-Farsi', org: 'PetroJet', level: 'Enterprise', activeSince: '2022' },
    ],
    contacts: [
      { name: 'Layla Mahmoud', role: 'CTO', email: 'layla@giza.com', phone: '+201023456789' },
      { name: 'Ahmed Mansour', role: 'Procurement', email: 'ahmed@petro.com', phone: '+201145678901' },
    ],
    deals: [
      { id: 'D-99', title: 'Enterprise Cloud', stage: 'Negotiation', client: 'Tarek El-Sayed', value: '350,000 EGP' },
      { id: 'D-100', title: 'Security Audit', stage: 'Closed Won', client: 'Amira Hassan', value: '75,000 EGP' },
    ],
    activities: [
      { type: 'Call', subject: 'Initial Discovery', with: 'Mostafa Mahmoud', date: 'Feb 14, 10:00 AM' },
      { type: 'Meeting', subject: 'Contract Review', with: 'Tarek El-Sayed', date: 'Feb 15, 02:30 PM' },
    ],
    reminders: [
      { task: 'Send Proposal', due: 'In 2 hours', priority: 'High' },
      { task: 'Follow up on Quote', due: 'Tomorrow', priority: 'Medium' },
    ],
    communication: [
      { channel: 'Email', direction: 'Outbound', subject: 'Welcome Pack', date: 'Feb 12' },
      { channel: 'WhatsApp', direction: 'Inbound', subject: 'Inquiry about pricing', date: 'Feb 13' },
    ],
    notes: [
      { title: 'Project Specs', author: 'Kareem A.', date: 'Jan 20', size: '2.4 MB' },
      { title: 'Technical Requirements', author: 'Kareem A.', date: 'Jan 22', size: '1.1 MB' },
    ]
  },
  hr: {
    directory: [
      { id: 'EMP-01', name: 'Hany Ramzy', role: 'Team Lead', dept: 'Engineering', status: 'Active' },
      { id: 'EMP-02', name: 'Mona Zaki', role: 'HR Specialist', dept: 'Operations', status: 'On Leave' },
      { id: 'EMP-03', name: 'Sherif Mounir', role: 'Designer', dept: 'Creative', status: 'Active' },
    ],
    attendance: [
      { name: 'Hany Ramzy', date: 'Feb 14', in: '08:45 AM', out: '05:30 PM', status: 'On Time' },
      { name: 'Sherif Mounir', date: 'Feb 14', in: '09:15 AM', out: '06:00 PM', status: 'Late' },
    ],
    leaves: [
      { name: 'Mona Zaki', type: 'Annual', start: 'Feb 10', end: 'Feb 20', status: 'Approved' },
      { name: 'Yasmine Sabri', type: 'Sick', start: 'Feb 14', end: 'Feb 15', status: 'Pending' },
    ],
    payroll: [
      { month: 'January 2024', employees: 48, total: '840,000 EGP', status: 'Processed' },
      { month: 'December 2023', employees: 46, total: '810,000 EGP', status: 'Paid' },
    ],
    contracts: [
      { emp: 'Hany Ramzy', type: 'Permanent', signed: 'Jan 2021', expires: 'N/A' },
      { emp: 'Sherif Mounir', type: 'Contractor', signed: 'Jul 2023', expires: 'Jul 2024' },
    ],
    recruitment: [
      { role: 'Backend Dev', candidates: 14, stage: 'Technical Interview', priority: 'High' },
      { role: 'Accountant', candidates: 8, stage: 'Initial Screening', priority: 'Medium' },
    ],
    performance: [
      { name: 'Hany Ramzy', rating: '4.8/5', lastReview: 'Dec 2023', status: 'Excellent' },
      { name: 'Mona Zaki', rating: '4.2/5', lastReview: 'Dec 2023', status: 'Good' },
    ],
    training: [
      { course: 'AWS Certified', dept: 'Engineering', enrollees: 5, progress: '60%' },
      { course: 'Soft Skills', dept: 'All', enrollees: 48, progress: '100%' },
    ],
    warnings: [
      { name: 'Nour El-Sherif', reason: 'Unexcused Absence', date: 'Jan 15', level: 'First Warning' },
    ],
    resignation: [
      { name: 'Tarek Amin', role: 'Junior Dev', exitDate: 'Mar 01', reason: 'Career Growth' },
    ]
  },
  finance: {
    income: [
      { ref: 'INV-402', client: 'Giza Systems', amount: '+150,000 EGP', date: 'Feb 14' },
      { ref: 'INV-403', client: 'Cairo Tech', amount: '+45,000 EGP', date: 'Feb 12' },
    ],
    expenses: [
      { ref: 'EXP-99', vendor: 'Amazon Web Services', amount: '-4,200 EGP', date: 'Feb 10' },
      { ref: 'EXP-100', vendor: 'Zayed Real Estate', amount: '-45,000 EGP', date: 'Feb 01' },
    ],
    bills: [
      { vendor: 'Telecom Egypt', amount: '2,500 EGP', due: 'Feb 20', status: 'Unpaid' },
      { vendor: 'Electricity South Cairo', amount: '1,800 EGP', due: 'Feb 18', status: 'Paid' },
    ],
    payments: [
      { to: 'Sherif Mounir', amount: '20,000 EGP', method: 'Bank Transfer', date: 'Feb 05' },
    ],
    wallets: [
      { name: 'CIB Corporate', balance: '1,240,000 EGP', type: 'Current' },
      { name: 'QNB Investment', balance: '4,500,000 EGP', type: 'Savings' },
      { name: 'Vodafone Cash', balance: '12,500 EGP', type: 'Digital' },
    ],
    taxes: [
      { type: 'VAT Q1', base: '2.1M EGP', liability: '294,000 EGP', status: 'Pending' },
      { type: 'Income Tax', base: '8.4M EGP', liability: '1.2M EGP', status: 'Filing' },
    ]
  },
  sales: {
    quotations: [
      { id: 'QUO-10', client: 'Dina Mansour', total: '12,500 EGP', validUntil: 'Mar 15', status: 'Sent' },
      { id: 'QUO-11', client: 'Hany Ramzy', total: '45,000 EGP', validUntil: 'Mar 10', status: 'Draft' },
    ],
    orders: [
      { id: 'ORD-202', customer: 'Nour El-Sherif', total: '8,500 EGP', method: 'Cash on Delivery', status: 'Pending' },
    ],
    invoices: [
      { id: 'INV-909', customer: 'Mostafa Mahmoud', total: '45,000 EGP', date: 'Feb 10', status: 'Paid' },
    ],
    products: [
      { name: 'Premium ERP Suite', sku: 'SaaS-01', price: '85,000 EGP', stock: 'Unlimited' },
      { name: 'Consultancy Service', sku: 'SRV-05', price: '2,500 EGP/hr', stock: 'Available' },
    ],
    targets: [
      { rep: 'Ahmed Mansour', target: '200k EGP', achieved: '145k EGP', pct: '72%' },
      { rep: 'Sara Khalil', target: '200k EGP', achieved: '195k EGP', pct: '97%' },
    ],
    commissions: [
      { rep: 'Sara Khalil', amount: '19,500 EGP', period: 'Jan 2024', status: 'Paid' },
    ]
  }
};

// --- System Configuration ---

const SYSTEM_MAP = {
  [MODULES.CRM]: {
    title: "CRM Tracker",
    nav: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'leads', label: 'Leads / Prospects', icon: UserPlus, tableCols: ['ID', 'Name', 'Company', 'Status', 'Value'] },
      { id: 'customers', label: 'Customers / Accounts', icon: Users2, tableCols: ['ID', 'Name', 'Organization', 'Level', 'Since'] },
      { id: 'contacts', label: 'Contacts', icon: Users, tableCols: ['Name', 'Role', 'Email', 'Phone'] },
      { id: 'deals', label: 'Deals / Opportunities', icon: Briefcase, tableCols: ['ID', 'Title', 'Stage', 'Client', 'Value'] },
      { id: 'activities', label: 'Activities (Calls/Tasks)', icon: ClipboardList, tableCols: ['Type', 'Subject', 'With', 'Date'] },
      { id: 'reminders', label: 'Follow-ups & Reminders', icon: BellRing, tableCols: ['Task', 'Due', 'Priority'] },
      { id: 'communication', label: 'Communication History', icon: Mail, tableCols: ['Channel', 'Direction', 'Subject', 'Date'] },
      { id: 'notes', label: 'Notes & Attachments', icon: StickyNote, tableCols: ['Title', 'Author', 'Date', 'Size'] },
      { id: 'settings', label: 'Settings & User Roles', icon: Settings },
    ]
  },
  [MODULES.HR]: {
    title: "HR System",
    nav: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'directory', label: 'Employees Directory', icon: Users2, tableCols: ['ID', 'Name', 'Role', 'Dept', 'Status'] },
      { id: 'attendance', label: 'Attendance & Tracking', icon: Clock, tableCols: ['Name', 'Date', 'In', 'Out', 'Status'] },
      { id: 'leaves', label: 'Leaves & Vacations', icon: Calendar, tableCols: ['Name', 'Type', 'Start', 'End', 'Status'] },
      { id: 'payroll', label: 'Payroll', icon: Wallet, tableCols: ['Month', 'Employees', 'Total Payout', 'Status'] },
      { id: 'contracts', label: 'Contracts & Documents', icon: FileSignature, tableCols: ['Employee', 'Type', 'Signed', 'Expires'] },
      { id: 'recruitment', label: 'Recruitment / Hiring', icon: UserPlus, tableCols: ['Role', 'Candidates', 'Stage', 'Priority'] },
      { id: 'performance', label: 'Performance Evaluation', icon: TrendingUp, tableCols: ['Name', 'Rating', 'Review Date', 'Status'] },
      { id: 'training', label: 'Training & Development', icon: GraduationCap, tableCols: ['Course', 'Dept', 'Enrollees', 'Progress'] },
      { id: 'warnings', label: 'Warnings & Penalties', icon: AlertTriangle, tableCols: ['Name', 'Reason', 'Date', 'Level'] },
      { id: 'resignation', label: 'Resignation / Termination', icon: LogOut, tableCols: ['Name', 'Role', 'Exit Date', 'Reason'] },
      { id: 'settings', label: 'Settings & Permissions', icon: Settings },
    ]
  },
  [MODULES.FINANCE]: {
    title: "Finance Tracker",
    nav: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'income', label: 'Income', icon: ArrowUpRight, tableCols: ['Ref', 'Client', 'Amount', 'Date'] },
      { id: 'expenses', label: 'Expenses', icon: ArrowDownRight, tableCols: ['Ref', 'Vendor', 'Amount', 'Date'] },
      { id: 'bills', label: 'Bills', icon: Receipt, tableCols: ['Vendor', 'Amount', 'Due Date', 'Status'] },
      { id: 'payments', label: 'Payments', icon: CreditCard, tableCols: ['To', 'Amount', 'Method', 'Date'] },
      { id: 'wallets', label: 'Accounts / Wallets', icon: Wallet, tableCols: ['Account Name', 'Balance', 'Type'] },
      { id: 'taxes', label: 'Taxes', icon: ShieldCheck, tableCols: ['Type', 'Base', 'Liability', 'Status'] },
      { id: 'settings', label: 'Settings', icon: Settings },
    ]
  },
  [MODULES.SALES]: {
    title: "Sales Tracker",
    nav: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'quotations', label: 'Quotations / Proposals', icon: FileSignature, tableCols: ['ID', 'Client', 'Total', 'Valid Until', 'Status'] },
      { id: 'orders', label: 'Orders', icon: Package, tableCols: ['Order ID', 'Customer', 'Total', 'Method', 'Status'] },
      { id: 'invoices', label: 'Invoices', icon: Receipt, tableCols: ['Inv ID', 'Customer', 'Total', 'Date', 'Status'] },
      { id: 'products', label: 'Products / Services', icon: Layers, tableCols: ['Name', 'SKU', 'Price', 'Stock'] },
      { id: 'targets', label: 'Sales Targets', icon: Target, tableCols: ['Rep', 'Target', 'Achieved', 'Progress'] },
      { id: 'commissions', label: 'Commissions', icon: Wallet, tableCols: ['Rep', 'Amount', 'Period', 'Status'] },
      { id: 'settings', label: 'Settings', icon: Settings },
    ]
  }
};

// --- Shared Components ---

const StatCard = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-sky-50 dark:bg-sky-900/30 rounded-2xl text-sky-600 dark:text-sky-400">
        <Icon size={24} />
      </div>
      <span className={`text-[10px] font-black px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</h3>
    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{value}</p>
  </div>
);

const DataTable = ({ columns, data, onAction }) => (
  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-500">
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
          <tr>
            {columns.map((c, i) => <th key={i} className="px-8 py-6">{c}</th>)}
            <th className="px-8 py-6 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
          {data && data.length > 0 ? data.map((row, idx) => (
            <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-8 py-6 text-slate-700 dark:text-slate-200 font-bold">{val}</td>
              ))}
              <td className="px-8 py-6 text-right">
                <button onClick={() => onAction('view')} className="p-2 text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"><CheckCircle size={18} /></button>
                <button onClick={() => onAction('delete')} className="p-2 text-slate-400 hover:text-rose-600 ml-2 transition-colors"><Trash2 size={18} /></button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length + 1} className="px-8 py-12 text-center text-slate-400 italic">No records found for this view.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// --- App Root ---

export default function App() {
  const [module, setModule] = useState(MODULES.LANDING);
  const [page, setPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const pushNotify = (msg) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const renderContent = () => {
    if (page === 'dashboard') {
      switch (module) {
        case MODULES.CRM:
          return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Leads" value="1,482" change="+12.5%" isPositive icon={UserPlus} />
                <StatCard title="Open Deals" value="24" change="-2" isPositive={false} icon={Briefcase} />
                <StatCard title="Pipeline Value" value="2.1M EGP" change="+5.2%" isPositive icon={TrendingUp} />
                <StatCard title="Avg Close Time" value="18 Days" change="-3d" isPositive icon={Clock} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Active Prospects</h2>
              <DataTable columns={['ID', 'Name', 'Company', 'Status', 'LTV']} data={MOCK_DATA.crm.leads} onAction={(a) => pushNotify(`Lead ${a}`)} />
            </div>
          );
        case MODULES.HR:
          return (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Active Staff" value="48" change="+4" isPositive icon={Users} />
                <StatCard title="Present Today" value="94%" change="+1%" isPositive icon={UserCheck} />
                <StatCard title="Upcoming Leaves" value="5" change="+2" isPositive={false} icon={Calendar} />
                <StatCard title="Open Jobs" value="12" change="+3" isPositive icon={Plus} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Employee Roster</h2>
              <DataTable columns={['E-ID', 'Name', 'Role', 'Department', 'Status']} data={MOCK_DATA.hr.directory} onAction={(a) => pushNotify(`Employee ${a}`)} />
            </div>
          );
        case MODULES.FINANCE:
          return (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Net Profit" value="450k EGP" change="+18%" isPositive icon={ArrowUpRight} />
                <StatCard title="Expenses" value="120k EGP" change="-5%" isPositive icon={ArrowDownRight} />
                <StatCard title="Cash on Hand" value="3.4M EGP" change="+2%" isPositive icon={Wallet} />
                <StatCard title="VAT Liability" value="12,500 EGP" change="+2k" isPositive={false} icon={ShieldCheck} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Bank Balances</h2>
              <DataTable columns={['Account Name', 'Balance', 'Type']} data={MOCK_DATA.finance.wallets} onAction={(a) => pushNotify(`Bank detail ${a}`)} />
            </div>
          );
        case MODULES.SALES:
          return (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Monthly Sales" value="340k EGP" change="+14%" isPositive icon={Target} />
                <StatCard title="Orders Feb" value="156" change="+22" isPositive icon={Package} />
                <StatCard title="Avg Deal" value="8.5k EGP" change="-200" isPositive={false} icon={TagIcon} />
                <StatCard title="Quote Win Rate" value="42%" change="+5%" isPositive icon={TrendingUp} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Pending Orders</h2>
              <DataTable columns={['Order ID', 'Customer', 'Total', 'Method', 'Status']} data={MOCK_DATA.sales.orders} onAction={(a) => pushNotify(`Order ${a}`)} />
            </div>
          );
        default: return null;
      }
    }

    const currentNav = SYSTEM_MAP[module].nav.find(n => n.id === page);
    if (currentNav && currentNav.tableCols) {
      const dataForPage = MOCK_DATA[module][page] || [];
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white capitalize">{currentNav.label}</h2>
            <button onClick={() => pushNotify(`${currentNav.label} form opened`)} className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center gap-2">
              <Plus size={18} /> Add New
            </button>
          </div>
          <DataTable columns={currentNav.tableCols} data={dataForPage} onAction={(a) => pushNotify(`${page} ${a}`)} />
        </div>
      );
    }

    return (
      <div className="py-24 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-sky-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Settings className="text-sky-600 dark:text-sky-400 animate-spin-slow" size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter capitalize">{page.replace('_', ' ')}</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
          The <b>MANTIQ Engine</b> is processing settings and custom configurations for {module.toUpperCase()}.
        </p>
        <button 
          onClick={() => setPage('dashboard')}
          className="mt-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-[1.5rem] font-black hover:scale-105 active:scale-95 transition-all shadow-2xl"
        >
          Return to Dashboard
        </button>
      </div>
    );
  };

  const TagIcon = (props) => <Package {...props} />;

  if (module === MODULES.LANDING) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-8 transition-colors">
        <div className="fixed top-8 right-8 z-50 flex gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-2xl hover:scale-110 transition-all">
            {darkMode ? <Sun className="text-amber-400" /> : <Moon className="text-sky-600" />}
          </button>
        </div>

        <div className="text-center mb-16 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-center gap-2 mb-8">
            <MantiqLogo className="h-16 text-4xl" />
          </div>
          <h1 className="text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">For Business Development</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium px-12">
            The ultimate unified enterprise OS. Select a specialized tracker below to explore live operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
          {Object.entries(SYSTEM_MAP).map(([id, cfg]) => {
            const ModuleIcon = cfg.nav[0].icon;
            return (
              <button
                key={id}
                onClick={() => { setModule(id); setPage('dashboard'); }}
                className="group relative bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all text-left flex flex-col"
              >
                <div className="bg-sky-600 text-white p-6 rounded-[2rem] inline-block mb-10 shadow-2xl group-hover:scale-110 transition-transform">
                  <ModuleIcon size={36} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">{cfg.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-12 flex-1 leading-relaxed">
                  Management tools for {cfg.title.toLowerCase()} operations.
                </p>
                <div className="flex items-center text-sky-600 dark:text-sky-400 font-black text-xs uppercase tracking-[0.2em]">
                  Enter System <ChevronRight size={18} className="ml-2 group-hover:translate-x-3 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex bg-slate-50 dark:bg-slate-950 transition-colors">
        <aside className="w-80 h-screen fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-30 flex flex-col transition-colors">
          <div className="p-10 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button onClick={() => setModule(MODULES.LANDING)} className="flex items-center gap-3">
              <MantiqLogo className="h-8 text-xl" />
            </button>
          </div>

          <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
            <p className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 opacity-60">
              {SYSTEM_MAP[module].title}
            </p>
            {SYSTEM_MAP[module].nav.map(item => {
              const NavIcon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all ${
                    page === item.id 
                      ? 'bg-sky-600 text-white shadow-2xl shadow-sky-500/30' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <NavIcon size={20} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 font-black">KA</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 dark:text-white truncate">Kareem Abdelaziz</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Admin Portal</p>
              </div>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                {darkMode ? <Sun size={18} className="text-amber-400"/> : <Moon size={18} className="text-sky-600"/>}
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 pl-80 min-h-screen">
          <header className="h-28 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-14 sticky top-0 z-20">
            <div>
              <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
                <span>{module}</span>
                <ChevronRight size={14} />
                <span className="text-sky-600 dark:text-sky-400">{page}</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white capitalize tracking-tighter">{page.replace('_', ' ')}</h1>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="relative">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Global search..." 
                  className="bg-slate-100 dark:bg-slate-900/50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm w-96 focus:ring-2 focus:ring-sky-500 dark:text-white placeholder:font-bold transition-all" 
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-3 text-slate-400 hover:text-sky-600 transition-all">
                  <Bell size={24} />
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>
                </button>
                <button onClick={() => pushNotify('Data export triggered')} className="p-3 text-slate-400 hover:text-sky-600 transition-all">
                  <Download size={24} />
                </button>
                <button onClick={() => setModule(MODULES.LANDING)} className="p-3 text-slate-400 hover:text-rose-500 transition-all ml-4">
                  <LogOut size={24} />
                </button>
              </div>
            </div>
          </header>

          <main className="p-14 max-w-[1600px] mx-auto">
            {renderContent()}
          </main>
        </div>
      </div>

      <div className="fixed bottom-12 right-12 z-[100] space-y-4">
        {notifications.map(n => (
          <div key={n.id} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-6 rounded-[2.5rem] shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-full duration-500 border-l-8 border-sky-500">
            <CheckCircle className="text-emerald-500" size={24} />
            <span className="text-base font-black tracking-tight">{n.msg}</span>
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
