
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Download, Send, ChevronRight, Plus, X } from 'lucide-react';

const Roadmap = () => {
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState<string[]>(['growth', 'acquisition']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<null | {
    title: string;
    description: string;
    milestones: { title: string; description: string; timeframe: string; }[];
  }>(null);

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if (e.key === 'Enter' && value && !keywords.includes(value)) {
      setKeywords([...keywords, value]);
      e.currentTarget.value = '';
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleGenerateRoadmap = () => {
    if (!prompt) {
      toast.error("Please enter a brief description of your startup goals");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock generated roadmap data
      const mockRoadmap = {
        title: "6-Month Growth Acceleration Strategy",
        description: "A strategic roadmap focusing on user acquisition, retention optimization, and building scalable marketing channels based on your goals.",
        milestones: [
          {
            title: "Market Research & Target Audience Validation",
            description: "Conduct user interviews and market analysis to validate target segments and refine ideal customer profiles.",
            timeframe: "Month 1"
          },
          {
            title: "Acquisition Channel Testing",
            description: "Test 3-5 acquisition channels to identify most effective growth levers, focusing on CAC and conversion rates.",
            timeframe: "Month 2"
          },
          {
            title: "Retention Optimization",
            description: "Implement engagement features and retention strategies to reduce churn rate by 20%.",
            timeframe: "Month 3"
          },
          {
            title: "Scale Winning Channels",
            description: "Double down on top 2 acquisition channels and increase budget allocation to maximize ROI.",
            timeframe: "Month 4"
          },
          {
            title: "Partnership Development",
            description: "Identify and secure 3-5 strategic partnerships to expand market reach and create growth flywheels.",
            timeframe: "Month 5"
          },
          {
            title: "Data-Driven Optimization",
            description: "Refine growth strategy based on 5 months of data and establish scalable processes for continued growth.",
            timeframe: "Month 6"
          }
        ]
      };
      
      setGeneratedRoadmap(mockRoadmap);
      setIsGenerating(false);
      toast.success("Roadmap generated successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Roadmap Creator</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Create Your Growth Roadmap</CardTitle>
          <CardDescription>
            Describe your startup goals and add keywords to generate a strategic roadmap
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Describe your startup and growth goals</Label>
            <Textarea 
              id="prompt" 
              placeholder="E.g. We're a B2B SaaS platform looking to accelerate user acquisition and improve retention over the next 6 months..." 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="keywords">Add keywords (press Enter to add)</Label>
            <Input 
              id="keywords" 
              placeholder="E.g. saas, b2b, retention..." 
              onKeyDown={handleAddKeyword}
            />
            
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {keyword}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveKeyword(keyword)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleGenerateRoadmap} 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center">Generating... <span className="animate-pulse">...</span></span>
            ) : (
              <span className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Generate Roadmap
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedRoadmap && (
        <Card>
          <CardHeader>
            <CardTitle>{generatedRoadmap.title}</CardTitle>
            <CardDescription>{generatedRoadmap.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {generatedRoadmap.milestones.map((milestone, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{milestone.title}</h3>
                    <Badge variant="outline">{milestone.timeframe}</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">{milestone.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export Roadmap
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Roadmap Templates</CardTitle>
          <CardDescription>Quick-start your planning with our templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto flex justify-between items-center p-4 text-left">
              <div>
                <h3 className="font-medium">User Acquisition Focus</h3>
                <p className="text-sm text-muted-foreground mt-1">90-day plan for optimizing acquisition channels</p>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="h-auto flex justify-between items-center p-4 text-left">
              <div>
                <h3 className="font-medium">Product-Market Fit</h3>
                <p className="text-sm text-muted-foreground mt-1">6-month plan to achieve product-market fit</p>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="h-auto flex justify-between items-center p-4 text-left">
              <div>
                <h3 className="font-medium">Revenue Growth</h3>
                <p className="text-sm text-muted-foreground mt-1">Strategy for 2X revenue in 12 months</p>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roadmap;
