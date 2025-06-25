// 
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Photo, Topic } from "@/types/photo";
import { fetchPhotos, fetchTopicPhotos, searchPhotos } from "@/services/unsplashApi";
import type { RootState } from "@/app/store";
import { Topics } from "@/constants/topic";

interface PhotoState {
  photos: Photo[];
  page: number;
  loading: boolean;
  topic: Topic | null;
  searchQuery: string | null;
}

export const fetchNextPhotoPageThunk = createAsyncThunk(
  "photos/fetchPhotos",
  async (_, { getState }) => {
    const { photos: photoState } = getState() as RootState;
    const { page, topic, searchQuery } = photoState;

    if (searchQuery)
      return await searchPhotos(searchQuery, page);
    else if (!topic || topic === Topics.Featured)
      return await fetchPhotos(page);
    else
      return await fetchTopicPhotos(topic, page);
  },
  {
    condition: (_, { getState }) => {
      const { loading } = (getState() as RootState).photos;
      return !loading;
    }
  }
);

const initialState: PhotoState = {
  photos: [],
  page: 1,
  loading: false,
  topic: Topics.Featured,
  searchQuery: null
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<Topic>) => {
      if (state.topic !== action.payload || state.searchQuery) {
        state.topic = action.payload;
        state.page = 1;
        state.photos = [];
        state.searchQuery = null;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string | null>) => {
      state.topic = null;
      state.searchQuery = action.payload;
      state.page = 1;
      state.photos = [];
      if (action.payload == null) {
        state.topic = Topics.Featured;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextPhotoPageThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNextPhotoPageThunk.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.photos.push(...action.payload);
        state.page += 1;
        state.loading = false;
      })
      .addCase(fetchNextPhotoPageThunk.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setTopic, setSearchQuery } = photoSlice.actions;
export default photoSlice.reducer;
