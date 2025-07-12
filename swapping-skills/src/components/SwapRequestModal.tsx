import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/data/mockUsers";
import { X } from "lucide-react";

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: User | null;
  currentUserSkills: string[];
}

export const SwapRequestModal = ({ 
  isOpen, 
  onClose, 
  targetUser,
  currentUserSkills = ["JavaScript", "React", "Node.js", "Python", "Design"] // Mock current user skills
}: SwapRequestModalProps) => {
  const [selectedSkillOffered, setSelectedSkillOffered] = useState("");
  const [selectedSkillWanted, setSelectedSkillWanted] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!selectedSkillOffered || !selectedSkillWanted) {
      alert("Please select both skills");
      return;
    }
    
    console.log("Swap request submitted:", {
      targetUser: targetUser?.name,
      skillOffered: selectedSkillOffered,
      skillWanted: selectedSkillWanted,
      message
    });
    
    // Reset form
    setSelectedSkillOffered("");
    setSelectedSkillWanted("");
    setMessage("");
    onClose();
    
    alert("Swap request sent successfully!");
  };

  if (!targetUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Request Skill Swap with {targetUser.name}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Skill I can offer dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Skill I can offer:
            </label>
            <Select value={selectedSkillOffered} onValueChange={setSelectedSkillOffered}>
              <SelectTrigger className="bg-input border-white/20">
                <SelectValue placeholder="Select a skill you can offer" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/20">
                {currentUserSkills.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skill I want dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Skill I want to learn:
            </label>
            <Select value={selectedSkillWanted} onValueChange={setSelectedSkillWanted}>
              <SelectTrigger className="bg-input border-white/20">
                <SelectValue placeholder="Select a skill you want to learn" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/20">
                {targetUser.skillsOffered.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message textbox */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Message (optional):
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message to introduce yourself..."
              className="bg-input border-white/20 min-h-[100px] resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              variant="gradient" 
              onClick={handleSubmit}
              className="flex-1"
            >
              Send Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};