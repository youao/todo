import TodoRouter from "./todo.js";
import UserRouter from "./user.js";

const routes = [
  {
    path: "/api/todo",
    router: TodoRouter,
  },
  {
    path: "/api/user",
    router: UserRouter,
  },
];

const installRoutes = (app) => {
  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });
};

export default installRoutes;
