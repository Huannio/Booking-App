import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CloseOutlined } from "@ant-design/icons";
import {
  TextField,
  InputField,
  UploadImageUseFieldArray,
} from "~/components/Input";
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

import styles from "./Ship.module.scss";
import config from "~/config";
import Button from "~/components/Button";
import SortableItem from "~/components/Sort/SortableItem";
import axios from "~/utils/axios.config";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { handleGetShipBySlugApi } from "~/api";
const cx = classNames.bind(styles);

function UpdateDetail() {
  const { slug } = useParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.shipDetailSchema),
  });

  const { setGlobalLoading } = useContext(LoadingContext);
  const [ship, setShip] = useState(null);
  const [blogDescTypes, setBlogDescTypes] = useState(null);

  const getData = useCallback(async () => {
    setGlobalLoading(true);
    const shipData = await handleGetShipBySlugApi(slug);
    setShip(shipData.ship);
    setBlogDescTypes(shipData.ship.long_desc_products);
    let data = [];
    shipData.ship.long_desc_products.map((item) => {
      if (item.image_url) {
        data.push({
          id: item.id,
          type: item.type.type,
          type_id: item.type_id,
          product_id: item.product_id,
          file: {
            url: item.image_url,
          },
          caption: item.caption,
        });
      }

      if (item.text) {
        data.push({
          id: item.id,
          type: item.type.type,
          type_id: item.type_id,
          product_id: item.product_id,
          content: item.text,
        });
      }
    });

    reset({
      contentBlocks: data,
    });
    setGlobalLoading(false);
  }, [setGlobalLoading, slug, reset]);

  useEffect(() => {
    getData();
  }, [getData]);

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "contentBlocks",
  });

  const handleAddHeader = () => {
    append({
      id: Date.now().toString(),
      type: "Header",
      type_id: blogDescTypes[0].type_id,
      product_id: ship.id,
      content: "",
    });
  };

  const handleAddParagraph = () => {
    append({
      id: Date.now().toString(),
      type: "Paragraph",
      type_id: blogDescTypes[1].type_id,
      product_id: ship.id,
      content: "",
    });
  };

  const handleAddImage = () => {
    append({
      id: Date.now().toString(),
      type: "Image",
      type_id: blogDescTypes[2].type_id,
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

  const navigate = useNavigate();

  const handleUpdateForm = async (data) => {
    if (Object.entries(data.contentBlocks).length === 0) {
      notification.error({
        message: "Dữ liệu không được để trống",
      });
      return;
    }

    const formData = new FormData();
    let temp = [];
    data.contentBlocks.forEach((block) => {
      temp.push({
        id: block.id,
        type: block.type,
        type_id: block.type_id,
        product_id: block.product_id,
        content: block.content,
        image_url: block.file,
        caption: block.caption,
      });
    });

    const contentBlocks = temp.map((block) => {
      if (block.type === "Image" && block.image_url.uid) {
        return {
          ...block,
          file: block.image_url,
          image_url: null,
          caption: block.caption,
        };
      }
      return block;
    });

    formData.append("contentBlocks", JSON.stringify(contentBlocks));

    data.contentBlocks.forEach((block) => {
      if (block.type === "Image") {
        formData.append("images", block.file);
      }
    });

    const response = await axios.put(
      `/ships/updateDetail/${ship.slug}`,
      formData
    );
    if (response.statusCode === 200) {
      notification.success({
        message: response?.message || "Cập nhật thông tin chi tiết thành công!",
      });
      navigate("/ships");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Cập nhật chi tiết bài viết</h6>
      <div className="divider"></div>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdateForm)}
      >
        <div
          className="flex align-center justify-between"
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 999,
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
                        <UploadImageUseFieldArray
                          control={control}
                          name={`contentBlocks.${index}.file`}
                          label={`Image`}
                          placeholder={`Image`}
                          error={errors?.contentBlocks?.[index]?.file}
                          className="optional-height"
                          value={field.file ? [field.file] : []}
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

export default UpdateDetail;
