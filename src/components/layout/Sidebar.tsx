import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Tag,
  Settings,
  LogOut,
  BarChart3,
  Boxes,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: ShoppingCart, label: "Ordini", path: "/orders" },
  { icon: Package, label: "Prodotti", path: "/products" },
  { icon: Boxes, label: "Inventario", path: "/inventory" },
  { icon: Users, label: "Clienti", path: "/customers" },
  { icon: Tag, label: "Promozioni", path: "/promotions" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
]

const bottomItems = [
  { icon: Settings, label: "Impostazioni", path: "/settings" },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white font-bold">
            P
          </div>
          <span className="text-lg font-semibold">Panda Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-white"
                    : "text-muted hover:bg-card-hover hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-border p-4 space-y-1">
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-white"
                    : "text-muted hover:bg-card-hover hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
          <button
            onClick={() => {
              localStorage.removeItem("token")
              window.location.href = "/login"
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
          >
            <LogOut className="h-5 w-5" />
            Esci
          </button>
        </div>
      </div>
    </aside>
  )
}
