import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: '192.168.2.231', 
  user: 'myuser', 
  password: 'mypassword', 
  database: 'mydb', 
  connectionLimit :5
});

export function connectDB(){
    pool.getConnection();
    console.log('Connected to database');
}

export function disconnectDB(){
    pool.end();
    console.log('Disconnected to database');
}

export async function testConnection() {
    console.log('TestConnection Routine START!');
    let conn;
    try {
      conn = await pool.getConnection();
      console.log('Erfolgreich mit MariaDB verbunden!');
    } catch (err) {
      console.error('Fehler beim Verbinden mit MariaDB:', err);
    } finally {
      if (conn) {
        conn.end();
        console.log('Verbindung mit MariaDB geschlossen');
        }
        console.log('TestConnection Routine END!'); 
    }
  }  
  
export async function querydb (sql: string, params?: any[]) {
    let conn :any;
    try {
      connectDB();
      const rows = await conn.query(sql, params);
      return rows;
    } catch (error) {
        console.log('ERROR');
      throw error;
    } finally {
      disconnectDB();
      console.log('FINAL');
    }
  } 
  export default pool;