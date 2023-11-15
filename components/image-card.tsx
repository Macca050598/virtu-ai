"use client";

type ImageCardProps = {
  imageUrl: string;
};

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl }) => {
  const handleDownload = () => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated-image.png';  // You may want to generate unique names for each image
      window.open(imageUrl, '_blank');
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <img src={imageUrl} alt="Generated" className="object-cover w-full" />
      <button onClick={handleDownload} className="w-full py-2 bg-blue-500 text-white">
        Download
      </button>
    </div>
  );
};

export default ImageCard;

