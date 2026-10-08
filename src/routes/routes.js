import TodoRouter from "./todo.js";

const routes = [
  {
    path: "/todo",
    router: TodoRouter,
  },
];

const installRoutes = (app) => {
  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });
};

export default installRoutes;
