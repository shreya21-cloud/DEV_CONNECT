import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(t => t);
      await axios.post('/posts', { title, content, tags: tagArray });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '4rem auto' }}>
      <div className="glass-panel">
        <h2 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Write a New Post</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="E.g., Getting Started with React Context"
              required 
            />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input 
              type="text" 
              className="form-control" 
              value={tags} 
              onChange={e => setTags(e.target.value)} 
              placeholder="react, javascript, webdev"
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea 
              className="form-control" 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              placeholder="Share your thoughts here..."
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
