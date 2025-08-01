"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import theme from "@/registry/new-york/themes/minimal/minimal-theme";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
];

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ThemeMinimalPage() {
  const [selectValue, setSelectValue] = React.useState("");
  const [autocompleteValue, setAutocompleteValue] = React.useState<
    (typeof top100Films)[0][]
  >([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Minimal Theme Preview
        </Typography>

        <Stack spacing={4}>
          {/* Buttons Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Buttons
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="contained" color="success">
                Success
              </Button>
              <Button variant="contained" color="error">
                Error
              </Button>
              <Button variant="contained" color="warning">
                Warning
              </Button>
              <Button variant="contained" color="info">
                Info
              </Button>
              <IconButton color="primary">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 4v16m8-8H4" />
                </svg>
              </IconButton>
            </Stack>
          </Box>

          {/* Text Fields Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Text Fields (Outlined)
            </Typography>
            <Stack spacing={2} sx={{ maxWidth: 400 }}>
              <TextField
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="With Error"
                error
                helperText="This field is required"
                variant="outlined"
                fullWidth
              />
            </Stack>
          </Box>

          {/* Autocomplete Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Autocomplete (Multiple)
            </Typography>
            <Autocomplete
              multiple
              options={top100Films}
              getOptionLabel={(option) => option.label}
              value={autocompleteValue}
              onChange={(event, newValue) => {
                setAutocompleteValue(newValue);
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="filled"
                    label={option.label}
                    size="small"
                    {...getTagProps({ index })}
                    key={option.label}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Favorite movies"
                  placeholder="Select movies"
                />
              )}
              sx={{ maxWidth: 400 }}
            />
          </Box>

          {/* Select Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Select (Outlined)
            </Typography>
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Age</InputLabel>
              <Select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Table Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Compact Table
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
