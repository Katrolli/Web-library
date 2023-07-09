import { useState, useContext } from "react";
import { StateContex } from "../StateProvider/StateProvider";
import Card from "@mui/material/Card";
import Modal from "./Modal";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Divider from "@mui/material/Divider";

function BookCard({ book }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { baseUrl } = useContext(StateContex);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  let imageUrl = baseUrl + "/" + book.imageUrl;

  return (
    <div>
      <button onClick={handleOpenModal}>{book.title}</button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        contentType={"bookCard"}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
          padding="0.1em"
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#d4b996",
              border: "12px solid brown",
              boxSizing: "border-box",
              padding: 8,
              margin: 0,
              borderRadius: "12px",
            }}
          >
            <CardActionArea sx={{ border: "4px solid brown" }}>
              <CardMedia
                component="img"
                alt={book.title}
                height="auto"
                width="auto"
                image={imageUrl}
                title={book.title}
                sx={{ maxHeight: "300px", overflow: "auto" }}
              />
              <CardContent sx={{ textAlign: "center", overflow: "auto" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                  sx={{
                    paddingBottom: "1em",
                    fontFamily: "Merriweather, serif",
                    whiteSpace: "normal",
                  }}
                >
                  {book.title}
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{
                    marginTop: "1em",
                    marginBottom: "1em",
                    fontFamily: "Roboto, sans-serif",
                    whiteSpace: "normal",
                  }}
                >
                  {book.author}
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{
                    paddingTop: "1em",
                    fontFamily: "Roboto, sans-serif",
                    whiteSpace: "normal",
                  }}
                >
                  {book.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default BookCard;
