import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Select, notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "~/utils/axios.config";
import { InputField, SelectField, UploadImageField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetBlogTypesApi } from "~/api";

const { Option } = Select;

function Create() {
  const navigate = useNavigate();
  const { setGlobalLoading } = useContext(LoadingContext);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.blogSchema),
  });

  const handleCreateBlogForm = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("short_desc", data.short_desc);
    formData.append("type_id", data.type_id);
    formData.append("thumbnail", data.thumbnail[0]);
    const response = await axios.post("/blogs/create", formData);

    if (response.statusCode === 201) {
      notification.success({
        message:
          response?.data?.message || "Tạo thông tin bài viết thành công!",
      });
      reset();
      navigate("/blogs");
    }
  };

  const [blogTypes, setBlogTypes] = useState(null);
  const getBlogTypes = useCallback(async () => {
    setGlobalLoading(true);
    const blogTypes = await handleGetBlogTypesApi();
    setBlogTypes(blogTypes);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getBlogTypes();
  }, [getBlogTypes]);

  const blogTypesOptions =
    blogTypes?.map((blogType) => (
      <Option key={blogType.id} value={blogType.id}>
        {blogType.type}
      </Option>
    )) || [];

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Tạo mới người dùng</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleCreateBlogForm)}
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
            <UploadImageField
              label="Thumbnail"
              name="thumbnail"
              control={control}
              error={errors.thumbnail}
              status={errors.thumbnail && "error"}
              variant="thumbnail" 
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

        <Button
          primary
          normal
          submit
          className="align-self-end interceptor-loading"
        >
          <div className="label md">Tạo</div>
        </Button>
      </form>
    </div>
  );
}

export default Create;
