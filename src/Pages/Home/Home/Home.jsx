import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Banner from '../Banner/Banner';
import DetailsChart from '../DetailsChart/DetailsChart';
import AlzheimerPrediction from '../Feedback/Feedback';  // Import the AlzheimerPrediction component
import RadialChart from '../PatientAgeChart/RadialChart';
import TodaysDoctors from '../TodaysDoctors/TodaysDoctors';
import UserInfo from '../UserInfo/UserInfo';

const Home = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Banner></Banner>
          <DetailsChart></DetailsChart>
          <UserInfo></UserInfo>
        </Grid>
        <Grid item xs={12} md={4}>
          <AlzheimerPrediction></AlzheimerPrediction>  {/* Use the AlzheimerPrediction component */}
          <Box style={{
            backgroundColor: '#fff',
            marginTop: '1rem',
            borderRadius: '0.3rem',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
          }}>
            <Typography sx={{ fontSize: '1.2rem', textAlign: 'left', paddingLeft: '20px', paddingTop: '20px', fontFamily:'monospace' }}><strong>Percentage of patients</strong></Typography>
            <RadialChart></RadialChart>
          </Box>
        </Grid>
      </Grid>
      <TodaysDoctors></TodaysDoctors>
    </div>
  );
};

export default Home;
