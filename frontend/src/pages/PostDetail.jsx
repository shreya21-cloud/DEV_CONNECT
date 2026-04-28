import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/posts/${id}`);
        navigate('/');
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <div className="text-center mt-2">Loading post...</div>;
  if (error) return <div className="text-center mt-2 error-msg">{error}</div>;
  if (!post) return <div className="text-center mt-2">Post not found</div>;

  return (
    <div className="post-detail animate-fade-in glass-panel" style={{ padding: '3rem' }}>
      <h1 className="post-detail-title">{post.title}</h1>
      
      <div className="post-meta" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <span>By {post.author.name}</span> • 
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        
        {user && user._id === post.author._id && (
          <span style={{ marginLeft: 'auto' }}>
            <button onClick={handleDelete} className="btn " style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)', padding: '0.4rem 1rem' }}>Delete</button>
          </span>
        )}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="post-tags" style={{ marginBottom: '2rem' }}>
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="post-detail-content">
        {post.content}
      </div>
    </div>
  );
};

export default PostDetail;
