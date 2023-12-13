import { Box, Grid, Pagination } from "@mui/material";
import { MentorCard } from "./MentorCard";

export const MentorCardRenderer = ({ mentorsData }) => {

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'column', alignItems: 'center', marginTop: '6rem' }}>
        <Grid container spacing={3} sx={{ gap: 8, justifyContent: 'center' }} >
          {mentorsData.map((mentor) => (
            <MentorCard
              key={mentor.id}
              name={mentor.userId.firstName + ' ' + mentor.userId.lastName}
              speciality={mentor.speciality.name}
              date={new Date(mentor.updatedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              aboutMe={mentor.aboutMe}
              categories={mentor.categories}
              price={mentor.price}
              mentorImage={mentor.image}
            />
          ))}
        </Grid>
      </Box>
      <Box sx={{ width: '100%', backgroundColor: '#0B141A', display: 'flex', justifyContent: 'center' }} >
        <Pagination
          count={3}
          variant="outlined"
          size="large"
          showFirstButton
          showLastButton
          sx={{
            display: 'flex',
            marginTop: '6rem',
            marginBottom: '6rem',
            width: '100%',
            justifyContent: 'center',
            '& .Mui-selected': {
              backgroundColor: '#006400',
              color: '#FFFFFF',
            },
            '& .MuiPaginationItem-outlined': {
              color: '#25D366',
              borderColor: '#FFFFFF',
              fontSize: '1.5rem',
            },
            '& .MuiPaginationItem-root': {
              margin: '0 6px',
            },
          }}
        />
      </Box>
    </>
  );
};
