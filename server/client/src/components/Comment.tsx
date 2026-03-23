import { useState, useEffect } from "react";
import {
  TextField,
  Avatar,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";

const Comment = ({
  comment,
  onReply,
  onLike,
}: {
  comment: any;
  onReply: any;
  onLike: any;
}) => {
  return (
    <Box display="flex" gap={2} mt={2}>
      <Avatar>{comment.userId.name[0]}</Avatar>
      <Box>
        <Typography variant="subtitle2">{comment.userId.name}</Typography>
        <Typography variant="body2">{comment.text}</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton size="small" onClick={() => onLike(comment._id)}>
            {comment.likes.includes("currentUserId") ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
          <Typography variant="caption">{comment.likes.length}</Typography>
          <Button size="small" onClick={() => onReply(comment)}>
            Reply
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
