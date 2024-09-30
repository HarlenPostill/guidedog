import React, { useEffect, useRef } from "react";

import "./WaterLevelPawPrint.css";

interface WaterLevelPawPrintProps {
  value1: number;
  value2: number;
  value3: number;
}

const WaterLevelPawPrint: React.FC<WaterLevelPawPrintProps> = ({
  value1,
  value2,
  value3
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const total = value1 + value2 + value3;
    const percentage1 = value1 / total;
    const percentage2 = (value1 + value2) / total;

    const drawWater = (percentage: number, color: string, startY: number) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = startY + Math.sin(x / 30 + Date.now() / 1000) * 5;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      const pawPath = new Path2D(
        "M91.2188 34.625C88.8392 34.625 86.5131 35.3306 84.5346 36.6526C82.556 37.9746 81.0139 39.8537 80.1033 42.0521C79.1927 44.2505 78.9545 46.6696 79.4187 49.0034C79.8829 51.3373 81.0288 53.481 82.7114 55.1636C84.394 56.8462 86.5377 57.9921 88.8716 58.4563C91.2054 58.9206 93.6245 58.6823 95.8229 57.7717C98.0213 56.8611 99.9004 55.319 101.222 53.3405C102.544 51.3619 103.25 49.0358 103.25 46.6563C103.25 43.4654 101.982 40.4052 99.7261 38.1489C97.4698 35.8926 94.4096 34.625 91.2188 34.625ZM31.0625 46.6563C31.0625 44.2767 30.3569 41.9506 29.0349 39.972C27.7129 37.9935 25.8338 36.4514 23.6354 35.5408C21.437 34.6302 19.0179 34.392 16.6841 34.8562C14.3502 35.3204 12.2065 36.4663 10.5239 38.1489C8.84128 39.8315 7.69541 41.9752 7.23118 44.3091C6.76695 46.6429 7.00521 49.062 7.91583 51.2604C8.82645 53.4588 10.3685 55.3379 12.3471 56.6599C14.3256 57.9819 16.6517 58.6875 19.0313 58.6875C22.2221 58.6875 25.2823 57.4199 27.5386 55.1636C29.7949 52.9073 31.0625 49.8471 31.0625 46.6563ZM39.6563 38.0625C42.0358 38.0625 44.3619 37.3569 46.3405 36.0349C48.319 34.7129 49.8611 32.8338 50.7717 30.6354C51.6823 28.437 51.9206 26.0179 51.4563 23.6841C50.9921 21.3502 49.8462 19.2065 48.1636 17.5239C46.481 15.8413 44.3373 14.6954 42.0034 14.2312C39.6696 13.767 37.2505 14.0052 35.0521 14.9158C32.8537 15.8264 30.9746 17.3685 29.6526 19.3471C28.3306 21.3256 27.625 23.6517 27.625 26.0313C27.625 29.2221 28.8926 32.2823 31.1489 34.5386C33.4052 36.7949 36.4654 38.0625 39.6563 38.0625ZM70.5938 38.0625C72.9733 38.0625 75.2994 37.3569 77.278 36.0349C79.2565 34.7129 80.7986 32.8338 81.7092 30.6354C82.6198 28.437 82.8581 26.0179 82.3938 23.6841C81.9296 21.3502 80.7837 19.2065 79.1011 17.5239C77.4185 15.8413 75.2748 14.6954 72.9409 14.2312C70.6071 13.767 68.188 14.0052 65.9896 14.9158C63.7912 15.8264 61.9122 17.3685 60.5901 19.3471C59.2681 21.3256 58.5625 23.6517 58.5625 26.0313C58.5625 29.2221 59.8301 32.2823 62.0864 34.5386C64.3427 36.7949 67.4029 38.0625 70.5938 38.0625ZM80.5281 64.2133C78.7821 63.25 77.2431 61.9519 75.9993 60.3932C74.7554 58.8346 73.8311 57.0459 73.2793 55.1297C72.1364 51.1991 69.7486 47.7457 66.4749 45.2883C63.2012 42.8309 59.2184 41.5024 55.125 41.5024C51.0316 41.5024 47.0488 42.8309 43.7751 45.2883C40.5014 47.7457 38.1137 51.1991 36.9707 55.1297C35.8666 58.9855 33.2783 62.2461 29.7734 64.1961C26.4112 66.0154 23.7515 68.9037 22.2149 72.4042C20.6784 75.9047 20.3527 79.8175 21.2894 83.5239C22.2261 87.2302 24.3717 90.5185 27.3868 92.8686C30.402 95.2187 34.1146 96.4966 37.9375 96.5C40.2284 96.5064 42.4969 96.0489 44.6063 95.1551C51.3312 92.3821 58.8801 92.3821 65.6051 95.1551C69.6783 96.9266 74.2792 97.0525 78.4432 95.5062C82.6072 93.9599 86.0109 90.8617 87.9406 86.861C89.8704 82.8603 90.1764 78.2678 88.7945 74.0465C87.4126 69.8251 84.4501 66.3026 80.5281 64.2176V64.2133Z"
      );
      ctx.clip(pawPath);

      // TODO set up variables or something here
      drawWater(percentage2, "#FF6D6D", canvas.height * (1 - percentage2));
      drawWater(percentage1, "#FDA1A2", canvas.height * (1 - percentage1));

      ctx.restore();

      requestAnimationFrame(animate);
    };

    animate();
  }, [value1, value2, value3]);

  return (
    <div className="water-level-paw-print">
      <canvas ref={canvasRef} width={110} height={110} />
      <svg
        width="110"
        height="110"
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M91.2188 34.625C88.8392 34.625 86.5131 35.3306 84.5346 36.6526C82.556 37.9746 81.0139 39.8537 80.1033 42.0521C79.1927 44.2505 78.9545 46.6696 79.4187 49.0034C79.8829 51.3373 81.0288 53.481 82.7114 55.1636C84.394 56.8462 86.5377 57.9921 88.8716 58.4563C91.2054 58.9206 93.6245 58.6823 95.8229 57.7717C98.0213 56.8611 99.9004 55.319 101.222 53.3405C102.544 51.3619 103.25 49.0358 103.25 46.6563C103.25 43.4654 101.982 40.4052 99.7261 38.1489C97.4698 35.8926 94.4096 34.625 91.2188 34.625ZM31.0625 46.6563C31.0625 44.2767 30.3569 41.9506 29.0349 39.972C27.7129 37.9935 25.8338 36.4514 23.6354 35.5408C21.437 34.6302 19.0179 34.392 16.6841 34.8562C14.3502 35.3204 12.2065 36.4663 10.5239 38.1489C8.84128 39.8315 7.69541 41.9752 7.23118 44.3091C6.76695 46.6429 7.00521 49.062 7.91583 51.2604C8.82645 53.4588 10.3685 55.3379 12.3471 56.6599C14.3256 57.9819 16.6517 58.6875 19.0313 58.6875C22.2221 58.6875 25.2823 57.4199 27.5386 55.1636C29.7949 52.9073 31.0625 49.8471 31.0625 46.6563ZM39.6563 38.0625C42.0358 38.0625 44.3619 37.3569 46.3405 36.0349C48.319 34.7129 49.8611 32.8338 50.7717 30.6354C51.6823 28.437 51.9206 26.0179 51.4563 23.6841C50.9921 21.3502 49.8462 19.2065 48.1636 17.5239C46.481 15.8413 44.3373 14.6954 42.0034 14.2312C39.6696 13.767 37.2505 14.0052 35.0521 14.9158C32.8537 15.8264 30.9746 17.3685 29.6526 19.3471C28.3306 21.3256 27.625 23.6517 27.625 26.0313C27.625 29.2221 28.8926 32.2823 31.1489 34.5386C33.4052 36.7949 36.4654 38.0625 39.6563 38.0625ZM70.5938 38.0625C72.9733 38.0625 75.2994 37.3569 77.278 36.0349C79.2565 34.7129 80.7986 32.8338 81.7092 30.6354C82.6198 28.437 82.8581 26.0179 82.3938 23.6841C81.9296 21.3502 80.7837 19.2065 79.1011 17.5239C77.4185 15.8413 75.2748 14.6954 72.9409 14.2312C70.6071 13.767 68.188 14.0052 65.9896 14.9158C63.7912 15.8264 61.9122 17.3685 60.5901 19.3471C59.2681 21.3256 58.5625 23.6517 58.5625 26.0313C58.5625 29.2221 59.8301 32.2823 62.0864 34.5386C64.3427 36.7949 67.4029 38.0625 70.5938 38.0625ZM80.5281 64.2133C78.7821 63.25 77.2431 61.9519 75.9993 60.3932C74.7554 58.8346 73.8311 57.0459 73.2793 55.1297C72.1364 51.1991 69.7486 47.7457 66.4749 45.2883C63.2012 42.8309 59.2184 41.5024 55.125 41.5024C51.0316 41.5024 47.0488 42.8309 43.7751 45.2883C40.5014 47.7457 38.1137 51.1991 36.9707 55.1297C35.8666 58.9855 33.2783 62.2461 29.7734 64.1961C26.4112 66.0154 23.7515 68.9037 22.2149 72.4042C20.6784 75.9047 20.3527 79.8175 21.2894 83.5239C22.2261 87.2302 24.3717 90.5185 27.3868 92.8686C30.402 95.2187 34.1146 96.4966 37.9375 96.5C40.2284 96.5064 42.4969 96.0489 44.6063 95.1551C51.3312 92.3821 58.8801 92.3821 65.6051 95.1551C69.6783 96.9266 74.2792 97.0525 78.4432 95.5062C82.6072 93.9599 86.0109 90.8617 87.9406 86.861C89.8704 82.8603 90.1764 78.2678 88.7945 74.0465C87.4126 69.8251 84.4501 66.3026 80.5281 64.2176V64.2133Z"
          fill="none"
          stroke="#D9D9D9"
          stroke-width="5px"
        />
      </svg>
    </div>
  );
};

export default WaterLevelPawPrint;
