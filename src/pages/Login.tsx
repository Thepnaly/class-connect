import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

      <div className="min-h-screen flex">
        {/* Left Side - Background Image with Overlay */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
            }}
          />
          {/* Dark Blue Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/80" />
          
          {/* Content on Left Side */}
          <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-primary-foreground">
            {/* University Logo */}
            <div className="mb-8 h-24 w-24 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-primary-foreground/30">
              <GraduationCap className="h-14 w-14" />
            </div>
            
            {/* University Name */}
            <h1 className="text-3xl font-bold text-center mb-3">
              King Mongkut's University of Technology
            </h1>
            <p className="text-lg text-primary-foreground/90 text-center mb-8">
              Computer Engineering and Information Technology Department
            </p>
            
            {/* Decorative Line */}
            <div className="w-24 h-1 bg-primary-foreground/40 rounded-full mb-8" />
            
            {/* Tagline */}
            <p className="text-primary-foreground/80 text-center max-w-md">
              Empowering education through innovative attendance management solutions
            </p>
            
            {/* Academic Year Badge */}
            <div className="mt-12 px-6 py-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
              <span className="text-sm font-medium">Academic Year 2024</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Mobile Header - Only visible on smaller screens */}
          <header className="lg:hidden w-full bg-primary text-primary-foreground py-3 px-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-semibold text-sm">King Mongkut's University of Technology</h1>
                <p className="text-xs opacity-90">CEIT Department</p>
              </div>
            </div>
          </header>

          {/* Main Login Section */}
          <main className="flex-1 flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-muted/30 via-background to-muted/20">
            <div className="w-full max-w-md animate-fade-in">
              <Card className="shadow-2xl border-border/50 bg-card">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center ring-4 ring-primary/20">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">CEIT Attendance</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Sign in to access the attendance management system
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Error Alert */}
                  {error && (
                    <Alert variant="destructive" className="animate-fade-in">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Success Alert */}
                  {success && (
                    <Alert className="border-success/50 bg-success/10 text-success animate-fade-in">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username / Student ID</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username or student ID"
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
                          className="h-11 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>

                  {/* Demo Credentials Info */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center mb-3">
                      Demo Credentials (Prototype Only)
                    </p>
                    <div className="grid gap-2 text-xs">
                      <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                        <span className="font-medium text-foreground">Teacher:</span>
                        <code className="text-muted-foreground">teacher001 / password123</code>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                        <span className="font-medium text-foreground">Student:</span>
                        <code className="text-muted-foreground">64010123 / password123</code>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                        <span className="font-medium text-foreground">Admin:</span>
                        <code className="text-muted-foreground">admin / admin123</code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Footer */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                © 2024 CEIT Department. All rights reserved.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}