import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const candidates = [
  {
    id: 1,
    name: "Kaushik Vala",
    email: "kaushikvala20@gmail.com",
    phone: "+91 9712041882",
    location: "Surat, India",
    stage: "tech",
    job: "Senior Frontend Developer",
    applied: "2025-08-11",
    experience: "0 years",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: 2,
    name: "Jaypal Vala",
    email: "jaypal.vala@example.com",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    stage: "screen",
    job: "Product Manager",
    applied: "2024-01-16",
    experience: "7 years",
    skills: ["Product Strategy", "Analytics", "Leadership"],
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9123456789",
    location: "Bengaluru, India",
    stage: "offer",
    job: "UX Designer",
    applied: "2024-01-14",
    experience: "4 years",
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 4,
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phone: "+91 9988776655",
    location: "Pune, India",
    stage: "applied",
    job: "Backend Engineer",
    applied: "2024-01-12",
    experience: "6 years",
    skills: ["Python", "PostgreSQL", "AWS"],
  },
  {
    id: 5,
    name: "Anjali Gupta",
    email: "anjali.gupta@example.com",
    phone: "+91 9234567890",
    location: "Delhi, India",
    stage: "hired",
    job: "DevOps Engineer",
    applied: "2024-01-10",
    experience: "5 years",
    skills: ["Docker", "Kubernetes", "Terraform"],
  },
  {
    id: 6,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 9345678901",
    location: "Hyderabad, India",
    stage: "rejected",
    job: "Senior Frontend Developer",
    applied: "2024-01-08",
    experience: "3 years",
    skills: ["Vue.js", "JavaScript", "CSS"],
  },
];

const stageColors = {
  applied: "status-applied",
  screen: "status-screen",
  tech: "bg-warning/10 text-warning border-warning/30",
  offer: "bg-accent/10 text-accent border-accent/30",
  hired: "status-active",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function Candidates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.job.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "all" || candidate.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Candidates</h1>
          <p className="text-muted-foreground">
            Manage applications and track candidate progress
          </p>
        </div>
        <Button className="btn-primary">Import Candidates</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="screen">Screening</SelectItem>
                  <SelectItem value="tech">Technical</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="card-hover">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary-hover text-white font-semibold">
                    {getInitials(candidate.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{candidate.name}</CardTitle>
                  <p className="text-muted-foreground">{candidate.job}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                  <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
                  <DropdownMenuItem>Add Notes</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Reject Candidate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{candidate.location}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Applied on {new Date(candidate.applied).toLocaleDateString()}
              </p>
              <Badge
                className={
                  stageColors[candidate.stage as keyof typeof stageColors]
                }
              >
                {candidate.stage}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}