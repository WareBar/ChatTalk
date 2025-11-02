import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);
      if (response.success) {
        alert("Login successful!");
        navigate("/")
      } else if (response.error?.non_field_errors) {
        alert(response.error.non_field_errors[0]);
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #a7f3d0, #ecfdf5, #ffffff)",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card
          sx={{
            width: 400,
            p: 4,
            borderRadius: 6,
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(209, 250, 229, 0.6)",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box textAlign="center" mb={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  borderRadius: "50%",
                  marginBottom: 16,
                  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
                }}
              >
                <MessageCircle size={40} color="#fff" />
              </motion.div>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="text.primary"
                sx={{ letterSpacing: "-0.5px" }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to continue chatting
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  sx: {
                    borderRadius: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d1fae5",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#10b981",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#10b981",
                    },
                  },
                }}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  sx: {
                    borderRadius: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d1fae5",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#10b981",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#10b981",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && (
                <Typography
                  color="error"
                  variant="body2"
                  mt={1}
                  textAlign="center"
                >
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                  py: 1.3,
                  boxShadow: "0 6px 18px rgba(16, 185, 129, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #059669 0%, #047857 100%)",
                    transform: "translateY(-2px)",
                  },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>

              <Typography
                
                variant="body2"
                textAlign="center"
                color="text.secondary"
                mt={3}
              >
                Don’t have an account?{" "}
                <Typography
                  component="span"
                  color="#10b981"
                  sx={{
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  <a
                  onClick={()=>navigate('/register')}
                  >
                    Sign up
                  </a>
                </Typography>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
