CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE categories (
  id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name varchar NOT NULL,
  labelColor varchar NOT NULL,
  createdAt timestamp NOT NULL DEFAULT now(),
  updatedAt timestamp NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name varchar,
  email varchar NOT NULL,
  password varchar NOT NULL,
  isIncomplete boolean NOT NULL DEFAULT false,
  createdAt timestamp NOT NULL DEFAULT now(),
  updatedAt timestamp NOT NULL DEFAULT now()
);


CREATE TABLE trips (
  id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name varchar NOT NULL,
  description varchar,
  startDate timestamp NOT NULL,
  endDate timestamp NOT NULL,
  categories uuid,
  FOREIGN KEY (categories) REFERENCES categories(id) ON DELETE CASCADE,
  createdAt timestamp NOT NULL DEFAULT now(),
  updatedAt timestamp NOT NULL DEFAULT now()
);


CREATE TABLE sessions (
  id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  userId uuid NOT NULL,
  token varchar NOT NULL,
  expiresAt timestamp NOT NULL,
  email varchar NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  createdAt timestamp NOT NULL DEFAULT now(),
  updatedAt timestamp NOT NULL DEFAULT now()
);


INSERT INTO sessions (email, password, token) VALUES ("ysraelmoreno02@gmail.com",)

SELECT * FROM sessions JOIN users ON users.id = userid WHERE token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mzc0NjA5NzUsImV4cCI6MTYzNzU0NzM3NSwic3ViIjoiMzAwMmY5MmItN2YwMS00YjI3LWFlODAtNTQyNTkwYmIyZjg1In0.iMalA11b1_oULNvSE3o46aQrHZwVlgRy0nMdLA5Zj5s';
