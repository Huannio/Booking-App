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

export const handleGetShipsActiveApi = async () => {
  return await axios.get("/ships/active");
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
  limit = null,
  features = [],
  scoreReviews = [],
  orderBy = "id",
  orderType = "ASC"
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
  if (features.length > 0) params.append("features", features.join("%"));
  if (scoreReviews.length > 0)
    params.append("scoreReviews", scoreReviews.join("%"));
  if (orderBy) {
    params.append("orderBy", orderBy);
    params.append("orderType", orderType.toUpperCase());
  }

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
// Feature
export const handleGetAllFeaturesApi = async () => {
  return await axios.get("/features");
};
export const handleGetFeatureByIdApi = async (id) => {
  return await axios.get(`/features/${id}`);
};

export const handleGetFeatureTypesApi = async () => {
  return await axios.get("/features/types");
};

// Hotel
export const handleGetHotelsApi = async () => {
  return await axios.get("/hotel");
};

export const handleGetHotelByIdApi = async (id) => {
  return await axios.get(`/hotel/${id}`);
};

export const handleGetCityApi = async () => {
  return await axios.get("/hotel/city");
};

export const handleGetHotelBySlugApi = async (slug) => {
  return await axios.get(`/hotel/${slug}`);
};

export const handleGetActiveHotelApi = async () => {
  return await axios.get("/hotel/active");
};

export const handleSearchHotelApi = async (
  title = null,
  cityId = null,
  greaterDefaultPrice = null,
  lowerDefaultPrice = null,
  page = 0,
  limit = null
) => {
  const params = new URLSearchParams();

  if (title) params.append("title", title);
  if (cityId !== null) params.append("cityId", cityId);
  if (greaterDefaultPrice !== null)
    params.append("greaterDefaultPrice", greaterDefaultPrice);
  if (lowerDefaultPrice !== null)
    params.append("lowerDefaultPrice", lowerDefaultPrice);
  if (page !== null) params.append("page", page);
  if (limit !== null) params.append("limit", limit);

  return await axios.get(`/hotel/search?${params.toString()}`);
};

// Room
export const handleGetAllRoomByProductSlugApi = async (slug) => {
  return await axios.get(`/rooms/${slug}`);
};

export const handleGetRoomByIdApi = async (id) => {
  return await axios.get(`/rooms/id/${id}`);
};
