CREATE INDEX IF NOT EXISTS idx_car_listings_status_created_at
ON car_listings(status, created_at DESC)
WHERE status = 'active'::listing_status;

CREATE INDEX IF NOT EXISTS idx_car_listings_status_price
ON car_listings(status, price)
WHERE status = 'active'::listing_status;

CREATE INDEX IF NOT EXISTS idx_car_listings_car_composite
ON car_listings(car_id, car_series_id)
WHERE car_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_car_listings_user_status
ON car_listings(user_id, status, created_at DESC);

DROP INDEX IF EXISTS idx_car_listings_search;

CREATE INDEX idx_car_listings_search ON car_listings USING GIN(
  to_tsvector('english',
    COALESCE(title, '') || ' ' ||
    COALESCE(custom_car_name, '') || ' ' ||
    COALESCE(custom_series_name, '') || ' ' ||
    COALESCE(custom_city, '') || ' ' ||
    COALESCE(custom_region, '')
  )
);

DROP FUNCTION IF EXISTS new_listings(INTEGER, INTEGER);
DROP FUNCTION IF EXISTS listing(BIGINT);
DROP FUNCTION IF EXISTS my_listings(listing_status);
DROP FUNCTION IF EXISTS search(TEXT, BIGINT, BIGINT, DECIMAL, DECIMAL, INTEGER, INTEGER, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, TEXT, TEXT);
DROP FUNCTION IF EXISTS update_listing(BIGINT, TEXT, INTEGER, INTEGER, TEXT, DECIMAL, TEXT, TEXT, TEXT[], TEXT, TEXT, listing_status, BIGINT, BIGINT, TEXT, TEXT);

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
  city_name TEXT,
  region_name TEXT,
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
    COALESCE(ci.name, cl.custom_city) AS city_name,
    COALESCE(r.name, cl.custom_region) AS region_name,
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
  LEFT JOIN cities ci ON cl.city_id = ci.id
  LEFT JOIN regions r ON cl.region_id = r.id
  WHERE cl.status = 'active'::listing_status
  ORDER BY cl.created_at DESC
  LIMIT p_limit_count
  OFFSET p_offset_count;
END;
$$;

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
  city_name TEXT,
  region_name TEXT,
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
    COALESCE(ci.name, cl.custom_city) AS city_name,
    COALESCE(r.name, cl.custom_region) AS region_name,
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
  LEFT JOIN cities ci ON cl.city_id = ci.id
  LEFT JOIN regions r ON cl.region_id = r.id
  WHERE cl.id = p_listing_id
    AND (
      cl.status = 'active'::listing_status OR
      cl.user_id = auth.uid()
    )
  LIMIT 1;
END;
$$;

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
  city_name TEXT,
  region_name TEXT,
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
    COALESCE(ci.name, cl.custom_city) AS city_name,
    COALESCE(r.name, cl.custom_region) AS region_name,
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
  LEFT JOIN cities ci ON cl.city_id = ci.id
  LEFT JOIN regions r ON cl.region_id = r.id
  WHERE cl.user_id = auth.uid()
    AND (p_status_filter IS NULL OR cl.status = p_status_filter::listing_status)
  ORDER BY cl.created_at DESC;
