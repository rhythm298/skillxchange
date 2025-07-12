import { Star, MapPin, Calendar, Users } from "lucide-react";
import { User } from "@/data/mockUsers";
import { SkillTag } from "./SkillTag";
import { Button } from "./ui/button";

interface UserCardProps {
  user: User;
  onRequestSwap?: (user: User) => void;
  showRequestButton?: boolean;
}

export const UserCard = ({ user, onRequestSwap, showRequestButton = true }: UserCardProps) => {
  const handleRequestSwap = () => {
    onRequestSwap?.(user);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Header with profile picture and basic info */}
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-card"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">{user.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{user.location}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(user.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                {user.rating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{user.completedSwaps} swaps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-muted-foreground line-clamp-2">
        {user.bio}
      </p>

      {/* Skills Offered */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Skills Offered</h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsOffered.slice(0, 3).map((skill) => (
            <SkillTag key={skill} skill={skill} size="sm" />
          ))}
          {user.skillsOffered.length > 3 && (
            <span className="px-2 py-0.5 text-xs bg-muted rounded-full text-muted-foreground">
              +{user.skillsOffered.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Looking For</h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsWanted.slice(0, 3).map((skill) => (
            <SkillTag key={skill} skill={skill} size="sm" variant="outline" />
          ))}
          {user.skillsWanted.length > 3 && (
            <span className="px-2 py-0.5 text-xs bg-muted/50 border border-muted rounded-full text-muted-foreground">
              +{user.skillsWanted.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Calendar className="w-3 h-3" />
        <span>Available: {user.availability.join(", ")}</span>
      </div>

      {/* Action Button */}
      {showRequestButton && (
        <Button 
          onClick={handleRequestSwap}
          className="w-full"
          variant="gradient"
          size="sm"
        >
          Request Skill Swap
        </Button>
      )}
    </div>
  );
};