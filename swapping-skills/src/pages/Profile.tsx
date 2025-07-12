import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SkillTag } from "@/components/SkillTag";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/data/mockUsers";
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Star, 
  Users, 
  Edit3,
  Save,
  X,
  Plus
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    location: user.location,
    bio: user.bio,
    skillsOffered: user.skillsOffered,
    skillsWanted: user.skillsWanted,
    availability: user.availability,
    isPublic: user.isPublic
  });

  const handleSave = () => {
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      location: user.location,
      bio: user.bio,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted,
      availability: user.availability,
      isPublic: user.isPublic
    });
    setIsEditing(false);
  };

  const addSkill = (type: 'offered' | 'wanted', skill: string) => {
    if (skill.trim()) {
      if (type === 'offered') {
        setEditForm({
          ...editForm,
          skillsOffered: [...editForm.skillsOffered, skill.trim()]
        });
      } else {
        setEditForm({
          ...editForm,
          skillsWanted: [...editForm.skillsWanted, skill.trim()]
        });
      }
    }
  };

  const removeSkill = (type: 'offered' | 'wanted', skillToRemove: string) => {
    if (type === 'offered') {
      setEditForm({
        ...editForm,
        skillsOffered: editForm.skillsOffered.filter(skill => skill !== skillToRemove)
      });
    } else {
      setEditForm({
        ...editForm,
        skillsWanted: editForm.skillsWanted.filter(skill => skill !== skillToRemove)
      });
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-8">
          {/* Profile Header */}
          <div className="glass-card p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
                  />
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full border-4 border-card flex items-center justify-center hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5 text-primary-foreground" />
                  </button>
                </div>
                
                {/* Stats */}
                <div className="flex gap-6 mt-6 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(user.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-secondary" />
                      <span className="font-semibold">{user.completedSwaps}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Swaps</p>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="text-3xl font-bold bg-transparent border-b border-white/20 text-foreground focus:outline-none focus:border-primary"
                      />
                    ) : (
                      <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
                    )}
                    
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                          className="bg-transparent border-b border-white/20 text-foreground focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <span>{user.location}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSave} variant="gradient" size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  {isEditing ? (
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={3}
                      className="w-full bg-input border border-white/20 rounded-lg p-3 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell others about yourself..."
                    />
                  ) : (
                    <p className="text-muted-foreground">{user.bio}</p>
                  )}
                </div>

                {/* Availability */}
                <div className="flex flex-wrap gap-2">
                  {user.availability.map((time) => (
                    <span
                      key={time}
                      className="px-3 py-1 bg-secondary/20 text-secondary border border-secondary/30 rounded-full text-sm"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Skills Offered */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Skills I Offer</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editForm.skillsOffered : user.skillsOffered).map((skill) => (
                    <div key={skill} className="relative group">
                      <SkillTag skill={skill} />
                      {isEditing && (
                        <button
                          onClick={() => removeSkill('offered', skill)}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-2 h-2 text-white" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => {
                        const skill = prompt("Enter a skill you can offer:");
                        if (skill) addSkill('offered', skill);
                      }}
                      className="px-3 py-1 border-2 border-dashed border-white/30 rounded-full text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Skill
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Skills I Want to Learn</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editForm.skillsWanted : user.skillsWanted).map((skill) => (
                    <div key={skill} className="relative group">
                      <SkillTag skill={skill} variant="outline" />
                      {isEditing && (
                        <button
                          onClick={() => removeSkill('wanted', skill)}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-2 h-2 text-white" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => {
                        const skill = prompt("Enter a skill you want to learn:");
                        if (skill) addSkill('wanted', skill);
                      }}
                      className="px-3 py-1 border-2 border-dashed border-white/30 rounded-full text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Skill
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="glass-card p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Profile Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Public Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow other users to discover and contact you
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEditing ? editForm.isPublic : user.isPublic}
                    onChange={(e) => isEditing && setEditForm({...editForm, isPublic: e.target.checked})}
                    className="sr-only peer"
                    disabled={!isEditing}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;