package SQLite;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SQLiteJDBCDriverConnection {
    /**
     * Connect to a sample database
     */
    public static Connection connect() {
        Connection conn = null;
        String sql = " CREATE TABLE IF NOT EXISTS ID (\n"
                + "id integer PRIMARY KEY AUTOINCREMENT," +
                "VALUE int NOT NULL UNIQUE);";
        try {
            // db parameters
            String url = "jdbc:sqlite:MainPackage.test.db";
            // create a connection to the database
            conn = DriverManager.getConnection(url);
            Statement statement = conn.createStatement();
            statement.execute("DROP TABLE IF EXISTS ID;");
            statement.execute(sql);
            System.out.println("Connection to SQLite has been established.");

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }

    public static void insert(Connection con, List<Integer> values) throws Exception {
        Statement statement = con.createStatement();
        statement.execute("INSERT OR IGNORE INTO ID (VALUE) VALUES (12093542),(19232),(353045)");
    }

    public static List<Integer> select(Connection con) throws SQLException {
        List<Integer> list = new ArrayList<>();
        Statement statement = con.createStatement();
        ResultSet rs = statement.executeQuery("SELECT * FROM ID");
        while (rs.next()) {
            list.add(rs.getInt(2));
        }
        return list;
    }

    public static void main(String[] args) throws Exception {
        Connection con = connect();
        insert(con, null);
        select(con).forEach(System.out::println);
        con.close();
    }
}
