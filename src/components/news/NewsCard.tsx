
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Article, SentimentType } from '@/lib/types';
import { Bookmark, BookmarkCheck, ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  article: Article;
  onToggleSaved: () => void;
  onRead: () => void;
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

const NewsCard = ({ article, onToggleSaved, onRead }: NewsCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  const handleArticleClick = () => {
    if (!article.isRead) {
      onRead();
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSaved();
  };

  return (
    <Link 
      to={`/article/${article.id}`} 
      className={cn(
        "block bg-background border overflow-hidden border-border/50 rounded-xl card-hover focus-ring",
        article.isRead ? "opacity-80" : ""
      )}
      onClick={handleArticleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className={cn(
          "w-full h-48 bg-secondary/50 overflow-hidden",
          isImageLoaded ? "" : "animate-pulse"
        )}>
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-500",
                isHovered ? "scale-105" : "scale-100",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
          )}
        </div>
        
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            getSentimentColor(article.sentiment)
          )}>
            {getSentimentLabel(article.sentiment)}
          </span>
        </div>
        
        <button
          className="absolute top-3 right-3 p-1.5 rounded-full glass hover:bg-white/90 focus-ring transition-colors"
          onClick={handleSaveClick}
          aria-label={article.isSaved ? "Unsave article" : "Save article"}
        >
          {article.isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-primary" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{article.source}</span>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
        
        <h3 className="font-semibold mb-2 leading-snug">
          {article.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.summary}
        </p>
        
        <div className="mt-4 pt-2 border-t border-border/40 flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {article.topics.slice(0, 2).map((topic) => (
              <span 
                key={topic} 
                className="px-2 py-0.5 bg-secondary text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
            {article.topics.length > 2 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-secondary/50">
                +{article.topics.length - 2}
              </span>
            )}
          </div>
          
          <div className="flex items-center text-primary hover:text-primary/80 text-xs font-medium">
            <span className="mr-1">Read more</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
