import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Button, Container, Paper } from "@mui/material";
import ModalWrapper from "../mui/ModalWrapper";
import { useTransaction } from "../../context/TransactionContext";

export default function AllTransaccions() {
  const { getTransactions, transactions, deleteTransactions } =
    useTransaction();

  useEffect(() => {
    getTransactions();
  }, []);

  const columns = [
    { field: "description", headerName: "Descripción", width: 300 },
    { field: "type", headerName: "Tipo", width: 300 },

    { field: "amount", headerName: "Cantidad", width: 300 },
    {
      field: "col5",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <IconButton
          variant="contained"
          color="##171717"
          onClick={() => deleteTransactions(params.row._id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: "col6",
      headerName: "Modficar",
      width: 120,
      renderCell: (params) => (
        <div className="cursor-pointer">
          <Link to={`/update/${params.row._id}`}>
            <Button>Modificar</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Container className="fade-in ">
      <div className="mb-6 flex justify-between items-center  max-sm:flex-col max-sm:items-start max-sm:gap-5">
        <div className=" py-20 ">
          <h2 className="text-4xl font-bold text-sky-800">
            Todas las trasacciones
          </h2>
          <p className="text-gray-500 py-2">
            Aquí puedes Modificar o eliminar las transacciones
          </p>
        </div>
        <ModalWrapper />
      </div>
      <Paper sx={{ width: "full" }}>
        <DataGrid
          rows={transactions}
          getRowId={(row) => row._id}
          columns={columns}
          disableColumnResize
          pageSize={5}
          pageSizeOptions={4}
        />
      </Paper>
    </Container>
  );
}
