import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./DropZone.module.scss";

interface MyDropzoneProps {
  setImage: (image: string | null) => void; 
  image: string | null;
  title?: string;
}

const Dropzone: React.FC<MyDropzoneProps> = ({ setImage, image, title }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const base64String = reader.result.toString();
            setPreview(base64String);
            setImage(base64String);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setImage(null);
        setPreview(null);
      }
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <p className="filter-title">{title}</p>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {image ? (
          <div className={styles.imagePreview}>
            <img
              src={preview || image}
              alt="Uploaded Preview"
              className={styles.image}
            />
            <div className={styles.box}>
              <button
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className={styles.changeButton}
              >
                Change image
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.wrapper}>
            <svg
              className={styles.add}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#2D3136" />
              <path
                d="M16.6665 23.3333L19.9998 20M19.9998 20L23.3332 23.3333M19.9998 20V27.5M26.6665 23.9524C27.6844 23.1117 28.3332 21.8399 28.3332 20.4167C28.3332 17.8854 26.2811 15.8333 23.7498 15.8333C23.5677 15.8333 23.3974 15.7383 23.3049 15.5814C22.2182 13.7374 20.2119 12.5 17.9165 12.5C14.4647 12.5 11.6665 15.2982 11.6665 18.75C11.6665 20.4718 12.3627 22.0309 13.489 23.1613"
                stroke="#24AE7C"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
