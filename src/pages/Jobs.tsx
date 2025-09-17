import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, MoreHorizontal, Users, Calendar, MapPin } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    description: "Build exceptional user experiences with React and TypeScript",
    status: "active",
    candidates: 23,
    location: "San Francisco, CA",
    type: "Full-time",
    created: "2024-01-15",
    tags: ["React", "TypeScript", "Senior"],
  },
  {
    id: 2,
    title: "Product Manager",
    description: "Lead product strategy and drive cross-functional collaboration",
    status: "active",
    candidates: 45,
    location: "Remote",
    type: "Full-time",
    created: "2024-01-10",
    tags: ["Product", "Strategy", "Remote"],
  },
  {
    id: 3,
    title: "UX Designer",
    description: "Create intuitive and beautiful user interfaces",
    status: "active",
    candidates: 18,
    location: "New York, NY",
    type: "Full-time",
    created: "2024-01-08",
    tags: ["Design", "UX", "Figma"],
  },
  {
    id: 4,
    title: "Backend Engineer",
    description: "Build scalable APIs and microservices",
    status: "archived",
    candidates: 67,
    location: "Austin, TX",
    type: "Full-time",
    created: "2023-12-20",
    tags: ["Backend", "Python", "API"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    description: "Manage infrastructure and deployment pipelines",
    status: "active",
    candidates: 12,
    location: "Seattle, WA",
    type: "Contract",
    created: "2024-01-12",
    tags: ["DevOps", "AWS", "Docker"],
  },
];

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Jobs</h1>
          <p className="text-muted-foreground">Manage your job postings and track applications</p>
        </div>
        <Button className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="card-hover group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {job.title}
                  </CardTitle>
                  <CardDescription>{job.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Job</DropdownMenuItem>
                    <DropdownMenuItem>View Analytics</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      {job.status === "active" ? "Archive" : "Unarchive"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(job.created).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{job.candidates} candidates</span>
                  </div>
                  <Badge 
                    variant={job.status === "active" ? "default" : "secondary"}
                    className={job.status === "active" ? "status-active" : "status-archived"}
                  >
                    {job.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}