import { usePosts } from '../../hooks/usePosts';
import './UseEffectDemo.css';

const UseEffectDemo = () => {
    // Use the custom hook to fetch only 3 posts
    const { posts, loading, error } = usePosts({ limit: 3 });

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>UseEffectDemo</h2>
            {posts.map((post) => {
                return (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default UseEffectDemo;