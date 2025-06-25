import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Topics } from "@/constants/topic";
import { setTopic } from "@/features/photos/photoSlice";
import { Typography } from "@mui/material";
import SearchBar from "./SearchBar";

interface NavBarProps {
  sticky?: boolean;
}

export default function NavBar({ sticky = false }: NavBarProps) {
  const dispatch = useAppDispatch();
  const { topic } = useAppSelector((state) => state.photos);
  return (
    <div className={`h-fit top-0 ${sticky ? "sticky" : ""} pl-10 pr-10 pt-5 z-1 w-full border-b-1 border-b-gray-300 bg-white mb-2`}>
      <SearchBar></SearchBar>
      <div
        className="flex justify-between items-center h-10 mt-4"
      >
        {Object.entries(Topics).map(([topicName, topicSlug]) => {
          return (
            <div
              key={topicSlug}
              className={`flex items-center h-full ${topicSlug == topic ? "font-black border-b-black border-b-2" : "text-neutral-500"} hover:font-black`}
            >
              <Typography
                variant="caption"
                fontSize={16}
                color="inherit"
                onClick={() => dispatch(setTopic(topicSlug))}
              >
                {topicName}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}
