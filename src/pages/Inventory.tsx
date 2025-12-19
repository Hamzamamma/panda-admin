import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input"

export function Inventory() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch("http://localhost:9000/admin/inventory-items", { credentials: "include" })
        const data = await res.json()
        setItems(data.inventory_items || [])
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchInventory()
  }, [])

  const filteredItems = items.filter(item => 
    item.sku?.toLowerCase().includes(search.toLowerCase()) ||
    item.title?.toLowerCase().includes(search.toLowerCase())
  )

  const getStockStatus = (quantity: number) => {
    if (quantity <= 0) return <Badge variant="error">Esaurito</Badge>
    if (quantity < 10) return <Badge variant="warning">Basso</Badge>
    return <Badge variant="success">In Stock</Badge>
  }

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
        <h1 className="text-3xl font-bold">Inventario</h1>
        <p className="text-muted">Gestisci le scorte dei prodotti</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Articoli ({items.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input
                placeholder="Cerca articolo..."
                className="w-64 pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <p className="text-muted text-center py-8">Nessun articolo trovato</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Titolo</TableHead>
                  <TableHead>Quantità</TableHead>
                  <TableHead>Stato</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.sku || "—"}</TableCell>
                    <TableCell>{item.title || "—"}</TableCell>
                    <TableCell>{item.stocked_quantity || 0}</TableCell>
                    <TableCell>{getStockStatus(item.stocked_quantity || 0)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
