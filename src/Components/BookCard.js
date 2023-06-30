import { useState } from "react";
import Card from "@mui/material/Card";
import Modal from "./Modal";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

function BookCard({ book }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  let imageUrl = "http://localhost:5142/" + book.imageUrl;

  return (
    <div>
      <button onClick={handleOpenModal}>{book.title}</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="40vh" // reduce the height
        >
          <Card
            sx={{
              maxWidth: 400, // Change card width
              maxHeight: 600, // Change card height
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "Lavender", // Set a non-white background color
              border: "3px solid brown",
              boxSizing: "border-box",
              padding: 2,
              margin: 2,
              borderRadius: "8px",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt={book.title}
                height="250" // Increase image height
                width="250" // Add image width
                image={imageUrl}
                title={book.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  {book.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {book.author}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
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
