import http from "../libs/http";

export const getTodoList = (params) => {
  return http.get("todo/list", {
    params,
  });
};

export const postTodoCreate = (title) => {
  return http.post("todo/create", {
    title,
  });
};

export const postTodoUpdateTitle = (id, title) => {
  return http.post("todo/updateTitle", {
    id,
    title,
  });
};

export const postTodoCompleted = (id, is_completed) => {
  return http.post("todo/setCompleted", {
    id,
    is_completed,
  });
};

export const postTodoDeleted = (id, is_deleted) => {
  return http.post("todo/setDeleted", {
    id,
    is_deleted,
  });
};
