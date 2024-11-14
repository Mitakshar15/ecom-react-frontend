import React from "react";
import { Avatar, Box, Grid, Rating } from "@mui/material";

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={4}>
        <Grid items xs={1}>
          <Box>
            <Avatar
              className="text-white sm:w-36 sm:h-36"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              M
            </Avatar>
          </Box>
        </Grid>

        <Grid items xs={9} className="pl-4 lg:pl-0">
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Mitaksahar</p>
              <p className="opacity-70">April 5, 2023</p>
            </div>
          </div>

          <Rating value={3.5} name="half-rating" readOnly precision={0.5}/>
          <p>
            Very Nice Shirt, Good Quality.
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
