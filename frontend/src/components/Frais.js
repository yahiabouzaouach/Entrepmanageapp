import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import {
  createFrais,
  getFrais,
  deleteFrais,
  updateFrais,
  setError,
} from "../redux/features/fraisSlice";
import { getCategories } from "../redux/features/categorieSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { toast } from "react-toastify";
import "../assets/styles/loadingIcon.css";
import "../assets/styles/select.css";
//import '../assets/styles/popup.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#474242",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Frais = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { frais, loading } = useSelector((state) => ({ ...state.frais }));
  const [showAddFraisPopup, setShowAddFraisPopup] = useState(false);
  const [showEditFraisPopup, setShowEditFraisPopup] = useState(false);
  const [showDeleteFraisPopup, setShowDeleteFraisPopup] = useState(false);
  const [fraisData, setFraisData] = useState({
    nomclient: "",
    nomprojet: "",
    montant: "",
  });
  const [selectedFraisForEdit, setSelectedFraisForEdit] = useState(null);
  const [selectedFraisForDelete, setSelectedFraisForDelete] = useState(null);
  const [stringErrorMessage, setStringErrorMessage] = useState("");

  const { error } = useSelector((state) => state.frais);
  const role = localStorage.getItem("role");

  useEffect(() => {
    dispatch(getFrais());
    dispatch(getCategories());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFraisData((prevFraisData) => ({
      ...prevFraisData,
      [name]: value,
    }));
    dispatch(setError(""));

    const StringFormat = /^[a-zA-Z]+$/;

    // Validation du nom et de la nomprojet
    if (event.target.name === "nomclient") {
      if (!event.target.value.trim().match(StringFormat)) {
        setStringErrorMessage("The string must contain onlt letters");
      } else {
        setStringErrorMessage("");
      }
    }
  };

  const handleAddFrais = () => {
    setShowAddFraisPopup(true);
    setShowEditFraisPopup(false);
    setShowDeleteFraisPopup(false);
    setFraisData("");
  };

  const handleAddFraisSubmit = (e) => {
    e.preventDefault();
    if (
      fraisData.nomclient &&
      fraisData.nomprojet &&
      fraisData.montant
    ) {
      const formValue = {
        nomclient: fraisData.nomclient,
        nomprojet: fraisData.nomprojet,
        montant: fraisData.montant,
      };
      if (stringErrorMessage) {
        return;
      }

      dispatch(createFrais({ formValue, navigate, toast }));
    } else {
      toast.error("Field can not be null");
      dispatch(setError("Field can not be null"));
    }
    setShowAddFraisPopup(false);
  };

  const handleEditFrais = (frais) => {
    setSelectedFraisForEdit(frais);

    setFraisData(frais);

    if (selectedFraisForEdit) {
      setShowEditFraisPopup(true);
      setShowAddFraisPopup(false);
      setShowDeleteFraisPopup(false);
    }
  };

  const handleConfirmEditFrais = (e) => {
    e.preventDefault();
    if (selectedFraisForEdit) {
      const id = selectedFraisForEdit.id;
      const formValue = {
        nomclient: fraisData.nomclient,
        nomprojet: fraisData.nomprojet,
        montant: fraisData.montant,
      };
      dispatch(updateFrais({ id, formValue, toast, navigate }));
    }
    setShowEditFraisPopup(false);
  };

  const handleDeleteFrais = (frais) => {
    setSelectedFraisForDelete(frais);
    setShowDeleteFraisPopup(true);
    setShowAddFraisPopup(false);
    setShowEditFraisPopup(false);
  };

  const handleConfirmDeleteFrais = () => {
    if (selectedFraisForDelete) {
      const id = selectedFraisForDelete.nomclient;
      dispatch(deleteFrais({ id, toast, navigate }));
    }
    setShowDeleteFraisPopup(false);
  };

  const rowsPerPageOptions = [5, 10, 25, { value: -1, label: "Tout" }];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ maxWidth: "1000px" }} className="container mt-4">
      {showAddFraisPopup && (
        <div className="popup">
          <h2>Ajouter un nouveau frais</h2>
          <form id="addFraisForm" onSubmit={handleAddFraisSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="nomclient"
                  value={fraisData.nomclient}
                  onChange={handleInputChange}
                  placeholder="client name"
                  className="form-control"
                  error={stringErrorMessage}
                />
                {stringErrorMessage && (
                  <p className="text-danger">{stringErrorMessage}</p>
                )}
                <input
                  type="text"
                  name="nomprojet"
                  value={fraisData.nomprojet}
                  onChange={handleInputChange}
                  placeholder="nom projet"
                  className="form-control"
                  error={stringErrorMessage}
                />
                {stringErrorMessage && (
                  <p className="text-danger">{stringErrorMessage}</p>
                )}
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  name="montant"
                  value={fraisData.montant}
                  onChange={handleInputChange}
                  placeholder="Rising"
                  className="form-control"
                />
              </div>
            </div>

            <div className="text-left">
              <button type="submit" className="btn btn-dark me-3 my-1 ">
                Add new
              </button>
              <button
                type="button"
                onClick={() => setShowAddFraisPopup(false)}
                className="btn btn-secondary my-1 "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Pop-up de modification du frais */}
      {showEditFraisPopup && selectedFraisForEdit && fraisData && (
        <div className="popup">
          <h2>Update cost</h2>
          <form id="updateFraisForm" onSubmit={handleConfirmEditFrais}>
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="nomclient"
                  value={fraisData.nomclient}
                  onChange={handleInputChange}
                  placeholder="client name"
                  className="form-control"
                  error={stringErrorMessage}
                />
                {stringErrorMessage && (
                  <p className="text-danger">{stringErrorMessage}</p>
                )}
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  name="montant"
                  value={fraisData.montant}
                  onChange={handleInputChange}
                  placeholder="Montant"
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
              <input
                  type="text"
                  name="nomprojet"
                  value={fraisData.nomprojet}
                  onChange={handleInputChange}
                  placeholder="project name"
                  className="form-control"
                  error={stringErrorMessage}
                />
              </div>
            </div>
            <div className="row mb-3">
              
            </div>

            <div className="text-left">
              <button type="submit" className="btn btn-dark me-3 my-1 ">
                Update
              </button>
              <button
                type="button"
                onClick={() => setShowEditFraisPopup(false)}
                className="btn btn-secondary my-1 "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pop-up de confirmation de suppression */}
      {showDeleteFraisPopup && selectedFraisForDelete && (
        <div className="popup">
          <h2>Delete Confirmation ?</h2>
          <p>Are you sure you want to delete this cost ?</p>
          <div className="text-left">
            <button
              type="button"
              className="btn btn-danger me-3"
              onClick={handleConfirmDeleteFrais}
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteFraisPopup(false)}
              className="btn btn-secondary "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {!loading ? (
        <div
          className={`table-container ${
            showAddFraisPopup ? "popup-visible" : ""
          }`}
        >
          <TableContainer className="ml-5" sx={{ maxWidth: 1000 }}>
            {role !== "employee" && (
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-dark" onClick={handleAddFrais}>
                  Add new revenue
                  <AddCircleOutlineIcon className="ms-2" color="white" />
                </button>
              </div>
            )}

            <Table sx={{ maxWidth: 1000 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>client name</StyledTableCell>
                  <StyledTableCell>project name</StyledTableCell>
                  <StyledTableCell>Rising</StyledTableCell>
                  {role !== "employee" && (
                    <StyledTableCell>Action</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {frais &&
                    (rowsPerPage > 0
                      ? frais.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : frais).map((frais, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {frais.nomclient}
                      </StyledTableCell>
                      <StyledTableCell>{frais.nomprojet}</StyledTableCell>
                      <StyledTableCell>{frais.montant}</StyledTableCell>
                      {role !== "employee" && (
                        <StyledTableCell>
                          <IconButton
                            color="primary"
                            aria-label="edit"
                            onClick={() => handleEditFrais(frais)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            aria-label="delete"
                            onClick={() => handleDeleteFrais(frais)}
                          >
                            <DeleteIcon style={{ color: "#FD454E" }} />
                          </IconButton>
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={frais && frais.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      ) : (
        <div className="load">
          <div className="loader"></div>
          <h2 className="marginLoad">Loading ...</h2>
        </div>
      )}
    </div>
  );
};

export default Frais;
