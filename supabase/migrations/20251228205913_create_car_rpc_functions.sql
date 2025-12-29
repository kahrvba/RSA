CREATE OR REPLACE FUNCTION car_brands()
RETURNS TABLE (
  id BIGINT,
  name TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, name
  FROM cars
  ORDER BY name;
$$;

GRANT EXECUTE ON FUNCTION car_brands() TO anon, authenticated;

CREATE OR REPLACE FUNCTION car_series(p_car_id BIGINT)
RETURNS TABLE (
  id BIGINT,
  name TEXT,
  car_id BIGINT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, name, car_id
  FROM car_series
  WHERE car_id = p_car_id
  ORDER BY name;
$$;

GRANT EXECUTE ON FUNCTION car_series(BIGINT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION all_series()
RETURNS TABLE (
  series_id BIGINT,
  series_name TEXT,
  car_id BIGINT,
  car_brand TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    cs.id AS series_id,
    cs.name AS series_name,
    cs.car_id,
    c.name AS car_brand
  FROM car_series cs
  JOIN cars c ON cs.car_id = c.id
  ORDER BY c.name, cs.name;
$$;

GRANT EXECUTE ON FUNCTION all_series() TO anon, authenticated;

CREATE OR REPLACE FUNCTION get_regions()
RETURNS TABLE (
  id INTEGER,
  name TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, name
  FROM regions
  ORDER BY name;
$$;
GRANT EXECUTE ON FUNCTION get_regions() TO anon, authenticated;

CREATE OR REPLACE FUNCTION get_cities(p_region_id INTEGER)
RETURNS TABLE (
  id INTEGER,
  name TEXT,
  region_id INTEGER
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, name, governorate_id as region_id
  FROM cities
  WHERE governorate_id = p_region_id
  ORDER BY name;
$$;
GRANT EXECUTE ON FUNCTION get_cities(INTEGER) TO anon, authenticated;

CREATE OR REPLACE FUNCTION get_all_cities()
RETURNS TABLE (
  city_id INTEGER,
  city_name TEXT,
  region_id INTEGER,
  region_name TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.id AS city_id,
    c.name AS city_name,
    r.id AS region_id,
    r.name AS region_name
  FROM cities c
  JOIN regions r ON c.governorate_id = r.id
  ORDER BY r.name, c.name;
$$;
GRANT EXECUTE ON FUNCTION get_all_cities() TO anon, authenticated;

CREATE OR REPLACE FUNCTION new_listings(
  p_limit_count INTEGER DEFAULT 20,
  p_offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id BIGINT,
  user_id UUID,
  car_id BIGINT,
  car_series_id BIGINT,
  custom_car_name TEXT,
  custom_series_name TEXT,
  title TEXT,
  year INTEGER,
  mileage INTEGER,
  color TEXT,
  price DECIMAL,
  city TEXT,
  region TEXT,
  images TEXT[],
  fuel_type TEXT,
  transmission TEXT,
  status listing_status,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  car_brand TEXT,
  car_model TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cl.id,
    cl.user_id,
    cl.car_id,
    cl.car_series_id,
    cl.custom_car_name,
    cl.custom_series_name,
    cl.title,
    cl.year,
    cl.mileage,
    cl.color,
    cl.price,
    cl.city,
    cl.region,
    cl.images,
    cl.fuel_type,
    cl.transmission,
    cl.status,
    cl.created_at,
    cl.updated_at,
    COALESCE(c.name, cl.custom_car_name) AS car_brand,
    COALESCE(cs.name, cl.custom_series_name) AS car_model
  FROM car_listings cl
  LEFT JOIN cars c ON cl.car_id = c.id
  LEFT JOIN car_series cs ON cl.car_series_id = cs.id
  WHERE cl.status = 'active'::listing_status
  ORDER BY cl.created_at DESC
  LIMIT p_limit_count
  OFFSET p_offset_count;
END;
$$;

GRANT EXECUTE ON FUNCTION new_listings(INTEGER, INTEGER) TO anon, authenticated;

CREATE OR REPLACE FUNCTION listing(p_listing_id BIGINT)
RETURNS TABLE (
  id BIGINT,
  user_id UUID,
  car_id BIGINT,
  car_series_id BIGINT,
  custom_car_name TEXT,
  custom_series_name TEXT,
  title TEXT,
  year INTEGER,
  mileage INTEGER,
  color TEXT,
  price DECIMAL,
  city TEXT,
  region TEXT,
  images TEXT[],
  fuel_type TEXT,
  transmission TEXT,
  status listing_status,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  car_brand TEXT,
  car_model TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cl.id,
    cl.user_id,
    cl.car_id,
    cl.car_series_id,
    cl.custom_car_name,
    cl.custom_series_name,
    cl.title,
    cl.year,
    cl.mileage,
    cl.color,
    cl.price,
    cl.city,
    cl.region,
    cl.images,
    cl.fuel_type,
    cl.transmission,
    cl.status,
    cl.created_at,
    cl.updated_at,
    COALESCE(c.name, cl.custom_car_name) AS car_brand,
    COALESCE(cs.name, cl.custom_series_name) AS car_model
  FROM car_listings cl
  LEFT JOIN cars c ON cl.car_id = c.id
  LEFT JOIN car_series cs ON cl.car_series_id = cs.id
  WHERE cl.id = p_listing_id
    AND (
      cl.status = 'active'::listing_status OR
      cl.user_id = auth.uid()
    )
  LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION listing(BIGINT) TO anon, authenticated;
CREATE OR REPLACE FUNCTION search(
  p_search_query TEXT DEFAULT NULL,
  p_car_id BIGINT DEFAULT NULL,
  p_car_series_id BIGINT DEFAULT NULL,
  p_min_price DECIMAL DEFAULT NULL,
  p_max_price DECIMAL DEFAULT NULL,
  p_min_year INTEGER DEFAULT NULL,
  p_max_year INTEGER DEFAULT NULL,
  p_max_mileage INTEGER DEFAULT NULL,
  p_fuel_type TEXT DEFAULT NULL,
  p_transmission TEXT DEFAULT NULL,
  p_city TEXT DEFAULT NULL,
  p_region TEXT DEFAULT NULL,
  p_color TEXT DEFAULT NULL,
  p_limit_count INTEGER DEFAULT 20,
  p_offset_count INTEGER DEFAULT 0,
  p_sort_by TEXT DEFAULT 'created_at',
  p_sort_order TEXT DEFAULT 'DESC'
)
RETURNS TABLE (
  id BIGINT,
  user_id UUID,
  car_id BIGINT,
  car_series_id BIGINT,
  custom_car_name TEXT,
  custom_series_name TEXT,
  title TEXT,
  year INTEGER,
  mileage INTEGER,
  color TEXT,
  price DECIMAL,
  city TEXT,
  region TEXT,
  images TEXT[],
  fuel_type TEXT,
  transmission TEXT,
  status listing_status,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  car_brand TEXT,
  car_model TEXT,
  total_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_sort_sql TEXT;
BEGIN

  CASE p_sort_by
    WHEN 'price' THEN v_sort_sql := 'cl.price';
    WHEN 'year' THEN v_sort_sql := 'cl.year';
    WHEN 'mileage' THEN v_sort_sql := 'cl.mileage';
    ELSE v_sort_sql := 'cl.created_at';
  END CASE;

  IF p_sort_order NOT IN ('ASC', 'DESC') THEN
    v_sort_sql := v_sort_sql || ' DESC';
  ELSE
    v_sort_sql := v_sort_sql || ' ' || p_sort_order;
  END IF;

  RETURN QUERY
  EXECUTE format('
    WITH filtered_listings AS (
      SELECT
        cl.*,
        COALESCE(c.name, cl.custom_car_name) AS car_brand,
        COALESCE(cs.name, cl.custom_series_name) AS car_model,
        COUNT(*) OVER() AS total_count
      FROM car_listings cl
      LEFT JOIN cars c ON cl.car_id = c.id
      LEFT JOIN car_series cs ON cl.car_series_id = cs.id
      WHERE cl.status = ''active''::listing_status
        AND ($1 IS NULL OR to_tsvector(''english'', COALESCE(cl.title, '''') || '' '' || COALESCE(cl.city, '''') || '' '' || COALESCE(cl.region, '''')) @@ plainto_tsquery(''english'', $1))
        AND ($2 IS NULL OR cl.car_id = $2 OR cl.custom_car_name ILIKE ''%%'' || $2::TEXT || ''%%'')
        AND ($3 IS NULL OR cl.car_series_id = $3 OR cl.custom_series_name ILIKE ''%%'' || $3::TEXT || ''%%'')
        AND ($4 IS NULL OR cl.price >= $4)
        AND ($5 IS NULL OR cl.price <= $5)
        AND ($6 IS NULL OR cl.year >= $6)
        AND ($7 IS NULL OR cl.year <= $7)
        AND ($8 IS NULL OR cl.mileage <= $8)
        AND ($9 IS NULL OR cl.fuel_type = $9)
        AND ($10 IS NULL OR cl.transmission = $10)
        AND ($11 IS NULL OR cl.city ILIKE ''%%'' || $11 || ''%%'')
        AND ($12 IS NULL OR cl.region ILIKE ''%%'' || $12 || ''%%'')
        AND ($13 IS NULL OR cl.color ILIKE ''%%'' || $13 || ''%%'')
      ORDER BY %s
      LIMIT $14 OFFSET $15
    )
    SELECT
      id, user_id, car_id, car_series_id, custom_car_name, custom_series_name,
      title, year, mileage, color, price, city, region, images,
      fuel_type, transmission, status,
      created_at, updated_at, car_brand, car_model, total_count
    FROM filtered_listings
  ', v_sort_sql)
  USING
    p_search_query, p_car_id, p_car_series_id, p_min_price, p_max_price,
    p_min_year, p_max_year, p_max_mileage, p_fuel_type, p_transmission,
    p_city, p_region, p_color, p_limit_count, p_offset_count;
END;
$$;

GRANT EXECUTE ON FUNCTION search(TEXT, BIGINT, BIGINT, DECIMAL, DECIMAL, INTEGER, INTEGER, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, TEXT, TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION my_listings(p_status_filter listing_status DEFAULT NULL)
RETURNS TABLE (
  id BIGINT,
  user_id UUID,
  car_id BIGINT,
  car_series_id BIGINT,
  custom_car_name TEXT,
  custom_series_name TEXT,
  title TEXT,
  year INTEGER,
  mileage INTEGER,
  color TEXT,
  price DECIMAL,
  city TEXT,
  region TEXT,
  images TEXT[],
  fuel_type TEXT,
  transmission TEXT,
  status listing_status,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  car_brand TEXT,
  car_model TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cl.id,
    cl.user_id,
    cl.car_id,
    cl.car_series_id,
    cl.custom_car_name,
    cl.custom_series_name,
    cl.title,
    cl.year,
    cl.mileage,
    cl.color,
    cl.price,
    cl.city,
    cl.region,
    cl.images,
    cl.fuel_type,
    cl.transmission,
    cl.status,
    cl.created_at,
    cl.updated_at,
    COALESCE(c.name, cl.custom_car_name) AS car_brand,
    COALESCE(cs.name, cl.custom_series_name) AS car_model
  FROM car_listings cl
  LEFT JOIN cars c ON cl.car_id = c.id
  LEFT JOIN car_series cs ON cl.car_series_id = cs.id
  WHERE cl.user_id = auth.uid()
    AND (p_status_filter IS NULL OR cl.status = p_status_filter::listing_status)
  ORDER BY cl.created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION my_listings(TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION create_listing(
  p_title TEXT,
  p_year INTEGER,
  p_mileage INTEGER,
  p_color TEXT,
  p_price DECIMAL,
  p_city TEXT,
  p_region TEXT,
  p_fuel_type TEXT,
  p_transmission TEXT,
  p_car_id BIGINT DEFAULT NULL,
  p_car_series_id BIGINT DEFAULT NULL,
  p_custom_car_name TEXT DEFAULT NULL,
  p_custom_series_name TEXT DEFAULT NULL,
  p_images TEXT[] DEFAULT '{}'
)
RETURNS TABLE (
  id BIGINT,
  user_id UUID,
  car_id BIGINT,
  car_series_id BIGINT,
  custom_car_name TEXT,
  custom_series_name TEXT,
  title TEXT,
  year INTEGER,
  mileage INTEGER,
  color TEXT,
  price DECIMAL,
  city TEXT,
  region TEXT,
  images TEXT[],
  fuel_type TEXT,
  transmission TEXT,
  status listing_status,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_listing_id BIGINT;
BEGIN

  IF (p_car_id IS NULL OR p_car_series_id IS NULL) AND
     (p_custom_car_name IS NULL OR p_custom_series_name IS NULL) THEN
    RAISE EXCEPTION 'Either car_id+car_series_id OR custom_car_name+custom_series_name must be provided';
  END IF;

  INSERT INTO car_listings (
    user_id,
    car_id,
    car_series_id,
    custom_car_name,
    custom_series_name,
    title,
    year,
    mileage,
    color,
    price,
    city,
    region,
    images,
    fuel_type,
    transmission,
    status
  ) VALUES (
    auth.uid(),
    p_car_id,
    p_car_series_id,
    p_custom_car_name,
    p_custom_series_name,
    p_title,
    p_year,
    p_mileage,
    p_color,
    p_price,
    p_city,
    p_region,
    p_images,
    p_fuel_type,
    p_transmission,
    'active'::listing_status
  )
  RETURNING id INTO v_listing_id;

  RETURN QUERY
  SELECT
    cl.id,
    cl.user_id,
    cl.car_id,
    cl.car_series_id,
    cl.custom_car_name,
    cl.custom_series_name,
    cl.title,
    cl.year,
    cl.mileage,
    cl.color,
    cl.price,
    cl.city,
    cl.region,
    cl.images,
    cl.fuel_type,
    cl.transmission,
    cl.status,
    cl.created_at
  FROM car_listings cl
  WHERE cl.id = v_listing_id;
END;
$$;

GRANT EXECUTE ON FUNCTION create_listing(TEXT, INTEGER, INTEGER, TEXT, DECIMAL, TEXT, TEXT, TEXT, TEXT, BIGINT, BIGINT, TEXT, TEXT, TEXT[]) TO authenticated;

CREATE OR REPLACE FUNCTION update_listing(
  p_listing_id BIGINT,
  p_title TEXT DEFAULT NULL,
  p_year INTEGER DEFAULT NULL,
  p_mileage INTEGER DEFAULT NULL,
  p_color TEXT DEFAULT NULL,
  p_price DECIMAL DEFAULT NULL,
  p_city TEXT DEFAULT NULL,
  p_region TEXT DEFAULT NULL,
  p_images TEXT[] DEFAULT NULL,
  p_fuel_type TEXT DEFAULT NULL,
  p_transmission TEXT DEFAULT NULL,
  p_status listing_status DEFAULT NULL,
  p_car_id BIGINT DEFAULT NULL,
  p_car_series_id BIGINT DEFAULT NULL,
  p_custom_car_name TEXT DEFAULT NULL,
  p_custom_series_name TEXT DEFAULT NULL
)
RETURNS TABLE (
  id BIGINT,
  user_id UUID,
  car_id BIGINT,
  car_series_id BIGINT,
  custom_car_name TEXT,
  custom_series_name TEXT,
  title TEXT,
  year INTEGER,
  mileage INTEGER,
  color TEXT,
  price DECIMAL,
  city TEXT,
  region TEXT,
  images TEXT[],
  fuel_type TEXT,
  transmission TEXT,
  status listing_status,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN

  IF NOT EXISTS (
    SELECT 1 FROM car_listings
    WHERE id = p_listing_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Listing not found or access denied';
  END IF;

  IF (p_car_id IS NOT NULL OR p_car_series_id IS NOT NULL OR
      p_custom_car_name IS NOT NULL OR p_custom_series_name IS NOT NULL) THEN
    IF (p_car_id IS NULL OR p_car_series_id IS NULL) AND
       (p_custom_car_name IS NULL OR p_custom_series_name IS NULL) THEN
      RAISE EXCEPTION 'Either car_id+car_series_id OR custom_car_name+custom_series_name must be provided';
    END IF;
  END IF;

  UPDATE car_listings
  SET
    car_id = COALESCE(p_car_id, car_id),
    car_series_id = COALESCE(p_car_series_id, car_series_id),
    custom_car_name = COALESCE(p_custom_car_name, custom_car_name),
    custom_series_name = COALESCE(p_custom_series_name, custom_series_name),
    title = COALESCE(p_title, title),
    year = COALESCE(p_year, year),
    mileage = COALESCE(p_mileage, mileage),
    color = COALESCE(p_color, color),
    price = COALESCE(p_price, price),
    city = COALESCE(p_city, city),
    region = COALESCE(p_region, region),
    images = COALESCE(p_images, images),
    fuel_type = COALESCE(p_fuel_type, fuel_type),
    transmission = COALESCE(p_transmission, transmission),
    status = COALESCE(p_status, status),
    updated_at = NOW()
  WHERE id = p_listing_id;

  RETURN QUERY
  SELECT
    cl.id,
    cl.user_id,
    cl.car_id,
    cl.car_series_id,
    cl.custom_car_name,
    cl.custom_series_name,
    cl.title,
    cl.year,
    cl.mileage,
    cl.color,
    cl.price,
    cl.city,
    cl.region,
    cl.images,
    cl.fuel_type,
    cl.transmission,
    cl.status,
    cl.updated_at
  FROM car_listings cl
  WHERE cl.id = p_listing_id;
END;
$$;

GRANT EXECUTE ON FUNCTION update_listing(BIGINT, TEXT, INTEGER, INTEGER, TEXT, DECIMAL, TEXT, TEXT, TEXT[], TEXT, TEXT, listing_status, BIGINT, BIGINT, TEXT, TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION delete_listing(p_listing_id BIGINT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN

  IF NOT EXISTS (
    SELECT 1 FROM car_listings
    WHERE id = p_listing_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Listing not found or access denied';
  END IF;

  UPDATE car_listings
  SET status = 'deleted'::listing_status, updated_at = NOW()
  WHERE id = p_listing_id;

  RETURN TRUE;
END;
$$;

GRANT EXECUTE ON FUNCTION delete_listing(BIGINT) TO authenticated;

CREATE OR REPLACE FUNCTION publish(p_listing_id BIGINT)
RETURNS TABLE (
  id BIGINT,
  status listing_status,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN

  IF NOT EXISTS (
    SELECT 1 FROM car_listings
    WHERE id = p_listing_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Listing not found or access denied';
  END IF;

  UPDATE car_listings
  SET status = 'active'::listing_status, updated_at = NOW()
  WHERE id = p_listing_id;

  RETURN QUERY
  SELECT
    cl.id,
    cl.status,
    cl.updated_at
  FROM car_listings cl
  WHERE cl.id = p_listing_id;
END;
$$;

GRANT EXECUTE ON FUNCTION publish(BIGINT) TO authenticated;
