import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SkillTag } from "@/components/SkillTag";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  User,
  Calendar,
  Mail
} from "lucide-react";

interface SwapRequest {
  id: string;
  fromUser: {
    id: string;
    name: string;
    profilePicture: string;
    rating: number;
  };
  toUser: {
    id: string;
    name: string;
    profilePicture: string;
  };
  offeredSkill: string;
  requestedSkill: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  type: 'sent' | 'received';
}

const mockRequests: SwapRequest[] = [
  {
    id: '1',
    fromUser: {
      id: '2',
      name: 'Maya Chen',
      profilePicture: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
      rating: 4.9
    },
    toUser: {
      id: 'current',
      name: 'You',
      profilePicture: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400'
    },
    offeredSkill: 'Piano',
    requestedSkill: 'JavaScript',
    message: 'Hi! I\'d love to learn JavaScript and can teach you piano in return. I have 10+ years of experience and can help you with music theory as well.',
    status: 'pending',
    createdAt: '2024-01-15',
    type: 'received'
  },
  {
    id: '2',
    fromUser: {
      id: 'current',
      name: 'You',
      profilePicture: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
      rating: 4.5
    },
    toUser: {
      id: '3',
      name: 'Jordan Smith',
      profilePicture: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400'
    },
    offeredSkill: 'React',
    requestedSkill: 'Photography',
    message: 'I\'m interested in learning photography basics. I can help you with React development and modern web technologies.',
    status: 'accepted',
    createdAt: '2024-01-12',
    type: 'sent'
  },
  {
    id: '3',
    fromUser: {
      id: '4',
      name: 'Emma Johnson',
      profilePicture: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400',
      rating: 4.9
    },
    toUser: {
      id: 'current',
      name: 'You',
      profilePicture: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400'
    },
    offeredSkill: 'Yoga',
    requestedSkill: 'Web Design',
    message: 'I saw your web design skills and would love to learn! I can teach you yoga and meditation in exchange.',
    status: 'completed',
    createdAt: '2024-01-08',
    type: 'received'
  }
];

const Requests = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'received' | 'sent'>('all');
  const [requests, setRequests] = useState(mockRequests);

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true;
    return request.type === activeTab;
  });

  const handleAcceptRequest = (requestId: string) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'accepted' as const }
        : request
    ));
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'rejected' as const }
        : request
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'accepted':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-400/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Skill Swap Requests</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your incoming and outgoing skill exchange requests
            </p>
          </div>

          {/* Tabs */}
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: 'all', label: 'All Requests' },
                { key: 'received', label: 'Received' },
                { key: 'sent', label: 'Sent' }
              ].map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.key as any)}
                  className="flex-1 sm:flex-none"
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/20">
                    {requests.filter(r => tab.key === 'all' || r.type === tab.key).length}
                  </span>
                </Button>
              ))}
            </div>

            {/* Request List */}
            <div className="space-y-4">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No requests found</h3>
                  <p className="text-muted-foreground">
                    {activeTab === 'all' 
                      ? 'You don\'t have any skill swap requests yet.'
                      : `You don\'t have any ${activeTab} requests.`
                    }
                  </p>
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <div key={request.id} className="glass-card p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* User Info */}
                      <div className="flex items-start gap-4">
                        <img
                          src={request.fromUser.profilePicture}
                          alt={request.fromUser.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">
                              {request.type === 'sent' ? request.toUser.name : request.fromUser.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(request.status)}`}>
                              {getStatusIcon(request.status)}
                              <span className="ml-1 capitalize">{request.status}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(request.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {request.type === 'sent' ? 'Sent to' : 'Received from'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Skill Exchange Details */}
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {request.type === 'sent' ? 'You offer:' : 'They offer:'}
                            </p>
                            <SkillTag skill={request.offeredSkill} />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {request.type === 'sent' ? 'You want:' : 'They want:'}
                            </p>
                            <SkillTag skill={request.requestedSkill} variant="outline" />
                          </div>
                        </div>

                        {/* Message */}
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-1">Message:</p>
                          <p className="text-sm text-foreground bg-muted/30 rounded-lg p-3">
                            {request.message}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          {request.type === 'received' && request.status === 'pending' && (
                            <>
                              <Button
                                variant="gradient"
                                size="sm"
                                onClick={() => handleAcceptRequest(request.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Decline
                              </Button>
                            </>
                          )}
                          
                          {request.status === 'accepted' && (
                            <Button variant="secondary" size="sm">
                              <Mail className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          )}
                          
                          {request.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Rate Experience
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Requests;