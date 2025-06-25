import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useRef } from "react";
import { fetchNextPhotoPageThunk } from "@/features/photos/photoSlice";
import PhotoCard from "./PhotoCard";
import Masonry from "react-responsive-masonry"
import { useMediaQuery, useTheme } from "@mui/material";


export default function PhotoGrid() {
  const { photos } = useAppSelector((state) => state.photos);
  const dispatch = useAppDispatch();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  useEffect(() => {
    if (photos.length === 0) {
      dispatch(fetchNextPhotoPageThunk());
    }
  }, [dispatch, photos]);

  const lastPhotoCallbackRef = (node: HTMLDivElement) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    } else {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchNextPhotoPageThunk());
        }
      });
    }
    if (node) {
      observerRef.current.observe(node);
    }
  };
  return (
    <>
      <Masonry gutter={isLg ? "50px" : "20px"} columnsCount={isLg ? 4 : 2} className="mt-8">
        {photos.map((photo, index) => {
          const isLast = index === photos.length - 5;
          return (
            <div key={photo.id} ref={isLast ? lastPhotoCallbackRef : null}>
              <PhotoCard photo={photo}></PhotoCard>
            </div>
          );
        })}
      </Masonry>
    </>
  );
}
