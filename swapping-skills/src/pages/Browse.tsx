import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { UserCard } from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { mockUsers, User } from "@/data/mockUsers";
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { SwapRequestModal } from "@/components/SwapRequestModal";

const ITEMS_PER_PAGE = 8;

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [filters, setFilters] = useState({
    availability: '',
    skillCategory: '',
    rating: 0
  });

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAvailability = !filters.availability || 
      user.availability.includes(filters.availability);
    
    const matchesRating = user.rating >= filters.rating;

    return matchesSearch && matchesAvailability && matchesRating;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleRequestSwap = (user: User) => {
    setSelectedUser(user);
    setShowSwapModal(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Browse Members</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover talented individuals ready to share their skills
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Availability Filter */}
              <select
                value={filters.availability}
                onChange={(e) => setFilters({...filters, availability: e.target.value})}
                className="bg-input border border-white/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Any Time</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
                <option value="Mornings">Mornings</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Flexible">Flexible</option>
              </select>

              {/* Rating Filter */}
              <select
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: Number(e.target.value)})}
                className="bg-input border border-white/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
              </select>
            </div>

            {/* View Mode Toggle and Results Count */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedUsers.length} of {filteredUsers.length} members
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Users Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
              : "space-y-4 mb-8"
          }>
            {paginatedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onRequestSwap={handleRequestSwap}
              />
            ))}
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-1">
                {(() => {
                  const pages = [];
                  const maxVisiblePages = 7;
                  
                  if (totalPages <= maxVisiblePages) {
                    // Show all pages if total pages is small
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Smart pagination with ellipsis
                    if (currentPage <= 4) {
                      // Show first 5 pages + ellipsis + last page
                      for (let i = 1; i <= 5; i++) pages.push(i);
                      if (totalPages > 6) pages.push('...');
                      pages.push(totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      // Show first page + ellipsis + last 5 pages
                      pages.push(1);
                      if (totalPages > 6) pages.push('...');
                      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                    } else {
                      // Show first + ellipsis + current-1, current, current+1 + ellipsis + last
                      pages.push(1);
                      pages.push('...');
                      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                      pages.push('...');
                      pages.push(totalPages);
                    }
                  }
                  
                  return pages.map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                        className="w-10 h-10"
                      >
                        {page}
                      </Button>
                    )
                  ));
                })()}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No members found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({ availability: '', skillCategory: '', rating: 0 });
                    setCurrentPage(1);
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Swap Request Modal */}
      <SwapRequestModal
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
        targetUser={selectedUser}
        currentUserSkills={[]}
      />
    </div>
  );
};

export default Browse;