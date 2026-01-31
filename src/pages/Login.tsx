import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Dummy credentials for prototype
const DUMMY_CREDENTIALS = {
  teacher: { username: "teacher001", password: "password123", name: "Dr. Somchai Prasert" },
  student: { username: "64010123", password: "password123", name: "Nattapong Wongchai" },
  admin: { username: "admin", password: "admin123", name: "System Administrator" },
};

type UserRole = "teacher" | "student" | "admin";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check credentials
    let matchedRole: UserRole | null = null;
    let matchedName = "";

    for (const [role, creds] of Object.entries(DUMMY_CREDENTIALS)) {
      if (creds.username === username && creds.password === password) {
        matchedRole = role as UserRole;
        matchedName = creds.name;
        break;
      }
    }

    if (matchedRole) {
      setSuccess(`Welcome, ${matchedName}! Redirecting to your dashboard...`);
      
      // Store auth info in sessionStorage for prototype
      sessionStorage.setItem("authUser", JSON.stringify({
        role: matchedRole,
        name: matchedName,
        username,
      }));

      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setError("Invalid username or password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | CEIT Attendance System</title>
        <meta
          name="description"
          content="Login to CEIT Attendance System - Computer Engineering and Information Technology Department"
        />
      </Helmet>

      <div className="min-h-screen w-full flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 border-2 border-white rounded-full" />
            <div className="absolute bottom-40 right-20 w-60 h-60 border-2 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-white rounded-full" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-8">
              <GraduationCap className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-center mb-2">
              Faculty of Engineering
            </h1>
            <p className="text-lg text-center text-white/80 font-medium">
              Computer Engineering & Information Technology Department
            </p>
            <div className="w-24 h-1 bg-white/50 rounded-full my-6" />
            <p className="text-white/70 text-center mt-4 max-w-md">
              Streamlined attendance management for students and faculty members
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Faculty of Engineering
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Computer Engineering & Information Technology Department
              </p>
            </div>

            <Card className="shadow-lg border-border/50">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">CEIT Attendance System</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive" className="mb-4 animate-fade-in">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Success Alert */}
                {success && (
                  <Alert className="mb-4 border-success bg-success/10 text-success animate-fade-in">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                        className="h-11 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-card text-muted-foreground">Demo Credentials</span>
                  </div>
                </div>

                {/* Demo Credentials */}
                <div className="space-y-2">
                  <div 
                    className="flex justify-between items-center p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => { setUsername("teacher001"); setPassword("password123"); }}
                  >
                    <span className="text-sm font-medium text-foreground">Teacher</span>
                    <code className="text-xs text-primary">teacher001 / password123</code>
                  </div>
                  <div 
                    className="flex justify-between items-center p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => { setUsername("64010123"); setPassword("password123"); }}
                  >
                    <span className="text-sm font-medium text-foreground">Student</span>
                    <code className="text-xs text-primary">64010123 / password123</code>
                  </div>
                  <div 
                    className="flex justify-between items-center p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => { setUsername("admin"); setPassword("admin123"); }}
                  >
                    <span className="text-sm font-medium text-foreground">Admin</span>
                    <code className="text-xs text-primary">admin / admin123</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              © 2024 CEIT Department. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
