import { createTheme } from "@mui/material";

const PRIMARY='#e040fb'
const SECONDARY='#7e57c2'
const theme=createTheme({
    palette:{
        primary:{
            main:PRIMARY
        },
        secondary:{
            main:SECONDARY
        }
    },
    typography:{
        fontF:'Roboto'
    }
})
export default theme