//users (creation table)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp
    updated_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp
);
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp,
    isCompleted BOOLEAN DEFAULT FALSE
);

//
-- CREATE TABLE projects (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
-- 	description VARCHAR(255) NOT NULL,
--     startDate DATE NOT NULL,
--     created_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp
--     updated_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp
-- );

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE sections (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    order_section INT NOT NULL,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE
)

CREATE TABLE questionnaires (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    created_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP(0) NOT NULL DEFAULT current_timestamp
);

CREATE TABLE question_questionnary (
    id SERIAL PRIMARY KEY,
   	question_test TEXT NOT NULL,
	question_questionnay INT REFERENCES questionnaires(id) ON DELETE CASCADE
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    title_option TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    question_id INT REFERENCES question_questionnary(id) ON DELETE CASCADE
);

//session
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");

