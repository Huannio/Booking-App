import axios from "~/utils/axios.config";

export const handleLogoutApi = async () => {
  localStorage.removeItem("user");
  return await axios.post("/auth/logout");
};

export const handleRefreshTokenApi = async () => {
  return await axios.post("/auth/refresh-token");
};

export const handleCheckAuthApi = async () => {
  return await axios.get("/auth/check-auth");
};

export const handleGetBlogTypesApi = async () => {
  return await axios.get("/blogs/types");
};

export const handleGetBlogsApi = async () => {
  return await axios.get("/blogs");
}

export const handleGetBlogByIdApi = async (id) => {
  return await axios.get(`/blogs/${id}`);
}

export const handleGetBlogDescriptionsTypesApi = async () => {
  return await axios.get("/blogs/descriptions/types");
}

export const handleGetDescriptionsBlogApi = async (id) => {
  return await axios.get(`/blogs/descriptions/${id}`);
}