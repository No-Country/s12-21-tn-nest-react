import { useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import { MentorCard } from "./MentorCard";

export const MentorCardRenderer = ({ mentorsData }) => {
  const mentorsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastMentor = currentPage * mentorsPerPage
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage
  const currentMentors = mentorsData.slice(indexOfFirstMentor, indexOfLastMentor)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <Box sx={{marginLeft: '10px'}}>
      <Box sx={{ display: 'flex', justifyContent: 'column', alignItems: 'center', marginTop: '6rem'}}>
        <Grid container spacing={5} sx={{ justifyContent: 'space-around', alignItems: 'center', gap: '2.5rem' }} >
          {currentMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              id={mentor.id}
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
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#0B141A",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={Math.ceil(mentorsData.length / mentorsPerPage)}
          variant="outlined"
          size="large"
          showFirstButton
          showLastButton
          onChange={handlePageChange}
          sx={{
            display: "flex",
            marginTop: "6rem",
            marginBottom: "6rem",
            width: "100%",
            justifyContent: "center",
            "& .Mui-selected": {
              backgroundColor: "#006400",
              color: "#FFFFFF",
            },
            "& .MuiPaginationItem-outlined": {
              color: "#25D366",
              borderColor: "#FFFFFF",
              fontSize: "1.5rem",
            },
            "& .MuiPaginationItem-root": {
              margin: "0 6px",
            },
          }}
        />
      </Box>
    </Box>
  );
};