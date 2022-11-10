import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { TiDelete } from "react-icons/ti";
import { MdUpdate } from "react-icons/md";
import DeleteModal from "../../Modals/DeleteModal";
import UpdateModal from "../../Modals/UpdateModal";
import RecordsModal from "../../Modals/RecordsModal";

import "./Players.css";

function Players() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [selectedName, setSelectedName] = useState("");
  const [selectedPower, setSelectedPower] = useState(-1);
  const [changedData, setChangedData] = useState(false);
  const [selectedWins, setSelectedWins] = useState([]);
  const [selectedLosses, setSelectedLosses] = useState([]);

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const closeDeleteModal = () => setOpenDeleteModal(false);

  // Update Modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const closeUpdateModal = () => setOpenUpdateModal(false);

  // View Records Modal
  const [openRecordsModal, setOpenRecordsModal] = useState(false);
  const closeRecordsModal = () => setOpenRecordsModal(false);

  const getAllPlayersUrl = "http://localhost:5087/api/GetAllPlayers";
  const deletePlayerUrl = "http://localhost:5087/api/DeletePlayer/";
  const updatePlayerUrl = "http://localhost:5087/api/UpdatePlayer/";
  const getPlayerWinsUrl = "http://localhost:5087/api/GetAllWinRecords/";
  const getPlayerLossesUrl = "http://localhost:5087/api/GetAllLosses/";

  // Displays all Players
  useEffect(() => {
    axios.get(getAllPlayersUrl).then((response) => {
      setData(response.data);
    });
  }, [changedData]);

  // Deletes Player given an id
  const deletePlayer = (id) => {
    axios.delete(`${deletePlayerUrl}${id}`);
    setOpenDeleteModal(false);
    setChangedData((changedData) => !changedData);
  };

  // Updates Player given an id
  const updatePlayer = () => {
    axios.put(
      `${updatePlayerUrl}${selectedId}/${selectedName}/${selectedPower}`
    );
    setOpenUpdateModal(false);
    setChangedData((changedData) => !changedData);
  };

  const getPlayerWins = (id) => {
    axios.get(`${getPlayerWinsUrl}${id}`).then((response) => {
      setSelectedWins(response.data);
    });
  };

  const getPlayerLosses = (id) => {
    axios.get(`${getPlayerLossesUrl}${id}`).then((response) => {
      setSelectedLosses(response.data);
    });
  };

  return (
    <>
      <div>
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          closeDeleteModal={closeDeleteModal}
          deletePlayer={deletePlayer}
          selectedId={selectedId}
        ></DeleteModal>

        <UpdateModal
          openUpdateModal={openUpdateModal}
          closeUpdateModal={closeUpdateModal}
          selectedName={selectedName}
          setSelectedName={setSelectedName}
          selectedPower={selectedPower}
          setSelectedPower={setSelectedPower}
          updatePlayer={updatePlayer}
        ></UpdateModal>

        <RecordsModal
          openRecordsModal={openRecordsModal}
          closeRecordsModal={closeRecordsModal}
          selectedName={selectedName}
          selectedWins={selectedWins}
          selectedLosses={selectedLosses}
        ></RecordsModal>
      </div>

      <h1 className="players-title">Player List</h1>
      <TableContainer className="players-container">
        <Table>
          <TableHead className="players-table-head">
            <TableRow>
              <TableCell>RANK</TableCell>
              <TableCell>PLAYER</TableCell>
              <TableCell>RATING</TableCell>
              <TableCell>RECORD</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((player) => (
              <TableRow key={player.id} className="players-row">
                <TableCell>{data.indexOf(player) + 1}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.rating}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpenRecordsModal(true);
                      getPlayerWins(selectedId);
                      getPlayerLosses(selectedId);
                    }}
                    onMouseEnter={() => {
                      setSelectedId(player.id);
                      setSelectedName(player.name);
                      setSelectedPower(player.power);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell className="players-last-row">
                  <div className="players-delete-update">
                    <TiDelete
                      className="players-delete-icon"
                      onClick={() => setOpenDeleteModal(true)}
                      onMouseEnter={() => setSelectedId(player.id)}
                    ></TiDelete>
                    <MdUpdate
                      className="players-update-icon"
                      onClick={() => setOpenUpdateModal(true)}
                      onMouseEnter={() => {
                        setSelectedId(player.id);
                        setSelectedName(player.name);
                        setSelectedPower(player.power);
                      }}
                    ></MdUpdate>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Players;
