// const app = require("./app");
// const http = require("http");
// const { sequelize } = require("./models");
// const dotenv = require("dotenv");
// dotenv.config();

// const server = http.createServer(app);
// const PORT = process.env.PORT || 5000;

// (async () => {
//   try {
//     await sequelize.sync();
//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//   }
// })();