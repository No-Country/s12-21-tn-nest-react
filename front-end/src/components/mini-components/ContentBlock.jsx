import { Box, Typography } from '@mui/material'
/* MiniComponete para los textos del perfil mentor/estudiante */
export default function ContentBlock({ title, description }) {
  return (
    <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between",mb:1,alignItems:"center" }}>
      <Typography variant="subtitle1" sx={{ color: "#CCCCCC", width: { sm: "40%", xs: "100%" },textAlign:{xs:"left",sm:"right"},pr:1,fontSize:{sm:"1rem",xs:"15px"} }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{backgroundColor:"#202C33", color: "#CCCCCC", width: { sm: "60%", xs: "100%" },borderRadius:".2rem",p:1,fontSize:{sm:"1rem",xs:"15px"} }}>
        {description}
      </Typography>
    </Box>
  )
}