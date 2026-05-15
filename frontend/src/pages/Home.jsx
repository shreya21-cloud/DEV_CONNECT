import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center mt-2">Loading posts...</div>;

  return (
    <div className="animate-fade-in">
      <h1 className="hero-title text-center">
        Welcome to your <span className="text-accent">Developer Space</span>
      </h1>
      <p className="hero-subtitle text-center">
        Discover the latest thoughts, concepts, and tutorials from the community.
      </p>

      {posts.length === 0 ? (
        <div className="glass-panel text-center delay-100 animate-fade-in">
          <h3 className="mb-1">No posts found</h3>
          <p className="text-secondary">Be the first one to share your thoughts!</p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post, i) => (
            <div key={post._id} className={`glass-panel post-card animate-fade-in delay-${(i % 3 + 1) * 100}`}>
              <h3>{post.title}</h3>
              <div className="post-meta">
                <span>By {post.author.name}</span> • 
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="post-excerpt">
                {post.content.substring(0, 150)}...
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              <div className="mt-auto">
                <Link to={`/posts/${post._id}`} className="read-more">Read Full Article</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
