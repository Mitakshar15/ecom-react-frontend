import React from "react";
import { Avatar, Box, Grid, Rating } from "@mui/material";

const ProductReviewCard = ({ review }) => {
  return (
    <div>
      <Grid container spacing={2} gap={4}>
        <Grid items xs={1}>
          <Box>
            <Avatar
              className="text-white sm:w-36 sm:h-36"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              {review?.user?.firstName?.[0] || "U"}
            </Avatar>
          </Box>
        </Grid>

        <Grid items xs={9} className="pl-4 lg:pl-0">
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{review?.user?.firstName || "Anonymous"}</p>
              <p className="opacity-70">
                {new Date(review?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Rating value={review?.rating?.rating || 0} name="half-rating" readOnly precision={0.5}/>
          <p>
            {review?.review || "No comment provided"}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
