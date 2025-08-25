import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/learnRHF")({
  component: RouteComponent,
});

type FormValues = {
  name: string;
  video: FileList;
};
// Cấu hình các loại file video hợp lệ
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

function RouteComponent() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  // Dùng useState của React để lưu URL của ảnh preview
  const [preview, setPreview] = useState<string | null>(null);
  // C. Theo dõi sự thay đổi của trường 'profilePicture'
  const videoFileValue = watch("video");

  // D. Dùng useEffect để xử lý logic tạo URL preview
  useEffect(() => {
    const file = videoFileValue?.[0];
    if (file) {
      // Tạo một URL tạm thời cho file ảnh
      const newPreviewUrl = URL.createObjectURL(file);
      console.log("newPreviewUrl:", newPreviewUrl);
      setPreview(newPreviewUrl);

      // Cleanup: thu hồi URL khi component unmount hoặc file thay đổi
      return () => URL.revokeObjectURL(newPreviewUrl);
    } else {
      setPreview(null);
    }
  }, [videoFileValue]); // Chạy lại effect khi giá trị file thay đổi

  const onSubmit = (data: FormValues) => {
    const file = data.video[0];
    console.log("Submitted data:", data);
    console.log("Submit thành công, sẵn sàng để upload video:", file.name);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col justify-center items-center border p-4 rounded shadow-md w-lg mx-auto my-0 p-20"
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input {...register("name")} />
        </div>
        <div>
          <label htmlFor="video">Tải lên Video</label>
          <input
            accept="video/*"
            type="file"
            {...register("video", {
              required: "Vui lòng chọn một video",
              validate: {
                // 2. Cập nhật logic validate cho video
                isAcceptedType: (files) =>
                  ACCEPTED_VIDEO_TYPES.includes(files[0]?.type) ||
                  "Chỉ chấp nhận file .mp4, .webm, .ogg",
              },
            })}
          />
          {/* F. Hiển thị lỗi của trường file */}
          {errors.video && (
            <p style={{ color: "red" }}>{errors.video.message}</p>
          )}
        </div>
        {/* 3. Dùng thẻ <video> thay vì <img> */}
        {preview && (
          <video
            width="320"
            height="240"
            controls
            src={preview}
            style={{ marginTop: 10 }}
          >
            {/* <track kind="captions" /> */}
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
        )}
        <button>Submit</button>
      </form>
    </div>
  );
}
