CREATE TABLE IF NOT EXISTS car_listings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  car_id BIGINT REFERENCES cars(id) ON DELETE RESTRICT,
  car_series_id BIGINT REFERENCES car_series(id) ON DELETE RESTRICT,
  custom_car_name TEXT,
  custom_series_name TEXT,
  title TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM NOW()) + 1),
  mileage INTEGER NOT NULL CHECK (mileage >= 0),
  color TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL CHECK (price > 0),
  city TEXT,
  region TEXT,
  city_id INTEGER REFERENCES cities(id) ON DELETE RESTRICT,
  region_id INTEGER REFERENCES regions(id) ON DELETE RESTRICT,
  custom_city TEXT,
  custom_region TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  fuel_type TEXT NOT NULL CHECK (fuel_type IN ('petrol', 'diesel', 'hybrid', 'electric')),
  transmission TEXT NOT NULL CHECK (transmission IN ('manual', 'automatic')),
  status listing_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT car_reference_check CHECK (
    (car_id IS NOT NULL AND car_series_id IS NOT NULL) OR
    (custom_car_name IS NOT NULL AND custom_series_name IS NOT NULL)
  ),
  CONSTRAINT city_region_reference_check CHECK (
    (city_id IS NOT NULL AND region_id IS NOT NULL) OR
    (custom_city IS NOT NULL AND custom_region IS NOT NULL)
  )
);
CREATE INDEX IF NOT EXISTS idx_car_listings_user_id ON car_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_car_listings_car_id ON car_listings(car_id);
CREATE INDEX IF NOT EXISTS idx_car_listings_car_series_id ON car_listings(car_series_id);
CREATE INDEX IF NOT EXISTS idx_car_listings_status ON car_listings(status);
CREATE INDEX IF NOT EXISTS idx_car_listings_created_at ON car_listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_car_listings_price ON car_listings(price);
CREATE INDEX IF NOT EXISTS idx_car_listings_year ON car_listings(year);
CREATE INDEX IF NOT EXISTS idx_car_listings_city_id ON car_listings(city_id);
CREATE INDEX IF NOT EXISTS idx_car_listings_region_id ON car_listings(region_id);
CREATE INDEX IF NOT EXISTS idx_car_listings_fuel_type ON car_listings(fuel_type);
CREATE INDEX IF NOT EXISTS idx_car_listings_transmission ON car_listings(transmission);
CREATE INDEX IF NOT EXISTS idx_car_listings_search ON car_listings USING GIN(
  to_tsvector('english',
    COALESCE(title, '') || ' ' ||
    COALESCE(custom_car_name, '') || ' ' ||
    COALESCE(custom_series_name, '') || ' ' ||
    COALESCE(custom_city, '') || ' ' ||
    COALESCE(custom_region, '')
  )
);
CREATE OR REPLACE FUNCTION update_car_listings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS car_listings_updated_at ON car_listings;
CREATE TRIGGER car_listings_updated_at
  BEFORE UPDATE ON car_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_car_listings_updated_at();
ALTER TABLE car_listings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view active car listings" ON car_listings;
CREATE POLICY "Anyone can view active car listings"
  ON car_listings FOR SELECT
  USING (status = 'active'::listing_status);
DROP POLICY IF EXISTS "Users can view their own car listings" ON car_listings;
CREATE POLICY "Users can view their own car listings"
  ON car_listings FOR SELECT
  USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Authenticated users can create car listings" ON car_listings;
CREATE POLICY "Authenticated users can create car listings"
  ON car_listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own car listings" ON car_listings;
CREATE POLICY "Users can update their own car listings"
  ON car_listings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their own car listings" ON car_listings;
CREATE POLICY "Users can delete their own car listings"
  ON car_listings FOR DELETE
  USING (auth.uid() = user_id);
