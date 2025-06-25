import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  setSearchQuery,
  fetchNextPhotoPageThunk
} from "@/features/photos/photoSlice";
import SearchIcon from "@mui/icons-material/Search";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const { searchQuery } = useAppSelector((state) => state.photos);
  useEffect(() => {
    setInput(searchQuery || "");
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(input.trim() || null));
    dispatch(fetchNextPhotoPageThunk());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between px-4 py-2 rounded-full bg-gray-100 w-full max-w-2xl"
    >
      <div className="flex items-center gap-2 flex-1">
        <SearchIcon className="text-gray-500" fontSize="small" />
        <input
          type="text"
          placeholder="Search photos and illustrations"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>
      <CenterFocusWeakIcon
        className="text-gray-400 cursor-pointer"
        fontSize="small"
      />
    </form>
  );
}
