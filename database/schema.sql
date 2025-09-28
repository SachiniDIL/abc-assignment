CREATE DATABASE IF NOT EXISTS abc;
USE abc;

-- Restaurant Booking System Database Schema
-- Based on ABC Ventures website structure

-- Cities/Locations table
CREATE TABLE IF NOT EXISTS cities (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(100) NOT NULL,
                        description TEXT,
                        is_active BOOLEAN DEFAULT TRUE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
                             id INT PRIMARY KEY AUTO_INCREMENT,
                             name VARCHAR(200) NOT NULL,
                             city_id INT NOT NULL,
                             address TEXT,
                             phone VARCHAR(20),
                             email VARCHAR(100),
                             description TEXT,
                             is_active BOOLEAN DEFAULT TRUE,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- Meal categories
CREATE TABLE IF NOT EXISTS meal_categories (
                                 id INT PRIMARY KEY AUTO_INCREMENT,
                                 name VARCHAR(50) NOT NULL, -- Breakfast, Lunch, Dinner
                                 sort_order INT DEFAULT 0
);

-- Menu items
CREATE TABLE IF NOT EXISTS menu_items (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            restaurant_id INT NOT NULL,
                            meal_category_id INT NOT NULL,
                            name VARCHAR(200) NOT NULL,
                            description TEXT,
                            price DECIMAL(10,2) NOT NULL,
                            currency VARCHAR(3) DEFAULT 'USD',
                            image_url VARCHAR(500),
                            cuisine_type ENUM('Arabic', 'English', 'Healthy') NOT NULL,
                            is_available BOOLEAN DEFAULT TRUE,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
                            FOREIGN KEY (meal_category_id) REFERENCES meal_categories(id)
);


-- Table configurations
CREATE TABLE IF NOT EXISTS restaurant_tables (
                                   id INT PRIMARY KEY AUTO_INCREMENT,
                                   restaurant_id INT NOT NULL,
                                   table_number VARCHAR(20) NOT NULL,
                                   capacity INT NOT NULL,
                                   table_type ENUM('Regular', 'VIP', 'Outdoor', 'Private') DEFAULT 'Regular',
                                   is_active BOOLEAN DEFAULT TRUE,
                                   FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
                                   UNIQUE KEY unique_table_per_restaurant (restaurant_id, table_number)
);

-- Reservations/Bookings
CREATE TABLE IF NOT EXISTS reservations (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              customer VARCHAR(200) NOT NULL,
                              restaurant_id INT NOT NULL,
                              table_id INT,
                              reservation_date DATE NOT NULL,
                              reservation_time TIME NOT NULL,
                              party_size INT NOT NULL,
                              meal_type ENUM('Breakfast', 'Lunch', 'Dinner') NOT NULL,
                              status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed', 'No-Show') DEFAULT 'Pending',
                              special_requests TEXT,
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                              FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
                              FOREIGN KEY (table_id) REFERENCES restaurant_tables(id)
);

-- Reservation items (what they want to order)
CREATE TABLE IF NOT EXISTS reservation_items (
                                   id INT PRIMARY KEY AUTO_INCREMENT,
                                   reservation_id INT NOT NULL,
                                   menu_item_id INT NOT NULL,
                                   quantity INT DEFAULT 1,
                                   unit_price DECIMAL(10,2) NOT NULL,
                                   notes TEXT,
                                   FOREIGN KEY (reservation_id) REFERENCES reservations(id),
                                   FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Operating hours for restaurants
CREATE TABLE IF NOT EXISTS operating_hours (
                                 id INT PRIMARY KEY AUTO_INCREMENT,
                                 restaurant_id INT NOT NULL,
                                 day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
                                 meal_type ENUM('Breakfast', 'Lunch', 'Dinner') NOT NULL,
                                 open_time TIME NOT NULL,
                                 close_time TIME NOT NULL,
                                 is_closed BOOLEAN DEFAULT FALSE,
                                 FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
                                 UNIQUE KEY unique_schedule (restaurant_id, day_of_week, meal_type)
);

-- Contact messages from the website
CREATE TABLE IF NOT EXISTS contact_messages (
                                  id INT PRIMARY KEY AUTO_INCREMENT,
                                  full_name VARCHAR(200) NOT NULL,
                                  email VARCHAR(200) NOT NULL,
                                  city_you VARCHAR(100),
                                  restaurant_inquiry VARCHAR(100),
                                  subject VARCHAR(500),
                                  message TEXT NOT NULL,
                                  status ENUM('New', 'In Progress', 'Resolved', 'Closed') DEFAULT 'New',
                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
                                          id INT PRIMARY KEY AUTO_INCREMENT,
                                          email VARCHAR(200) UNIQUE NOT NULL,
                                          subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                          is_active BOOLEAN DEFAULT TRUE
);

-- Website content management
CREATE TABLE IF NOT EXISTS page_content (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              page_name VARCHAR(100) NOT NULL,
                              section_name VARCHAR(100) NOT NULL,
                              content_type ENUM('text', 'image', 'html') NOT NULL,
                              content TEXT,
                              is_active BOOLEAN DEFAULT TRUE,
                              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data inserts
INSERT INTO cities (name,  description) VALUES
                                                 ('City A', 'The best city visit dining'),
                                                 ('City B', 'Premium dining location'),
                                                 ('City C', 'Cultural dining experience'),
                                                 ('City D', 'Modern cuisine destination');

INSERT INTO meal_categories (name, sort_order) VALUES
                                                   ('Breakfast', 1),
                                                   ('Lunch', 2),
                                                   ('Dinner', 3);

-- Indexes for better performance
CREATE INDEX idx_reservations_date_time ON reservations(reservation_date, reservation_time);
CREATE INDEX idx_reservations_restaurant ON reservations(restaurant_id);
CREATE INDEX idx_menu_items_category ON menu_items(meal_category_id);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- Views for common queries
CREATE VIEW available_restaurants AS
SELECT
    r.id,
    r.name,
    c.name as city_name,
    r.phone,
    r.email
FROM restaurants r
         JOIN cities c ON r.city_id = c.id
WHERE r.is_active = TRUE AND c.is_active = TRUE;

CREATE VIEW menu_by_category AS
SELECT
    mi.id,
    mi.name,
    mi.description,
    mi.price,
    mi.currency,
    mi.cuisine_type,
    mc.name as meal_category,
    r.name as restaurant_name,
    c.name as city_name
FROM menu_items mi
         JOIN meal_categories mc ON mi.meal_category_id = mc.id
         JOIN restaurants r ON mi.restaurant_id = r.id
         JOIN cities c ON r.city_id = c.id
WHERE mi.is_available = TRUE
ORDER BY mc.sort_order, mi.cuisine_type, mi.name;