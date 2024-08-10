
const mariadb = require('mariadb');


// Konfiguration für die Verbindung zur Datenbank


const pool = mariadb.createPool({
  host: '192.168.2.231', // Der Hostname der Datenbank (in diesem Fall lokal)
  user: 'myuser', // Ihr Datenbank-Benutzername
  password: 'mypassword', // Ihr Datenbank-Passwort
  database: 'mydb', // Der Name Ihrer Datenbank
  connectionLimit :5
});

// Funktion zum Ausführen von SQL-Abfragen

 
function connectDB(){
    pool.getConnection();
    console.log('Erfolgreich mit MariaDB verbunden!');
}

function disconnectDB(){
    pool.end();
    console.log('Verbindung mit MariaDB geschlossen');
}

  async function testConnection() {
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
  
  async function query(sql, values) {
    let conn;
    try {
      conn = await pool.getConnection();
      console.log('verbunden');
      const rows = await conn.query(sql, values);
      return rows;
    } catch (error) {
        console.log('ERROR');
      throw error;
    } finally {
      if (conn) conn.release();
      console.log('FINAL');
    }
  } 

  module.exports = {
    testConnection,
    connectDB,
    disconnectDB,
    query
  };