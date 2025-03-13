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


export const handleGetShipByIdApi = async (id) => {
  return await axios.get(`/ships/${id}`);
}
export const handleGetBlogTypesApi = async () => {
  return await axios.get("/blogs/types");
};

export const handleGetBlogsApi = async () => {
  return await axios.get("/blogs");
};

export const handleGetBlogPaginationApi = async (page = 0, limit = 6, blogTypeId = null) => {
  return await axios.get(`/blogs/pagination?page=${page}&limit=${limit}&blogTypeId=${blogTypeId}`);
}

export const handleGetBlogByIdApi = async (id) => {
  return await axios.get(`/blogs/${id}`);
};

export const handleGetBlogDescriptionsTypesApi = async () => {
  return await axios.get("/blogs/descriptions/types");
};

export const handleGetDescriptionsBlogApi = async (id) => {
  return await axios.get(`/blogs/descriptions/${id}`);
};

export const handleGetBlogByTypeIdApi = async (id) => {
  return await axios.get(`/blogs/types/${id}`);
}

// Ship
export const handleGetShipsApi = async () => {
  return await axios.get("/ships");
};

export const handleGetCruiseCategoryApi = async () => {
  return await axios.get("/ships/cruise-category");
};

export const handleGetShipBySlugApi = async (slug) => {
  return await axios.get(`/ships/${slug}`);
};

// Feature
export const handleGetFeaturesApi = async () => {
  return await axios.get("/features");
};
export const handleGetFeatureByIdApi = async (id) => {
  return await axios.get(`/features/${id}`);
};

export const handleGetFeatureTypesApi = async () => {
  return await axios.get("/features/types");
};

