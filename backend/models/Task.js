const pool = require("../config/database");

class Task {
  static async createTask([title, description, status]) {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    return result.rows[0];
  }

  static async deleteTask(id) {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY updated_at DESC"
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async updateTask(id, title, description, status) {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *",
      [title, description, status, id]
    );
    return result.rows[0];
  }
}

module.exports = Task;
