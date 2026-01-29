import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Eye, EyeOff, Loader2, AlertCircle, CheckCircle, Cpu, Network, Zap } from "lucide-react";
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
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    setTimeout(() => setIsPageLoaded(true), 100);
  }, []);

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

      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
        {/* Deep Blue Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,60%,8%)] via-[hsl(217,70%,18%)] to-[hsl(200,80%,25%)]" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(217,90%,35%)/0.3] via-transparent to-[hsl(190,100%,40%)/0.2] animate-gradient-shift" />

        {/* Tech Network Pattern */}
        <div className="absolute inset-0 opacity-30">
          {/* Circuit/Network Lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(200,100%,50%)" strokeWidth="0.5" opacity="0.3" />
              </pattern>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(200,100%,60%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(217,90%,50%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Animated connection lines */}
            <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse-slow" />
            <line x1="70%" y1="10%" x2="90%" y2="35%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse-slow" />
            <line x1="20%" y1="80%" x2="45%" y2="60%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse-slow" />
            <line x1="80%" y1="70%" x2="95%" y2="85%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse-slow" />
            <line x1="5%" y1="50%" x2="25%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse-slow" />
            <line x1="75%" y1="45%" x2="60%" y2="25%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse-slow" />
          </svg>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Hexagon 1 */}
          <div className="absolute top-[10%] left-[5%] w-32 h-32 opacity-20 animate-float-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="hsl(200,100%,60%)" strokeWidth="1" />
            </svg>
          </div>
          
          {/* Hexagon 2 */}
          <div className="absolute bottom-[15%] right-[8%] w-40 h-40 opacity-15 animate-float-delayed">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="hsl(190,100%,50%)" strokeWidth="1.5" />
            </svg>
          </div>
          
          {/* Circle 1 */}
          <div className="absolute top-[30%] right-[15%] w-24 h-24 rounded-full border border-[hsl(200,100%,60%)/0.3] opacity-30 animate-pulse-slow" />
          
          {/* Circle 2 */}
          <div className="absolute bottom-[25%] left-[10%] w-16 h-16 rounded-full border-2 border-[hsl(217,90%,50%)/0.4] opacity-25 animate-float-slow" />
          
          {/* Diamond */}
          <div className="absolute top-[60%] right-[5%] w-20 h-20 rotate-45 border border-[hsl(190,100%,50%)/0.3] opacity-20 animate-float-delayed" />
          
          {/* Dots */}
          <div className="absolute top-[20%] right-[30%] w-2 h-2 rounded-full bg-[hsl(200,100%,60%)] opacity-60 animate-pulse" />
          <div className="absolute top-[70%] left-[25%] w-3 h-3 rounded-full bg-[hsl(190,100%,50%)] opacity-40 animate-pulse-slow" />
          <div className="absolute bottom-[10%] left-[40%] w-2 h-2 rounded-full bg-[hsl(217,90%,60%)] opacity-50 animate-pulse" />
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-[10%] right-[20%] w-64 h-64 rounded-full bg-[hsl(200,100%,50%)/0.15] blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-[10%] left-[10%] w-80 h-80 rounded-full bg-[hsl(217,90%,40%)/0.2] blur-3xl animate-glow-pulse-delayed" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[hsl(190,100%,40%)/0.1] blur-3xl" />

        {/* Main Content Container */}
        <div className={`relative z-10 w-full max-w-md mx-4 transition-all duration-1000 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo and Title - Above Glass Card */}
          <div className={`text-center mb-8 transition-all duration-700 delay-200 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[hsl(200,100%,60%)/0.15] backdrop-blur-sm border border-[hsl(200,100%,60%)/0.3] mb-4 shadow-[0_0_30px_hsl(200,100%,50%)/0.3]">
              <GraduationCap className="h-10 w-10 text-[hsl(200,100%,70%)]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              King Mongkut's University of Technology
            </h1>
            <p className="text-[hsl(200,100%,80%)] text-sm">
              Computer Engineering and Information Technology Department
            </p>
          </div>

          {/* Glassmorphism Login Card */}
          <div className={`relative transition-all duration-700 delay-300 ${isPageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Glow Effect Behind Card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(200,100%,50%)/0.4] via-[hsl(217,90%,50%)/0.3] to-[hsl(190,100%,50%)/0.4] rounded-2xl blur-xl opacity-70" />
            
            {/* Glass Card */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_40px_hsl(200,100%,50%)/0.15]">
              {/* Card Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">CEIT Attendance</h2>
                <p className="text-white/60 text-sm">Sign in to access your dashboard</p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mb-4 bg-destructive/20 border-destructive/50 backdrop-blur-sm animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-white">{error}</AlertDescription>
                </Alert>
              )}

              {/* Success Alert */}
              {success && (
                <Alert className="mb-4 border-[hsl(142,76%,36%)/0.5] bg-[hsl(142,76%,36%)/0.2] text-white backdrop-blur-sm animate-fade-in">
                  <CheckCircle className="h-4 w-4 text-[hsl(142,76%,60%)]" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/80 text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      required
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[hsl(200,100%,60%)] focus:ring-[hsl(200,100%,60%)/0.3] transition-all duration-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/80 text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[hsl(200,100%,60%)] focus:ring-[hsl(200,100%,60%)/0.3] transition-all duration-300 rounded-xl pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Login Button with Gradient and Glow */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-[hsl(200,100%,45%)] via-[hsl(210,100%,50%)] to-[hsl(217,90%,55%)] hover:from-[hsl(200,100%,50%)] hover:via-[hsl(210,100%,55%)] hover:to-[hsl(217,90%,60%)] text-white border-0 shadow-[0_4px_20px_hsl(200,100%,50%)/0.4,0_0_40px_hsl(200,100%,50%)/0.2] hover:shadow-[0_6px_30px_hsl(200,100%,50%)/0.5,0_0_50px_hsl(200,100%,50%)/0.3] transition-all duration-300 transform hover:scale-[1.02]"
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
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-transparent text-white/40">Demo Credentials</span>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                  onClick={() => { setUsername("teacher001"); setPassword("password123"); }}>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">Teacher</span>
                  <code className="text-xs text-[hsl(200,100%,70%)]">teacher001 / password123</code>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                  onClick={() => { setUsername("64010123"); setPassword("password123"); }}>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">Student</span>
                  <code className="text-xs text-[hsl(200,100%,70%)]">64010123 / password123</code>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                  onClick={() => { setUsername("admin"); setPassword("admin123"); }}>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">Admin</span>
                  <code className="text-xs text-[hsl(200,100%,70%)]">admin / admin123</code>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className={`text-center text-xs text-white/40 mt-6 transition-all duration-700 delay-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            © 2024 CEIT Department. All rights reserved.
          </p>

          {/* Tech Icons at Bottom */}
          <div className={`flex justify-center gap-6 mt-4 transition-all duration-700 delay-600 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <Cpu className="h-4 w-4 text-[hsl(200,100%,60%)]" />
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <Network className="h-4 w-4 text-[hsl(200,100%,60%)]" />
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <Zap className="h-4 w-4 text-[hsl(200,100%,60%)]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
