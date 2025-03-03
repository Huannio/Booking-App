import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, notification } from "antd";
import { InputField, SelectField, UploadField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import axios from "~/utils/axios.config";
import { useEffect, useState, useCallback, useContext } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetBlogTypesApi, handleGetBlogByIdApi } from "~/api";

const { Option } = Select;

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setGlobalLoading } = useContext(LoadingContext);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(config.blogSchema) });

  const [blogTypes, setBlogTypes] = useState(null);
  const getBlogTypes = useCallback(async () => {
    setGlobalLoading(true);
    const blogTypes = await handleGetBlogTypesApi();
    setBlogTypes(blogTypes);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  const [blog, setBlog] = useState(null);
  const getBlog = useCallback(async () => {
    setGlobalLoading(true);
    const response = await handleGetBlogByIdApi(id);
    setBlog(response);
    const thumbnailFile = {
      uid: "-1",
      name: "thumbnail",
      status: "done",
      url: response.thumbnail,
    };

    reset({
      title: response.title,
      short_desc: response.short_desc,
      type_id: response.type.id,
      thumbnail: [thumbnailFile],
    });
    setGlobalLoading(false);
  }, [id, reset, setGlobalLoading]);

  useEffect(() => {
    getBlogTypes();
    getBlog();
  }, [getBlogTypes, getBlog]);

  const blogTypesOptions =
    blogTypes?.map((blogType) => (
      <Option key={blogType.id} value={blogType.id}>
        {blogType.type}
      </Option>
    )) || [];

  const handleUpdateBlogForm = async (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("short_desc", data.short_desc);
    formData.append("type_id", data.type_id);
    formData.append("thumbnail", data.thumbnail);
    const response = await axios.put(`/blogs/update/${id}`, formData);
    if (response.statusCode === 200) {
      notification.success({
        message: response?.message || "Cập nhật thông tin bài viết thành công!",
      });
      navigate("/blogs");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Cập nhật thông tin bài viết</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdateBlogForm)}
      >
        <div className="group-input">
          <div className="form-group">
            <InputField
              label="Tiêu đề"
              type="text"
              name="title"
              placeholder="Nhập tiêu đề bài viết..."
              control={control}
              error={errors.title}
              status={errors.title && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <InputField
              label="Mô tả ngắn"
              type="text"
              name="short_desc"
              placeholder="Nhập mô tả ngắn bài viết..."
              control={control}
              error={errors.short_desc}
              status={errors.short_desc && "error"}
              inputGroup={false}
            />
          </div>
        </div>

        <div className="group-input">
          <div className="form-group">
            <UploadField
              label="Thumbnail"
              name="thumbnail"
              control={control}
              error={errors.thumbnail}
              inputGroup={true}
              required
              value={watch("thumbnail")}
            />
          </div>

          <div className="form-group">
            <SelectField
              label="Chọn loại bài viết"
              name="type_id"
              placeholder="Chọn loại bài viết..."
              control={control}
              error={errors.type_id}
              status={errors.type_id && "error"}
              options={blogTypesOptions}
              loading={!blogTypesOptions}
              onChange={(value) => setValue("type_id", value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-16">
          {blog?.long_desc && blog?.long_desc.length > 0 ? (
            <Link to={`/blogs/updateDetail/${id}`}>
              <Button outline normal className="align-self-end">
                <div className="label md">Cập nhật chi tiết bài viết</div>
              </Button>
            </Link>
          ) : (
            <Link to={`/blogs/createDetail/${id}`}>
              <Button outline normal className="align-self-end">
                <div className="label md">Tạo chi tiết bài viết</div>
              </Button>
            </Link>
          )}

          <Button
            primary
            normal
            submit
            className="align-self-end interceptor-loading"
          >
            <div className="label md">Cập nhật</div>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Update;
