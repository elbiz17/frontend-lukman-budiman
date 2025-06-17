import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AppState } from "../store";
import datasHarboursService from "@/services/datasHarboursService";

interface Country {
  id_negara: string;
  kode_negara: string;
  nama_negara: string;
}

interface Harbour {
  id_pelabuhan: string;
  nama_pelabuhan: string;
  id_negara: string;
}

interface Item {
  id_barang: string;
  nama_barang: string;
  description: string;
  diskon: string;
  harga: string;
}

interface CountriesState {
  countries: {
    isLoading: boolean;
    error: string | null;
    data: Country[];
  };
  harbours: {
    isLoading: boolean;
    error: string | null;
    data: Harbour[];
  };
  items: {
    isLoading: boolean;
    error: string | null;
    data: Item[];
  };
}

const initialState: CountriesState = {
  countries: {
    isLoading: false,
    error: null,
    data: [],
  },
  harbours: {
    isLoading: false,
    error: null,
    data: [],
  },
  items: {
    isLoading: false,
    error: null,
    data: [],
  },
};

export const getCountries = createAsyncThunk<
  Country[],
  { forceFetch?: boolean },
  { state: AppState }
>(
  "datasHarbour/getCountries",
  async ({ forceFetch = false }, { getState, rejectWithValue }) => {
    const { datasHarbour } = getState();

    if (datasHarbour.countries.data.length > 0 && !forceFetch) {
      return datasHarbour.countries.data;
    }

    try {
      const response = await datasHarboursService.getCountry();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch countries");
    }
  }
);

export const getHarbours = createAsyncThunk<
  Harbour[],
  { forceFetch?: boolean; props?: any },
  { state: AppState }
>(
  "datasHarbour/getHarbours",
  async ({ forceFetch = false, props }, { getState, rejectWithValue }) => {
    const { datasHarbour } = getState();

    if (datasHarbour.harbours.data.length > 0 && !forceFetch) {
      return datasHarbour.harbours.data;
    }

    try {
      const response = await datasHarboursService.getHarbours(props);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch countries");
    }
  }
);

export const getItems = createAsyncThunk<
  Item[],
  { forceFetch?: boolean; props?: any },
  { state: AppState }
>(
  "datasHarbour/getItems",
  async ({ forceFetch = false, props }, { getState, rejectWithValue }) => {
    const { datasHarbour } = getState();

    if (datasHarbour.items.data.length > 0 && !forceFetch) {
      return datasHarbour.items.data;
    }

    try {
      const response = await datasHarboursService.getItems(props);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch countries");
    }
  }
);

const datasHarbourSlice = createSlice({
  name: "datasHarbour",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.countries.isLoading = true;
      })
      .addCase(
        getCountries.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.countries.isLoading = false;
          state.countries.data = action.payload;
          state.countries.error = null;
        }
      )
      .addCase(getCountries.rejected, (state, action) => {
        state.countries.isLoading = false;
        state.countries.error = action.payload as string;
      });

    builder
      .addCase(getHarbours.pending, (state) => {
        state.harbours.isLoading = true;
      })
      .addCase(
        getHarbours.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.harbours.isLoading = false;
          state.harbours.data = action.payload;
          state.harbours.error = null;
        }
      )
      .addCase(getHarbours.rejected, (state, action) => {
        state.harbours.isLoading = false;
        state.harbours.error = action.payload as string;
      });

    builder
    .addCase(getItems.pending, (state) => {
      state.items.isLoading = true
    })
    .addCase(getItems.fulfilled, (state, action:PayloadAction<any>) =>{
      state.items.isLoading = false;
      state.items.data = action.payload;
      state.items.error = null
    })
    .addCase(getItems.rejected, (state, action) => {
      state.items.isLoading = false;
      state.items.error = action.payload as string
    })
  },
});

export default datasHarbourSlice.reducer;
