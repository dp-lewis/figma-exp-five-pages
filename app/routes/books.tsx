import { useLoaderData } from "react-router";
import { useState } from "react";
import { getAllBooks, createBook } from "~/utils/books.server";
import { Navigation } from "~/components/Navigation";
import { AddBookModal } from "~/components/AddBookModal";
import styles from "./books.module.css";

export async function loader() {
  const books = await getAllBooks();
  return { books };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  
  if (title) {
    await createBook(title);
  }
  
  return { success: true };
}

export default function Books() {
  const { books } = useLoaderData<typeof loader>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasBooks = books.length > 0;

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          <strong>five pages</strong> or <strong>five minutes</strong>
        </h1>
      </header>

      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Your books</h2>

        {hasBooks ? (
          <div className={styles.bookList}>
            {/* TODO: Render book list items */}
            {books.map((book) => (
              <div key={book.id}>{book.title}</div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateText}>Add your first books</p>
          </div>
        )}
      </div>

      <Navigation backTo="/" onAddClick={handleAddClick} />
      <AddBookModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
