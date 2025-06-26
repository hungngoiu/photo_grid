import type { Photo, PhotoDetails } from "@/types/photo";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  CardActionArea,
  Button,
  Avatar,
  CardActions,
  Skeleton
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";
import { downloadPhoto, fetchPhoto } from "@/services/unsplashApi";

interface PhotoCardProps {
  photo: Photo;
}

const downloadImageHandler = (id: string) => {
  return async () => {
    const blob = await downloadPhoto(id);

    console.log(blob);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `${id}`);

    document.body.appendChild(link);

    link.click();

    link.parentNode?.removeChild(link);
  };
};

export default function PhotoCard({ photo }: PhotoCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [photoDetails, setPhotoDetails] = useState<PhotoDetails | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!showDetails) return;

    const fetchDetails = async () => {
      const data = await fetchPhoto(photo.id);
      setPhotoDetails(data);
    };

    fetchDetails();
  }, [showDetails, photo.id]);
  return (
    <>
      {showDetails && (
        <Modal
          open={showDetails}
          onClose={() => setShowDetails(false)}
          className="overflow-y-auto pb-32"
        >
          <Card className="relative top-3 left-1/2 -translate-x-1/2 w-[70vw] p-4 rounded-lg outline-0 overflow-visible">
            <div className="sticky top-0 w-full pt-2 bg-white z-1 flex items-center gap-1">
              <a href={photo.user?.links.html}>
                <Avatar src={photo.user?.profile_image.medium} className="" />
              </a>
              <div>
                <Typography variant="body2" className="font-bold">
                  {photo.user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {photo.user?.username}
                </Typography>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <a
                href={photo.links.html}
                target="_blank"
                className="cursor-pointer transition transform hover:opacity-90"
              >
                {!loaded && (
                  <div className="max-w-xl max-h-[900px] md:max-w-3xl" style={{aspectRatio: photo.width / photo.height}}>
                    <Skeleton className="max-h-full max-w-full" variant="rectangular" style={{width: photo.width, height: photo.height}}>
                      
                    </Skeleton>
                  </div>
                )}

                <CardMedia
                  component="img"
                  image={photo.urls.full}
                  className={`max-w-xl max-h-[900px] md:max-w-3xl ${loaded ? "block" : "hidden"}`}
                  onLoad={() => setLoaded(true)}
                />
              </a>
            </div>
            <CardContent>
              <CardActions className="float-right">
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon></DownloadIcon>}
                  disableRipple
                  onClick={downloadImageHandler(photo.id)}
                >
                  Download
                </Button>
              </CardActions>
              <div className="flex gap-20">
                <div className="flex flex-col">
                  <Typography variant="subtitle1" color="textSecondary">
                    Likes
                  </Typography>
                  <Typography variant="subtitle2" className="font-bold">
                    {photoDetails?.likes}
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <Typography variant="subtitle1" color="textSecondary">
                    Downloads
                  </Typography>
                  <Typography variant="subtitle2" className="font-bold">
                    {photoDetails?.downloads}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-xl mt-4">
                {photoDetails?.tags.map(({title}, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-sm rounded-md text-gray-800"
                  >
                    {title}
                  </span>
                ))}
              </div>
              <Typography variant="body1" className="mt-5 font-bold">
                {photoDetails?.description || "Untitled Photo"}
              </Typography>
              <Typography variant="caption" color="primary" className="mt-2">
                <a href={photo.links.html} target="_blank">
                  View on Unsplash
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Modal>
      )}

      <Card>
        <CardActionArea
          onClick={() => setShowDetails(true)}
          className="transition transform duration-200 hover:scale-105"
        >
          <CardMedia
            component="img"
            image={photo.urls.regular}
            loading="lazy"
          ></CardMedia>
        </CardActionArea>
      </Card>
    </>
  );
}
