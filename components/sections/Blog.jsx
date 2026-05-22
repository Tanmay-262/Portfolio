"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Calendar, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const STATIC_POSTS = [
  {
    id: 1,
    title: "Understanding Network Intrusion Detection with Machine Learning",
    date: "Coming Soon",
    summary: "A deep dive into using Scikit-learn and Python to build real-time threat detection models.",
    link: "#",
    categories: ["Cybersecurity", "Machine Learning"],
    thumbnail: null
  },
  {
    id: 2,
    title: "Building Scalable Full-Stack Apps with Next.js",
    date: "Coming Soon",
    summary: "Best practices, architecture patterns, and optimizations I use when starting a new React application.",
    link: "#",
    categories: ["Web Dev", "Next.js"],
    thumbnail: null
  }
];

const getMediumUsername = (url) => {
  if (!url) return null;
  
  // Match @username format from medium.com/@username
  const match = url.match(/medium\.com\/@([^\/\?]+)/);
  if (match) return match[1];
  
  // Match medium.com/username format
  const plainMatch = url.match(/medium\.com\/([^\/\?]+)/);
  if (plainMatch && !plainMatch[1].startsWith('p/')) return plainMatch[1];

  // If it's already a handle
  if (url.startsWith('@')) return url.substring(1);
  if (url.indexOf('medium.com') === -1 && url.trim().length > 0) return url;
  
  return null;
};

export function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMediumPosts() {
      const username = getMediumUsername(siteConfig.social.medium);
      
      if (!username) {
        setPosts(STATIC_POSTS);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
        );
        const data = await response.json();
        
        if (data.status === "ok" && data.items && data.items.length > 0) {
          const formattedPosts = data.items.map((item, idx) => {
            // Extract cover image from description or content html
            let thumbnail = item.thumbnail;
            if (!thumbnail || !thumbnail.startsWith("http")) {
              const content = item.content || item.description || "";
              const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
              thumbnail = imgMatch ? imgMatch[1] : null;
            }

            // Clean description HTML to extract plain text summary
            let summary = item.description || item.content || "";
            summary = summary
              .replace(/<[^>]*>/g, "")
              .replace(/&nbsp;/g, " ")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"');
            
            if (summary.length > 150) {
              summary = summary.substring(0, 150).trim() + "...";
            }

            // Parse and format date
            let formattedDate = "Recently";
            if (item.pubDate) {
              const cleanedDate = item.pubDate.replace(/-/g, "/");
              const dateObj = new Date(cleanedDate);
              if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }
            }

            return {
              id: item.guid || idx,
              title: item.title,
              date: formattedDate,
              summary: summary,
              link: item.link,
              categories: item.categories && item.categories.length > 0 
                ? item.categories.slice(0, 2).map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)) 
                : ["Medium"],
              thumbnail: thumbnail
            };
          });
          setPosts(formattedPosts);
        } else {
          setPosts(STATIC_POSTS);
        }
      } catch (err) {
        console.error("Error fetching Medium RSS feed:", err);
        setPosts(STATIC_POSTS);
      } finally {
        setLoading(false);
      }
    }

    fetchMediumPosts();
  }, []);

  return (
    <section id="blog" className="py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Recent Writing
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          I occasionally write about AI, cybersecurity, and web development. Here are some of my recent articles.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          // Shimmer/Skeleton Loading state
          Array.from({ length: 2 }).map((_, idx) => (
            <div 
              key={idx} 
              className="flex flex-col h-[420px] rounded-2xl border border-border bg-card/50 overflow-hidden animate-pulse"
            >
              <div className="h-48 w-full bg-muted/60" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="h-4 w-24 bg-muted/60 rounded mb-4" />
                <div className="h-6 w-5/6 bg-muted/60 rounded mb-3" />
                <div className="h-6 w-2/3 bg-muted/60 rounded mb-6" />
                <div className="h-4 w-full bg-muted/40 rounded mb-2" />
                <div className="h-4 w-full bg-muted/40 rounded mb-2" />
                <div className="h-4 w-3/4 bg-muted/40 rounded mb-auto" />
                <div className="h-4 w-28 bg-muted/60 rounded mt-4" />
              </div>
            </div>
          ))
        ) : (
          posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full"
            >
              {/* Blog Thumbnail/Cover Image */}
              <div className="relative h-48 w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
                {post.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-violet-950/5 to-card flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <BookOpen size={40} className="text-primary/30" />
                  </div>
                )}
                
                {/* Categories overlay */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {post.categories.map((cat, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-background/90 text-foreground border border-border backdrop-blur-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blog Content */}
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Calendar size={13} />
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.summary}
                </p>
                
                <div className="flex items-center gap-1 text-sm font-semibold text-primary mt-auto group/btn">
                  <span>Read Article</span>
                  <ArrowUpRight 
                    size={16} 
                    className="transition-transform duration-300 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" 
                  />
                </div>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </section>
  );
}
