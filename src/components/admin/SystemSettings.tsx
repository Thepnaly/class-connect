import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, Bell, Shield, Database, RefreshCw, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

type SyncStatus = "idle" | "syncing" | "success";

export function SystemSettings() {
  const [settings, setSettings] = useState({
    defaultCheckInDuration: "15",
    lateThreshold: "10",
    autoEndCheckIn: true,
    emailNotifications: true,
    semester: "2/2024",
  });

  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your system settings have been updated successfully.",
    });
  };

  const handleSyncData = async () => {
    setSyncStatus("syncing");

    // Simulate API call delay (3 seconds)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setSyncStatus("success");

    toast({
      title: "Sync Complete",
      description: "Data synchronization completed successfully.",
    });

    // Reset status after 5 seconds
    setTimeout(() => {
      setSyncStatus("idle");
    }, 5000);
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">System Settings</h2>
        <p className="text-muted-foreground mt-1">Configure system-wide attendance settings</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Data Synchronization Card */}
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Data Synchronization
            </CardTitle>
            <CardDescription>
              Sync attendance data with the university's central database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Message */}
            {syncStatus === "syncing" && (
              <Alert className="border-info/50 bg-info/10 animate-fade-in">
                <Loader2 className="h-4 w-4 text-info animate-spin" />
                <AlertTitle className="text-info">Synchronizing...</AlertTitle>
                <AlertDescription className="text-info/80">
                  Waiting for data synchronization... Please do not close this page.
                </AlertDescription>
              </Alert>
            )}

            {syncStatus === "success" && (
              <Alert className="border-success/50 bg-success/10 animate-fade-in">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertTitle className="text-success">Sync Complete</AlertTitle>
                <AlertDescription className="text-success/80">
                  Data synchronization completed successfully. All records are up to date.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Last Synchronized</p>
                <p className="text-xs text-muted-foreground">January 28, 2026 at 09:30 AM</p>
              </div>
              <Button
                onClick={handleSyncData}
                disabled={syncStatus === "syncing"}
                size="lg"
                className="min-w-[140px]"
              >
                {syncStatus === "syncing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Data
                  </>
                )}
              </Button>
            </div>

            {/* Progress indicator during sync */}
            {syncStatus === "syncing" && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Syncing records...</span>
                  <span>Please wait</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse w-2/3 transition-all duration-500" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Check-in Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Check-in Settings
            </CardTitle>
            <CardDescription>Configure default check-in behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="duration">Default Check-in Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={settings.defaultCheckInDuration}
                onChange={(e) =>
                  setSettings({ ...settings, defaultCheckInDuration: e.target.value })
                }
                className="w-32"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threshold">Late Threshold (minutes after class start)</Label>
              <Input
                id="threshold"
                type="number"
                value={settings.lateThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, lateThreshold: e.target.value })
                }
                className="w-32"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-end Check-in</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically end check-in when duration expires
                </p>
              </div>
              <Switch
                checked={settings.autoEndCheckIn}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoEndCheckIn: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Manage notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send email alerts for absences and important updates
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Academic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Academic Period
            </CardTitle>
            <CardDescription>Set current academic semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Current Semester</Label>
              <Select
                value={settings.semester}
                onValueChange={(value) => setSettings({ ...settings, semester: value })}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="1/2024">1/2024</SelectItem>
                  <SelectItem value="2/2024">2/2024</SelectItem>
                  <SelectItem value="Summer/2024">Summer/2024</SelectItem>
                  <SelectItem value="1/2025">1/2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-fit">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
