
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PAGENOTFOUND from "../assets/svgs/404PAGE.svg"


const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #a7f3d0, #ecfdf5, #ffffff)",
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px)",
          borderRadius: 24,
          padding: "3rem 2.5rem",
          border: "1px solid rgba(209, 250, 229, 0.6)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
          maxWidth: 420,
        }}
      >
        <div>
          <img 
          src={PAGENOTFOUND} alt="" />
        </div>

        <Typography
          variant="h3"
          fontWeight="bold"
          color="text.primary"
          sx={{ letterSpacing: "-0.5px", mb: 1 }}
        >
          404
        </Typography>


        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, px: 1 }}
        >
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            borderRadius: 3,
            background:
              "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            py: 1.2,
            px: 3.5,
            boxShadow: "0 6px 18px rgba(16, 185, 129, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background:
                "linear-gradient(135deg, #059669 0%, #047857 100%)",
              transform: "translateY(-2px)",
            },
          }}
          startIcon={<Home />}
        >
          Go Home
        </Button>
      </motion.div>
    </Box>
  );
};

export {PageNotFound};
