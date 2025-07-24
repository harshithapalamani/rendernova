"use client";

import { toast } from "sonner"
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { IImage } from "@/types";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<React.SetStateAction<IImage | null>>;
  publicId: string;
  image: IImage | null;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}: MediaUploaderProps) => {
  const onUploadSuccessHandler = (result: CloudinaryUploadWidgetResults) => {
    const info = typeof result.info === 'object' ? result.info : null;
    if (info) {
      setImage((prevState: IImage | null) => {
        if (!prevState) {
          // Create a minimal IImage object if prevState is null
          return {
            _id: '',
            title: '',
            publicId: info.public_id || '',
            transformationType: '',
            width: info.width || 0,
            height: info.height || 0,
            config: {},
            secureURL: info.secure_url || '',
            transformationURL: '',
            author: { _id: '', firstName: '', lastName: '' },
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }
        return {
          ...prevState,
          publicId: info.public_id || '',
          width: info.width || 0,
          height: info.height || 0,
          secureURL: info.secure_url || ''
        };
      })

      onValueChange(info.public_id || '')

      toast.success('Image uploaded successfully', {
        description: '1 credit was deducted from your account',
        duration: 5000,
      })
    }
  }

  const onUploadErrorHandler = () => {
    toast.error('Something went wrong while uploading', {
      description: 'Please try again',
      duration: 5000,
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="jsm_rendernova"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">
            Original
          </h3>

          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage 
                  width={getImageSize(type, image || {}, "width")}
                  height={getImageSize(type, image || {}, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
            </>
          ): (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image 
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
                <p className="p-14-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader