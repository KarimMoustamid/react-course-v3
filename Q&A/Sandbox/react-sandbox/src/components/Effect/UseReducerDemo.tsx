import React, { useReducer, useEffect } from "react";
import styles from "./UseReducerDemo.module.css";

// Types for our state and actions
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface State {
  posts: Post[];
  loading: boolean;
  error: string | null;
  selectedPost: Post | null;
}

// Action types
type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Post[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SELECT_POST"; payload: Post }
  | { type: "CLEAR_SELECTION" }
  | { type: "DELETE_POST"; payload: number };

// Initial state
const initialState: State = {
  posts: [],
  loading: false,
  error: null,
  selectedPost: null,
};

// Reducer function
const postsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SELECT_POST":
      return {
        ...state,
        selectedPost: action.payload,
      };
    case "CLEAR_SELECTION":
      return {
        ...state,
        selectedPost: null,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        selectedPost:
          state.selectedPost?.id === action.payload ? null : state.selectedPost,
      };
    default:
      return state;
  }
};

const UseReducerDemo: React.FC = () => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  // Fetch posts from API
  const fetchPosts = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const posts: Post[] = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: posts });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostClick = (post: Post) => {
    dispatch({ type: "SELECT_POST", payload: post });
  };

  const handleClearSelection = () => {
    dispatch({ type: "CLEAR_SELECTION" });
  };

  const handleDeletePost = (postId: number) => {
    // Simulate API delete call
    dispatch({ type: "DELETE_POST", payload: postId });
  };

  const { posts, loading, error, selectedPost } = state;

  return (
    <div className={styles.container}>
      <h1>useReducer Demo with JSONPlaceholder API</h1>

      <div className={styles.header}>
        <button
          onClick={fetchPosts}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Fetching..." : "Refresh Posts"}
        </button>

        {selectedPost && (
          <button
            onClick={handleClearSelection}
            className={styles.buttonSecondary}
          >
            Clear Selection
          </button>
        )}
      </div>

      {error && <div className={styles.errorMessage}>Error: {error}</div>}

      <div className={styles.layout}>
        {/* Posts List */}
        <div className={styles.postsContainer}>
          <h2>Posts ({posts.length})</h2>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            <div>
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className={`${styles.postCard} ${
                    selectedPost?.id === post.id ? styles.postCardSelected : ""
                  }`}
                >
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postBody}>{post.body}</p>
                  <small className={styles.postUserId}>
                    User ID: {post.userId}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Post Details */}
        {selectedPost && (
          <div className={styles.selectedPostContainer}>
            <h2>Selected Post Details</h2>
            <div className={styles.selectedPostCard}>
              <div className={styles.detailRow}>
                <strong>ID:</strong> {selectedPost.id}
              </div>
              <div className={styles.detailRow}>
                <strong>User ID:</strong> {selectedPost.userId}
              </div>
              <div className={styles.detailRowLarge}>
                <strong>Title:</strong>
                <h3 className={styles.selectedPostTitle}>
                  {selectedPost.title}
                </h3>
              </div>
              <div className={styles.detailRowXLarge}>
                <strong>Body:</strong>
                <p className={styles.selectedPostBody}>{selectedPost.body}</p>
              </div>
              <button
                onClick={() => handleDeletePost(selectedPost.id)}
                className={styles.buttonDanger}
              >
                Delete Post
              </button>
            </div>
          </div>
        )}
      </div>

      {/* State Debug Info */}
      <details className={styles.debugContainer}>
        <summary className={styles.debugSummary}>Debug: Current State</summary>
        <pre className={styles.debugContent}>
          {JSON.stringify(state, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default UseReducerDemo;
