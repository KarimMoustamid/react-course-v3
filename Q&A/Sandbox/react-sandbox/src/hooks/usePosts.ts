import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface PostsData {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface UsePostsOptions {
    limit?: number;
    page?: number;
}

interface UsePostsReturn {
    posts: PostsData[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const usePosts = (options: UsePostsOptions = {}): UsePostsReturn => {
    const { limit = 10, page = 1 } = options;
    const [posts, setPosts] = useState<PostsData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Build query parameters
            const params = new URLSearchParams();
            if (limit) params.append('_limit', limit.toString());
            if (page > 1) params.append('_page', page.toString());
            
            const response = await axios.get<PostsData[]>(
                `https://jsonplaceholder.typicode.com/posts?${params.toString()}`
            );
            setPosts(response.data);
        } catch (err) {
            setError('Failed to fetch posts');
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    }, [limit, page]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return {
        posts,
        loading,
        error,
        refetch: fetchPosts
    };
};