
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Check, BarChart3, Zap, RefreshCw, Sparkles, Newspaper } from 'lucide-react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center content-fade-in">
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Launching Soon - Join the Waitlist
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                  AI-Powered News Digest
                </span>
                {' '}Customized For You
              </h1>
              <p className="text-xl text-muted-foreground mb-8 md:mb-10">
                Stay informed with personalized news summaries, sentiment analysis, and curated content that matters to you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/auth?mode=signup" 
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium focus-ring transition-colors"
                >
                  <span className="flex items-center justify-center">
                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-6 py-3 rounded-xl border border-border hover:bg-accent/50 font-medium focus-ring transition-colors"
                >
                  View Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Smart Features, Elegant Design
              </h2>
              <p className="text-lg text-muted-foreground">
                DigestSpace delivers a premium news experience with powerful AI technology and a beautiful interface.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`bg-background rounded-xl p-6 border border-border/50 shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Summarization</h3>
                <p className="text-muted-foreground">
                  Get concise, accurate summaries of long articles, powered by advanced AI models.
                </p>
              </div>
              
              <div className={`bg-background rounded-xl p-6 border border-border/50 shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sentiment Analysis</h3>
                <p className="text-muted-foreground">
                  Understand the tone and bias of each article with advanced sentiment detection.
                </p>
              </div>
              
              <div className={`bg-background rounded-xl p-6 border border-border/50 shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Feed</h3>
                <p className="text-muted-foreground">
                  Tailor your news experience with customizable topics, sources, and keywords.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                DigestSpace transforms your news consumption with a seamless three-step process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-5">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Set Your Preferences</h3>
                <p className="text-muted-foreground">
                  Choose your interests, favorite news sources, and important keywords to track.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-5">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">AI News Processing</h3>
                <p className="text-muted-foreground">
                  Our AI fetches relevant articles, generates concise summaries, and analyzes sentiment.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-5">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Enjoy Your Digest</h3>
                <p className="text-muted-foreground">
                  Browse your personalized news feed with AI insights, save articles, and stay informed.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container px-6 mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Save Time and Stay Informed
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    DigestSpace helps you cut through the noise and focus on what matters, with AI that understands your preferences.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      </div>
                      <p>Reduce information overload with smart filtering</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      </div>
                      <p>Get insights from multiple sources in one place</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      </div>
                      <p>Understand article sentiment and potential bias</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      </div>
                      <p>Access your personalized news from any device</p>
                    </li>
                  </ul>
                </div>
                
                <div className="relative p-1 bg-gradient-to-tr from-primary/20 to-blue-400/20 rounded-2xl overflow-hidden shadow-lg">
                  <div className="glass rounded-xl overflow-hidden p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                        DigestSpace
                      </div>
                      <RefreshCw className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-background rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Newspaper className="w-4 h-4 text-primary" />
                          <div className="text-sm font-medium">Technology</div>
                        </div>
                        <h3 className="text-base font-semibold mb-1">AI Breakthrough in Quantum Computing</h3>
                        <p className="text-xs text-muted-foreground">Researchers announce a major advancement in quantum computing that could revolutionize...</p>
                      </div>
                      
                      <div className="bg-background rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Newspaper className="w-4 h-4 text-primary" />
                          <div className="text-sm font-medium">Science</div>
                        </div>
                        <h3 className="text-base font-semibold mb-1">New Discovery in Renewable Energy Storage</h3>
                        <p className="text-xs text-muted-foreground">A team of scientists has developed a novel approach to energy storage that could make renewable...</p>
                      </div>
                      
                      <div className="bg-background rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Newspaper className="w-4 h-4 text-primary" />
                          <div className="text-sm font-medium">Business</div>
                        </div>
                        <h3 className="text-base font-semibold mb-1">Global Markets Respond to Economic Policy Shifts</h3>
                        <p className="text-xs text-muted-foreground">Financial markets around the world are adjusting to new economic policies announced by...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your News Experience?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join DigestSpace today and start receiving personalized, AI-powered news digests tailored to your interests.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/auth?mode=signup" 
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium focus-ring transition-colors"
                >
                  Get Started Now
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-6 py-3 rounded-xl border border-border hover:bg-accent/50 font-medium focus-ring transition-colors"
                >
                  Explore the Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
