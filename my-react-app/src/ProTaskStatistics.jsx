import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, Typography, Grid, Box, Container } from '@mui/material';
import axios from 'axios';

const StatisticsPage = () => {
  const [countall, setcountall] = useState(0);
  const [countpas_encore, setcountpas_encore] = useState(0);
  const [counttermini, setcounttermini] = useState(0);
  const [countretard, setcountretard] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);

  const getStatusData = () => [
    { name: 'Terminé', value: counttermini, color: '#10B981' },
    { name: 'Pas encore', value: countpas_encore, color: '#6366F1' },
    { name: 'En retard', value: countretard, color: '#EF4444' }
  ];

  const processMonthlyData = (tasks) => {
    const monthlyStats = tasks.reduce((acc, task) => {
      const month = new Date(task.due_date).toLocaleString('default', { month: 'short' });
      
      if (!acc[month]) {
        
        acc[month] = {
          month,
          termini: 0,
          pas_encore: 0,
          retard: 0
        };
      }

      switch (task.statu) {
        case 'termini':
          acc[month].termini += 1;
          break;
        case 'pas_encore':
          acc[month].pas_encore += 1;
          break;
        case 'retard':
          acc[month].retard += 1;
          break;
        default:
          break;
      }

      return acc;
    }, {});

    return Object.values(monthlyStats);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get("http://localhost:3000/count_all_tasks"),
          axios.get("http://localhost:3000/count_all_tasks_pasencore"),
          axios.get("http://localhost:3000/count_all_tasks_termini"),
          axios.get("http://localhost:3000/count_all_tasks_enretard")
        ]);

        const allTasks = responses[0].data;
        setcountall(allTasks.length);
        setcountpas_encore(responses[1].data.length);
        setcounttermini(responses[2].data.length);
        setcountretard(responses[3].data.length);

        // Traiter les données mensuelles
        const processedMonthlyData = processMonthlyData(allTasks);
        setMonthlyData(processedMonthlyData);

      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
      }
    };

    fetchData();
  }, []);

  const summaryCards = [
    { title: 'Total des tâches', value: countall, color: '#F59E0B' },
    { title: 'Tâches pas encore commencées', value: countpas_encore, color: '#6366F1' },
    { title: 'Tâches terminées', value: counttermini, color: '#10B981' },
    { title: 'Tâches en retard', value: countretard, color: '#EF4444' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Tableau de bord
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mis à jour aujourd'hui
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {summaryCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', boxShadow: 2, '&:hover': { boxShadow: 4 }, transition: 'box-shadow 0.3s' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {card.title}
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                        {card.value}
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: card.color 
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: '100%', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Vue d'ensemble du statut
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getStatusData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {getStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card sx={{ height: '100%', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Vue mensuelle
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="termini" name="Terminé" fill="#10B981" />
                      <Bar dataKey="pas_encore" name="Pas encore" fill="#6366F1" />
                      <Bar dataKey="retard" name="En retard" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StatisticsPage;

