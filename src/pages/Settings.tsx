import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Store, User, Bell, Shield } from "lucide-react"

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Impostazioni</h1>
        <p className="text-muted">Gestisci le impostazioni del negozio</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-accent" />
              <CardTitle>Negozio</CardTitle>
            </div>
            <CardDescription>Informazioni generali sul negozio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome Negozio</label>
              <Input defaultValue="Panda Store" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="info@pandastore.com" />
            </div>
            <Button>Salva Modifiche</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-accent" />
              <CardTitle>Profilo</CardTitle>
            </div>
            <CardDescription>Gestisci il tuo profilo amministratore</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <Input defaultValue="Admin" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="admin@medusa.local" />
            </div>
            <Button>Aggiorna Profilo</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent" />
              <CardTitle>Notifiche</CardTitle>
            </div>
            <CardDescription>Configura le notifiche</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted">Impostazioni notifiche - Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <CardTitle>Sicurezza</CardTitle>
            </div>
            <CardDescription>Gestisci la sicurezza dell'account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Cambia Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
