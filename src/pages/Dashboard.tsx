import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { DollarSign, ShoppingCart, Package, Users, TrendingUp } from "lucide-react"

export function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await fetch("http://localhost:9000/admin/orders", { credentials: "include" })
        const ordersData = await ordersRes.json()
        
        const productsRes = await fetch("http://localhost:9000/admin/products", { credentials: "include" })
        const productsData = await productsRes.json()
        
        const customersRes = await fetch("http://localhost:9000/admin/customers", { credentials: "include" })
        const customersData = await customersRes.json()

        const orders = ordersData.orders || []
        const products = productsData.products || []
        const customers = customersData.customers || []

        const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)

        setStats({
          totalRevenue: totalRevenue / 100,
          totalOrders: orders.length,
          totalProducts: products.length,
          totalCustomers: customers.length,
        })
        setRecentOrders(orders.slice(0, 5))
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted">Benvenuto nel pannello di amministrazione</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted">Ricavi Totali</CardTitle>
            <DollarSign className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs mt-1 text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" /> +12.5% dal mese scorso
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted">Ordini</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex items-center text-xs mt-1 text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" /> +8.2% dal mese scorso
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted">Prodotti</CardTitle>
            <Package className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <div className="flex items-center text-xs mt-1 text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" /> +3 nuovi
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted">Clienti</CardTitle>
            <Users className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <div className="flex items-center text-xs mt-1 text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" /> +24 nuovi
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ordini Recenti</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-muted text-center py-8">Nessun ordine recente</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                  <div>
                    <p className="font-medium">#{order.display_id || order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€{((order.total || 0) / 100).toFixed(2)}</p>
                    <p className="text-sm text-muted">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
