export type Database = {
  public: {
    Tables: {
      car_listings: {
        Row: {
          car_id: number
          car_series_id: number
          city: string
          city_id: number
          color: string
          created_at: string
          custom_car_name: string
          custom_city: string
          custom_region: string
          custom_series_name: string
          fuel_type: string
          id: number
          images: string[]
          mileage: number
          price: number
          region: string
          region_id: number
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          transmission: string
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          car_id?: number
          car_series_id?: number
          city?: string
          city_id?: number
          color: string
          created_at?: string
          custom_car_name?: string
          custom_city?: string
          custom_region?: string
          custom_series_name?: string
          fuel_type: string
          id?: number
          images?: string[]
          mileage: number
          price: number
          region?: string
          region_id?: number
          status?: Database["public"]["Enums"]["listing_status"]
          title: string
          transmission: string
          updated_at?: string
          user_id?: string
          year: number
        }
        Update: {
          car_id?: number
          car_series_id?: number
          city?: string
          city_id?: number
          color?: string
          created_at?: string
          custom_car_name?: string
          custom_city?: string
          custom_region?: string
          custom_series_name?: string
          fuel_type?: string
          id?: number
          images?: string[]
          mileage?: number
          price?: number
          region?: string
          region_id?: number
          status?: Database["public"]["Enums"]["listing_status"]
          title?: string
          transmission?: string
          updated_at?: string
          user_id?: string
          year?: number
        }
      }
      car_series: {
        Row: {
          car_id: number
          id: number
          name: string
        }
        Insert: {
          car_id: number
          id?: number
          name: string
        }
        Update: {
          car_id?: number
          id?: number
          name?: string
        }
      }
      cars: {
        Row: {
          id: number
          logo_url: string
          name: string
        }
        Insert: {
          id?: number
          logo_url?: string
          name: string
        }
        Update: {
          id?: number
          logo_url?: string
          name?: string
        }
      }
      cities: {
        Row: {
          governorate_id: number
          id: number
          name: string
        }
        Insert: {
          governorate_id: number
          id?: number
          name: string
        }
        Update: {
          governorate_id?: number
          id?: number
          name?: string
        }
      }
      regions: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
    }
    Functions: {
      add_car_with_series: {
        Args: {
          p_car_name: string
          p_logo_url?: string
          p_series_names?: string[]
        }
        Returns: {
          v_car_id: number
          v_car_name: string
          v_logo_url: string
          v_series_added: number
        }[]
      }
      all_series: {
        Args: never
        Returns: {
          car_brand: string
          car_id: number
          series_id: number
          series_name: string
        }[]
      }
      car_brands: {
        Args: never
        Returns: {
          id: number
          name: string
        }[]
      }
      car_series: {
        Args: { p_car_id: number }
        Returns: {
          car_id: number
          id: number
          name: string
        }[]
      }
      create_listing: {
        Args: {
          p_car_id?: number
          p_car_series_id?: number
          p_city_id?: number
          p_color: string
          p_custom_car_name?: string
          p_custom_city?: string
          p_custom_region?: string
          p_custom_series_name?: string
          p_fuel_type: string
          p_images?: string[]
          p_mileage: number
          p_price: number
          p_region_id?: number
          p_title: string
          p_transmission: string
          p_year: number
        }
        Returns: {
          car_id: number
          car_series_id: number
          city: string
          city_id: number
          color: string
          created_at: string
          custom_car_name: string
          custom_city: string
          custom_region: string
          custom_series_name: string
          fuel_type: string
          id: number
          images: string[]
          mileage: number
          price: number
          region: string
          region_id: number
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          transmission: string
          user_id: string
          year: number
        }[]
      }
      delete_listing: { Args: { p_listing_id: number }; Returns: boolean }
      get_all_cities: {
        Args: never
        Returns: {
          city_id: number
          city_name: string
          region_id: number
          region_name: string
        }[]
      }
      get_car_brands_with_logos: {
        Args: never
        Returns: {
          id: number
          logo_url: string
          name: string
        }[]
      }
      get_cities: {
        Args: { p_region_id: number }
        Returns: {
          id: number
          name: string
          region_id: number
        }[]
      }
      get_regions: {
        Args: never
        Returns: {
          id: number
          name: string
        }[]
      }
      listing: {
        Args: { p_listing_id: number }
        Returns: {
          car_brand: string
          car_id: number
          car_model: string
          car_series_id: number
          city_name: string
          color: string
          created_at: string
          custom_car_name: string
          custom_city: string
          custom_region: string
          custom_series_name: string
          fuel_type: string
          id: number
          images: string[]
          mileage: number
          price: number
          region_name: string
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          transmission: string
          updated_at: string
          user_id: string
          year: number
        }[]
      }
      my_listings: {
        Args: {
          p_status_filter?: Database["public"]["Enums"]["listing_status"]
        }
        Returns: {
          car_brand: string
          car_id: number
          car_model: string
          car_series_id: number
          city_name: string
          color: string
          created_at: string
          custom_car_name: string
          custom_city: string
          custom_region: string
          custom_series_name: string
          fuel_type: string
          id: number
          images: string[]
          mileage: number
          price: number
          region_name: string
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          transmission: string
          updated_at: string
          user_id: string
          year: number
        }[]
      }
      new_listings: {
        Args: { p_limit_count?: number; p_offset_count?: number }
        Returns: {
          car_brand: string
          car_id: number
          car_model: string
          car_series_id: number
          city_name: string
          color: string
          created_at: string
          custom_car_name: string
          custom_city: string
          custom_region: string
          custom_series_name: string
          fuel_type: string
          id: number
          images: string[]
          mileage: number
          price: number
          region_name: string
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          transmission: string
          updated_at: string
          user_id: string
          year: number
        }[]
      }
      publish: {
        Args: { p_listing_id: number }
        Returns: {
          id: number
          status: Database["public"]["Enums"]["listing_status"]
          updated_at: string
        }[]
      }
      search: {
        Args: {
          p_car_id?: number
          p_car_series_id?: number
          p_city_id?: number
          p_city_name?: string
          p_color?: string
          p_fuel_type?: string
          p_limit_count?: number
          p_max_mileage?: number
          p_max_price?: number
          p_max_year?: number
          p_min_price?: number
          p_min_year?: number
          p_offset_count?: number
          p_region_id?: number
          p_region_name?: string
          p_search_query?: string
          p_sort_by?: string
          p_sort_order?: string
          p_transmission?: string
        }
        Returns: {
          car_brand: string
          car_id: number
          car_model: string
          car_series_id: number
          city_name: string
          color: string
          created_at: string
          custom_car_name: string
          custom_city: string
          custom_region: string
          custom_series_name: string
          fuel_type: string
          id: number
          images: string[]
          mileage: number
          price: number
          region_name: string
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          total_count: number
          transmission: string
          updated_at: string
          user_id: string
          year: number
        }[]
      }
      update_car_logo: {
        Args: { p_car_id: number; p_logo_url: string }
        Returns: boolean
      }
      update_listing: {
        Args: {
          p_car_id?: number
          p_car_series_id?: number
          p_city_id?: number
          p_color?: string
          p_custom_car_name?: string
          p_custom_city?: string
          p_custom_region?: string
          p_custom_series_name?: string
          p_fuel_type?: string
          p_images?: string[]
          p_listing_id: number
          p_mileage?: number
          p_price?: number
          p_region_id?: number
          p_status?: Database["public"]["Enums"]["listing_status"]
          p_title?: string
          p_transmission?: string
          p_year?: number
        }
        Returns: {
          car_id: number
          car_series_id: number
          city_name: string
          color: string
          custom_car_name: string
          custom_city: string
          custom_region: string
          custom_series_name: string
          fuel_type: string
          id: number
          images: string[]
          mileage: number
          price: number
          region_name: string
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          transmission: string
          updated_at: string
          user_id: string
          year: number
        }[]
      }
    }
    Enums: {
      listing_status: "active" | "sold" | "draft" | "archived" | "deleted"
    }
  }
}


export const Constants = {
  public: {
    Enums: {
      listing_status: ["active", "sold", "draft", "archived", "deleted"],
    },
  },
} as const

// Helper types
export type CarListing = Database["public"]["Functions"]["new_listings"]["Returns"][0]
export type CarListingSearch = Database["public"]["Functions"]["search"]["Returns"][0]
export type CarListingDetail = Database["public"]["Functions"]["listing"]["Returns"][0]
export type MyCarListing = Database["public"]["Functions"]["my_listings"]["Returns"][0]

