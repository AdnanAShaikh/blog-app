import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Comment from "./Comment";
import axios from "axios";

const CommentSection = ({ blogId }: { blogId: any }) => {
  const [comments, setComments] = useState<any>();
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<any>();

  useEffect(() => {
    if (blogId) {
      axios.get(`/api/comments/${blogId}`).then((res) => setComments(res.data));
    }
  }, [blogId]);

  const handleComment = () => {
    axios
      .post("/api/comments", {
        blogId,
        userId: "currentUserId",
        text,
        parentId: replyTo?._id,
      })
      .then((res) => {
        setComments([...comments, res.data]);
        setText("");
        setReplyTo(null);
      });
  };

  const handleLike = (commentId: any) => {
    axios
      .post(`/api/comments/${commentId}/like`, { userId: "currentUserId" })
      .then((res) => {
        setComments(
          comments.map((c: any) => (c._id === commentId ? res.data : c))
        );
      });
  };

  return (
    <Box>
      <Typography variant="h6">Comments</Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder={
          replyTo ? `Replying to ${replyTo.userId.name}` : "Add a comment..."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" sx={{ mt: 1 }} onClick={handleComment}>
        {replyTo ? "Reply" : "Comment"}
      </Button>
      {comments?.map((comment: any) => (
        <Comment
          key={comment._id}
          comment={comment}
          onReply={setReplyTo}
          onLike={handleLike}
        />
      ))}
    </Box>
  );
};

export default CommentSection;
