import {
  Paper,
  Box,
  TextField,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const Post = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [editing, setEditing] = React.useState({ id: -1, state: false });
  const [incrementid, setIncrementid] = React.useState(1);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [info, setInfo] = React.useState(false);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "Title",
      align: "center",
      headerAlign: "center",
      width: 160,
    },
    {
      field: "description",
      headerName: "Description",
      align: "center",
      headerAlign: "center",
      width: 470,
    },
    {
      field: "update",
      headerName: "Update",
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            onClick={() => handleUpdate(cellValues.id)}
            color="primary"
          >
            Update
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            onClick={() => handleDelete(cellValues.id)}
            color="error"
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const handleCloseSuccess = () => {
    setSuccess(false);
  }

  const handleCloseError = () => {
    setError(false);
  }

  const handleCloseInfo = () => {
    setInfo(false);
  }


  const handleClick = () => {
    if (!title.trim() && !description.trim()) return;
    if (editing["state"]) {
      setRows(
        rows.map((row) => {
          if (row.id === editing["id"]) {
            return { id: row.id, title: title, description: description };
          }
          return row;
        })
      );
      setEditing({ id: -1, state: false });
      setInfo(true);
    } else {
      setRows([...rows, { id: incrementid, title, description }]);
      setSuccess(true);
    }
    setIncrementid(incrementid + 1);
    setDescription("");
    setTitle("");
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
    setError(true);
  };

  const handleUpdate = (id) => {
    rows.forEach((row) => {
      if (row.id === id) {
        setTitle(row.title);
        setDescription(row.description);
        setEditing({ id, state: true });
      }
    });
  };

  return (
    <>
      <Stack direction="column">
        <Paper
          sx={{
            width: { xs: "330px", md: "500px" },
            p: 4,
            marginTop: "10px",
            mx: "auto",
            minHeight: "320px",
            maxHeight: "50vh",
            alignItems: "center",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h3" align="center">
              Post
            </Typography>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              variant="outlined"
            ></TextField>
            <TextField
              rows={3}
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
            ></TextField>
            <Button variant="contained" onClick={handleClick}>
              Submit
            </Button>
          </Stack>
        </Paper>
        <Box sx={{ mx: "auto", height: 400, width: "60%" }}>
          <DataGrid
            style={{
              marginTop: "10px",
              backgroundColor: "white",
            }}
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Stack>
      <Snackbar open={info} autoHideDuration={3000} onClose={handleCloseInfo}>
        <Alert onClose={handleCloseInfo} severity="info" sx={{ width: "100%" }}>
          Post Updated!
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }}>
          Post Created!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={3000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          Post Deleted!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Post;
