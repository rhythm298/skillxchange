import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Volume2, 
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  LogOut,
  Trash2,
  Download
} from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    newRequests: true,
    acceptedRequests: true,
    reminders: false,
    newsletter: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true
  });

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'en',
    fontSize: 'medium'
  });

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Settings</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Customize your SkillSwap experience
            </p>
          </div>

          {/* Notifications Settings */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'push', label: 'Push Notifications', description: 'Receive browser push notifications' },
                { key: 'newRequests', label: 'New Skill Requests', description: 'When someone wants to swap skills with you' },
                { key: 'acceptedRequests', label: 'Accepted Requests', description: 'When your skill request is accepted' },
                { key: 'reminders', label: 'Session Reminders', description: 'Reminders for upcoming skill sessions' },
                { key: 'newsletter', label: 'Newsletter', description: 'Monthly updates and featured skills' }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-foreground">{setting.label}</h3>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[setting.key as keyof typeof notifications]}
                      onChange={(e) => setNotifications({
                        ...notifications,
                        [setting.key]: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'profileVisible', label: 'Public Profile', description: 'Allow others to find and view your profile' },
                { key: 'showEmail', label: 'Show Email', description: 'Display your email address on your profile' },
                { key: 'showPhone', label: 'Show Phone', description: 'Display your phone number on your profile' },
                { key: 'showLocation', label: 'Show Location', description: 'Display your city and state' },
                { key: 'allowMessages', label: 'Allow Messages', description: 'Let other users send you direct messages' }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div className="flex items-center gap-3">
                    {privacy[setting.key as keyof typeof privacy] ? (
                      <Eye className="w-4 h-4 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-red-500" />
                    )}
                    <div>
                      <h3 className="font-medium text-foreground">{setting.label}</h3>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy[setting.key as keyof typeof privacy]}
                      onChange={(e) => setPrivacy({
                        ...privacy,
                        [setting.key]: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Appearance & Language</h2>
            </div>

            <div className="space-y-6">
              {/* Theme */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Theme</h3>
                <div className="flex gap-3">
                  <Button
                    variant={appearance.theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => setAppearance({...appearance, theme: 'dark'})}
                    className="flex-1"
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    Dark
                  </Button>
                  <Button
                    variant={appearance.theme === 'light' ? 'default' : 'outline'}
                    onClick={() => setAppearance({...appearance, theme: 'light'})}
                    className="flex-1"
                  >
                    <Sun className="w-4 h-4 mr-2" />
                    Light
                  </Button>
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Language</h3>
                <select
                  value={appearance.language}
                  onChange={(e) => setAppearance({...appearance, language: e.target.value})}
                  className="w-full bg-input border border-white/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                </select>
              </div>

              {/* Font Size */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Font Size</h3>
                <div className="flex gap-2">
                  {['small', 'medium', 'large'].map((size) => (
                    <Button
                      key={size}
                      variant={appearance.fontSize === size ? 'default' : 'outline'}
                      onClick={() => setAppearance({...appearance, fontSize: size})}
                      className="flex-1 capitalize"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Volume2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Account</h2>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-3" />
                Download My Data
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </Button>
              
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="w-4 h-4 mr-3" />
                Delete Account
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-muted-foreground text-center">
                SkillSwap v1.0.0 • Last updated: January 2024
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;