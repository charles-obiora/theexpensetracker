/* You use "DATE instead of TIMESTAMP DEFAULT CURRENT_TIMESTAMP".
for instance; "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"
DATE: YYYY-MM-DD && TIMESTAMP DEFAULT CURRENT_TIMESTAMP:YYYY-MM-DD HH:MM:SS */

import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

/* sql is storing a configured database client @ this point
This does not: connect to the database, verify credentials, throw a connection error
What it does: creates a query function and the actual connection happens when you execute a query */
export const sql = neon(
	`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);

export const initDB = async () => {
	try {
		await sql`
		CREATE TABLE IF NOT EXISTS users(
			userid SERIAL PRIMARY KEY,
			username VARCHAR(255) NOT NULL UNIQUE,
			email VARCHAR(255) NOT NULL UNIQUE,
			password TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);`;

		await sql`
    	CREATE TABLE IF NOT EXISTS categories(
			categoryid SERIAL PRIMARY KEY,
			userid INT REFERENCES users(userId) ON DELETE CASCADE,
			categoryname VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);`;

		await sql`
    	CREATE TABLE IF NOT EXISTS expenses(
			expenseid SERIAL PRIMARY KEY,
			userid INT REFERENCES users(userId) ON DELETE CASCADE,
			categoryid INT REFERENCES categories(categoryId) ON DELETE CASCADE,
			expensename VARCHAR(255) NOT NULL,
			cost DECIMAL(10, 2) NOT NULL,
			description VARCHAR(500) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);`;

		console.log("Database connection was successful");
	} catch (error) {
		console.log("Database connection was not successful in db.js", error.message);
		throw error;
	}
}

