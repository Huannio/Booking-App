import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CloseOutlined } from "@ant-design/icons";
import { TextField, ListField, UploadField } from "~/components/Input";
import classNames from "classnames/bind";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
  // TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import styles from "./Blog.module.scss";
import config from "~/config";
import Button from "~/components/Button";
import SortableItem from "~/components/Sort/SortableItem";
import axios from "~/utils/axios.config";
import { useCallback, useContext, useEffect, useState } from "react";
import { handleGetBlogDescriptionsTypesApi } from "~/api";
import { LoadingContext } from "~/components/Loading/Loading";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";

function CreateDetail() {
  const { id } = useParams();

  const cx = classNames.bind(styles);
  const { setGlobalLoading } = useContext(LoadingContext);

  const [blogDescTypes, setBlogDescTypes] = useState(null);
  const getBlogDescTypes = useCallback(async () => {
    setGlobalLoading(true);
    const res = await handleGetBlogDescriptionsTypesApi();
    setBlogDescTypes(res);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getBlogDescTypes();
  }, [getBlogDescTypes]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.blogDetailSchema),
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "contentBlocks",
  });

  const handleAddParagraph = () => {
    append({
      id: Date.now().toString(),
      type: "Paragraph",
      type_id: blogDescTypes[1].id,
      blog_id: id,
      content: "",
    });
  };

  const handleAddList = () => {
    append({
      id: Date.now().toString(),
      type: "List",
      type_id: blogDescTypes[3].id,
      blog_id: id,
      content: "",
    });
  };

  const handleAddImage = () => {
    append({
      id: Date.now().toString(),
      type: "Image",
      type_id: blogDescTypes[2].id,
      blog_id: id,
      file: null,
    });
  };

  const paragraphRemove = (index) => {
    remove(index);
  };

  const listRemove = (index) => {
    remove(index);
  };

  const imageRemove = (index) => {
    remove(index);
  };

  // Drag and drop
  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  // Touch sensor
  // const touchSensor = useSensor(TouchSensor, {
  //   activationConstraint: {
  //     delay: 250, // Nhấn giữ 250ms
  //     tolerance: 500, // Dung sai cảm ứng 500px
  //   },
  // });

  const sensors = useSensors(pointerSensor, mouseSensor);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    // Vị trí cũ và mới của item
    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);

    // Thay đổi vị trí của item
    arrayMove(fields, oldIndex, newIndex);
    // Thay đổi vị trí của item trong form
    move(oldIndex, newIndex);
  };

  const navigate = useNavigate();

  const handleCreateBlogForm = async (data) => {
    const formData = new FormData();
    const contentBlocks = data.contentBlocks.map((block) => {
      if (block.type === "Image") {
        return { ...block, file: undefined };
      }
      return block;
    });

    formData.append("contentBlocks", JSON.stringify(contentBlocks));

    data.contentBlocks.forEach((block) => {
      if (block.type === "Image") {
        formData.append("images", block.file);
      }
    });

    const response = await axios.post("/blogs/createDetails", formData);
    if (response.statusCode === 201) {
      notification.success({
        message:
          response?.message || "Tạo thông tin chi tiết bài viết thành công!",
      });
      navigate("/blogs");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Tạo chi tiết bài viết</h6>
      <div className="divider"></div>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleCreateBlogForm)}
      >
        <div
          className="flex gap-12"
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 20,
          }}
        >
          <Button
            normal
            primary
            onClick={() =>
              handleAddParagraph({
                content: "",
              })
            }
          >
            Tạo paragraph
          </Button>

          <Button
            normal
            primary
            onClick={() =>
              handleAddList({
                content: "",
              })
            }
          >
            Tạo list
          </Button>

          <Button
            normal
            primary
            onClick={() =>
              handleAddImage({
                content: "",
              })
            }
          >
            Tạo hình ảnh
          </Button>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <ul>
            <SortableContext
              items={fields?.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => {
                return (
                  <SortableItem key={field.id} id={field.id}>
                    {field.type === "Paragraph" && (
                      <div className={cx("custom-paragraph")}>
                        <TextField
                          control={control}
                          name={`contentBlocks.${index}.content`}
                          label={`Paragraph`}
                          placeholder={`Paragraph`}
                          error={errors?.contentBlocks?.[index]?.content}
                        />
                        <button
                          type="button"
                          onClick={() => paragraphRemove(index)}
                          className={cx("remove-btn")}
                        >
                          <CloseOutlined />
                        </button>
                      </div>
                    )}

                    {field.type === "List" && (
                      <li className={cx("custom-list")}>
                        <ListField
                          control={control}
                          name={`contentBlocks.${index}.content`}
                          label={`List`}
                          placeholder={`List`}
                          error={errors?.contentBlocks?.[index]?.content}
                          inputGroup={false}
                        />
                        <button
                          type="button"
                          onClick={() => listRemove(index)}
                          className={cx("remove-btn")}
                        >
                          <CloseOutlined />
                        </button>
                      </li>
                    )}

                    {field.type === "Image" && (
                      <div className={cx("custom-image")}>
                        <UploadField
                          control={control}
                          name={`contentBlocks.${index}.file`}
                          error={errors?.contentBlocks?.[index]?.file}
                        />
                        <button
                          type="button"
                          onClick={() => imageRemove(index)}
                          className={cx("remove-btn")}
                        >
                          <CloseOutlined />
                        </button>
                      </div>
                    )}
                  </SortableItem>
                );
              })}
            </SortableContext>
          </ul>
        </DndContext>

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

export default CreateDetail;
