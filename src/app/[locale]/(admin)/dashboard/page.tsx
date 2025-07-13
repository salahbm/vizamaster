import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '../../../../../auth';
import { fetchAllVacancies } from '@/hooks/admin/fetch-vacancy';
import { DB } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';
import {
  BadgeCheck,
  Building2,
  Calendar,
  Clock,
  LineChart,
  Briefcase,
  Users,
  Activity,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Component to display recent vacancies
async function RecentVacancies() {
  const recentVacancies = await fetchAllVacancies({ limit: 5 });

  return (
    <div className="space-y-4">
      {recentVacancies.map((vacancy) => (
        <div key={vacancy.id} className="flex items-center gap-4">
          <div className="rounded-full p-2 bg-primary/10">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{vacancy.title}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(vacancy.createdAt, { addSuffix: true })}
            </p>
          </div>
          <Badge variant={vacancy.isActive ? 'default' : 'outline'}>
            {vacancy.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      ))}
    </div>
  );
}

// Component to display country statistics
async function CountryStats() {
  const countries = await DB.country.findMany({
    include: {
      _count: {
        select: { jobs: true },
      },
    },
  });

  return (
    <div className="space-y-4">
      {countries.map((country) => (
        <div key={country.id} className="flex items-center gap-4">
          <div className="rounded-full p-2 bg-primary/10">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between">
              <p className="text-sm font-medium leading-none">{country.name}</p>
              <p className="text-sm">{country._count.jobs} jobs</p>
            </div>
            <Progress
              className="h-2"
              value={(country._count.jobs / 10) * 100}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Dashboard() {
  const session = await auth();
  const activeVacancies = await fetchAllVacancies({ isActive: true });
  const trendingVacancies = await fetchAllVacancies({ isTrend: true });
  const totalVacancies = await DB.job.count();
  const totalCountries = await DB.country.count();

  // Get current date for the greeting
  const currentHour = new Date().getHours();
  let greeting = 'Good morning';
  if (currentHour >= 12 && currentHour < 18) greeting = 'Good afternoon';
  else if (currentHour >= 18) greeting = 'Good evening';

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 py-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {greeting}, {session?.user?.name?.split(' ')[0] || 'Admin'} 👋
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your recruitment platform
              today.
            </p>
          </div>

          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Button>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Vacancies
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalVacancies}</div>
                  <p className="text-xs text-muted-foreground">
                    {activeVacancies.length} active vacancies
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Activity className="h-3 w-3 mr-1" />
                    {Math.round(
                      (activeVacancies.length / totalVacancies) * 100
                    ) || 0}
                    % active rate
                  </div>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Trending Vacancies
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {trendingVacancies.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (trendingVacancies.length / totalVacancies) * 100
                    ) || 0}
                    % of total vacancies
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    Featured on homepage
                  </div>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Countries
                  </CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCountries}</div>
                  <p className="text-xs text-muted-foreground">
                    Global recruitment network
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {Math.round(totalVacancies / totalCountries) || 0} vacancies
                    per country avg.
                  </div>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Last Updated
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-medium">
                    {new Date().toLocaleDateString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleTimeString()}
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Data refreshed now
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Countries Overview</CardTitle>
                  <CardDescription>
                    Distribution of vacancies across countries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CountryStats />
                </CardContent>
              </Card>

              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Vacancies</CardTitle>
                  <CardDescription>
                    Latest job postings on your platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentVacancies />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Vacancy Performance</CardTitle>
                  <CardDescription>
                    Analysis of vacancy engagement
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] flex flex-col justify-center items-center text-center p-4 border border-dashed rounded-lg">
                    <LineChart className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-medium text-lg">Analytics Dashboard</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Detailed analytics will be available soon
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>
                    Vacancy distribution by region
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] flex flex-col justify-center items-center text-center p-4 border border-dashed rounded-lg">
                    <Building2 className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-medium text-lg">Regional Insights</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Geographic data visualization coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                  <CardDescription>Vacancy trends over time</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] flex flex-col justify-center items-center text-center p-4 border border-dashed rounded-lg">
                    <TrendingUp className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-medium text-lg">Trend Visualization</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Detailed trend analysis coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
