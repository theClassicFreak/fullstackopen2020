import React from 'react';
const Blog = ({ blog }) => (
    <div>
        {blog.title} {blog.author}
        <button onClick={() => {}}> View </button>
    </div>
);

export default Blog;