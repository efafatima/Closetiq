// Backend utility functions for common operations
export const generatePaginationQuery = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

export const formatErrorResponse = (error) => {
  return {
    status: error.status || 500,
    message: error.message || 'An error occurred',
  };
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const generateJWT = (payload, secret, expiresIn) => {
  // This would typically use jsonwebtoken library
  // Placeholder for demonstration
  return 'token';
};
