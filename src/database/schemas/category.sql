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