END;
$$;

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
  p_city_id INTEGER DEFAULT NULL,
  p_region_id INTEGER DEFAULT NULL,
  p_city_name TEXT DEFAULT NULL,
  p_region_name TEXT DEFAULT NULL,
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
  city_name TEXT,
  region_name TEXT,
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
        COALESCE(ci.name, cl.custom_city) AS city_name,
        COALESCE(r.name, cl.custom_region) AS region_name,
        COUNT(*) OVER() AS total_count
      FROM car_listings cl
      LEFT JOIN cars c ON cl.car_id = c.id
      LEFT JOIN car_series cs ON cl.car_series_id = cs.id
      LEFT JOIN cities ci ON cl.city_id = ci.id
      LEFT JOIN regions r ON cl.region_id = r.id
      WHERE cl.status = ''active''::listing_status
        AND ($1 IS NULL OR to_tsvector(''english'',
          COALESCE(cl.title, '''') || '' '' ||
          COALESCE(c.name, cl.custom_car_name, '''') || '' '' ||
          COALESCE(cs.name, cl.custom_series_name, '''') || '' '' ||
          COALESCE(ci.name, cl.custom_city, '''') || '' '' ||
          COALESCE(r.name, cl.custom_region, '''')
        ) @@ plainto_tsquery(''english'', $1))
        AND ($2 IS NULL OR cl.car_id = $2)
        AND ($3 IS NULL OR cl.car_series_id = $3)
        AND ($4 IS NULL OR cl.price >= $4)
        AND ($5 IS NULL OR cl.price <= $5)
        AND ($6 IS NULL OR cl.year >= $6)
        AND ($7 IS NULL OR cl.year <= $7)
        AND ($8 IS NULL OR cl.mileage <= $8)
        AND ($9 IS NULL OR cl.fuel_type = $9)
        AND ($10 IS NULL OR cl.transmission = $10)
        AND ($11 IS NULL OR cl.city_id = $11)
        AND ($12 IS NULL OR cl.region_id = $12)
        AND ($13 IS NULL OR ci.name ILIKE ''%%'' || $13 || ''%%'' OR cl.custom_city ILIKE ''%%'' || $13 || ''%%'')
        AND ($14 IS NULL OR r.name ILIKE ''%%'' || $14 || ''%%'' OR cl.custom_region ILIKE ''%%'' || $14 || ''%%'')
        AND ($15 IS NULL OR cl.color ILIKE ''%%'' || $15 || ''%%'')
      ORDER BY %s
      LIMIT $16 OFFSET $17
    )
    SELECT
      id, user_id, car_id, car_series_id, custom_car_name, custom_series_name,
      title, year, mileage, color, price, city_name, region_name, images,
      fuel_type, transmission, status,
      created_at, updated_at, car_brand, car_model, total_count
    FROM filtered_listings
  ', v_sort_sql)
  USING
    p_search_query, p_car_id, p_car_series_id, p_min_price, p_max_price,
    p_min_year, p_max_year, p_max_mileage, p_fuel_type, p_transmission,
    p_city_id, p_region_id, p_city_name, p_region_name, p_color,
    p_limit_count, p_offset_count;
END;
$$;

GRANT EXECUTE ON FUNCTION search(TEXT, BIGINT, BIGINT, DECIMAL, DECIMAL, INTEGER, INTEGER, INTEGER, TEXT, TEXT, INTEGER, INTEGER, TEXT, TEXT, TEXT, INTEGER, INTEGER, TEXT, TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION update_listing(
  p_listing_id BIGINT,
  p_title TEXT DEFAULT NULL,
  p_year INTEGER DEFAULT NULL,
  p_mileage INTEGER DEFAULT NULL,
  p_color TEXT DEFAULT NULL,
  p_price DECIMAL DEFAULT NULL,
  p_city_id INTEGER DEFAULT NULL,
  p_region_id INTEGER DEFAULT NULL,
  p_custom_city TEXT DEFAULT NULL,
  p_custom_region TEXT DEFAULT NULL,
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
  city_name TEXT,
  region_name TEXT,
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
DECLARE
  v_city_name TEXT;
  v_region_name TEXT;
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

  IF (p_city_id IS NOT NULL OR p_region_id IS NOT NULL OR
      p_custom_city IS NOT NULL OR p_custom_region IS NOT NULL) THEN
    IF (p_city_id IS NULL OR p_region_id IS NULL) AND
       (p_custom_city IS NULL OR p_custom_region IS NULL) THEN
      RAISE EXCEPTION 'Either city_id+region_id OR custom_city+custom_region must be provided';
    END IF;
  END IF;

  IF p_city_id IS NOT NULL THEN
    SELECT name INTO v_city_name FROM cities WHERE id = p_city_id;
    IF v_city_name IS NULL THEN
      RAISE EXCEPTION 'Invalid city_id: city not found';
    END IF;
  END IF;
  IF p_region_id IS NOT NULL THEN
    SELECT name INTO v_region_name FROM regions WHERE id = p_region_id;
    IF v_region_name IS NULL THEN
      RAISE EXCEPTION 'Invalid region_id: region not found';
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
    city_id = COALESCE(p_city_id, city_id),
    region_id = COALESCE(p_region_id, region_id),
    custom_city = COALESCE(p_custom_city, custom_city),
    custom_region = COALESCE(p_custom_region, custom_region),
    city = CASE
      WHEN p_city_id IS NOT NULL THEN v_city_name
      WHEN p_custom_city IS NOT NULL THEN p_custom_city
      ELSE city
    END,
    region = CASE
      WHEN p_region_id IS NOT NULL THEN v_region_name
      WHEN p_custom_region IS NOT NULL THEN p_custom_region
      ELSE region
    END,
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
    COALESCE(ci.name, cl.custom_city) AS city_name,
    COALESCE(r.name, cl.custom_region) AS region_name,
    cl.images,
    cl.fuel_type,
    cl.transmission,
    cl.status,
    cl.updated_at
  FROM car_listings cl
  LEFT JOIN cities ci ON cl.city_id = ci.id
  LEFT JOIN regions r ON cl.region_id = r.id
  WHERE cl.id = p_listing_id;
END;
$$;

GRANT EXECUTE ON FUNCTION update_listing(BIGINT, TEXT, INTEGER, INTEGER, TEXT, DECIMAL, INTEGER, INTEGER, TEXT, TEXT, TEXT[], TEXT, TEXT, listing_status, BIGINT, BIGINT, TEXT, TEXT) TO authenticated;
