
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article, SentimentType } from '@/lib/types';
import { ChevronLeft, Bookmark, BookmarkCheck, Share, ExternalLink, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ArticleViewProps {
  article: Article;
  onToggleSaved: () => void;
}

const getSentimentColor = (sentiment: SentimentType): string => {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-100 text-green-700';
    case 'negative':
      return 'bg-red-100 text-red-700';
    case 'neutral':
    default:
      return 'bg-blue-100 text-blue-700';
  }
};

const getSentimentLabel = (sentiment: SentimentType): string => {
  switch (sentiment) {
    case 'positive':
      return 'Positive';
    case 'negative':
      return 'Negative';
    case 'neutral':
    default:
      return 'Neutral';
  }
};

const ArticleView = ({ article, onToggleSaved }: ArticleViewProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { toast } = useToast();
  
  const formattedDate = format(new Date(article.publishedAt), 'MMMM d, yyyy');
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Article link has been copied to clipboard",
      });
    }
  };

  useEffect(() => {
    // Scroll to top when article loads
    window.scrollTo(0, 0);
  }, [article.id]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to dashboard
        </Link>
      </div>
      
      <article>
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.topics.map((topic) => (
              <span 
                key={topic} 
                className="px-3 py-1 bg-secondary text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium ml-auto",
              getSentimentColor(article.sentiment)
            )}>
              {getSentimentLabel(article.sentiment)}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1.5" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>{formattedDate}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={onToggleSaved}
                className="p-1.5 rounded-full hover:bg-accent focus-ring transition-colors"
                aria-label={article.isSaved ? "Unsave article" : "Save article"}
              >
                {article.isSaved ? (
                  <BookmarkCheck className="w-5 h-5 text-primary" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
              <button 
                onClick={handleShare}
                className="p-1.5 rounded-full hover:bg-accent focus-ring transition-colors"
                aria-label="Share article"
              >
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {article.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden bg-secondary/50">
              <div className={isImageLoaded ? "" : "animate-pulse"}>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className={cn(
                    "w-full h-auto max-h-[500px] object-cover animate-blur-in",
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
            </div>
          )}
        </header>
        
        <div className="mb-10">
          <div className="p-5 bg-secondary/30 rounded-xl mb-8 border border-border/30">
            <h2 className="text-lg font-semibold mb-2">AI Summary</h2>
            <p className="text-muted-foreground">
              {article.summary}
            </p>
          </div>
          
          <div className="prose prose-sm md:prose-base max-w-none">
            <p className="whitespace-pre-line">{article.content}</p>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm font-medium mb-1">Sentiment Analysis</p>
              <div className={cn(
                "inline-block px-3 py-1 rounded-full text-sm font-medium",
                getSentimentColor(article.sentiment)
              )}>
                {getSentimentLabel(article.sentiment)}
              </div>
            </div>
            
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/80 font-medium focus-ring"
            >
              <span className="mr-1.5">View original article</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
            <h3 className="text-base font-semibold mb-2">
              Why this sentiment?
            </h3>
            <p className="text-sm text-muted-foreground">
              {article.explanation}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleView;
