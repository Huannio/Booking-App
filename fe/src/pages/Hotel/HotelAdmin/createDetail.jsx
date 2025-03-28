import Button from "~/components/Button";
import styles from "./Hotel.module.scss";
import classNames from "classnames/bind";
import { useCallback, useContext, useEffect, useState } from "react";
import config from "~/config";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  handleGetBlogDescriptionsTypesApi,
  handleGetShipBySlugApi,
} from "~/api";
import { LoadingContext } from "~/components/Loading/Loading";
import SortableItem from "~/components/Sort/SortableItem";
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
import { useNavigate, useParams } from "react-router-dom";
import { TextField, UploadImageField, InputField } from "~/components/Input";
import { CloseOutlined } from "@ant-design/icons";
import axios from "~/utils/axios.config";
import { notification } from "antd";

const cx = classNames.bind(styles);

function CreateDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { setGlobalLoading } = useContext(LoadingContext);
  const [ship, setShip] = useState(null);
  const [blogDescTypes, setBlogDescTypes] = useState(null);

  const getData = useCallback(async () => {
    setGlobalLoading(true);
    const blogType = await handleGetBlogDescriptionsTypesApi();
    const shipData = await handleGetShipBySlugApi(slug);
    setShip(shipData.ship);
    setBlogDescTypes(blogType);
    setGlobalLoading(false);
  }, [setGlobalLoading, slug]);

  useEffect(() => {
    getData();
  }, [getData]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.hotelDetailSchema),
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "contentBlocks",
  });

  const handleAddHeader = () => {
    append({
      id: Date.now().toString(),
      type: "Header",
      type_id: blogDescTypes[0].id,
      product_id: ship.id,
      content: "",
    });
  };

  const handleAddParagraph = () => {
    append({
      id: Date.now().toString(),
      type: "Paragraph",
      type_id: blogDescTypes[1].id,
      product_id: ship.id,
      content: "",
    });
  };

  const handleAddImage = () => {
    append({
      id: Date.now().toString(),
      type: "Image",
      type_id: blogDescTypes[2].id,
      product_id: ship.id,
      file: null,
      caption: "",
    });
  };

  const headerRemove = (index) => {
    remove(index);
  };

  const paragraphRemove = (index) => {
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

  const handleCreateForm = async (data) => {
    console.log(data);
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
        formData.append("images", block.file[0]);
      }
    });

    const response = await axios.post(`/hotel/createDetail/${ship.slug}`, formData);
    if (response.statusCode === 201) {
      notification.success({
        message:
          response?.message || "Tạo thông tin chi tiết thành công!",
      });
      navigate("/hotel");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h1>Thông tin chi tiết</h1>
      <div className="divider"></div>
      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleCreateForm)}
      >
        <div
          className="flex align-center justify-between"
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 9999,
          }}
        >
          <div className="flex align-center gap-12">
            <Button
              normal
              primary
              onClick={() =>
                handleAddHeader({
                  content: "",
                })
              }
            >
              Tạo header
            </Button>

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
                handleAddImage({
                  content: "",
                })
              }
            >
              Tạo hình ảnh
            </Button>
          </div>

          <Button
            primary
            normal
            submit
            className="align-self-end interceptor-loading"
          >
            <div className="label md">Tạo</div>
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
                    {field.type === "Header" && (
                      <div className={cx("custom-header")}>
                        <InputField
                          control={control}
                          name={`contentBlocks.${index}.content`}
                          label={`Header`}
                          placeholder={`Header`}
                          error={errors?.contentBlocks?.[index]?.content}
                        />
                        <button
                          type="button"
                          onClick={() => headerRemove(index)}
                          className={cx("remove-btn")}
                        >
                          <CloseOutlined />
                        </button>
                      </div>
                    )}

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

                    {field.type === "Image" && (
                      <div className={cx("custom-image")}>
                        <UploadImageField
                          control={control}
                          name={`contentBlocks.${index}.file`}
                          label={`Image`}
                          placeholder={`Image`}
                          error={errors?.contentBlocks?.[index]?.file}
                          className="optional-height"
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "6%",
                            right: "5%",
                            zIndex: 999,
                          }}
                        >
                          <InputField
                            control={control}
                            name={`contentBlocks.${index}.caption`}
                            label={`Caption`}
                            placeholder={`Caption`}
                            error={errors?.contentBlocks?.[index]?.caption}
                            inputGroup={false}
                          />
                        </div>
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
      </form>
    </div>
  );
}

export default CreateDetail;
