import axios from "~/utils/axios.config";

export const handleRefreshTokenApi = async () => {
  return await axios.post("/auth/refresh-token");
};

export const handleCheckAuthApi = async () => {
  return await axios.get("/auth/check-auth");
};


// Blog
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

export const handleGetBlogBySlugApi = async (slug) => {
  return await axios.get(`/blogs/detail/${slug}`);
}

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

export const handleGetShipByIdApi = async (id) => {
  return await axios.get(`/ships/${id}`);
}

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

// Hotel
export const handleGetHotelsApi = async () => {
  return await axios.get("/hotel");
};

export const handleGetHotelByIdApi = async (id) => {
  return await axios.get(`/hotel/${id}`);
}

export const handleGetCityApi = async () => {
  return await axios.get("/hotel/city");
};

// export const handleGetHotelBySlugApi = async (slug) => {
//   return await axios.get(`/hotel/${slug}`);
// };