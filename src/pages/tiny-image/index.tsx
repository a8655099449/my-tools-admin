import { download } from "@/utils";
import { InputNumber } from "@arco-design/web-react";
import React, { FC, ReactElement, useRef, useState } from "react";

interface IProps {}
// 图片压缩组件
const CompressorImage: FC<IProps> = (): ReactElement => {
  const [imgSrc, setImgSrc] = useState("");
  const [scale, setScale] = useState<number>(0.2);
  const [fileInfo, setFileInfo] = useState<CompressImg>({});

  const handleChangeFile = (file: File) => {};

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          let file = e.target.files[0];
          compressImg(file, scale).then((res) => {
            setImgSrc(res.afterSrc);
            setFileInfo(res);
          });
        }}
      />
    
      <InputNumber
        placeholder="压缩比例"
        value={scale}
        onChange={(e) => {
          setScale(e);
        }}
      />
      <div>
        <table
          style={{
            width: 300,
            margin: 20,
          }}
        >
          <thead>
            <tr>
              <th></th>
              <th>压缩前</th>
              <th>压缩后</th>
              <th>压缩比例</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>大小</td>
              <td>{fileInfo.beforeKB}kb</td>
              <td>{fileInfo.afterKB}kb</td>
              <td>
                {Math.ceil(100 - (fileInfo.afterKB / fileInfo.beforeKB) * 100)}{" "}
                %
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <div>
        <div>
          <p>原图</p>
          <img
            src={fileInfo.beforeSrc}
            alt=""
            style={{
              maxWidth: "80vw",
            }}
          />
          <br />
          <button
            onClick={(e) => {
              download(fileInfo.beforeSrc, fileInfo.file.name);
            }}
          >
            下载
          </button>
        </div>
        <div>
          <p>压缩后图片</p>
          <img
            src={imgSrc}
            alt=""
            style={{
              maxWidth: "80vw",
            }}
          />
          <br />

          <button
            onClick={(e) => {
              download(fileInfo.afterSrc, fileInfo.file.name);
            }}
          >
            下载
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompressorImage;
/**
 * 压缩方法
 * @param {string} file 文件
 * @param {Number} quality  0~1之间
 */

type CompressImg = {
  afterKB?: number;
  beforeKB?: number;
  afterSrc?: string;
  beforeSrc?: string;
  file?: File;
  origin?: File;
};



function compressImg(file: File, quality: number): Promise<CompressImg> {
  let qualitys = quality || 0.2;
  if (Array.isArray(file)) {
    // @ts-ignore
    return Promise.all(
      // @ts-ignore
      Array.from(file).map((e) => compressImg(e, qualitys))
    ); // 如果是 file 数组返回 Promise 数组
  }

  // 如果文件小于50kb 则不用进行压缩

  return new Promise((resolve) => {
    const reader = new FileReader(); // 创建 FileReader
    reader.onload = ({ target: { result: src } }) => {
      const image = new Image(); // 创建 img 元素
      image.onload = async () => {
        const canvas = document.createElement("canvas"); // 创建 canvas 元素
        const context = canvas.getContext("2d");
        var targetWidth = image.width;
        var targetHeight = image.height;
        var originWidth = image.width;
        var originHeight = image.height;

        const sizeKb = parseInt((file.size / 1024).toFixed(2));
        //  1m ~ 10m
        if (1 * 1024 <= sizeKb && sizeKb <= 10 * 1024) {
          var maxWidth = 1600;
          var maxHeight = 1600;
          targetWidth = originWidth;
          targetHeight = originHeight;
          // 图片尺寸超过的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              );
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              );
            }
          }
        }
        // >10m
        if (10 * 1024 <= sizeKb && sizeKb <= 20 * 1024) {
          maxWidth = 1400;
          maxHeight = 1400;
          targetWidth = originWidth;
          targetHeight = originHeight;
          // 图片尺寸超过的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              );
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              );
            }
          }
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        context?.clearRect(0, 0, targetWidth, targetHeight);
        context?.drawImage(image, 0, 0, targetWidth, targetHeight); // 绘制 canvas
        const canvasURL = canvas.toDataURL(`image/jpeg`, qualitys);
        const buffer = atob(canvasURL.split(",")[1]);
        let length = buffer.length;
        const bufferArray = new Uint8Array(new ArrayBuffer(length));
        while (length--) {
          bufferArray[length] = buffer.charCodeAt(length);
        }
        const miniFile = new File([bufferArray], file.name, {
          type: `image/jpeg`,
        });

        resolve({
          file: miniFile,
          origin: file,
          // @ts-ignore
          beforeSrc: src,
          afterSrc: canvasURL,
          beforeKB: Number((file.size / 1024).toFixed(2)),
          afterKB: Number((miniFile.size / 1024).toFixed(2)),
        });
      };
      // @ts-ignore
      image.src = src;
    };
    reader.readAsDataURL(file);
  });
}
