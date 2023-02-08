import React, { useState } from "react";
import { db, storage } from "../Firebase";
import { storage, db } from "."
import { useEffect } from "react";
import { Camera } from "react-feather";
import EasyCrop from "react-easy-crop";
import getCroppedImg from "./cropImage";

function Avatar({ imageUrl }) {
  const [avatar, setAvatar] = useState(imageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsCropping(true);
  };

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(selectedFile, croppedAreaPixels);
    setIsUploading(true);
    setIsCropping(false);
    const uploadTask = storage.ref(`images/${selectedFile.name}`).put(croppedImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
      },
      (error) => {
        console.log(error);
        setIsUploading(false);
      },
      () => {
        storage
          .ref("images")
          .child(selectedFile.name)
          .getDownloadURL()
          .then((url) => {
            setAvatar(url);
            db.collection("users").doc().set({ avatar: url });
            setIsUploading(false);
          });
      }
    );
  };

  return (
    <div>
      {isCropping ? (
        <div className="w-64 h-64 mx-auto">
          <EasyCrop
            image={URL.createObjectURL(selectedFile)}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      ) : (
        <>
          <img
            src={avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto"
          />
          {!isUploading && (
            <label htmlFor="avatar">
              <input
                type="file"
                id="avatar"
                hidden
                onChange={handleChange}
              />
              <button className="btn btn-default">
                <Camera size={20} /> Change Avatar
              </button>
            </label>
          )}
          {isUploading && <p>Uploading...</p>}
        </>
      )}
    </div>
  );
}

export default Avatar;
