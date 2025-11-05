const { register, login } = require('../controllers/authController');

const authRoutes = (app) => {
  // 用户注册
  app.post('/api/auth/register', register);
  
  // 用户登录
  app.post('/api/auth/login', login);
};

module.exports = authRoutes;