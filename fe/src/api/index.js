import axios from "~/utils/axios.config";

export const handleRefreshTokenApi = async () => {
  return await axios.post("/auth/refresh-token");
};

export const handleCheckAuthApi = async () => {
  return await axios.get("/auth/check-auth");
};

// User
export const handleSearchUsersApi = async (email, page = 0, limit = null) => {
  const params = new URLSearchParams();

  if (email) params.append("email", email);
  if (page !== null) params.append("page", page);
  if (limit !== null) params.append("limit", limit);

  return await axios.get(`/users/search?${params.toString()}`);
};

// Blog
export const handleGetBlogTypesApi = async () => {
  return await axios.get("/blogs/types");
};

export const handleGetBlogsApi = async () => {
  return await axios.get("/blogs");
};

export const handleGetBlogPaginationApi = async (
  page = 0,
  limit = 6,
  blogTypeId = null
) => {
  return await axios.get(
    `/blogs/pagination?page=${page}&limit=${limit}&blogTypeId=${blogTypeId}`
  );
};

export const handleGetBlogByIdApi = async (id) => {
  return await axios.get(`/blogs/${id}`);
};

export const handleGetBlogBySlugApi = async (slug) => {
  return await axios.get(`/blogs/detail/${slug}`);
};

export const handleGetBlogDescriptionsTypesApi = async () => {
  return await axios.get("/blogs/descriptions/types");
};

export const handleGetDescriptionsBlogApi = async (id) => {
  return await axios.get(`/blogs/descriptions/${id}`);
};

export const handleGetBlogByTypeIdApi = async (id) => {
  return await axios.get(`/blogs/types/${id}`);
};

export const handleSearchBlogsApi = async (
  title = null,
  page = 0,
  limit = null
) => {
  const params = new URLSearchParams();

  if (title) params.append("title", title);
  if (page !== null) params.append("page", page);
  if (limit !== null) params.append("limit", limit);

  return await axios.get(`/blogs/search?${params.toString()}`);
};

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

export const handleSearchShipsApi = async (
  title = null,
  categoryId = null,
  greaterDefaultPrice = null,
  lowerDefaultPrice = null,
  page = 0,
  limit = null
) => {
  const params = new URLSearchParams();

  if (title) params.append("title", title);
  if (categoryId !== null) params.append("categoryId", categoryId);
  if (greaterDefaultPrice !== null)
    params.append("greaterDefaultPrice", greaterDefaultPrice);
  if (lowerDefaultPrice !== null)
    params.append("lowerDefaultPrice", lowerDefaultPrice);
  if (page !== null) params.append("page", page);
  if (limit !== null) params.append("limit", limit);

  return await axios.get(`/ships/search?${params.toString()}`);
};

// permissions-management
export const handleSearchPermissionsApi = async (
  name = null,
  page = 0,
  limit = null
) => {
  const params = new URLSearchParams();

  if (name) params.append("name", name);
  if (page !== null) params.append("page", page);
  if (limit !== null) params.append("limit", limit);

  return await axios.get(`/permissions-management/search?${params.toString()}`);
};
