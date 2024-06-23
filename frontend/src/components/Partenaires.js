import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import {
  createPartenaire,
  getAllPartenaires,
  updatePartenaire,
  deletePartenaire,
} from "../redux/features/partenaireSlice";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

const Partenaires = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { partenaires, loading } = useSelector((state) => ({ ...state.partenaire }));
  const [showAddPartenairePopup, setShowAddPartenairePopup] = useState(false);
  const [showEditPartenairePopup, setShowEditPartenairePopup] = useState(false);
  const [showDeletePartenairePopup, setShowDeletePartenairePopup] = useState(false);
  const [partenaireData, setPartenaireData] = useState({});
  const [selectedPartenaireForEdit, setSelectedPartenaireForEdit] = useState(null);
  const [selectedPartenaireForDelete, setSelectedPartenaireForDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllPartenaires());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPartenaireData((prevPartenaireData) => ({
      ...prevPartenaireData,
      [name]: value,
    }));
  };

  const handleAddPartenaire = () => {
    setShowAddPartenairePopup(true);
    setShowEditPartenairePopup(false);
    setShowDeletePartenairePopup(false);
    setPartenaireData("");
  };

  const handleAddPartenaireSubmit = (e) => {
    e.preventDefault();
    if (partenaireData.NomPartenaiers && partenaireData.adresse && partenaireData.numtel) {
      dispatch(createPartenaire({ formValue: partenaireData, navigate, toast }));
    } else {
      toast.error("Please fill all fields");
    }
    setShowAddPartenairePopup(false);
    
  };

  const handleEditPartenaire = (partenaire) => {
    setSelectedPartenaireForEdit(partenaire);
    setPartenaireData(partenaire);

    if (selectedPartenaireForEdit) {
      setShowEditPartenairePopup(true);
      setShowAddPartenairePopup(false);
      setShowDeletePartenairePopup(false);
    }
  };

  const handleConfirmEditPartenaire = (e) => {
    e.preventDefault();
    if (selectedPartenaireForEdit) {
      const id = selectedPartenaireForEdit.NomPartenaiers;
      dispatch(updatePartenaire({ id, formValue: partenaireData, toast, navigate }));
    }
    setShowEditPartenairePopup(false);
  };

  const handleDeletePartenaire = (partenaire) => {
    setSelectedPartenaireForDelete(partenaire);
    setShowDeletePartenairePopup(true);
    setShowAddPartenairePopup(false);
    setShowEditPartenairePopup(false);
  };

  const handleConfirmDeletePartenaire = () => {
    if (selectedPartenaireForDelete) {
      const id = selectedPartenaireForDelete.NomPartenaiers;
      dispatch(deletePartenaire({ id, toast, navigate }));
    }
    setShowDeletePartenairePopup(false);
  };

  const rowsPerPageOptions = [5, 10, 25, { value: -1, label: "All" }];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ maxWidth: "1000px" }} className="container mt-4">
      {showAddPartenairePopup && (
        <div className="popup">
          <h2>Add new partner</h2>
          <form id="addPartenaireForm" onSubmit={handleAddPartenaireSubmit}>
            <div className="row mb-3 col-md-12">
              <input
                type="text"
                className="col-md-5 mb-2 form-control"
                placeholder="Name"
                value={partenaireData.NomPartenaiers || ""}
                name="NomPartenaiers"
                onChange={handleInputChange}
              />

              <input
                type="text"
                className="col-md-5 form-control"
                placeholder="Address"
                value={partenaireData.adresse || ""}
                name="adresse"
                onChange={handleInputChange}
              />

              <input
                type="text"
                className="col-md-5 form-control"
                placeholder="Phone Number"
                value={partenaireData.numtel || ""}
                name="numtel"
                onChange={handleInputChange}
              />
            </div>

            <div className="text-left">
              <button type="submit" className="btn btn-dark my-1 me-3">
                Add new
              </button>
              <button
                type="button"
                onClick={() => setShowAddPartenairePopup(false)}
                className="btn btn-secondary my-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showEditPartenairePopup && selectedPartenaireForEdit && partenaireData && (
        <div className="popup">
          <h2>Update Partner</h2>
          <form id="updatePartenaireForm" onSubmit={handleConfirmEditPartenaire}>
            <div className="row mb-3 col-md-12">
              <input
                type="text"
                className="col-md-5 mb-2 form-control"
                placeholder="Name"
                value={partenaireData.NomPartenaiers || ""}
                name="NomPartenaiers"
                onChange={handleInputChange}
              />

              <input
                type="text"
                className="col-md-5 form-control"
                placeholder="Address"
                value={partenaireData.adresse || ""}
                name="adresse"
                onChange={handleInputChange}
              />

              <input
                type="text"
                className="col-md-5 form-control"
                placeholder="Phone Number"
                value={partenaireData.numtel || ""}
                name="numtel"
                onChange={handleInputChange}
              />
            </div>

            <div className="text-left">
              <button type="submit" className="btn btn-dark me-3 my-1">
                Update
              </button>
              <button
                type="button"
                onClick={() => setShowEditPartenairePopup(false)}
                className="btn btn-secondary my-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showDeletePartenairePopup && selectedPartenaireForDelete && (
        <div className="popup">
          <h2>Delete Confirmation ?</h2>
          <p>Are you sure you want to delete this partner ?</p>
          <div className="text-left">
            <button
              type="button"
              className="btn btn-danger me-3"
              onClick={handleConfirmDeletePartenaire}
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setShowDeletePartenairePopup(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!loading ? (
        <div className={`table-container ${showAddPartenairePopup ? "popup-visible" : ""}`}>
          <TableContainer className="ml-5" sx={{ maxWidth: 1000 }}>
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-dark" onClick={handleAddPartenaire}>
                Add new partner
                <AddCircleOutlineIcon className="ms-2" color="white" />
              </button>
            </div>

            <Table sx={{ maxWidth: 1000 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Phone Number</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  partenaires &&
                  partenaires?.length !==0 && 
                  (rowsPerPage > 0
                    ? partenaires.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : partenaires).map((partenaire, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {partenaire.NomPartenaiers}
                      </StyledTableCell>
                      <StyledTableCell>{partenaire.adresse}</StyledTableCell>
                      <StyledTableCell>{partenaire.numtel}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          color="primary"
                          aria-label="edit"
                          onClick={() => handleEditPartenaire(partenaire)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="delete"
                          onClick={() => handleDeletePartenaire(partenaire)}
                        >
                          <DeleteIcon style={{ color: "#FD454E" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={partenaires && partenaires.length}
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

export default Partenaires;
