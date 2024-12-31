import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'; // Import Axios

const AddTask = ({ onAddTask }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    category: '',
    categoryValue: 0, // Store the category value
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Travail', 'Personnel', 'Études'];
  const categoryValues = { Travail: 1, Personnel: 2, Études: 3 }; // Category value mapping

  const handleChange = (name, value) => {
    const newState = { ...taskData, [name]: value };

    // If category changes, update the associated value
    if (name === 'category') {
      newState.categoryValue = categoryValues[value] || 0;
    }

    setTaskData(newState);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!taskData.title.trim()) {
      setError('Le titre est requis');
      return;
    }
    if (!taskData.dueDate) {
      setError('La date d\'échéance est requise');
      return;
    }
    if (!taskData.category) {
      setError('La catégorie est requise');
      return;
    }

    try {
      setLoading(true);

      // API call with Axios
      const response = await axios.post('http://localhost:3000/tasks', {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        categoryValue: taskData.categoryValue, // Send category value to backend
      });

      if (response.status === 201) {
        setShowSuccess(true);
        onAddTask?.(taskData); // Trigger callback if provided

        // Reset form data
        setTaskData({
          title: '',
          description: '',
          priority: '',
          dueDate: '',
          category: '',
          categoryValue: 0,
        });

        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout de la tâche');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            Ajouter une nouvelle tâche
          </Typography>
        }
      />
      <CardContent>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            label="Titre"
            variant="outlined"
            fullWidth
            value={taskData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={taskData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <Select
            value={taskData.priority}
            fullWidth
            onChange={(e) => handleChange('priority', e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Sélectionnez une priorité
            </MenuItem>
            <MenuItem value="High">Haute</MenuItem>
            <MenuItem value="Medium">Moyenne</MenuItem>
            <MenuItem value="Low">Basse</MenuItem>
          </Select>

          <Select
            value={taskData.category}
            fullWidth
            onChange={(e) => handleChange('category', e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Sélectionnez une catégorie
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="Date d'échéance"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={taskData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
          />

          {error && <Alert severity="error">{error}</Alert>}
          {showSuccess && <Alert severity="success">Tâche ajoutée avec succès!</Alert>}

          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Ajouter la tâche'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTask;
