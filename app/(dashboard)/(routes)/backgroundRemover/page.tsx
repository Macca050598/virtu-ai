// "use client";
// import { useState } from 'react';

// const BackgroundRemovalPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [resultPath, setResultPath] = useState<string | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     } else {
//       console.warn('No files selected');
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setLoading(true);

//     const formData = new FormData();
//     formData.append('size', 'auto');
//     formData.append('image_file', file);

//     try {
//       const response = await fetch('/api/backgroundRemover', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setResultPath(data.path);
//       } else {
//         console.error('Upload failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={!file || loading}>
//         {loading ? 'Processing...' : 'Remove Background'}
//       </button>
//       {resultPath && <img src={resultPath} alt="Result" />}
//     </div>
//   );
// };

// export default BackgroundRemovalPage;
