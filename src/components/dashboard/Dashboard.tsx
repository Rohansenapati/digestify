
import { useState } from 'react';
import { Article } from '@/lib/types';
import NewsCard from '../news/NewsCard';
import PreferencesPanel from './PreferencesPanel';
import { RefreshCw, Filter, ChevronRight } from 'lucide-react';

// Mock data for news articles
const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Global Temperatures Hit New Record for Fifth Consecutive Year',
    source: 'Climate News Network',
    author: 'Jane Smith',
    publishedAt: '2023-06-15T14:30:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1664091729644-07a158d7c4ca?q=80&w=1000',
    content: 'Climate scientists have confirmed that global temperatures have reached a new high for the fifth consecutive year, raising urgent concerns about the accelerating pace of climate change...',
    summary: 'Global temperatures have hit a new record high for the fifth consecutive year, according to climate scientists. This trend indicates that climate change is accelerating faster than previously predicted.',
    sentiment: 'negative',
    explanation: 'The article presents concerning climate data showing record-breaking temperatures, which is classified as negative due to the alarming implications for global climate patterns.',
    topics: ['climate', 'science', 'environment'],
    isRead: false,
    isSaved: false
  },
  {
    id: '2',
    title: 'New AI Model Can Predict Protein Structures with Unprecedented Accuracy',
    source: 'Tech Innovations',
    author: 'Michael Chen',
    publishedAt: '2023-06-14T09:15:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=1000',
    content: 'Researchers at Stanford University have developed a revolutionary AI model that can predict the three-dimensional structure of proteins with unprecedented accuracy, potentially transforming drug discovery and biological research...',
    summary: 'Stanford researchers have developed an AI model that predicts protein structures with remarkable accuracy. This breakthrough could accelerate drug discovery and deepen our understanding of biological processes.',
    sentiment: 'positive',
    explanation: 'The article reports on a significant scientific advancement with positive implications for healthcare and research, highlighting the beneficial potential of AI technology.',
    topics: ['ai', 'science', 'health'],
    isRead: false,
    isSaved: true
  },
  {
    id: '3',
    title: 'Global Economy Faces Mixed Signals as Inflation Cools But Growth Slows',
    source: 'Financial Times',
    author: 'Robert Johnson',
    publishedAt: '2023-06-13T16:45:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000',
    content: 'The global economy is sending mixed signals as inflation rates begin to cool in major economies, but growth forecasts are being revised downward. Central banks face difficult decisions about interest rate policies...',
    summary: 'The global economy presents a complex picture with inflation rates decreasing while growth forecasts are lowered. Central banks are navigating difficult policy decisions in this uncertain environment.',
    sentiment: 'neutral',
    explanation: 'The article presents both positive developments (cooling inflation) and negative ones (slowing growth), resulting in a balanced or neutral assessment of the economic situation.',
    topics: ['economy', 'finance', 'business'],
    isRead: true,
    isSaved: false
  },
  {
    id: '4',
    title: 'Renewable Energy Capacity Surpasses Fossil Fuels for First Time',
    source: 'Green Energy Report',
    author: 'Sarah Williams',
    publishedAt: '2023-06-12T11:20:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000',
    content: 'In a historic milestone for the global energy transition, renewable energy capacity has surpassed that of fossil fuels for the first time, according to the International Energy Agency. Solar and wind power installations have accelerated dramatically in the past year...',
    summary: 'Renewable energy capacity has exceeded fossil fuel capacity globally for the first time, with solar and wind power installations growing rapidly. This marks a significant milestone in the transition to clean energy.',
    sentiment: 'positive',
    explanation: 'The article reports on environmental progress with positive implications for climate goals and sustainable development, representing a positive development in the energy sector.',
    topics: ['energy', 'environment', 'technology'],
    isRead: false,
    isSaved: false
  }
];

interface DashboardProps {
  isLoading?: boolean;
}

const Dashboard = ({ isLoading = false }: DashboardProps) => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [isPreferencesPanelOpen, setIsPreferencesPanelOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'saved'>('all');
  
  const toggleSaved = (id: string) => {
    setArticles(
      articles.map(article =>
        article.id === id ? { ...article, isSaved: !article.isSaved } : article
      )
    );
  };

  const markAsRead = (id: string) => {
    setArticles(
      articles.map(article =>
        article.id === id ? { ...article, isRead: true } : article
      )
    );
  };

  const togglePreferencesPanel = () => {
    setIsPreferencesPanelOpen(!isPreferencesPanelOpen);
  };

  const filteredArticles = activeFilter === 'all' 
    ? articles 
    : articles.filter(article => article.isSaved);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Main content */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h1 className="text-3xl font-bold">Your News Feed</h1>
              <div className="flex items-center gap-3">
                <button 
                  className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg text-sm font-medium focus-ring transition-colors"
                  onClick={togglePreferencesPanel}
                >
                  <Filter className="w-4 h-4" />
                  <span>Preferences</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isPreferencesPanelOpen ? 'rotate-90' : ''}`} />
                </button>
                <button className="p-2 hover:bg-accent rounded-lg focus-ring">
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-6 border-b border-border/50">
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeFilter === 'all'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                All Articles
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeFilter === 'saved'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveFilter('saved')}
              >
                Saved
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-background border border-border/50 rounded-xl p-4 h-[280px] animate-pulse"
                  >
                    <div className="h-40 bg-secondary rounded-lg mb-4"></div>
                    <div className="h-4 bg-secondary rounded-full w-3/4 mb-2"></div>
                    <div className="h-4 bg-secondary rounded-full w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredArticles.length === 0 ? (
                  <div className="py-12 text-center">
                    <h3 className="text-lg font-medium mb-2">No articles found</h3>
                    <p className="text-muted-foreground">
                      {activeFilter === 'saved' 
                        ? "You haven't saved any articles yet." 
                        : "No articles match your current preferences."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 content-fade-in">
                    {filteredArticles.map((article) => (
                      <NewsCard
                        key={article.id}
                        article={article}
                        onToggleSaved={() => toggleSaved(article.id)}
                        onRead={() => markAsRead(article.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Preferences Panel (conditionally rendered on mobile, always shown on desktop) */}
          <PreferencesPanel 
            isOpen={isPreferencesPanelOpen} 
            onClose={togglePreferencesPanel} 
            className="md:w-80 hidden md:block"
          />
        </div>
      </div>

      {/* Mobile Preferences Panel */}
      <PreferencesPanel 
        isOpen={isPreferencesPanelOpen} 
        onClose={togglePreferencesPanel} 
        isMobile={true}
        className="md:hidden fixed inset-0 z-40"
      />
    </div>
  );
};

export default Dashboard;
