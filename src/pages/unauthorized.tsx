import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconLock, IconArrowLeft } from "@tabler/icons-react"
import { authService } from "@/lib/auth"

const UnauthorizedPage = () => {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()

  const handleGoBack = () => {
    if (user?.role === "user") {
      navigate("/")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <IconLock className="size-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Akses Ditolak</CardTitle>
          <CardDescription>
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium">Informasi Akun:</p>
              <p className="text-muted-foreground mt-1">
                Role: <span className="font-semibold capitalize">{user.role}</span>
              </p>
              <p className="text-muted-foreground">
                Email: <span className="font-semibold">{user.email}</span>
              </p>
            </div>
          )}
          <div className="space-y-2">
            <Button onClick={handleGoBack} className="w-full">
              <IconArrowLeft className="size-4" />
              Kembali
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                authService.logout()
                navigate("/login")
              }}
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UnauthorizedPage
