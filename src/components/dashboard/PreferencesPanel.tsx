
import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreferencesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  className?: string;
}

// Sample topics and sources
const SAMPLE_TOPICS = [
  'Technology', 'Business', 'Science', 'Health', 
  'Politics', 'Entertainment', 'Sports', 'World'
];

const SAMPLE_SOURCES = [
  'BBC News', 'CNN', 'The Guardian', 'Reuters', 
  'The New York Times', 'Bloomberg', 'Associated Press', 'The Washington Post'
];

const PreferencesPanel = ({ 
  isOpen, 
  onClose, 
  isMobile = false,
  className 
}: PreferencesPanelProps) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Technology', 'Science']);
  const [selectedSources, setSelectedSources] = useState<string[]>(['BBC News', 'Reuters']);
  const [keywords, setKeywords] = useState<string[]>(['AI', 'climate']);
  const [newKeyword, setNewKeyword] = useState('');
  const [excludedSources, setExcludedSources] = useState<string[]>([]);
  const [newExcludedSource, setNewExcludedSource] = useState('');

  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSourceToggle = (source: string) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const addExcludedSource = () => {
    if (newExcludedSource && !excludedSources.includes(newExcludedSource)) {
      setExcludedSources([...excludedSources, newExcludedSource]);
      setNewExcludedSource('');
    }
  };

  const removeExcludedSource = (source: string) => {
    setExcludedSources(excludedSources.filter(s => s !== source));
  };

  // If this panel should be hidden when closed on mobile
  if (isMobile && !isOpen) return null;

  return (
    <div 
      className={cn(
        "bg-background transition-all duration-300 border-l border-border overflow-y-auto",
        isMobile ? "glass animate-slide-up" : "",
        isOpen ? "" : "md:translate-x-full md:opacity-0 md:invisible",
        className
      )}
    >
      <div className="p-5 border-b border-border/50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">News Preferences</h3>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-accent focus-ring"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Topics Section */}
        <div>
          <h4 className="text-sm font-medium mb-2">Topics</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Select topics you're interested in
          </p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_TOPICS.map((topic) => (
              <button
                key={topic}
                className={cn(
                  "px-3 py-1 text-xs rounded-full transition-colors",
                  selectedTopics.includes(topic)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/80 hover:bg-secondary/70"
                )}
                onClick={() => handleTopicToggle(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Keywords Section */}
        <div>
          <h4 className="text-sm font-medium mb-2">Keywords</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Add specific keywords you want to track
          </p>
          
          <div className="flex mb-3">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm border border-input rounded-l-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Enter keyword"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addKeyword();
                }
              }}
            />
            <button
              onClick={addKeyword}
              className="px-2.5 py-1.5 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 focus-ring transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <div
                  key={keyword}
                  className="flex items-center gap-1 px-2 py-1 bg-accent rounded-full text-xs"
                >
                  <span>{keyword}</span>
                  <button 
                    onClick={() => removeKeyword(keyword)}
                    className="text-muted-foreground hover:text-foreground ml-0.5 focus-ring"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No keywords added</p>
          )}
        </div>

        {/* News Sources Section */}
        <div>
          <h4 className="text-sm font-medium mb-2">Preferred Sources</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Select news sources you prefer
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SAMPLE_SOURCES.map((source) => (
              <label
                key={source}
                className="flex items-center gap-1.5 text-xs"
              >
                <input
                  type="checkbox"
                  checked={selectedSources.includes(source)}
                  onChange={() => handleSourceToggle(source)}
                  className="w-3.5 h-3.5 text-primary rounded focus:ring-primary"
                />
                <span>{source}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Excluded Sources */}
        <div>
          <h4 className="text-sm font-medium mb-2">Excluded Sources</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Add sources you want to exclude
          </p>
          
          <div className="flex mb-3">
            <input
              type="text"
              value={newExcludedSource}
              onChange={(e) => setNewExcludedSource(e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm border border-input rounded-l-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Enter source name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addExcludedSource();
                }
              }}
            />
            <button
              onClick={addExcludedSource}
              className="px-2.5 py-1.5 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 focus-ring transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {excludedSources.length > 0 ? (
            <div className="space-y-2">
              {excludedSources.map((source) => (
                <div
                  key={source}
                  className="flex items-center justify-between px-3 py-1.5 bg-secondary/50 rounded-lg text-xs"
                >
                  <span>{source}</span>
                  <button 
                    onClick={() => removeExcludedSource(source)}
                    className="text-muted-foreground hover:text-destructive ml-2 focus-ring"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No sources excluded</p>
          )}
        </div>
      </div>
      
      <div className="p-5 border-t border-border/50">
        <button
          className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 focus-ring transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default PreferencesPanel;
