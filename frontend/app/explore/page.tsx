'use client';

import { useState, useMemo } from 'react';
import { Search, Star, GitFork, Activity, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  blockchain: string;
}

interface Developer {
  id: string;
  name: string;
  avatar: string;
  contributions: number;
  verified: boolean;
}

const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'uniswap-v4',
    description: 'Next generation AMM protocol with enhanced features',
    stars: 2500,
    forks: 450,
    language: 'Solidity',
    blockchain: 'Ethereum',
  },
  {
    id: '2',
    name: 'optimism-bridge',
    description: 'Official bridge for Optimism L2 scaling solution',
    stars: 1800,
    forks: 320,
    language: 'TypeScript',
    blockchain: 'Optimism',
  },
  {
    id: '3',
    name: 'solana-program-library',
    description: 'Collection of Solana programs and examples',
    stars: 3200,
    forks: 780,
    language: 'Rust',
    blockchain: 'Solana',
  },
  {
    id: '4',
    name: 'polygon-staking',
    description: 'Staking contracts for Polygon network',
    stars: 950,
    forks: 210,
    language: 'Solidity',
    blockchain: 'Polygon',
  },
  {
    id: '5',
    name: 'ethereum-erc20',
    description: 'Standard ERC20 token implementation',
    stars: 4200,
    forks: 1500,
    language: 'Solidity',
    blockchain: 'Ethereum',
  },
  {
    id: '6',
    name: 'cosmos-sdk-starter',
    description: 'Template for building Cosmos SDK applications',
    stars: 680,
    forks: 190,
    language: 'Go',
    blockchain: 'Cosmos',
  },
];

const mockDevelopers: Developer[] = [
  {
    id: '1',
    name: 'vitalik.eth',
    avatar: 'https://images.unsplash.com/photo-1602434228300-a645bce6891b?w=200&h=200&fit=crop',
    contributions: 1234,
    verified: true,
  },
  {
    id: '2',
    name: 'satoshi.btc',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
    contributions: 987,
    verified: true,
  },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [blockchainFilter, setBlockchainFilter] = useState('all');

  // Filter repositories based on search query and blockchain filter
  const filteredRepositories = useMemo(() => {
    return mockRepositories.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          repo.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBlockchain = blockchainFilter === 'all' || 
                              repo.blockchain.toLowerCase() === blockchainFilter.toLowerCase();
      return matchesSearch && matchesBlockchain;
    });
  }, [searchQuery, blockchainFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Explore Web3 Projects</h1>
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search repositories..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={blockchainFilter} onValueChange={setBlockchainFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Blockchain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chains</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="solana">Solana</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="cosmos">Cosmos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Search Results for "{searchQuery}"
          </h2>
          {filteredRepositories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepositories.map((repo) => (
                <Card key={repo.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{repo.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{repo.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {repo.stars}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-4 w-4 mr-1" />
                        {repo.forks}
                      </div>
                      <span className="ml-auto text-sm">{repo.language}</span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {repo.blockchain}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No repositories found matching your search.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Trending Repositories (only shown when not searching) */}
      {!searchQuery && (
        <>
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Trending Repositories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRepositories.slice(0, 6).map((repo) => (
                <Card key={repo.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{repo.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{repo.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {repo.stars}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-4 w-4 mr-1" />
                        {repo.forks}
                      </div>
                      <span className="ml-auto text-sm">{repo.language}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Developer Leaderboard */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top Contributors</h2>
            <div className="bg-card rounded-lg p-6">
              {mockDevelopers.map((dev) => (
                <div
                  key={dev.id}
                  className="flex items-center gap-4 py-4 border-b last:border-0"
                >
                  <img
                    src={dev.avatar}
                    alt={dev.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{dev.name}</span>
                      {dev.verified && (
                        <Award className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {dev.contributions} contributions
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Recommendations */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {mockRepositories.map((repo) => (
                  <CarouselItem key={repo.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{repo.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {repo.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <Activity className="h-4 w-4" />
                          <span className="text-sm">{repo.blockchain}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </>
      )}
    </div>
  );
}