import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { UserCard } from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { mockUsers, User } from "@/data/mockUsers";
import { Plus, Filter, Search, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { SwapRequestModal } from "@/components/SwapRequestModal";
import { LoginModal } from "@/components/LoginModal";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRequestSwap = (user: User) => {
    setSelectedUser(user);
    setShowSwapModal(true);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center py-12 md:py-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Exchange Skills,</span>
              <br />
              <span className="text-foreground">Grow Together</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with talented individuals in your community. Share what you know, learn what you need.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/browse">
                <Button variant="gradient" size="lg">
                  Browse Skills
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
              <Link to="/profile">
                <Button variant="outline" size="lg">
                  Create Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="glass-card p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-input border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Users Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.slice(0, 8).map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onRequestSwap={handleRequestSwap}
                />
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mb-12">
            <Link to="/browse">
              <Button variant="outline" size="lg">
                View All Members
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <Button variant="floating" className="floating-btn" asChild>
        <Link to="/profile">
          <Plus className="w-6 h-6" />
        </Link>
      </Button>

      {/* Modals */}
      <SwapRequestModal
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
        targetUser={selectedUser}
        currentUserSkills={[]}
      />
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Index;
