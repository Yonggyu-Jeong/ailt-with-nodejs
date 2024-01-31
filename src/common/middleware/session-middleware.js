const session = require('express-session');
const cookieParser = require('cookie-parser');

module.exports = function setupMiddleware(app) {
  app.use(cookieParser());
  app.use(session({
    secret: 'your-secret-key', // 세션을 암호화하기 위한 키
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // true로 설정하면 HTTPS에서만 동작
      httpOnly: true, // 클라이언트에서 쿠키를 확인만 가능, JavaScript에서는 접근 불가능
      maxAge: 1000 * 60 * 60 * 24, // 세션 유효 시간 (24시간)
    },
  }));
};
