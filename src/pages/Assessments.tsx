import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Play, Users, Calendar, FileText, Settings } from "lucide-react";

const assessments = [
  {
    id: 1,
    title: "Frontend Developer Assessment",
    description: "Technical assessment for React and TypeScript skills",
    job: "Senior Frontend Developer",
    questions: 12,
    duration: "45 minutes",
    completed: 18,
    created: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    title: "Product Manager Evaluation",
    description: "Strategic thinking and product management skills",
    job: "Product Manager",
    questions: 8,
    duration: "30 minutes",
    completed: 32,
    created: "2024-01-10",
    status: "active",
  },
  {
    id: 3,
    title: "UX Design Portfolio Review",
    description: "Design process and portfolio evaluation",
    job: "UX Designer",
    questions: 6,
    duration: "60 minutes",
    completed: 12,
    created: "2024-01-08",
    status: "draft",
  },
  {
    id: 4,
    title: "Backend Engineering Challenge",
    description: "API design and system architecture skills",
    job: "Backend Engineer",
    questions: 15,
    duration: "90 minutes",
    completed: 45,
    created: "2023-12-20",
    status: "archived",
  },
];

export default function Assessments() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssessments = assessments.filter((assessment) =>
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">Create and manage job-specific assessments</p>
        </div>
        <Button className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Create Assessment
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 active, 2 drafts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">107</div>
            <p className="text-xs text-muted-foreground">+23 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42m</div>
            <p className="text-xs text-muted-foreground">-5m from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Assessments Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredAssessments.map((assessment) => (
          <Card key={assessment.id} className="card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                  <p className="text-sm font-medium text-primary">{assessment.job}</p>
                </div>
                <Badge 
                  variant={assessment.status === "active" ? "default" : assessment.status === "draft" ? "secondary" : "outline"}
                  className={
                    assessment.status === "active" ? "status-active" : 
                    assessment.status === "draft" ? "bg-warning/10 text-warning border-warning/30" : 
                    "status-archived"
                  }
                >
                  {assessment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Questions</p>
                    <p className="font-medium">{assessment.questions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{assessment.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completed</p>
                    <p className="font-medium">{assessment.completed} candidates</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-medium">{new Date(assessment.created).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assessment Builder Teaser */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Create Your First Assessment</h3>
              <p className="text-muted-foreground">Build custom assessments with multiple question types</p>
            </div>
            <Button className="btn-primary">
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}