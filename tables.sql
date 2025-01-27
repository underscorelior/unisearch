CREATE TABLE general {
	id SERIAL PRIMARY KEY,
	inst_name TEXT NOT NULL,
    state VARCHAR(3) NOT NULL,
    city TEXT NOT NULL,
    longitude NUMERIC(10, 10) NOT NULL,
    latitude NUMERIC(10, 10) NOT NULL,
    control_of_inst TINYINT NOT NULL,
    url_base TEXT NOT NULL,
    url_admissions TEXT,
    url_finaid TEXT,
    url_application TEXT,
    url_netpricecalc TEXT,
    mission_statement TEXT
};

CREATE TABLE academics (
    id SERIAL PRIMARY KEY,
    highest_degree_offered TINYINT,
    calendar_system TINYINT,
    student_faculty_ratio VARCHAR(50),
    graduation_rate_4yr NUMERIC(5, 2),
    graduation_rate_5yr NUMERIC(5, 2),
    graduation_rate_6yr NUMERIC(5, 2),
    retention_rate NUMERIC(5, 2)
);

CREATE TABLE enrollment (
    id SERIAL PRIMARY KEY,
    total_students INT,
    graduate_students INT NOT NULL,
    undergraduate_students INT NOT NULL,
    native_total INT,
    native_percent NUMERIC(5, 2),
);


CREATE TABLE admissions (
    id SERIAL PRIMARY KEY,
    application_fee NUMERIC(10, 2),
    average_gpa NUMERIC(4, 2),
    sat_pct_submit NUMERIC(5, 2),
    sat_math_25th INT,
    sat_math_50th INT,
    sat_math_75th INT,
    sat_reading_25th INT,
    sat_reading_50th INT,
    sat_reading_75th INT,
    act_pct_submit NUMERIC(5, 2),
    act_25th INT,
    act_50th INT,
    act_75th INT,
    acceptance_rate_overall NUMERIC(5, 2),
    acceptance_rate_male NUMERIC(5, 2),
    acceptance_rate_female NUMERIC(5, 2),
    yield_rate NUMERIC(5, 2)
);