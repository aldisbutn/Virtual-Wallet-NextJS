import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

type ExecuteQueryTypes = {
  query: string;
  values?: any[];
};

export const getConnection = async () => {
  // Check if database is connected
  if (!db) {
    // Open database connection
    db = await open({
      filename: './database.db',
      driver: sqlite3.Database,
    });
  }
  return db;
};

export const executeQuery = async ({ query, values }: ExecuteQueryTypes) => {
  try {
    const connection = await getConnection();
    const result = await connection.all(query, values);
    return result;
  } catch (error) {
    console.log(error);
    return { error };
  }
};
