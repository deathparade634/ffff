const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
// Middleware pour analyser le JSON (optionnel)
const cors = require('cors');
app.use(express.json());

// Route d'accueil
app.use(cors());


// Configuration de la connexion
const connection = mysql.createConnection({
  host: 'localhost',     // Adresse du serveur MySQL
  user: 'root',          // Nom d'utilisateur MySQL (par défaut : root)
  password: '',          // Mot de passe (par défaut : vide)
  database: 'fa_todo' // Nom de la base de données
});

app.post('/tasks', (req, res) => {
    const { title, description, priority, dueDate, categoryValue } = req.body;
  
   
  
    const query = 'INSERT INTO tasks (title, description, priority, due_date, category_id,statu) VALUES (?, ?, ?, ?, ?,"pas_encore")';
    connection.query(query, [title, description, priority, dueDate, categoryValue], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Tâche créée avec succès !', id: results.insertId });
    });
  });
  
  
// Tester la connexion
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err.message);
  } else {
    console.log('Connexion à MySQL réussie !');
  }
});








app.get("/count_all_tasks", (req, res) => {
    
    const sql = "SELECT * FROM tasks";
    
    connection.query(sql, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Error fetching task count.");
      }
      return res.status(200).send(data);
    });
  });



  app.get("/count_all_tasks_pasencore", (req, res) => {
    
    const sql = "SELECT * FROM tasks WHERE statu='pas_encore'";
    
    connection.query(sql, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Error fetching task count.");
      }
      return res.status(200).send(data);
    });
  });


  app.get("/count_all_tasks_termini", (req, res) => {
    
    const sql = "SELECT * FROM tasks WHERE statu='termini'";
    
    connection.query(sql, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Error fetching task count.");
      }
      return res.status(200).send(data);
    });
  });


  app.get("/count_all_tasks_enretard", (req, res) => {
    
    const sql = "SELECT * FROM tasks WHERE statu='retard'";
    
    connection.query(sql, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Error fetching task count.");
      }
      return res.status(200).send(data);
    });
  });



app.get('/', (req, res) => {
  res.send('Bienvenue sur votre premier serveur Express !');
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
