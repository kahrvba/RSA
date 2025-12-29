# RPC Functions

### car_brands()
Returns: `id`, `name`

### car_series(p_car_id)
Parameters: `p_car_id BIGINT`
Returns: `id`, `name`, `car_id`

### all_series()
Returns: `series_id`, `series_name`, `car_id`, `car_brand`

### get_car_brands_with_logos()
Returns: `id`, `name`, `logo_url`

### get_regions()
Returns: `id`, `name`

### get_cities(p_region_id)
Parameters: `p_region_id INTEGER`
Returns: `id`, `name`, `region_id`

### get_all_cities()
Returns: `city_id`, `city_name`, `region_id`, `region_name`

## Listings

### new_listings(p_limit_count, p_offset_count)
Parameters: `p_limit_count INTEGER DEFAULT 20`, `p_offset_count INTEGER DEFAULT 0`
Returns: `id`, `user_id`, `car_id`, `car_series_id`, `custom_car_name`, `custom_series_name`, `title`, `year`, `mileage`, `color`, `price`, `city_name`, `region_name`, `images`, `fuel_type`, `transmission`, `status`, `created_at`, `updated_at`, `car_brand`, `car_model`

### listing(p_listing_id)
Parameters: `p_listing_id BIGINT`
Returns: `id`, `user_id`, `car_id`, `car_series_id`, `custom_car_name`, `custom_series_name`, `title`, `year`, `mileage`, `color`, `price`, `city_name`, `region_name`, `images`, `fuel_type`, `transmission`, `status`, `created_at`, `updated_at`, `car_brand`, `car_model`

### my_listings(p_status_filter)
Parameters: `p_status_filter listing_status DEFAULT NULL`
Returns: `id`, `user_id`, `car_id`, `car_series_id`, `custom_car_name`, `custom_series_name`, `title`, `year`, `mileage`, `color`, `price`, `city_name`, `region_name`, `images`, `fuel_type`, `transmission`, `status`, `created_at`, `updated_at`, `car_brand`, `car_model`

## Search

### search(...)
Parameters:
- `p_search_query TEXT DEFAULT NULL`
- `p_car_id BIGINT DEFAULT NULL`
- `p_car_series_id BIGINT DEFAULT NULL`
- `p_min_price DECIMAL DEFAULT NULL`
- `p_max_price DECIMAL DEFAULT NULL`
- `p_min_year INTEGER DEFAULT NULL`
- `p_max_year INTEGER DEFAULT NULL`
- `p_max_mileage INTEGER DEFAULT NULL`
- `p_fuel_type TEXT DEFAULT NULL`
- `p_transmission TEXT DEFAULT NULL`
- `p_city_id INTEGER DEFAULT NULL`
- `p_region_id INTEGER DEFAULT NULL`
- `p_city_name TEXT DEFAULT NULL`
- `p_region_name TEXT DEFAULT NULL`
- `p_color TEXT DEFAULT NULL`
- `p_limit_count INTEGER DEFAULT 20`
- `p_offset_count INTEGER DEFAULT 0`
- `p_sort_by TEXT DEFAULT 'created_at'`
- `p_sort_order TEXT DEFAULT 'DESC'`

Returns: `id`, `user_id`, `car_id`, `car_series_id`, `custom_car_name`, `custom_series_name`, `title`, `year`, `mileage`, `color`, `price`, `city_name`, `region_name`, `images`, `fuel_type`, `transmission`, `status`, `created_at`, `updated_at`, `car_brand`, `car_model`, `total_count`

## CRUD

### create_listing(...)
Parameters:
- `p_title TEXT`
- `p_year INTEGER`
- `p_mileage INTEGER`
- `p_color TEXT`
- `p_price DECIMAL`
- `p_fuel_type TEXT`
- `p_transmission TEXT`
- `p_car_id BIGINT DEFAULT NULL`
- `p_car_series_id BIGINT DEFAULT NULL`
- `p_custom_car_name TEXT DEFAULT NULL`
- `p_custom_series_name TEXT DEFAULT NULL`
- `p_city_id INTEGER DEFAULT NULL`
- `p_region_id INTEGER DEFAULT NULL`
- `p_custom_city TEXT DEFAULT NULL`
- `p_custom_region TEXT DEFAULT NULL`
- `p_images TEXT[] DEFAULT '{}'`

Returns: `id`, `user_id`, `car_id`, `car_series_id`, `custom_car_name`, `custom_series_name`, `title`, `year`, `mileage`, `color`, `price`, `city_name`, `region_name`, `images`, `fuel_type`, `transmission`, `status`, `created_at`

### update_listing(...)
Parameters:
- `p_listing_id BIGINT`
- `p_title TEXT DEFAULT NULL`
- `p_year INTEGER DEFAULT NULL`
- `p_mileage INTEGER DEFAULT NULL`
- `p_color TEXT DEFAULT NULL`
- `p_price DECIMAL DEFAULT NULL`
- `p_city_id INTEGER DEFAULT NULL`
- `p_region_id INTEGER DEFAULT NULL`
- `p_custom_city TEXT DEFAULT NULL`
- `p_custom_region TEXT DEFAULT NULL`
- `p_images TEXT[] DEFAULT NULL`
- `p_fuel_type TEXT DEFAULT NULL`
- `p_transmission TEXT DEFAULT NULL`
- `p_status listing_status DEFAULT NULL`
- `p_car_id BIGINT DEFAULT NULL`
- `p_car_series_id BIGINT DEFAULT NULL`
- `p_custom_car_name TEXT DEFAULT NULL`
- `p_custom_series_name TEXT DEFAULT NULL`

Returns: `id`, `user_id`, `car_id`, `car_series_id`, `custom_car_name`, `custom_series_name`, `title`, `year`, `mileage`, `color`, `price`, `city_name`, `region_name`, `images`, `fuel_type`, `transmission`, `status`, `updated_at`

### delete_listing(p_listing_id)
Parameters: `p_listing_id BIGINT`
Returns: `BOOLEAN`

### publish(p_listing_id)
Parameters: `p_listing_id BIGINT`
Returns: `id`, `status`, `updated_at`

## Admin

### update_car_logo(p_car_id, p_logo_url)
Parameters: `p_car_id BIGINT`, `p_logo_url TEXT`
Returns: `BOOLEAN`

### add_car_with_series(p_car_name, p_logo_url, p_series_names)
Parameters: `p_car_name TEXT`, `p_logo_url TEXT DEFAULT NULL`, `p_series_names TEXT[] DEFAULT '{}'`
Returns: `v_car_id`, `v_car_name`, `v_logo_url`, `v_series_added`

