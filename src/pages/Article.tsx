
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import ArticleView from '@/components/news/ArticleView';
import Footer from '@/components/layout/Footer';
import { Article } from '@/lib/types';

// Mock articles (would come from an API in a real app)
const MOCK_ARTICLES: Record<string, Article> = {
  '1': {
    id: '1',
    title: 'Global Temperatures Hit New Record for Fifth Consecutive Year',
    source: 'Climate News Network',
    author: 'Jane Smith',
    publishedAt: '2023-06-15T14:30:00Z',
    url: 'https://example.com/article1',
    imageUrl: 'https://images.unsplash.com/photo-1664091729644-07a158d7c4ca?q=80&w=1000',
    content: `Climate scientists have confirmed that global temperatures have reached a new high for the fifth consecutive year, raising urgent concerns about the accelerating pace of climate change.

The World Meteorological Organization (WMO) released data showing that the average global temperature in 2023 was 1.2°C above pre-industrial levels, marking another milestone in what scientists are calling an "unprecedented era of global warming."

"We're witnessing climate change unfold before our eyes," said Dr. Maria Rodriguez, lead climate scientist at the WMO. "The rate of warming has increased dramatically in the past decade, and we're seeing the consequences in more frequent and intense extreme weather events worldwide."

The report highlights several alarming trends:

- The past eight years have been the warmest on record
- Arctic sea ice reached its second-lowest extent in 2023
- Sea levels continue to rise at an accelerating rate
- Carbon dioxide concentrations in the atmosphere reached 420 parts per million, the highest in at least 2 million years

Climate experts warn that without immediate and substantial reductions in greenhouse gas emissions, the world is on track to exceed the 1.5°C warming threshold set by the Paris Agreement well before 2030.

"This isn't just about numbers on a chart," explained Dr. Rodriguez. "These temperature increases translate directly into more destructive hurricanes, longer droughts, deadlier heat waves, and the displacement of millions of people."

The report comes as world leaders prepare for the next UN Climate Change Conference, where nations will face increasing pressure to strengthen their emissions reduction commitments and accelerate the transition to renewable energy.

Environmental advocacy groups have responded to the report with renewed calls for action, emphasizing that the window for preventing catastrophic climate change is rapidly closing.

"Every fraction of a degree matters," said Greenpeace spokesperson Thomas Chen. "This report makes it clear that we need to phase out fossil fuels completely and invest massively in clean energy solutions. There is no more time to waste."`,
    summary: 'Global temperatures have hit a new record high for the fifth consecutive year, according to climate scientists. This trend indicates that climate change is accelerating faster than previously predicted, with 2023 averaging 1.2°C above pre-industrial levels. Experts warn that without immediate action to reduce emissions, the world will exceed the critical 1.5°C threshold before 2030.',
    sentiment: 'negative',
    explanation: 'The article presents concerning climate data showing record-breaking temperatures and accelerating climate change impacts. The content emphasizes alarming trends, uses terms like "urgent concerns" and "unprecedented," and highlights potential catastrophic consequences, making it clearly negative in sentiment.',
    topics: ['climate', 'science', 'environment'],
    isRead: false,
    isSaved: false
  },
  '2': {
    id: '2',
    title: 'New AI Model Can Predict Protein Structures with Unprecedented Accuracy',
    source: 'Tech Innovations',
    author: 'Michael Chen',
    publishedAt: '2023-06-14T09:15:00Z',
    url: 'https://example.com/article2',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=1000',
    content: `In a groundbreaking development for the field of computational biology, researchers at Stanford University have unveiled a revolutionary AI model that can predict the three-dimensional structure of proteins with unprecedented accuracy, potentially transforming drug discovery and biological research.

The new AI system, named ProteinSolver, builds upon previous advances in protein structure prediction but achieves a quantum leap in both accuracy and speed. In blind tests against known protein structures, ProteinSolver achieved an average accuracy of 92.7%, surpassing previous state-of-the-art systems by nearly 15 percentage points.

"What makes this advance particularly significant is that we're not just incrementally improving on existing methods," said Dr. Jennifer Liu, the lead researcher on the project. "We've developed an entirely new approach that combines deep learning with fundamental principles of physical chemistry."

Understanding protein structures is crucial for many aspects of biomedical research. Proteins are the molecular machinery of all living cells, and their three-dimensional shapes determine how they function. Traditionally, determining these structures required laborious laboratory techniques like X-ray crystallography or cryo-electron microscopy, which can take months or years and cost hundreds of thousands of dollars per protein.

ProteinSolver can generate accurate predictions in minutes to hours, depending on the protein's complexity, using standard computing resources.

The implications for drug discovery are particularly exciting. Dr. Robert Kim, a pharmaceutical researcher not involved in the study, explained: "This could accelerate drug development timelines dramatically. When we understand a protein's structure, we can design molecules that interact with it in specific ways – either activating or blocking its function. This is the basis of modern drug design."

The research team has already demonstrated ProteinSolver's capabilities by predicting the structures of several proteins associated with antibiotic resistance, potentially opening new avenues for developing next-generation antibiotics.

The team has made ProteinSolver available as an open-source tool, hoping to accelerate research across fields from medicine to agriculture.

"We believe this technology should be accessible to researchers everywhere," said Dr. Liu. "The potential applications are too important to restrict access."

The breakthrough comes at a time when AI applications in science are expanding rapidly, with protein structure prediction being one of the most challenging problems tackled to date.

Stanford University has filed patents on specific aspects of the technology but maintains that the core system will remain freely available for academic and research purposes.`,
    summary: 'Stanford researchers have developed ProteinSolver, an AI model that predicts protein structures with remarkable 92.7% accuracy, significantly outperforming previous systems. This breakthrough could dramatically accelerate drug discovery by replacing time-consuming laboratory techniques with rapid computational predictions. The team has made the technology open-source to maximize its impact across scientific fields.',
    sentiment: 'positive',
    explanation: 'The article reports on a significant scientific advancement with clear positive implications for healthcare and research. It uses terms like "groundbreaking," "revolutionary," and "quantum leap" to describe the innovation, and emphasizes benefits such as accelerated drug discovery and new possibilities for treating diseases.',
    topics: ['ai', 'science', 'health'],
    isRead: false,
    isSaved: true
  }
};

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // In a real app, fetch the article from an API
    const fetchArticle = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (id && MOCK_ARTICLES[id]) {
          setArticle(MOCK_ARTICLES[id]);
        } else {
          // Article not found
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, navigate]);

  const handleToggleSaved = () => {
    if (article) {
      setArticle({
        ...article,
        isSaved: !article.isSaved
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main className="flex-1 pt-20">
        <ArticleView 
          article={article} 
          onToggleSaved={handleToggleSaved} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
