ALTER TABLE cars ADD COLUMN IF NOT EXISTS logo_url TEXT;
CREATE INDEX IF NOT EXISTS idx_cars_logo_url ON cars(logo_url) WHERE logo_url IS NOT NULL;

INSERT INTO storage.buckets (id, name, public)
VALUES ('car-logos', 'car-logos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access car logos" ON storage.objects;
CREATE POLICY "Public Access car logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'car-logos');

DROP POLICY IF EXISTS "Anonymous can upload car logos" ON storage.objects;
CREATE POLICY "Anonymous can upload car logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'car-logos');

CREATE OR REPLACE FUNCTION update_car_logo(p_car_id BIGINT, p_logo_url TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE cars
  SET logo_url = p_logo_url
  WHERE id = p_car_id;
  RETURN TRUE;
END;
$$;
GRANT EXECUTE ON FUNCTION update_car_logo(BIGINT, TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION get_car_brands_with_logos()
RETURNS TABLE (
  id BIGINT,
  name TEXT,
  logo_url TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, name, logo_url
  FROM cars
  ORDER BY name;
$$;
GRANT EXECUTE ON FUNCTION get_car_brands_with_logos() TO anon, authenticated;

CREATE OR REPLACE FUNCTION add_car_with_series(
  p_car_name TEXT,
  p_logo_url TEXT DEFAULT NULL,
  p_series_names TEXT[] DEFAULT '{}'
)
RETURNS TABLE (
  v_car_id BIGINT,
  v_car_name TEXT,
  v_logo_url TEXT,
  v_series_added INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_car_id BIGINT;
  v_series_count INTEGER := 0;
  v_series_name TEXT;
  v_final_logo_url TEXT;
BEGIN
  SELECT id INTO v_car_id FROM cars WHERE name = p_car_name;

  IF v_car_id IS NULL THEN
    INSERT INTO cars (name, logo_url)
    VALUES (p_car_name, p_logo_url)
    RETURNING id INTO v_car_id;
    v_final_logo_url := p_logo_url;
  ELSE
    IF p_logo_url IS NOT NULL THEN
      UPDATE cars SET logo_url = p_logo_url WHERE id = v_car_id;
      v_final_logo_url := p_logo_url;
    ELSE
      SELECT logo_url INTO v_final_logo_url FROM cars WHERE id = v_car_id;
    END IF;
  END IF;

  IF array_length(p_series_names, 1) > 0 THEN
    FOREACH v_series_name IN ARRAY p_series_names
    LOOP
      INSERT INTO car_series (car_id, name)
      VALUES (v_car_id, v_series_name)
      ON CONFLICT ON CONSTRAINT car_series_car_id_name_unique DO NOTHING;

      IF FOUND THEN
        v_series_count := v_series_count + 1;
      END IF;
    END LOOP;
  END IF;

  RETURN QUERY
  SELECT v_car_id, p_car_name, v_final_logo_url, v_series_count;
END;
$$;
GRANT EXECUTE ON FUNCTION add_car_with_series(TEXT, TEXT, TEXT[]) TO anon, authenticated;
