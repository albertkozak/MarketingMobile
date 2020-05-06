import React, { useState } from "react";
import { storage } from "../firebase";

export default function FileUpload() {
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  return <h1>Image</h1>;
}
